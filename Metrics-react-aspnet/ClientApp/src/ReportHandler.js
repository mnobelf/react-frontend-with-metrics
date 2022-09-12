import sendMetrics from "./SendMetrics";
import { FCP, TTFB, registry } from './index';


function reportHandlerFCP(metric) {

    console.log(metric.value);
    FCP.set(metric.value);
    sendMetrics(registry.metrics());
}

function reportHandlerTTFB(metric) {

    console.log(metric.value);
    TTFB.set(metric.value);
    sendMetrics(registry.metrics());
}


export { reportHandlerFCP, reportHandlerTTFB };