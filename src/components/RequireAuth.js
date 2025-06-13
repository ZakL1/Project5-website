import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ✅ Correct import

function RequireAuth({ children }) {
    const { currentUser } = useAuth(); // ✅ Use the custom hook
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
