import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import StudentHome from "./StudentHome";

const Routing = () => {
    return (<Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/studentHome" component={StudentHome} />
                <Route path="/" component={Login} />
            </Switch>
    </Router>)
};

export default Routing;
