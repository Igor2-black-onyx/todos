import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Styles from './NewTaskForm.module.css';

type FormElement = React.FormEvent<HTMLFormElement>;

type Props = {
    onSubmit: (date: string, text: string) => void;
};

const DATE_FORMAT = 'DD.MM.YYYY';

function NewTaskForm({ onSubmit }: Props) {
    const [text, setText] = useState<string>('');
    const [date, setDate] = useState<string | null>(
        dayjs(new Date()).format(DATE_FORMAT),
    );
    const handleSubmit = (e: FormElement): void => {
        e.preventDefault();
        if (date && text) {
            onSubmit(date, text);
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={Styles.form}>
            <TextField
                sx={{
                    width: '100%',
                    marginBottom: '1em',
                }}
                variant="outlined"
                label="Текст задачи"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoComplete="off"
                multiline
                maxRows={4}
                required
            />
            <DateField
                format={DATE_FORMAT}
                label="Дата завершения"
                variant="outlined"
                value={dayjs(date, DATE_FORMAT)}
                onChange={(d) => {
                    setDate(
                        d?.isValid() ? (d as Dayjs).format(DATE_FORMAT) : null,
                    );
                }}
                required
            />
            <Button
                variant="outlined"
                type="submit"
                sx={{
                    marginLeft: '7em',
                    marginTop: '0.6em',
                    fontFamily: 'Exo',
                }}
            >
                Добавить задачу
            </Button>
        </form>
    );
}

export default NewTaskForm;
