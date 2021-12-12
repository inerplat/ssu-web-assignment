import React, {Component} from 'react';
import {useLocation, Route, Switch, Redirect} from 'react-router-dom';
import CustomNavBar from "components/CustomNavBar";
import routes from "routes"
import Intro from "./cards/Intro";

function Main(props) {
    const location = useLocation()
    const [userId, setUserId] = React.useState(props.userId)
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (location.pathname !== '/') {
                return (
                    <Route
                        path={prop.path}
                        render={(props) => <prop.component userId={userId} {...props} />}
                        key={key}
                    />
                );
            } else {
                return (
                    <Route
                        path="/"
                        render={(props) => <Intro/>}
                        key={key}
                    />
                );
            }
        });
    }
    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
    }, [location]);

    return (
        <>
            <CustomNavBar/>
            <div className="content w-75 mx-auto mt-5">
                <Switch>
                    {getRoutes(routes)}
                </Switch>
            </div>
        </>
    )
}

export default Main;