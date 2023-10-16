import dayjs from 'dayjs';

export type Task = {
    id: number;
    text: string;
    date: string;
    dateTS: number;
    complete: boolean;
};

export type TaskList = Array<Task>;

export type SortVariants = 'Id' | 'Text' | 'Date';

export const Todos = (tasks: TaskList) => ({
    indexById: (id: number) => tasks.findIndex((task) => task.id === id),

    add: (text: string, date: string) => [
        ...tasks,
        {
            id: Date.now(),
            text,
            complete: false,
            date,
            dateTS: dayjs(date).valueOf(),
        },
    ],

    delete: (id: number) => {
        const tasksCopy = [...tasks];
        tasksCopy.splice(Todos(tasks).indexById(id), 1);
        return tasksCopy;
    },

    toggleStatus: (id: number) => {
        const index = Todos(tasks).indexById(id);
        const tasksCopy = [...tasks];
        tasksCopy[index].complete = !tasks[index].complete;
        return tasksCopy;
    },

    sortByDate: () => [...tasks].sort((a: Task, b: Task) => a.dateTS - b.dateTS),

    sortByText: () => [...tasks].sort((a: Task, b: Task) => {
        if (a.text > b.text) return 1;
        if (a.text < b.text) return -1;
        return 0;
    }),

    sortById: () => [...tasks].sort((a: Task, b: Task) => a.id - b.id),

    sortBy: (sortField: SortVariants) => Todos(tasks)[`sortBy${sortField}`](),
});
