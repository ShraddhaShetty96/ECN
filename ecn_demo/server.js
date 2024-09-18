const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (for POST/DELETE requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the HTML file for the UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Error handling function
function handleError(res, err, message = "An error occurred") {
    console.error(err);  // Log the error for debugging
    res.status(500).json({ error: message });
}

// GET Route - Retrieve some info (simulation)
app.get('/list-nodes', (req, res) => {
    const options = {
        "method": "GET",
        "hostname": "api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com",
        "port": null,
        "path": "/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes",
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIlM3RmVKTWp1bGt2cUpFODBSSng1UTB2cVg0R1hjUjZzL3B1d2gyeEhSejA9In0.eyJqdGkiOiJjMGVmMjliZjRhYjI0MTk0YmU3N2NlZjY3ZjcyYTI3ZSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI2NjQ4MTMxLCJleHAiOjE3MjY2OTEzMzEsImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.Js6WsHdao5K_ymwreZs1khOM3Q6IS0dvXvNMmxYz_h-rHt_2vLovFSI-gsLDKIGus8oF5kBIpK7xkDszZCmC9kHPf_RqSZdD1k0vktxHgUM_3QU1F7HKco3vuNmmuJDq7zoPwU6fUCspUXHhdaIzpic95XQmt0D4q5lZKk1rc6rS9ZWUgVR_6zffJzbu1udmBSHEpwRUooSkbIU6pfqK-umdRkP3pAcEm1iuHRgtypSUXsfrNE0ugJlzqBPCz77-rw3nxz_aljYAKJLWcga5dZZS7PvvrcNlo-XFeEofv6XM92hC-dtkf4yDm8UlFWsu0FWVQ9wmwn0JYU3kkXmo4w"
        }
    };

    const apiRequest = https.request(options, (apiResponse) => {
        const chunks = [];

        apiResponse.on('data', (chunk) => chunks.push(chunk));

        apiResponse.on('end', () => {
            try {
                const body = Buffer.concat(chunks).toString();
                console.log(body);
                res.send(`GET API Response: ${body}`);
            } catch (err) {
                handleError(res, err, "Failed to process GET API response");
            }
        });
    });

    apiRequest.on('error', (err) => {
        handleError(res, err, "Failed to connect to GET API");
    });

    apiRequest.end();
});

// POST Route - Trigger the external API (create/modify a resource)
app.post('/start-compute', (req, res) => {
    const options = {
        "method": "POST",
        "hostname": "api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com",
        "port": null,
        "path": "/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes",
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIlM3RmVKTWp1bGt2cUpFODBSSng1UTB2cVg0R1hjUjZzL3B1d2gyeEhSejA9In0.eyJqdGkiOiJjMGVmMjliZjRhYjI0MTk0YmU3N2NlZjY3ZjcyYTI3ZSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI2NjQ4MTMxLCJleHAiOjE3MjY2OTEzMzEsImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.Js6WsHdao5K_ymwreZs1khOM3Q6IS0dvXvNMmxYz_h-rHt_2vLovFSI-gsLDKIGus8oF5kBIpK7xkDszZCmC9kHPf_RqSZdD1k0vktxHgUM_3QU1F7HKco3vuNmmuJDq7zoPwU6fUCspUXHhdaIzpic95XQmt0D4q5lZKk1rc6rS9ZWUgVR_6zffJzbu1udmBSHEpwRUooSkbIU6pfqK-umdRkP3pAcEm1iuHRgtypSUXsfrNE0ugJlzqBPCz77-rw3nxz_aljYAKJLWcga5dZZS7PvvrcNlo-XFeEofv6XM92hC-dtkf4yDm8UlFWsu0FWVQ9wmwn0JYU3kkXmo4w",
            "Content-Length": "109"
        }
    };

    const apiRequest = https.request(options, (apiResponse) => {
        const chunks = [];

        apiResponse.on('data', (chunk) => chunks.push(chunk));

        apiResponse.on('end', () => {
            try {
                const body = Buffer.concat(chunks).toString();
                console.log(body);
                res.send(`POST API Response: ${body}`);
            } catch (err) {
                handleError(res, err, "Failed to process POST API response");
            }
        });
    });

    apiRequest.on('error', (err) => {
        handleError(res, err, "Failed to connect to POST API");
    });

    // Catch potential errors while writing the request body
    try {
        apiRequest.write("{\n  \"name\": \"compute03\",\n  \"plan\": {\n    \"vCPUs\": 2,\n    \"memorySizeGiB\": 30,\n    \"storageSizeGiB\": 120\n  }\n}");
    } catch (err) {
        handleError(res, err, "Failed to send POST request body");
    }

    apiRequest.end();
});

// DELETE Route - Delete a resource
app.delete('/stop-computes', (req, res) => {
    const options = {
        "method": "DELETE", 
        "hostname": "api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com",
        "port": null,
        "path": "/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes/compute03", // Example node ID
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIlM3RmVKTWp1bGt2cUpFODBSSng1UTB2cVg0R1hjUjZzL3B1d2gyeEhSejA9In0.eyJqdGkiOiJjMGVmMjliZjRhYjI0MTk0YmU3N2NlZjY3ZjcyYTI3ZSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI2NjQ4MTMxLCJleHAiOjE3MjY2OTEzMzEsImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.Js6WsHdao5K_ymwreZs1khOM3Q6IS0dvXvNMmxYz_h-rHt_2vLovFSI-gsLDKIGus8oF5kBIpK7xkDszZCmC9kHPf_RqSZdD1k0vktxHgUM_3QU1F7HKco3vuNmmuJDq7zoPwU6fUCspUXHhdaIzpic95XQmt0D4q5lZKk1rc6rS9ZWUgVR_6zffJzbu1udmBSHEpwRUooSkbIU6pfqK-umdRkP3pAcEm1iuHRgtypSUXsfrNE0ugJlzqBPCz77-rw3nxz_aljYAKJLWcga5dZZS7PvvrcNlo-XFeEofv6XM92hC-dtkf4yDm8UlFWsu0FWVQ9wmwn0JYU3kkXmo4w"
        }
    };

    const apiRequest = https.request(options, (apiResponse) => {
        const chunks = [];

        apiResponse.on('data', (chunk) => chunks.push(chunk));

        apiResponse.on('end', () => {
            try {
                const body = Buffer.concat(chunks).toString();
                console.log(body);
                res.send(`DELETE API Response: ${body}`);
            } catch (err) {
                handleError(res, err, "Failed to process DELETE API response");
            }
        });
    });

    apiRequest.on('error', (err) => {
        handleError(res, err, "Failed to connect to DELETE API");
    });

    apiRequest.end();
});

// Global error handler for any unhandled routes or methods
app.use((req, res, next) => {
    res.status(404).send({ error: "Route not found" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
