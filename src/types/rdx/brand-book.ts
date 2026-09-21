export type BrandColorRole = {
  css: string;
  oklch: string;
  hex: string;
  note?: string;
};

export type BrandBook = {
  version: string;
  status: string;
  spec: string;
  name: string;
  legal: string;
  tagline: string;
  domain: string;
  emails: {
    hello: string;
    sales: string;
    team: string;
  };
  program: {
    access: string;
    typeColorPath: string;
    sharedInfrastructure: boolean;
    marketCopyLocked: boolean;
    assetDownloads: string;
    companyLine: string;
  };
  positioning: {
    company: string;
    market: string;
    marketLong: string;
    icp: string;
    location: string;
    priceFloor: string;
  };
  voice: {
    tone: string;
    use: string[];
    avoid: string[];
  };
  messaging: {
    layer: string;
    pillars: string[];
  };
  logo: {
    primary: string;
    wordmarkFont: string;
    wordmarkStyle: string;
    italicInLockup: boolean;
    taglineInNavLockup: boolean;
    markFill: string;
    hexOnMark: boolean;
    clearSpace: string;
    minSize: {
      symbolUiPx: number;
      faviconPx: number;
      horizontalWidthPx: number;
      stackedWidthPx: number;
    };
    rules: string;
    do: string[];
    doNot: string[];
  };
  colors: {
    source: string;
    roles: Record<string, BrandColorRole>;
  };
  typography: {
    source: string;
    display: string;
    body: string;
    displayCss: string;
    bodyCss: string;
    path: string;
    lockup: string;
    italic: string;
  };
  assets: Record<string, string>;
  productBrand: {
    parent: string;
    footerCredit: string;
    parentMark: string;
    childAccent: string;
    legal: string;
    futureChecklist: string[];
  };
  products: Array<{
    id: string;
    name: string;
    status: string;
    url: string;
    accent: string;
    credit: string;
  }>;
};
