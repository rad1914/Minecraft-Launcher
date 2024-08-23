const servers = [
    { name: 'EmberHills', ip: '20.ip.gl.ply.gg', port: 41633, statusId: 'serverStatusEmberHills' },
    { name: 'RogueRiot', ip: '22.ip.gl.ply.gg', port: 11525, statusId: 'serverStatusRogueRiot' },
    { name: 'SylvanCanyon', ip: '20.ip.gl.ply.gg', port: 41633, statusId: 'serverStatusSylvanCanyon' },
    { name: 'WhatsAppBot', ip: '20.ip.gl.ply.gg', port: 41633, statusId: 'serverStatusWhatsAppBot' }
];

function decodeMOTD(motd) {
    // Decode the MOTD from potentially malformed encoding
    return motd.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/\"/g, '&quot;')
               .replace(/\'/g, '&#39;')
               .replace(/§./g, ''); // Remove color codes (if any)
}

async function updateDetailedServerStatus(server) {
    const { ip, port, statusId, name } = server;
    const statusElement = document.getElementById(statusId);

    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();

        if (data.online) {
            if (name === 'SylvanCanyon') {
                statusElement.innerHTML = `
                    <span style="color: #8FF57F;">Online</span><br>
                    Version: 1.4.4.9<br>
                    Players: ${data.players.online}/99<br>
                    MOTD: ${decodeMOTD('Sylvan Canyon Server')}<br>
                    Hostname: ${ip}<br>
                    Software: Terraria
                `;
            } else if (name === 'WhatsAppBot') {
                statusElement.innerHTML = `<span style="color: #8FF57F;">Online</span>`;
            } else {
                statusElement.innerHTML = `
                    <span style="color: #8FF57F;">Online</span><br>
                    Version: ${data.version}<br>
                    Players: ${data.players.online}/${data.players.max}<br>
                    MOTD: ${decodeMOTD(data.motd.clean.join(' '))}<br>
                    Hostname: ${data.hostname}<br>
                    Software: ${data.software}<br>
                `;
            }
        } else {
            statusElement.innerHTML = `<span style="color: #FF8F7F;">Offline</span>`;
        }
    } catch (error) {
        console.error('Error fetching server status:', error);
        statusElement.innerHTML = `<span style="color: #FF8F7F;">Error</span>`;
    }
}

servers.forEach(updateDetailedServerStatus);
