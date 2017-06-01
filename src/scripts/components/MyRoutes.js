import React from 'react';
import ReactDOM from 'react-dom';
import URL from 'url';

import { BrowserRouter as Router, Route } from 'react-router-dom';

//custom
import Login from "./Login";
import Main from "./Main";

const IndexRouteConfig = () => (
    <Router>
        <div style={{ height: '100%' }}>
            <Route exact path={URL.resolve(global._currentPath, "/")} component={Login} />
            <Route path={URL.resolve(global._currentPath, "/main")} component={Main} />
        </div>
    </Router >
)
//     <Route exact path={global._currentPath} component={Login} />
//   <Route path='main' component={Main} />
export default { IndexRouteConfig };