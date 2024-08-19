const servers = [
    { ip: '20.ip.gl.ply.gg', port: 41633, statusElementId: 'serverStatusEmberHills', buttonElementId: 'copyButtonEmberHills', serverIpId: 'serverIpEmberHills' },
    { ip: '22.ip.gl.ply.gg', port: 11525, statusElementId: 'serverStatusRogueRiot', buttonElementId: 'copyButtonRogueRiot', serverIpId: 'serverIpRogueRiot' },
    { ip: '20.ip.gl.ply.gg', port: 41633, statusElementId: 'serverStatusSylvanCanyon', buttonElementId: 'copyButtonSylvanCanyon', serverIpId: 'serverIpSylvanCanyon' },
];

async function updateServerStatus({ ip, port, statusElementId, buttonElementId, serverIpId }) {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const statusElement = document.getElementById(statusElementId);
        const statusButton = document.getElementById(buttonElementId);

        if (data.online) {
            statusElement.innerHTML = `<span class="minecraft-text" style="color: #7BFF81;">Server Status: Online</span><br><p class="players-online minecraft-text">Players Online: ${data.players.online}/${data.players.max}</span>`;
            statusButton.classList.remove('red');
            statusButton.classList.add('green');
        } else {
            statusElement.innerHTML = `<span class="minecraft-text" style="color: #FF8F7F;>Server Status: Offline</span>`;
            statusButton.classList.remove('green');
            statusButton.classList.add('red');
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        const statusElement = document.getElementById(statusElementId);
        statusElement.innerHTML = `<span class="minecraft-text">Server Status: Offline</span>`;
        const statusButton = document.getElementById(buttonElementId);
        statusButton.classList.remove('green');
        statusButton.classList.add('red');
    }
}

function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(copyText).then(() => {
        alert('Copied to clipboard: ' + copyText);
    });
}

servers.forEach(updateServerStatus);

document.getElementById('copyButtonEmberHills').addEventListener('click', () => copyToClipboard('serverIpEmberHills'));
document.getElementById('copyButtonRogueRiot').addEventListener('click', () => copyToClipboard('serverIpRogueRiot'));
document.getElementById('copyButtonSylvanCanyon').addEventListener('click', () => copyToClipboard('serverIpSylvanCanyon'));
