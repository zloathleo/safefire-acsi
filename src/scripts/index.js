import React from 'react';
import ReactDOM from 'react-dom'; 

import URL from 'url';
import QueryString from 'querystring';

import MyRoutes from './components/MyRoutes';
 
global._currentPath = '/';
let _url = URL.parse(document.URL);
global._currentPath = _url.pathname;  //只有path没有param
global._startParam = QueryString.parse(_url.query);  



console.log('_currentPath:' + global._currentPath); 
console.log('query:' + global._startParam);

ReactDOM.render(
    <MyRoutes.IndexRouteConfig />,
    document.getElementById('root') 
);