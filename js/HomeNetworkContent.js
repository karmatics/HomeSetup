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
        "1. **Mac Workstation (10.0.0.226:8080):** Running Luno `v3.8.0` on Apple Silicon (`mac-mini-rob.local`) at `/Users/rob/source/LunoProjects/`. All sibling projects are served live over HTTP, allowing zero-latency peer synchronization via `POST /api/save`.",
        "2. **Ubuntu Host (10.0.0.245:8080):** Hosts the portable Luno development server (`/home/rob/source/LunoProjects/Luno/server.js`), background task runner queue, and synchronized Git workspace files.",
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
        "• Dynamic IP Discovery: Scans active local subnet (10.0.0.1-254) on Port 8080\n" +
        "• Port 3001: WebRTC P2P Signaling Server (signal-server.js)\n" +
        "• SSH Key Auth: Ed25519 key pair configured for karmatics GitHub\n" +
        "• GitHub Remote Protocol: `git@github.com:karmatics/<repo>.git` (with HTTPS pull fallback)"
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
      "**The Active Mac Reconnaissance Protocol:** To bridge the repository and Git gap between the Linux laptop and the Mac workstation, we execute bidirectional cross-wire fleet audits over Port 8080.",
      "The live fleet audit verifies:",
      "1. **Mac Workstation Online & Synced:** Reached at `10.0.0.226:8080` running Luno v3.8.0 on Darwin ARM64 (`mac-mini-rob.local`).",
      "2. **50+ Git Repositories & 60 Workspace Projects Verified:** Active projects on Linux and Mac are Git-initialized on branch `main` and wired to `karmatics` GitHub remotes.",
      "3. **Shared Library Parity:** `DocumentReader.js`, `CadPlanItemNotes.js`, `CadPlanDocumentEditor.js`, `CadPlanAardvark.js`, and `SupabaseCommentsAdapter.js` stay synchronized across peers.",
      "4. **GitHub Pages Ready:** `.nojekyll` is ensured automatically across repositories before deployment."
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
        "• 1. Mac Mini Host: `mac-mini-rob.local` / 10.0.0.226 on Port 8080 (Luno v3.8.0)\n" +
        "• 2. Linux Peer: `10.0.0.245` on Port 8080 (`/home/rob/source/LunoProjects/Luno`, v3.8.0)\n" +
        "• 3. Remote Script Execution: Confirmed operational via POST /api/save\n" +
        "• 4. GitHub Pages: `HomeSetup`, `Opus`, `Luno`, `Library`, and sibling sites live with `.nojekyll`\n" +
        "• 5. State Persistence: Full parity matrix saved to `HomeSetup/state/fleet_sync_report.json`"
      ];
    }
}

globalThis.HomeNetworkContent = HomeNetworkContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeNetworkContent;