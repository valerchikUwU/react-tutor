import { OperationalBar } from '../../components/common/operationalBar/operationalBar'
import { Sidebar } from '../../components/common/sideBar/sidebar'
import { Goals } from '../../components/goals/goals'
import styles from './goals.module.scss'


export const GoalsPage = () => {
    return (
        <div className={styles.layout}>
            <Sidebar></Sidebar>
            <OperationalBar></OperationalBar>
            <Goals></Goals>
        </div>
    )
}