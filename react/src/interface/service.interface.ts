export interface IMyServiceItem {
  name: string;
  category_id: string;
  services: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  service_id: string;
  service_desc: string;
  status: string;
  contact_person: string;
  phones: string[];
  emails: any;
  links: any;
  files: {
    name: string;
  }[];
}

export interface IServiceStatusConfig {
  active: { label: string; bg: string };
  passive: { label: string; bg: string };
  draft: { label: string; bg: string };
  archive: { label: string; bg: string };
}
