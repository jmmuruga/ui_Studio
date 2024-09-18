import React, { createContext, useState, useContext } from 'react';
import ConfirmDialog from './ConfirmDialog';

const ConfirmDialogContext = createContext();

export const useConfirmDialog = () => useContext(ConfirmDialogContext);

export const ConfirmDialogProvider = ({ children }) => {
    const [dialog, setDialog] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
    });

    const openDialog = (title, message, onConfirm, onCancel) => {
        setDialog({
            isOpen: true,
            title,
            message,
            onConfirm: () => {
                onConfirm();
                setDialog({ ...dialog, isOpen: false });
            },
            onCancel: () => {
                onCancel();
                setDialog({ ...dialog, isOpen: false });
            },
        });
    };

    const closeDialog = () => setDialog({ ...dialog, isOpen: false });

    return (
        <ConfirmDialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            <ConfirmDialog
                isOpen={dialog.isOpen}
                title={dialog.title}
                message={dialog.message}
                onConfirm={dialog.onConfirm}
                onCancel={dialog.onCancel}
            />
        </ConfirmDialogContext.Provider>
    );
};
