export interface IDepartment {
  id: string;
  departmentName: string;
  year: string;
  segment: string[];
  manager?: string;
  leader?: string;
  email?: string;
  useabled?: boolean;
  member?: string[];
}
