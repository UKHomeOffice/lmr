{{/*
Expand the name of the chart.
*/}}
{{- define "lmr-app.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
*/}}
{{- define "lmr-app.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "lmr-app.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.AppVersion | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "lmr-app.labels" -}}
helm.sh/chart: {{ include "lmr-app.chart" . }}
{{ include "lmr-app.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
User-provided labels excluding keys managed by chart selectors.
*/}}
{{- define "lmr-app.commonLabels" -}}
{{- range $k := keys .Values.commonLabels | sortAlpha }}
{{- if and (ne $k "app.kubernetes.io/name") (ne $k "app.kubernetes.io/instance") }}
{{- $v := index $.Values.commonLabels $k }}
{{ $k }}: {{ $v | quote }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "lmr-app.selectorLabels" -}}
app.kubernetes.io/name: {{ include "lmr-app.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Redis selector labels
*/}}
{{- define "lmr-app.redis.selectorLabels" -}}
app.kubernetes.io/name: redis
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Get app name with branch suffix if applicable
*/}}
{{- define "lmr-app.appName" -}}
{{- if .Values.branch.enabled }}
{{- printf "%s-%s" .Values.app.name .Values.branch.name }}
{{- else }}
{{- .Values.app.name }}
{{- end }}
{{- end }}

{{/*
Get Redis name with branch suffix if applicable
*/}}
{{- define "lmr-app.redis.name" -}}
{{- if .Values.branch.enabled }}
{{- printf "redis-%s" .Values.branch.name }}
{{- else }}
{{- .Values.redis.name }}
{{- end }}
{{- end }}

{{/*
Get the environment type (prod, uat, dev, branch)
*/}}
{{- define "lmr-app.envType" -}}
{{- if .Values.branch.enabled }}
branch
{{- else }}
{{- .Values.global.environment }}
{{- end }}
{{- end }}

{{/*
Determine if health checks should be enabled
*/}}
{{- define "lmr-app.healthChecks.enabled" -}}
{{- if .Values.branch.enabled }}
false
{{- else }}
{{- .Values.healthChecks.enabled }}
{{- end }}
{{- end }}

{{/*
Get replica count based on environment
*/}}
{{- define "lmr-app.replicas" -}}
{{- if eq .Values.global.environment "prod" }}
2
{{- else }}
1
{{- end }}
{{- end }}

{{/*
Get ConfigMap name with branch suffix if applicable
*/}}
{{- define "lmr-app.configMapName" -}}
{{- if .Values.branch.enabled }}
{{- printf "%s-configmap-%s" .Values.app.name .Values.branch.name }}
{{- else }}
{{- printf "%s-configmap" .Values.app.name }}
{{- end }}
{{- end }}
