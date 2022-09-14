import sendMetrics from "./SendMetrics";
import { FCP, TTFB, registry } from './App';


function reportHandlerFCP(metric) {

    console.log(metric.value);
    FCP.observe(metric.value);
}

function reportHandlerTTFB(metric) {

    console.log(metric.value);
    TTFB.observe(metric.value);
}


export { reportHandlerFCP, reportHandlerTTFB };