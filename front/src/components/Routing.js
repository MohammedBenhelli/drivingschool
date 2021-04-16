import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login";

const Routing = () => {
    return (<Router>
            <Switch>
                    <Route path="/" component={Login} />
            </Switch>
    </Router>)
};

export default Routing;
