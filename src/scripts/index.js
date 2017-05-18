import React from 'react';
import ReactDOM from 'react-dom'; 

import URL from 'url';

import MyRoutes from './components/MyRoutes';
 
global._currentPath = '/';
global._currentPath = URL.parse(document.URL).path;  
console.log('_currentPath:' + global._currentPath);

ReactDOM.render(
    <MyRoutes.IndexRouteConfig />,
    document.getElementById('root')
    
);