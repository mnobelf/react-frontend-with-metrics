async function pullMetrics() {
    try {
        const response = await fetch('http://localhost:9091/api/v1/metrics', {
            method: 'GET',
            mode: 'no-cors',
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

export default pullMetrics;