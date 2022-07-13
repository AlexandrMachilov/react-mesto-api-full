import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to='./signin' />;
};

export default ProtectedRoute;
