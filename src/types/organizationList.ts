import { Organization } from "./organization";

export type OrganizationListProps = {
  organizations: Organization[];
  loading: boolean;
  error: Error | null;
  isCollapsed?: boolean;
}