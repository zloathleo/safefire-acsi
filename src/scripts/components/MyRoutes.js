import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

//custom
import Login from "./Login";
import Main from "./Main";  

const IndexRouteConfig = () => (
    <Router>
        <div style={{ height: '100%' }}>
            <Route exact path={global._currentPath} component={Login} />
            <Route path={global._currentPath + 'main'} component={Main} />
        </div>
    </Router >
)

export default { IndexRouteConfig };