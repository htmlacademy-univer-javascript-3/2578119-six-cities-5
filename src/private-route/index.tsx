import {Actions, AppRoutes, AuthorizationStatus} from '../utils/enums.ts';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../store/hooks.ts';

type PrivateRouteProps = {
  children: JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[Actions.User].authorizationStatus);
  const {children} = props;
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoutes.Login}/>
  );
}
