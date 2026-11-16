export class ConstantsLib {
  static readonly FULL_NAME = 'HOF TEST';
  static readonly ADDRESS_LINE_1 = '100';
  static readonly ADDRESS_LINE_2 = 'Tenth St';
  static readonly TOWN_OR_CITY = 'HULL';
  static readonly POSTCODE = 'M11 1HH';
  static readonly COUNTRY_UK = 'United Kingdom';
  static readonly TELEPHONE = '01616699548';
  static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
  static readonly LAND_LORD_AGENT_NAME = 'HOF LandLord Agent';
  static readonly COMPANY_NAME = 'Test UK Ltd';
  static readonly DOB_1978 = '01/01/1978';
  static readonly NATIONALITY = 'Spain';
  static readonly YESTERDAY_S_DATE = "yesterday's date";
}

function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
}