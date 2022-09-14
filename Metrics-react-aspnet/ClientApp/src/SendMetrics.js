async function sendMetrics(metrics: any) {
    try {
        const response = await fetch('http://localhost:9091/metrics', {
            method: 'POST',
            mode: 'no-cors',
            body: metrics,
        });

        const result = await response.json();

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export default sendMetrics;