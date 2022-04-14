import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to='./sign-in' />;
};

export default ProtectedRoute;
