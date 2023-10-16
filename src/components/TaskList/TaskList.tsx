import React, { useState } from 'react';
import Styles from './TaskList.module.css';
import ConfirmDialog from '../ConfrimDialog/ConfirmDialog';
import { Task, TaskList } from './todos';

type TaskProps = {
    task: Task;
    onToggleState: (id: number) => void;
    onDelete: (id: number) => void;
};

function TaskView(props: TaskProps) {
    const { task, onToggleState, onDelete } = props;
    const {
        id, text, date, complete,
    } = task;

    return (
        <div
            className={`${Styles.task} ${complete ? Styles.completedTask : ''}`}
        >
            <input
                className={Styles.checkbox}
                type="checkbox"
                checked={complete}
                onChange={(): void => onToggleState(id)}
            />
            <span className={Styles.date}>{date}</span>
            {' '}
            <span className={Styles.text}>{text}</span>
            <button
                type="button"
                className={Styles.deleteButton}
                onClick={(): void => onDelete(id)}
                title="Удалить задачу"
            >
                &times;
            </button>
        </div>
    );
}

type ListProps = {
    tasks: TaskList;
    onDeleteTask: (id: number) => void;
    onToggleTaskStatus: (id: number) => void;
};

function TaskListComponent({
    tasks,
    onDeleteTask,
    onToggleTaskStatus,
}: ListProps) {
    const [isDeleteConfirmationOpen, setIsCDOpen] = useState(false);
    const [deleteTaskId, setTaskId] = useState<number | null>(null);
    const handleConfirmDialogAnswer = (answer: boolean) => {
        if (answer && deleteTaskId) {
            onDeleteTask(deleteTaskId);
        }
        setIsCDOpen(false);
    };

    return (
        <>
            {tasks.map((task: Task) => (
                <TaskView
                    key={task.id}
                    task={task}
                    onDelete={() => {
                        setTaskId(task.id);
                        setIsCDOpen(true);
                    }}
                    onToggleState={onToggleTaskStatus}
                />
            ))}

            <ConfirmDialog
                isOpen={isDeleteConfirmationOpen}
                text="Действительно хотите удалить задачу?"
                onClose={() => setIsCDOpen(false)}
                onAnswer={handleConfirmDialogAnswer}
            />
        </>
    );
}

export default TaskListComponent;
