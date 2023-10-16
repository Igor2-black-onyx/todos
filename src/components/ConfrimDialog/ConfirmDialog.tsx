import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    isOpen: boolean;
    text: string;
    onClose: () => void;
    onAnswer: (answer: boolean) => void;
};

function ConfirmDialog(props: Props) {
    const {
        isOpen, text, onClose, onAnswer,
    } = props;

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{text}</DialogTitle>
                <DialogActions>
                    <Button autoFocus onClick={() => onAnswer(false)}>
                        Нет
                    </Button>
                    <Button onClick={() => onAnswer(true)} autoFocus>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ConfirmDialog;
