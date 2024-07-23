import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { selectFetchingMe, selectIsAuthenticated } from '../../Store/selectors/auth_selector';
import { useSelector } from 'react-redux';

export function withAuthentication<WP extends JSX.IntrinsicAttributes>(Component: ComponentType<WP>) {

  return (props: WP) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const fetching = useSelector(selectFetchingMe);

    if (fetching) {
      return <div className="container pt-4">
        <h3 className="text-center">Loading...</h3>
      </div>
    }
    if (isAuthenticated) {
      return <Component {...props} />;
    }
    return <Navigate to={'/login'}/>;
  }
}

export function withoutAuthentication<WP extends JSX.IntrinsicAttributes>(Component: ComponentType<WP>) {

  return (props: WP) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    if (!isAuthenticated) {
      return <Component {...props} />;
    }
    return <Navigate to={'/'}/>;
  }
}