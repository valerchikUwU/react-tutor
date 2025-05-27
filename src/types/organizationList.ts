import { Organization } from "./organization";

export type OrganizationListProps = {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
  isCollapsed?: boolean;
}