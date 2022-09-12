import sendMetrics from "./SendMetrics";
import { FCP, registry } from './index';


function reportHandlerFCP(metric) {

    console.log(metric.value);
    FCP.set(metric.value);
    sendMetrics(registry.metrics());
}

export { reportHandlerFCP };