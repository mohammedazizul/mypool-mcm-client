import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../UserContext/UserContext';


const PrivateRoute = ({children, ...rest}) => {

    const [user, setUser] = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={({ location }) =>
            // routing condition if user is there then display or redirect to login
                (user.username) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;