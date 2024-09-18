// toast-utils.js
import { toast } from 'react-toastify';

// Function to display notifications with default settings
const notify = {
    success: (message) => {
        toast.success(message, {
            position: 'top-center',
            autoClose: 5000, // 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    error: (message) => {
        toast.error(message, {
            position: 'top-center',
            autoClose: 5000, // 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    info: (message) => {
        toast.info(message, {
            position: 'top-center',
            autoClose: 5000, // 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
    warning: (message) => {
        toast.warning(message, {
            position: 'top-center',
            autoClose: 5000, // 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },
};

export default notify;
