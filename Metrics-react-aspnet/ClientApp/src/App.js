import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

//METRICS LIB and API
import prom from 'promjs';
import sendMetrics from './SendMetrics';
import { getFCP, getTTFB } from 'web-vitals';
import { reportHandlerFCP, reportHandlerTTFB } from './ReportHandler';
import ttiPolyfill from 'tti-polyfill';
//

if ('PerformanceLongTaskTiming' in window) {
    var g = window.__tti = { e: [] };
    g.o = new PerformanceObserver(function (l) { g.e = g.e.concat(l.getEntries()) });
    g.o.observe({ entryTypes: ['longtask'] })
}

// METRICS

getFCP(console.log);
getTTFB(console.log);

export const registry = prom();

//counter test
const appStartCount = registry.create('counter', 'app_start', 'app start');
appStartCount.inc();
console.log(sendMetrics(registry.metrics()));
//-----

export const FCP = registry.create('histogram', 'react-metrics-FCP', 'FCP', [
    500,
    700,
    900,
    1100
]);
getFCP(reportHandlerFCP);

export const TTFB = registry.create('histogram', 'react-metrics-TTFB', 'TTFB', [
    500,
    700,
    900,
    1100
]);
getTTFB(reportHandlerTTFB);

const loadTimeMetrics = registry.create('histogram', 'react-metrics-load-time', 'load time', [
    500,
    700,
    900,
    1100
]);
const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
loadTimeMetrics.observe(loadTime);

const domainLookupMetrics = registry.create('histogram', 'react-metrics-domain-lookup', 'domain lookup', [
    500,
    700,
    900,
    1100
]);
const domainLookup = window.performance.timing.domainLookupEnd - window.performance.timing.domainLookupStart;
domainLookupMetrics.observe(domainLookup);

const TTIMetrics = registry.create('histogram', 'react-metrics-TTI', 'TTI', [
    500,
    700,
    900,
    1100
]);
const TTI = ttiPolyfill.getFirstConsistentlyInteractive();
TTIMetrics.observe(TTI);

console.log(window.performance);
sendMetrics(registry.metrics());


// METRICS (END)

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
}
