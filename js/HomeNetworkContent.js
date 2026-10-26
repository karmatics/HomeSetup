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
      "All devices communicate through native Luno services standardized exclusively on **Port 8080** over local LAN and authenticated Git protocols:",
      "1. **Mac Workstation (Port 8080):** Confirmed running Luno on Apple Silicon at `/Users/rob/source/LunoProjects/`. Both `HomeSetup` and all sibling projects are served live over HTTP, allowing zero-latency peer synchronization via `POST /api/save`.",
      "2. **Ubuntu Host (Port 8080):** Hosts the portable Luno development server (`/root/source/LunoProjects/Luno/server.js`), background task runner queue, and matching workspace files.",
      "3. **Dynamic LAN Subnet Discovery:** Machines do not assume static IP addresses. If a machine's IP rotates under router DHCP, Luno's subnet discovery scans the local `/24` subnet on Port 8080 to locate active peer nodes automatically."
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
      "• Port 8080: Universal Luno Workspace Standard (Ubuntu Laptop & Mac Workstation)\n" +
      "• Dynamic IP Discovery: Scans active local subnet (e.g. 10.0.0.1-254) on Port 8080\n" +
      "• Port 3001: WebRTC P2P Signaling Server (signal-server.js)\n" +
      "• Linux SSH Public Key Path: `/root/.ssh/id_ed25519.pub`\n" +
      "• GitHub Remote Protocol: `git@github.com:karmatics/<repo>.git`"
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
      "1. **Mac Workstation Online & Synced:** Reached at `10.0.0.226:8080` running Luno v3.8.0 on Darwin ARM64 (`mac-mini-rob.local`).",
      "2. **44 Projects Cataloged & Parity Verified:** All 44 projects on Linux are now Git-initialized and wired to match the Mac repositories.",
      "3. **KeyCommandHandler.js Synchronized:** Local copy updated from Mac's 600-line version.",
      "4. **HomeSetup Replicated to Mac:** 82 files replicated directly to Mac over LAN HTTP (`POST /api/save?project=HomeSetup`), with Git tracking `git@github.com:karmatics/HomeSetup.git`."
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
      "• 4. Linux Profile: Ubuntu Host (10.0.0.245:8080), Linux 7.0.0, Node.js\n" +
      "• 5. HomeSetup Git: Initialized on Linux, remote set to git@github.com:karmatics/HomeSetup.git\n" +
      "• 6. State Persistence: Full parity matrix saved to HomeSetup/state/recon_report.json"
    ];
  }
}

globalThis.HomeNetworkContent = HomeNetworkContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeNetworkContent;