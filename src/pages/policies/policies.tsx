import { OperationalBar } from '../../components/common/operationalBar/operationalBar'
import { Sidebar } from '../../components/common/sideBar/sidebar'
import { Policies } from '../../components/policies/policies'
import styles from './policies.module.scss'


export const PoliciesPage = () => {
    return (
        <div className={styles.layout}>
            <Sidebar></Sidebar>
            <OperationalBar></OperationalBar>
            <Policies></Policies>
        </div>
    )
}