import React, { useState, useMemo } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dialog, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import mock from './2doListMock.json';
import Styles from './App.module.css';
import TaskListComponent from './components/TaskList/TaskList';
import { Task, Todos, SortVariants } from './components/TaskList/todos';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';

// select ассоциирован с label
/* eslint  jsx-a11y/label-has-associated-control: "off" */

function App() {
    const [sort, setSort] = useState<SortVariants>('Id');

    // Модальное окно с формой добавления новой задачи
    const [isModalActive, setModalActive] = useState(false);

    const initialTaskList = useMemo(
        () => mock.list.map((task) => ({
            ...task,
            dateTS: dayjs(task.date).valueOf(),
            id: parseInt(task.id, 10),
        })),
        [],
    );

    const [todos, setTodos] = useState<Task[]>(initialTaskList);

    const onNewTaskCreate = (date: string, text: string): void => {
        setTodos(Todos(todos).add(text, date));
        setModalActive(false);
    };

    const toggleTaskStatus = (id: number): void => {
        setTodos(Todos(todos).toggleStatus(id));
    };

    const deleteTask = (id: number): void => {
        setTodos(Todos(todos).delete(id));
    };

    const sortVariants: Array<SortVariants> = ['Id', 'Text', 'Date'];

    const handleSortBy = (sortField: SortVariants) => {
        if (sortVariants.includes(sortField)) {
            setTodos(Todos(todos).sortBy(sortField));
            setSort(sortField);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
                <h1>Список задач</h1>
                <label className={Styles.sortSelectLabel}>
                    {' '}
                    Сортировка
                    <select
                        className={Styles.sortSelect}
                        value={sort}
                        onChange={(e) => handleSortBy(e.target.value as SortVariants)}
                    >
                        <option value="Id">В порядке создания</option>
                        <option value="Date">По дате</option>
                        <option value="Text">По тексту</option>
                    </select>
                </label>

                <section className={Styles.listSection}>
                    <TaskListComponent
                        tasks={todos}
                        onDeleteTask={deleteTask}
                        onToggleTaskStatus={toggleTaskStatus}
                    />
                </section>

                <button
                    className="button"
                    type="button"
                    onClick={() => setModalActive(true)}
                >
                    Создать задачу
                </button>

                <Dialog
                    open={isModalActive}
                    onClose={() => setModalActive(false)}
                >
                    <DialogTitle sx={{ fontFamily: 'Exo' }}>
                        Новая задача
                    </DialogTitle>
                    <NewTaskForm onSubmit={onNewTaskCreate} />
                </Dialog>
            </>
        </LocalizationProvider>
    );
}
export default App;
