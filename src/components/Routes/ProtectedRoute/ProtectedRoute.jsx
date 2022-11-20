import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ hasAccess, children }) => {
    return hasAccess ? children : <Navigate to="/" replace={true} />;
};

export default ProtectedRoute;
