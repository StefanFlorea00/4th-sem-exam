import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { AuthContext } from './Auth';
import Nav from './components/Nav/Nav'

type ProtectedRouteProps = {
  component: React.FunctionComponent<any>;
} & RouteProps;

function PrivateRoute(props: ProtectedRouteProps) {
  const { component: RouteComponent, ...rest } = props;
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
    >
      {routeProps =>
        !!currentUser ? (
          <>
            <RouteComponent {...routeProps} />
            <Nav/>
          </>
        ) : (
          <Redirect to={'/login'} />
        )
      }
    </Route>
  );
}

export default PrivateRoute;
