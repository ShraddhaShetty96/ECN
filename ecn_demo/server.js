import express from 'express';
import fetch from 'node-fetch';
import https from 'https';
import path from 'path';
import {
    fileURLToPath
} from 'url';
/* const express = require('express');
const https = require('https');
const fetch = require('node-fetch'); */
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (for POST/DELETE requests)
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Serve the HTML file for the UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Error handling function
function handleError(res, err, message = "An error occurred") {
    console.error(err); // Log the error for debugging
    res.status(500).json({
        error: message
    });
}

app.get('/list-nodes', async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);

    // Send a POST request to an external API
    try {
        const response = await fetch('https://api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes', {
            method: "GET",
            port: null,
            headers: {
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIi9jRjRWNHVXT01iV2NHaHNmck1XL3hPb3dJRXNvLzVrelZGMHl0T1h4eE09In0.eyJqdGkiOiJiOGRmZGFmZWQ2MWU0OGI1YWI2MmJkOGNkN2UwMDc4ZCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI3MDg5NTM5LCJleHAiOjE3MjcxMzI3MzksImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.aH_nIG-r15fUnS9u_zaAzFsb3AXB8Qf0oMsnAHVqoo-mYYtJD56bkeeImvxZme64o9Bw_Z0Qsu0MKvqLnA1MoJobrqMewdgSdEQlhX4QabT_fQQmFxRbodi8O83XxGah07HPWPy3a7V9WsGer0iTvIalv-SP-LlUrUBCOCnzKPIDMPqNLQ4XurNOG8fCmTXRVz19tM6dHZLE7Dc1bjokW_ojHMyT_OGOxtopOWte2H4Wz3s_JTmCyfbMTzqeILnL6tO6aHw9KQO6hT6ACGJXAgwxrWttilXUuiBHwMJ_sgLaOLeQq_kJt0B4JPZaNMWzAlKUmzzP_3YhAo2tSWn0bg"
            },
        });


        var result;
        if (!response.ok) {
            result = await response.json();
            console.log(result);
            throw new Error(result.error.message);
        } else {
            result = await response.json();
            res.status(200).json({
                status: 'success',
                message: 'Compute Nodes Retrieved',
                result  : result
            });
        }

        console.log(result)

        // Send the result of the external request back to the client
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


// GET Route - Retrieve some info (simulation)
/* app.get('/list-nodes', (req, res) => {
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
}); */

// POST Route - Trigger the external API (create/modify a resource)
app.post('/start-compute', async (req, res) => {
    const data = req.body;
    const compute = {
        "name": "compute01",
        "plan": {
            "vCPUs": 2,
            "memorySizeGiB": 30,
            "storageSizeGiB": 120
        }
    }
    //const write = req.write("{\n  \"name\": \"compute01\",\n  \"plan\": {\n    \"vCPUs\": 2,\n    \"memorySizeGiB\": 30,\n    \"storageSizeGiB\": 120\n  }\n}");
    console.log('Received data:', data);

    // Send a POST request to an external API
    try {
        const response = await fetch('https://api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes', {
            method: "POST",
            port: null,
            headers: {
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIi9jRjRWNHVXT01iV2NHaHNmck1XL3hPb3dJRXNvLzVrelZGMHl0T1h4eE09In0.eyJqdGkiOiJiOGRmZGFmZWQ2MWU0OGI1YWI2MmJkOGNkN2UwMDc4ZCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI3MDg5NTM5LCJleHAiOjE3MjcxMzI3MzksImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.aH_nIG-r15fUnS9u_zaAzFsb3AXB8Qf0oMsnAHVqoo-mYYtJD56bkeeImvxZme64o9Bw_Z0Qsu0MKvqLnA1MoJobrqMewdgSdEQlhX4QabT_fQQmFxRbodi8O83XxGah07HPWPy3a7V9WsGer0iTvIalv-SP-LlUrUBCOCnzKPIDMPqNLQ4XurNOG8fCmTXRVz19tM6dHZLE7Dc1bjokW_ojHMyT_OGOxtopOWte2H4Wz3s_JTmCyfbMTzqeILnL6tO6aHw9KQO6hT6ACGJXAgwxrWttilXUuiBHwMJ_sgLaOLeQq_kJt0B4JPZaNMWzAlKUmzzP_3YhAo2tSWn0bg"
            },
            body: JSON.stringify(compute)
        });


        var result;
        if (!response.ok) {
            result = await response.json();
            console.log(result);
            if (result.error.code == 'NODE_ALREADY_EXIST') {
                throw new Error(result.error.message);
            }
        } else {
            result = {};
            res.status(200).json({
                status: 'success',
                message: compute.name + ' has been provisioned successfully'
            });
        }

        console.log(result)

        // Send the result of the external request back to the client
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Catch potential errors while writing the request body
/*     try {
        apiRequest.write("{\n  \"name\": \"compute04\",\n  \"plan\": {\n    \"vCPUs\": 2,\n    \"memorySizeGiB\": 30,\n    \"storageSizeGiB\": 120\n  }\n}");
    } catch (err) {
        handleError(res, err, "Failed to send POST request body");
    } */


app.post('/stop-computes', async (req, res) => {
    const data = req.body;
    const compute = req.body.compute
    console.log('Received data:', data);

    // Send a POST request to an external API
    try {
        const response = await fetch('https://api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes/' + compute, {
            method: "DELETE",
            port: null,
            headers: {
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIi9jRjRWNHVXT01iV2NHaHNmck1XL3hPb3dJRXNvLzVrelZGMHl0T1h4eE09In0.eyJqdGkiOiJiOGRmZGFmZWQ2MWU0OGI1YWI2MmJkOGNkN2UwMDc4ZCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI3MDg5NTM5LCJleHAiOjE3MjcxMzI3MzksImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.aH_nIG-r15fUnS9u_zaAzFsb3AXB8Qf0oMsnAHVqoo-mYYtJD56bkeeImvxZme64o9Bw_Z0Qsu0MKvqLnA1MoJobrqMewdgSdEQlhX4QabT_fQQmFxRbodi8O83XxGah07HPWPy3a7V9WsGer0iTvIalv-SP-LlUrUBCOCnzKPIDMPqNLQ4XurNOG8fCmTXRVz19tM6dHZLE7Dc1bjokW_ojHMyT_OGOxtopOWte2H4Wz3s_JTmCyfbMTzqeILnL6tO6aHw9KQO6hT6ACGJXAgwxrWttilXUuiBHwMJ_sgLaOLeQq_kJt0B4JPZaNMWzAlKUmzzP_3YhAo2tSWn0bg"
            }
        });

        var result;
        if (!response.ok) {
            result = await response.json();
            console.log(result);
            if (result.error.code == 'NODE_NOT_FOUND') {
                throw new Error(result.error.message);
            } else if (result.error.code == 'OPERATION_IN_PROGRESS') {
                throw new Error(result.error.message);
            }
        } else {
            result = {};
            res.status(200).json({
                status: 'success',
                message: compute + ' has been deleted successfully'
            });
        }

        console.log(result)

        // Send the result of the external request back to the client
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});
/* // DELETE Route - Delete a resource
app.post('/stop-computes', (req, res) => {
    const compute = req.body.compute
    const options = {
        "method": "DELETE",
        "hostname": "api.gateway.orchestration.canary-eu10.hanacloud.ondemand.com",
        "port": null,
        "path": "/compute/v1/serviceInstances/4a48479f-2f4b-4e62-9a1d-3bffba887c9b/nodes/" + compute, // Example node ID
        "headers": {
            "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vdG9rZW5fa2V5cyIsImtpZCI6ImRlZmF1bHQtand0LWtleS0zZDdjZTkzOWU2IiwidHlwIjoiSldUIiwiamlkIjogIjJNUHNRamVYb04vYTh5WHVYeG5vVCszWDRIV2hkMS9BVUp4UEZVVWkzQUE9In0.eyJqdGkiOiJhNTY1NDJiMGQyYjU0MzBmODcxOTdiNzM0MTA3MmEwZCIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJ6ZG4iOiJoYW5hLWNsb3VkLWRiLWU1bjM0aWdkIiwic2VydmljZWluc3RhbmNlaWQiOiI0YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWIifSwic3ViIjoic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4IiwiYXV0aG9yaXRpZXMiOlsidWFhLnJlc291cmNlIl0sInNjb3BlIjpbInVhYS5yZXNvdXJjZSJdLCJjbGllbnRfaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJjaWQiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJhenAiOiJzYi00YTQ4NDc5Zi0yZjRiLTRlNjItOWExZC0zYmZmYmE4ODdjOWItMjExZiFiMTE3NDU0fGhjLWNhbmFyeS1hcGlnYXRld2F5LWhhbmEtY2xvdWQhYjkxNDgiLCJncmFudF90eXBlIjoiY2xpZW50X2NyZWRlbnRpYWxzIiwicmV2X3NpZyI6ImU2NjQ3ZTdlIiwiaWF0IjoxNzI2NzMxMzc5LCJleHAiOjE3MjY3NzQ1NzksImlzcyI6Imh0dHBzOi8vaGFuYS1jbG91ZC1kYi1lNW4zNGlnZC5hdXRoZW50aWNhdGlvbi5zYXAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiIyMTFmYzBlOC1iZTgwLTQ0NzktOTZjZS1jNWY2MTI5ZTYwYTMiLCJhdWQiOlsidWFhIiwic2ItNGE0ODQ3OWYtMmY0Yi00ZTYyLTlhMWQtM2JmZmJhODg3YzliLTIxMWYhYjExNzQ1NHxoYy1jYW5hcnktYXBpZ2F0ZXdheS1oYW5hLWNsb3VkIWI5MTQ4Il19.Ald_GJJBdv99JbJYin1uC7nY1UHEhIjxmAONmgvjiudQJvIMdT5swBax0cETEx_Ni2eF56QyaHs9Bj9ynO1Bsvy6sNo5feWgUtkXmkIgRW99uRd3ML3ZUJnEms8KtPkGRLvyNp76UAMq3CJm3qbOBQ2wvLqf44RddF3AN1ssKEY2KQjLVvrXKlhNggRDWM5mugUsU2_xquybo-zN14ZBVSUKJJ_ZN1HxhseCwm3S2a7tNVTQyleDWcUE3WSGY2uJF_JPCIbyh-cthKvGGYzdHGQaGVqq-9ZmSiSSZ5KeEglw_mQXT9c6IBZXRnr4Bf08TV1RaZhswA_6jVUj8iOv2g"
        }
    };

    const apiRequest = https.request(options, (apiResponse) => {
        const chunks = [];

        apiResponse.on('data', (chunk) => chunks.push(chunk));

        apiResponse.on('end', () => {
            try {
                const body = Buffer.concat(chunks).toString();
                console.log(body);
                if (body == "")
                    res.send(`DELETE API Response: ` + compute + " has been deleted");
            } catch (err) {
                console.log("hello");
                handleError(res, err, "Failed to process DELETE API response");
            }
        });
    });

    apiRequest.on('error', (err) => {
        handleError(res, err, "Failed to connect to DELETE API");
    });

    apiRequest.end();
});
 */
// Global error handler for any unhandled routes or methods
app.use((req, res, next) => {
    res.status(404).send({
        error: "Route not found"
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});