import React, { useEffect, useState } from 'react';
import styles from './operationalBar.module.scss';
import { Organization } from '../../../types/organization';
import mainIcon from '../../../assets/images/iconHeader.svg';
import { OrganizationIcon } from '../../ui/organizationIcon';
import { organizationStore } from '../../../stores/organization.store';
import { observer } from 'mobx-react-lite';
import { OrganizationListProps } from '../../../types/organizationList';




export const OrganizationList: React.FC<OrganizationListProps> = observer(({
  organizations,
  loading,
  error,
  isCollapsed = false,
}: OrganizationListProps) => {
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(localStorage.getItem('orgId'));
  useEffect(() => {
    if (organizations.length > 0 && !selectedOrgId) {
      setSelectedOrgId(organizations[0].id);
      organizationStore.setSelectedOrganization(organizations[0].id);
    }
  }, [organizations]);

  if (loading) return <div><div className={styles.loading}><img src={mainIcon} alt="mainIcon" /></div><span className={styles.loadingSpan}>Загрузка</span></div>;
  if (error) return <div><div className={styles.loading}><img src={mainIcon} alt="mainIcon" /></div><span className={styles.loadingSpan}>Ошибка</span></div>;

  const handleSelectOrg = (org: Organization) => {
    setSelectedOrgId(org.id);
    localStorage.setItem('orgId', org.id);
    organizationStore.setSelectedOrganization(org.id);
  };

  return (
    <div className={`${styles.organizationList} ${isCollapsed ? styles.collapsed : ''
      }`}>
      {!isCollapsed && organizations.map(org => (
        <div key={org.id} className={`${styles.organizationItem} ${selectedOrgId === org.id ? styles.selected : ''} `}
          onClick={() => handleSelectOrg(org)}
        >
          <div className={styles.organizationIcon}><OrganizationIcon></OrganizationIcon></div>
          <div className={styles.organizationName}>{org.organizationName}</div>
        </div>
      ))}
    </div>
  );
});