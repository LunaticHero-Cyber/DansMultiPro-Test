export type JobsTypeInterface = 'Full Time' | 'Part Time';

export type JobInterface = {
  id: string;
  type: JobsTypeInterface;
  url: string;
  created_at: Date;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
};
