#!/bin/bash

set -euo pipefail

: "${GITHUB_APP_TOKEN:?Missing GITHUB_APP_TOKEN}"
: "${DRONE_REPO:?Missing DRONE_REPO}"
: "${DRONE_BUILD_NUMBER:?Missing DRONE_BUILD_NUMBER}"
: "${DRONE_BUILD_LINK:?Missing DRONE_BUILD_LINK}"
: "${DRONE_COMMIT_SHA:?Missing DRONE_COMMIT_SHA}"

REPORT_FILE="${REPORT_FILE:-allure-report/index.html}"
if [ ! -s "$REPORT_FILE" ]; then
  echo "Missing single-file Allure report: ${REPORT_FILE}" >&2
  exit 1
fi

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  REPORT_ID="pr-${DRONE_PULL_REQUEST}"
  RELEASE_NAME="LMR Allure Report PR #${DRONE_PULL_REQUEST}"
else
  REPORT_ID="nightly"
  RELEASE_NAME="LMR Nightly Allure Report"
fi

TAG_NAME="${REPORT_ID}-allure-report"
ASSET_NAME="allure-report-${REPORT_ID}-build-${DRONE_BUILD_NUMBER}.html"
GH_API="https://api.github.com/repos/${DRONE_REPO}"
WORK_DIR="$(mktemp -d)"
RESPONSE_FILE="${WORK_DIR}/response.json"
ASSET_IDS_FILE="${WORK_DIR}/asset-ids.txt"
trap 'rm -rf "$WORK_DIR"' EXIT

github_request() {
  local method="$1" url="$2" expected="$3"
  shift 3

  HTTP_CODE="$(curl -sS -o "$RESPONSE_FILE" -w "%{http_code}" -X "$method" \
    -H "Authorization: Bearer ${GITHUB_APP_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" "$@" "$url")"

  if ! [[ "$HTTP_CODE" =~ $expected ]]; then
    echo "GitHub ${method} failed (HTTP ${HTTP_CODE})" >&2
    sed -n '1,30p' "$RESPONSE_FILE" >&2
    exit 1
  fi
  if [ "$HTTP_CODE" != "204" ] && ! jq -e . "$RESPONSE_FILE" >/dev/null; then
    echo "GitHub ${method} returned invalid JSON" >&2
    exit 1
  fi
}

github_request GET "${GH_API}/releases/tags/${TAG_NAME}" '^(200|404)$'
if [ "$HTTP_CODE" = "404" ]; then
  github_request POST "${GH_API}/releases" '^201$' \
    -H "Content-Type: application/json" \
    --data "$(jq -n --arg tag "$TAG_NAME" --arg name "$RELEASE_NAME" --arg commit "$DRONE_COMMIT_SHA" \
      '{tag_name:$tag,name:$name,target_commitish:$commit,prerelease:true,draft:false}')"
fi
RELEASE_ID="$(jq -er '.id | numbers' "$RESPONSE_FILE")"

page=1
: > "$ASSET_IDS_FILE"
while :; do
  github_request GET "${GH_API}/releases/${RELEASE_ID}/assets?per_page=100&page=${page}" '^200$'
  jq -er 'type == "array"' "$RESPONSE_FILE" >/dev/null
  jq -r --arg name "$ASSET_NAME" '.[] | select(.name == $name) | .id' \
    "$RESPONSE_FILE" >> "$ASSET_IDS_FILE"
  [ "$(jq 'length' "$RESPONSE_FILE")" -eq 100 ] || break
  page=$((page + 1))
done

while IFS= read -r asset_id; do
  github_request DELETE "${GH_API}/releases/assets/${asset_id}" '^204$'
done < "$ASSET_IDS_FILE"

github_request POST \
  "https://uploads.github.com/repos/${DRONE_REPO}/releases/${RELEASE_ID}/assets?name=${ASSET_NAME}" \
  '^201$' -H "Content-Type: text/html" --data-binary @"$REPORT_FILE"
DOWNLOAD_URL="$(jq -er '.browser_download_url | strings | select(length > 0)' "$RESPONSE_FILE")"

if [ -n "${REPORT_URL_FILE:-}" ]; then
  mkdir -p "$(dirname "$REPORT_URL_FILE")"
  printf '%s\n' "$DOWNLOAD_URL" > "$REPORT_URL_FILE"
fi

if [ -n "${DRONE_PULL_REQUEST:-}" ]; then
  COMMENT_MARKER="<!-- lmr-allure-report -->"
  COMMENT_BODY="$(printf '%s\nSingle-file Allure report (download and open in a browser):\n\n* %s\n\nDrone build: %s' \
    "$COMMENT_MARKER" "$DOWNLOAD_URL" "$DRONE_BUILD_LINK")"
  COMMENT_PAYLOAD="$(jq -n --arg body "$COMMENT_BODY" '{body:$body}')"

  page=1
  COMMENT_ID=""
  while :; do
    github_request GET "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments?per_page=100&page=${page}" '^200$'
    jq -er 'type == "array"' "$RESPONSE_FILE" >/dev/null
    COMMENT_ID="$(jq -r --arg marker "$COMMENT_MARKER" \
      '[.[] | select(.user.type == "Bot" and ((.body // "") | contains($marker)))][0].id // empty' \
      "$RESPONSE_FILE")"
    [ -z "$COMMENT_ID" ] || break
    [ "$(jq 'length' "$RESPONSE_FILE")" -eq 100 ] || break
    page=$((page + 1))
  done

  if [ -n "$COMMENT_ID" ]; then
    github_request PATCH "${GH_API}/issues/comments/${COMMENT_ID}" '^200$' \
      -H "Content-Type: application/json" --data "$COMMENT_PAYLOAD"
  else
    github_request POST "${GH_API}/issues/${DRONE_PULL_REQUEST}/comments" '^201$' \
      -H "Content-Type: application/json" --data "$COMMENT_PAYLOAD"
  fi
  COMMENT_URL="$(jq -er '.html_url | strings | select(length > 0)' "$RESPONSE_FILE")"
  echo "Published PR comment: ${COMMENT_URL}"
fi

echo "Uploaded single-file Allure report: ${DOWNLOAD_URL}"
