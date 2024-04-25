import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'boxicons';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {StyleProvider} from "@ant-design/cssinjs";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <StyleProvider hashPriority="high">
            <App id={1}/>
        </StyleProvider>
    </BrowserRouter>
);

reportWebVitals();
