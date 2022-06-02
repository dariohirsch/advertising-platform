import LandingPage from '../pages/LandingPage';
import * as PATHS from '../helpers/paths';
import RegisterPage from '../pages/RegisterPage';
import ClientPage from '../pages/ClientPage';
import { Navigate } from 'react-router-dom';
import ResetPassword from '../pages/ResetPassword';

const routes = (props) => {
  const { currentUser, loading } = props;

  return loading
    ? [
        {
          path: PATHS.LANDINGPAGE,
          element: <h4>Loading..</h4>,
        },
      ]
    : [
        {
          path: PATHS.LANDINGPAGE,
          element: currentUser ? <ClientPage {...props} /> : <LandingPage {...props} />,
        },
        {
          path: PATHS.REGISTERPAGE,
          element: <RegisterPage {...props} />,
        },
        {
          path: PATHS.RESETPASSWORD,
          element: <ResetPassword {...props} />,
        },
        {
          path: PATHS.CLIENTPAGE,
          element: currentUser ? <ClientPage {...props} /> : <Navigate to={PATHS.LANDINGPAGE} replace />,
        },
      ];
};

export default routes;
