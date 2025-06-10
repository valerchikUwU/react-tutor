import styles from './goal.module.scss'
import { StarIcon } from '../ui/startIcon';
import { IconBackward } from '../ui/iconBackward';
import { useNavigate } from 'react-router-dom';
import { GoalArray } from './goalArray';
import { useGoal } from '../../hooks/goal/useGoal';
import { PlusIcon } from '../ui/plusIcon';
import { organizationStore } from '../../stores/organization.store';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GoalCreateDto } from '../../types/goal/goalCreateDto';
import { GoalUpdateDto } from '../../types/goal/goalUpdateDto';
import { IconSave } from '../ui/iconSave';
import { useUpdateGoal } from '../../hooks/goal/useUpdateGoal';
import { useCreateGoal } from '../../hooks/goal/useCreateGoal';
import notification from 'antd/es/notification';
import { SmileOutlined, FrownOutlined, LoadingOutlined } from '@ant-design/icons';
import { goalStore } from '../../stores/goal.store';
import { Spin } from 'antd';


export const Goals: React.FC = observer(() => {
    const organizationId = organizationStore.getSelectedOrganization() ?? localStorage.getItem('orgId');

    const [api, contextHolder] = notification.useNotification();

    const [isUpdating, setUpdating] = useState(false);
    const [isModified, setModified] = useState(false);
    const [goalCreateDto, setGoalCreateDto] = useState<GoalCreateDto | null>(null);
    const [goalUpdateDto, setGoalUpdateDto] = useState<GoalUpdateDto | null>(null);
    const { data: goal, isLoading, error } = useGoal(organizationId!);
    const { mutate: updateGoal } = useUpdateGoal();
    const { mutate: createGoal } = useCreateGoal();
    const navigate = useNavigate();

    useEffect(() => {
        if (organizationId) {
            const goalDto = goalStore.getGoalDto(organizationId);
            if (goalDto && "_id" in goalDto) {
                setGoalUpdateDto(goalDto);
            }
            else if (goalDto) {
                setGoalCreateDto(goalDto);
            }
            else {
                setGoalCreateDto(null);
                setGoalUpdateDto(null);
            }
        }

    }, [organizationId]);



    const handleUpdate = () => {
        if (goalUpdateDto) {

            setUpdating(true);
            updateGoal({
                goalId: goalUpdateDto._id,
                goalUpdateDto
            }, {
                onSuccess: (data) => {
                    api.success({
                        message: 'Цель обновлена',
                        icon: <SmileOutlined style={{ color: '#52c41a' }} />,
                        placement: 'top',
                        duration: 3,
                        showProgress: true
                    });
                    setModified(false);
                    setUpdating(false);
                },
                onError: (error) => {
                    api.error({
                        message: 'Ошибка обновления',
                        description: error.message,
                        icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
                        placement: 'top'
                    });

                    setUpdating(false);
                }
            });
        }
        if (goalCreateDto) {
            createGoal({
                goalCreateDto
            }, {
                onSuccess: (data) => {
                    api.success({
                        message: 'Цель создана',
                        icon: <SmileOutlined style={{ color: '#52c41a' }} />,
                        placement: 'top',
                        duration: 3,
                        showProgress: true
                    });
                    setModified(false);
                    setUpdating(false);
                },
                onError: (error) => {
                    api.error({
                        message: 'Ошибка создания',
                        description: error.message,
                        icon: <FrownOutlined style={{ color: '#ff4d4f' }} />,
                        placement: 'top'
                    });
                    setUpdating(false);
                }
            })
        }
    };

    const handleDeleteBlock = (index: number) => {
        try {
            if (goal) {
                goal.content.splice(index, 1);
                const goalUpdateDto: GoalUpdateDto = {
                    _id: goal.id,
                    content: goal.content
                }
                setGoalUpdateDto(goalUpdateDto);
                goalStore.setGoalDto(organizationId!!, goalUpdateDto)
            } else if (goalCreateDto) {
                const newContent = [...goalCreateDto.content];
                newContent.splice(index, 1);
                const _goalCreateDto = {
                    ...goalCreateDto,
                    content: newContent
                }
                setGoalCreateDto(_goalCreateDto);
                goalStore.setGoalDto(organizationId!!, _goalCreateDto);
            }
            setModified(true);
        } catch (err) {
            console.error('Error deleting block:', err);
        }
    };



    const handleAddButtonClick = async () => {
        if (!organizationId) return;
        try {
            if (goal && goal.content.length < 2) {
                goal.content.push('Новая часть цели!')
                const goalUpdateDto: GoalUpdateDto = {
                    _id: goal.id,
                    content: goal.content
                }
                setGoalUpdateDto(goalUpdateDto);
                goalStore.setGoalDto(organizationId!!, goalUpdateDto)
            }
            else if (goalCreateDto) {
                const _goalCreateDto = {
                    ...goalCreateDto,
                    content: [...goalCreateDto.content, 'Новая часть цели!']
                }
                setGoalCreateDto(_goalCreateDto);
                goalStore.setGoalDto(organizationId!!, _goalCreateDto);
            }
            else {
                const newGoal: GoalCreateDto = {
                    content: ['Первая часть цели!'],
                    organizationId: organizationId
                };
                setGoalCreateDto(newGoal);
                goalStore.setGoalDto(organizationId!!, newGoal);
            }
            setModified(true);
        } catch (err) {
            console.error('Error handling goal update:', err);
        }
    };

    const handleTextChange = (index: number, text: string) => {

        if (goal) {
            goal.content[index] = text;
            const goalUpdateDto: GoalUpdateDto = {
                _id: goal.id,
                content: goal.content
            }
            setGoalUpdateDto(goalUpdateDto);
            console.log(goalUpdateDto)
            goalStore.setGoalDto(organizationId!!, goalUpdateDto)
        } else if (goalCreateDto) {
            goalCreateDto.content[index] = text;
            const _goalCreateDto = {
                ...goalCreateDto,
                content: goalCreateDto.content
            }
            setGoalCreateDto(_goalCreateDto);
            goalStore.setGoalDto(organizationId!!, _goalCreateDto);
        }
        setModified(true);
    };

    return (
        <div className={styles.main}>
            {contextHolder}
            <Spin
                spinning={isUpdating}
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                tip="Сохранение..."
                fullscreen
            />
            <div className={styles.mainHeader}>

                <div className={styles.headerIcon}>
                    <StarIcon ></StarIcon>
                </div>
                <div className={styles.headerName}>Цели</div><div
                    className={`${styles.iconSave} ${isModified ? styles.saveButtonModified : ''}`}
                    title={isModified ? 'Есть несохраненные изменения' : 'Сохранить'}
                    onClick={handleUpdate}
                >
                    <IconSave ></IconSave>
                </div>
                <div className={styles.iconBackward} title='Вернуться' onClick={() => navigate(-1) ?? navigate('/main')}> <IconBackward></IconBackward></div>
            </div>
            
            <GoalArray
                goal={goal || goalCreateDto}
                isLoading={isLoading}
                error={error}
                onDeleteBlock={handleDeleteBlock}
                onTextChange={handleTextChange}
            ></GoalArray>
            {
                isLoading ? <div /> :
                    <button className={styles.goalAddButton} onClick={handleAddButtonClick} disabled={goal?.content?.length === 2 || goalCreateDto?.content?.length === 2}>
                        <div className={styles.plusIcon}>
                            <PlusIcon></PlusIcon>
                        </div>
                        Добавить часть цели
                    </button>
            }
        </div>
    )
});