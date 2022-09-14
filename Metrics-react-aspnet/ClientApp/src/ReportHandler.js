import sendMetrics from "./SendMetrics";
import { FCP, TTFB, registry } from './App';


function reportHandlerFCP(metric) {

    console.log(metric.value);
    FCP.observe(metric.value);
    sendMetrics(registry.metrics());
}

function reportHandlerTTFB(metric) {

    console.log(metric.value);
    TTFB.observe(metric.value);
    sendMetrics(registry.metrics());
}


export { reportHandlerFCP, reportHandlerTTFB };