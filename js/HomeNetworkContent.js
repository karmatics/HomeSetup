class HomeNetworkContent {
  static getMeta() {
    return {
      kicker: 'Networking & Protocols',
      title: '1. Local Network & Connection Mesh',
      subtitle: 'How machines communicate over the wire: LAN discovery, SSH tunneling, WebRTC data channels, and HTTP APIs.'
    };
  }

  static manifest() {
      return [
        {
          section: 'mesh_architecture',
          partLabel: 'Chapter 1 • Wire Protocols',
          title: 'Communication Channels & Wire Topology',
          blocks: [
            { id: 'p_net_mesh_1', type: 'p' },
            { id: 'p_net_mesh_2', type: 'p' },
            { id: 'sidebar_network_ports', type: 'sidebar', kicker: 'Ports & Protocols', title: 'Local Network Service Directory' }
          ]
        },
        {
          section: 'mac_recon_protocol',
          partLabel: 'Chapter 1 • Reconnaissance',
          title: 'Mac Reconnaissance & Git Repository Discovery',
          blocks: [
            { id: 'p_net_recon_1', type: 'p' },
            { id: 'p_net_recon_2', type: 'p' },
            { id: 'sidebar_recon_checklist', type: 'sidebar', kicker: 'Recon Execution', title: 'Mac Git & Directory Audit Checklist' }
          ]
        },
        {
          section: 'remote_access',
          partLabel: 'Chapter 1 • Access',
          title: 'SSH & Remote Command Dispatch',
          blocks: [
            { id: 'p_net_ssh_1', type: 'p' },
            { id: 'p_net_webrtc_1', type: 'p' },
            { id: 'sidebar_ssh_mesh', type: 'sidebar', kicker: 'SSH Architecture', title: 'Key-Based Cross-Node Dispatch' }
          ]
        }
      ];
    }

  static p_net_mesh_1() {
      return [
        "All devices reside on the same 10.0.0.x subnet, communicating through native Luno services:",
        "1. **Ubuntu Host (10.0.0.245 on Port 3000):** Hosts the primary active Luno server (`/root/source/LunoProjects/Luno/server.js`), task runner queue, and this living document.",
        "2. **Mac Workstation (10.0.0.226 on Port 8080):** Confirmed running Luno v3.8.0. Port 22 (SSH) is closed, establishing that **HTTP on port 8080 is our exclusive, authenticated communication wire**.",
        "3. **Native Luno Federation:** Because both the Ubuntu laptop and the Mac run Luno servers, cross-machine automation operates via direct HTTP requests. Projects on the Mac are queried directly at `http://10.0.0.226:8080/<ProjectName>/luno.json`, and actions can be triggered across machines without terminal passwords."
      ];
    }
  static p_net_mesh_2() {
    return [
      "Because every machine has a known LAN hostname or static IP reservation on your local router, automation scripts can ping, check service availability, or push data buffers between endpoints deterministically."
    ];
  }

  static sidebar_network_ports() {
      return [
        "Local Fleet Network Port Directory:\n" +
        "• 10.0.0.245:3000: Ubuntu Laptop (Active Luno Host, Bedroom)\n" +
        "• 10.0.0.226:8080: Mac Workstation (Verified Luno v3.8.0 Peer, Living Room)\n" +
        "• 10.0.0.226:22: Closed (Remote Login disabled on Mac; HTTP 8080 is primary)\n" +
        "• Port 3001: WebRTC P2P Signaling Server (signal-server.js)\n" +
        "• Subnet: 10.0.0.0/24 (Gateway: 10.0.0.1)\n" +
        "• Project Endpoints: `http://10.0.0.226:8080/<Project>/luno.json`"
      ];
    }
  static p_net_ssh_1() {
    return [
      "**Key-Based SSH Connectivity:** Between the Linux host, Mac, and Windows machine, passwordless public-key authentication is configured using Ed25519 or RSA keys. This allows Node.js runner scripts on the Linux box to execute remote commands seamlessly—such as telling the Mac to run a build or telling Windows to verify an executable—without manual password prompts."
    ];
  }

  static p_net_webrtc_1() {
    return [
      "**Mobile Pairing (Phones):** The two phones connect without installation by opening the browser to the local Luno server. Scanning a dynamic QR code pairs the phone's WebRTC channel to the active desktop session, turning the smartphone into a low-latency touch controller or telemetry HUD."
    ];
  }

  static sidebar_ssh_mesh() {
    return [
      "SSH Configuration Best Practices:\n" +
      "• ~/.ssh/config defines friendly aliases (e.g. `Host macbook`, `Host win-box`).\n" +
      "• Identity files point to local keys (`~/.ssh/id_ed25519`).\n" +
      "• No passwords ever passed to LLM prompts: automation uses `ssh -i <path> <user>@<host>`."
    ];
  }

  static p_net_recon_1() {
    return [
      "**The Active Mac Reconnaissance Protocol:** To bridge the repository and Git gap between the Linux laptop and the Mac workstation, we executed a bidirectional cross-wire audit.",
      "The live scan verified:",
      "1. **Mac Workstation Verified Online:** Reached at `10.0.0.226:8080` running Luno v3.8.0 on Darwin ARM64.",
      "2. **44+ Projects Cataloged on Mac:** All checked out at `/Users/rob/source/LunoProjects/`, with 36 active Git repositories tracking `origin` on GitHub (`git@github.com:karmatics/<repo>.git`).",
      "3. **Zero-Password Remote Script Execution:** Confirmed active via `POST /api/save?project=Luno`, allowing programmatic remote tasks without terminal SSH prompts.",
      "4. **HomeSetup Initialized on Linux:** `HomeSetup` was born on the Ubuntu laptop and has now been initialized as a clean Git repository tracking `git@github.com:karmatics/HomeSetup.git`."
    ];
  }
  static p_net_recon_2() {
      return [
        "**Luno-to-Luno Federation Confirmed:** Our cross-wire dispatch confirmed that the Ubuntu laptop communicates directly with the Mac's Luno server at `http://10.0.0.226:8080/api/save?project=Luno`.",
        "The server script executed natively inside Node.js on the Mac (`darwin`, user `rob`, homedir `/Users/rob`), verifying that we have zero-password remote execution across the local network.",
        "This enables automated Git reconciliation, remote file audits, and cross-machine synchronization without touching command-line SSH."
      ];
    }

  static sidebar_recon_checklist() {
    return [
      "Live Cross-Machine Recon Checklist:\n" +
      "• 1. Host Address: 10.0.0.226 on Port 8080 (Luno v3.8.0 Peer verified)\n" +
      "• 2. Remote Script Execution: Confirmed operational via POST /api/save\n" +
      "• 3. Mac Profile: User `rob`, Darwin ARM64, ScreenFlow installed\n" +
      "• 4. Linux Profile: Ubuntu Host (10.0.0.245:3000), Linux 7.0.0, Node.js\n" +
      "• 5. HomeSetup Git: Initialized on Linux, remote set to git@github.com:karmatics/HomeSetup.git\n" +
      "• 6. State Persistence: Full parity matrix saved to HomeSetup/state/recon_report.json"
    ];
  }
}

globalThis.HomeNetworkContent = HomeNetworkContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeNetworkContent;