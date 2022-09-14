import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// METRICS
import prom from 'promjs';
import sendMetrics from './SendMetrics';
import { getFCP, getTTFB } from 'web-vitals';
import { reportHandlerFCP, reportHandlerTTFB } from './ReportHandler';

getFCP(console.log);
getTTFB(console.log);

export const registry = prom();

//counter test
const appStartCount = registry.create('counter', 'app_start', 'app start');
appStartCount.inc();
console.log(sendMetrics(registry.metrics()));
//-----

export const FCP = registry.create('histogram', 'FCP', 'FCP', [
    500,
    700,
    900,
    1100
]);
getFCP(reportHandlerFCP);
export const TTFB = registry.create('histogram', 'TTFB', 'TTFB', [
    500,
    700,
    900,
    1100
]);
getTTFB(reportHandlerTTFB);
//METRICS

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>);

console.log(window.performance);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
