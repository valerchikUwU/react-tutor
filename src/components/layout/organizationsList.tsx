import React from 'react';
import styles from './layout.module.scss';
import { Organization } from '../../core/types/organization';

type OrganizationListProps = {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
  isCollapsed?: boolean;
}

export const OrganizationList: React.FC<OrganizationListProps> = ({
    organizations,
    loading,
    error,
    isCollapsed = false
  }) => {
    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
  
    return (
      <div className={`${styles.organizationList} ${
        isCollapsed ? styles.collapsed : ''
      }`}>
        {!isCollapsed && organizations.map(org => (
          <div key={org.id} className={styles.organizationItem}>
            {org.organizationName}
          </div>
        ))}
      </div>
    );
  };