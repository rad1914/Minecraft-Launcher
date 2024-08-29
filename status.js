const servers = [
    { name: 'EmberHills', ip: '20.ip.gl.ply.gg', port: 41633, statusId: 'serverStatusEmberHills', serverIpId: 'serverIpEmberHills', statusButtonId: 'copyButtonEmberHills' },
    { name: 'RogueRiot', ip: '22.ip.gl.ply.gg', port: 20927, statusId: 'serverStatusRogueRiot', serverIpId: 'serverIpRogueRiot', statusButtonId: 'copyButtonRogueRiot' },
    { name: 'SylvanCanyon', ip: '20.ip.gl.ply.gg', port: 41633, statusId: 'serverStatusSylvanCanyon', serverIpId: 'serverIpSylvanCanyon', statusButtonId: 'copyButtonSylvanCanyon' },
    { name: '𐌊𐌀𐌋𐌙𐌁𐌵ɽ𐌍 Bot', ip: '20.ip.gl.ply.gg', port: 41633, statusId: 'serverStatusWhatsAppBot', serverIpId: 'serverIpWhatsAppBot' }
];

async function updateServerStatus(server) {
    const { ip, port, statusId, serverIpId, statusButtonId } = server;
    const statusElement = document.getElementById(statusId);
    const statusButton = document.getElementById(statusButtonId);

    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();

        if (data.online) {
            statusElement.innerHTML = `<span class="minecraft-text" style="color: #8FF57F;">Server Status: Online</span>`;
        } else {
            statusElement.innerHTML = `<span class="minecraft-text" style="color: #FF8F7F;">Server Status: Offline</span>`;
        }

        if (statusButton) {
            statusButton.addEventListener('click', function () {
                const serverIpElement = document.getElementById(serverIpId);
                const serverIp = serverIpElement ? serverIpElement.textContent : '';
                navigator.clipboard.writeText(serverIp).then(() => {
                    alert(`IP Copiada: ${serverIp}`);
                }).catch(err => {
                    console.error('Error copying IP:', err);
                });
            });
        }

    } catch (error) {
        console.error('Error fetching server status:', error);
    }
}

servers.forEach(updateServerStatus);
