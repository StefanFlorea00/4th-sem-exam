import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { AuthContext } from './Auth';

type ProtectedRouteProps = {
  component: React.FunctionComponent<any>;
} & RouteProps;

function PrivateRoute(props: ProtectedRouteProps) {
  const { component: RouteComponent, ...rest } = props;
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
}

export default PrivateRoute;
