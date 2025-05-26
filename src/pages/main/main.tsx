import { Outlet } from "react-router-dom"
import { OperationalBar } from "../../components/common/operationalBar/operationalBar"
import { Sidebar } from "../../components/common/sideBar/sidebar"
import { Main } from "../../components/main/main"
import styles from './main.module.scss'


export const MainPage = () => {
    return (
        <div className={styles.layout}>
            <Sidebar></Sidebar>
            <OperationalBar></OperationalBar>
            <Main></Main>
            <Outlet />
        </div>
    )
}