import React, { useState } from 'react';
import styles from './operationalBar.module.scss';
import burger from '../../../assets/images/burger.svg';
import dropdown from '../../../assets/images/drop-down.svg';
import { useOrganizations } from '../../../hooks/organization/useOrganizations';
import { OrganizationList } from './organizationsList';

export const OperationalBar: React.FC = () => {
    const { organizations, loading, error } = useOrganizations();
    const [isOrganizationsClosed, setOrganizationsClosed] = useState(false);

    return (

        <div className={styles.operationalBar}>
            <div className={styles.organizationsHeader}>
                <div className={styles.headerName}>Организации</div>
                <div className={styles.dropdown}
                    onClick={() => setOrganizationsClosed(!isOrganizationsClosed)}
                >
                    <img
                        src={dropdown}
                        alt="dropdown"
                        className={`${styles.collapseIcon} ${isOrganizationsClosed ? styles.collapsed : ''
                            }`}
                    />
                </div>
                <div className={styles.burger}>
                    <img src={burger} alt="burger" />
                </div>
            </div>
            <OrganizationList
                isCollapsed={isOrganizationsClosed}
                organizations={organizations}
                loading={loading}
                error={error}
            />
            <div className={styles.contactsHeader}>
                <div className={styles.headerName}>Контакты</div>
                <div className={styles.burger}>
                    <img src={burger} alt="burger" />
                </div>
            </div>
        </div>
    );
};