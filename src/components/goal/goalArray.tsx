import { GoalFC } from "../../types/goal/goalFC";
import mainIcon from '../../assets/images/iconHeader.svg';
import styles from './goal.module.scss'
import { DeleteCross } from "../ui/deleteCross";
import { observer } from "mobx-react-lite";

export const GoalArray: React.FC<GoalFC> = observer(({
    goal,
    isLoading,
    error,
    onDeleteBlock,
    onTextChange
}: GoalFC) => {
    if (isLoading) return <div><div className={styles.loading}><img src={mainIcon} alt="mainIcon" /></div><span className={styles.loadingSpan}>Загрузка</span></div>;
    if (error) return <div><div className={styles.loading}><img src={mainIcon} alt="mainIcon" /></div><span className={styles.loadingSpan}>Ошибка</span></div>;

    return (
        <div>
            {goal?.content?.map((block, index) => (
                <div key={index} className={styles.goalTextInputBlock}>
                    <div
                        className={styles.deleteCross}
                        onClick={() => onDeleteBlock(index)}
                    >
                        <DeleteCross />
                    </div>
                    <textarea
                        className={styles.goalTextInput}
                        value={block}
                        onChange={(e) => onTextChange?.(index, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );

})