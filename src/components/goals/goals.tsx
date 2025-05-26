import styles from './goals.module.scss'
import { StarIcon } from '../ui/startIcon';
import { IconBackward } from '../ui/iconBackward';
import { useNavigate } from 'react-router-dom';


export const Goals: React.FC = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.main}>
            <div className={styles.mainHeader}>
                <div className={styles.headerIcon}>
                    <StarIcon></StarIcon>
                </div>
                <div className={styles.headerName}>Цели</div>
                <div className={styles.iconBackward} onClick={() => navigate(-1) ?? navigate('/main')}> <IconBackward></IconBackward></div>
            </div>
            <div className={styles.goalTextInputBlock}>
                <textarea className={styles.goalTextInput}>

                </textarea>
            </div>
        </div>
    )
}