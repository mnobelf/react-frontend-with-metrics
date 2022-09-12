import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import prom from 'promjs';
import sendMetrics from './SendMetrics';
import { getFCP, getTTFB } from 'web-vitals';
import { reportHandlerFCP } from './ReportHandler';

getFCP(console.log);
getTTFB(console.log);

export const registry = prom();

//counter test
const appStartCount = registry.create('counter', 'app_start_count', 'counter for app start');

appStartCount.inc();
console.log(sendMetrics(registry.metrics()));
//-----

export const FCP = registry.create('gauge', 'FCP_gauge', 'gauge for FCP');
getFCP(reportHandlerFCP);

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
