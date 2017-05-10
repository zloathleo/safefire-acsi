import React from 'react';
import ReactDOM from 'react-dom'; 

import URL from 'url';

import MyRoutes from './components/MyRoutes';
 
global._currentPath = '/';
global._currentPath = URL.parse(document.URL).path;  

ReactDOM.render(
    <MyRoutes.IndexRouteConfig />,
    document.getElementById('root')
);