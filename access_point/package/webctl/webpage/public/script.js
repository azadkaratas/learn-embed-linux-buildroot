document.addEventListener('DOMContentLoaded', function () {
    const contentArea = document.getElementById('content-area');

    document.getElementById('configLink').addEventListener('click', function (event) {
        event.preventDefault();
        loadConfigPage();
    });

    loadConfigPage();

    function loadConfigPage() {
        contentArea.innerHTML = `
            <h2>Device Configuration</h2>
            <form id="configForm" class="mt-4">
                <div class="form-group">
                    <label for="deviceName">Device Name:</label>
                    <input type="text" id="deviceName" name="deviceName" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="ipAddress">IP Address:</label>
                    <input type="text" id="ipAddress" name="ipAddress" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="port">Port:</label>
                    <input type="number" id="port" name="port" class="form-control">
                </div>
                <div class="form-group mt-3">
                    <label for="status">Status:</label>
                    <select id="status" name="status" class="form-select">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Save Configuration</button>
            </form>
            <div id="message" class="message mt-3"></div>
        `;

        fetch('/api/config')
            .then(response => response.json())
            .then(data => {
                document.getElementById('deviceName').value = data.deviceName;
                document.getElementById('ipAddress').value = data.ipAddress;
                document.getElementById('port').value = data.port;
                document.getElementById('status').value = data.status;
            })
            .catch(error => console.error('Error fetching configuration:', error));

        document.getElementById('configForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const configData = {
                deviceName: document.getElementById('deviceName').value,
                ipAddress: document.getElementById('ipAddress').value,
                port: document.getElementById('port').value,
                status: document.getElementById('status').value
            };

            fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(configData)
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('message').textContent = data.message;
                setTimeout(() => { document.getElementById('message').textContent = ''; }, 3000);
            })
            .catch(error => console.error('Error updating configuration:', error));
        });
    }
});
