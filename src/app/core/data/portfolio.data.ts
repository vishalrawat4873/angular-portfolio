export interface CompanyInfo {
  name: string;
  url: string;
  ariaLabel: string;
}

export const COMPANY_DATA: CompanyInfo = {
  name: 'Evince Development',
  url: 'https://evincedev.com/',
  ariaLabel: 'Evince Development website (opens in new tab)'
};

export const EVINCE_DEV_URL = COMPANY_DATA.url;
export const EVINCE_DEV_ARIA_LABEL = COMPANY_DATA.ariaLabel;

