import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import notify from './components/toast-utils';
const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('authToken'); // Check auth logic

    useEffect(() => {
        if (!isAuthenticated) {
            notify.warning('Please Login first !');
            navigate('/login'); // Redirect to login if not authenticated
        }
    }, [isAuthenticated, navigate]);

    // Return nothing or a loading state while checking for authentication
    if (!isAuthenticated) {
        return null; // This prevents the children from rendering if not authenticated
    }

    return children;
};

export default AuthGuard;
