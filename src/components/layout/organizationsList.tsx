import React from 'react';
import styles from './layout.module.scss';
import { Organization } from '../../core/services/api/organizationService';

type OrganizationListProps = {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
  className?: string;
}

export const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  loading,
  error,
  className = ''
}) => {
  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!organizations.length) return <div className={styles.empty}>No organizations found</div>;

  return (
    <div className={styles.organizationList}>
      {organizations.map(org => (
        <div key={org.id} className={styles.organizationItem}>
          {org.organizationName}
        </div>
      ))}
    </div>
  );
};