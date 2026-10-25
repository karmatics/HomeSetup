class HomeNodesContent {
  static getMeta() {
    return {
      kicker: 'Luno Workspace Nodes',
      title: '3. Machine Workspaces & Luno Nodes',
      subtitle: 'Where Luno runs on each machine, filesystem layouts, and directory conventions.'
    };
  }

  static manifest() {
    return [
      {
        section: 'workspace_locations',
        partLabel: 'Chapter 3 • Workspaces',
        title: 'Luno Installations & Directory Structures',
        blocks: [
          { id: 'p_nodes_layout_1', type: 'p' },
          { id: 'p_nodes_layout_2', type: 'p' },
          { id: 'sidebar_path_directory', type: 'sidebar', kicker: 'Directory Map', title: 'Luno Root Paths per Machine' }
        ]
      },
      {
        section: 'node_capabilities',
        partLabel: 'Chapter 3 • Capabilities',
        title: 'Machine-Specific Workloads & Strengths',
        blocks: [
          { id: 'p_nodes_roles_1', type: 'p' },
          { id: 'p_nodes_roles_2', type: 'p' },
          { id: 'sidebar_workload_matrix', type: 'sidebar', kicker: 'Task Distribution', title: 'Optimal Task Distribution' }
        ]
      }
    ];
  }

  static p_nodes_layout_1() {
    return [
      "Luno Workspace is designed to run locally on each machine. A Luno instance consists of the Node.js server (`LunoServer.js`) and client web interface. On the Linux box where you are currently running, the server serves the project files and provides API endpoints for disk writes (`/api/save`), server runners (`<script data-file=\"RUN: SERVER\">`), and git checkpoints."
    ];
  }

  static p_nodes_layout_2() {
      return [
        "**1-Tap GitHub Pages Management in Luno:** A major design feature of Luno is that each project can be deployed as an independent GitHub Pages site with a single button click in the UI. You never need to wrestle with command-line git, branch switching, or merge conflicts.",
        "**Supabase Integration for Public Pages:** Because GitHub Pages are static and public, dynamic features—such as community comments, author annotations, and persistent notes—require an external database. We are integrating **Supabase** (PostgreSQL with instant REST/realtime APIs) so users can leave comments and query data securely without exposing home server ports to the public internet."
      ];
    }

  static sidebar_path_directory() {
      return [
        "Luno Deployment & Cloud Architecture:\n" +
        "• 1-Tap Pages Deployment: Luno packages the project and deploys to `karmatics.github.io/<ProjectName>` automatically.\n" +
        "• Zero Command-Line Git: Snapshots and checkpoints are created via browser UI.\n" +
        "• Supabase Data Layer: Secure cloud database storing public comments, user reputation, and living spec threads.\n" +
        "• ScreenFlow Preservation: Video tutorials and demos recorded on the Mac; exports dropped onto the shared drive for web embedding."
      ];
    }
  static p_nodes_roles_1() {
    return [
      "**Linux Workstation Role:** Best suited for high-concurrency Node.js tasks, continuous background runners, database experiments, and server-side compilation."
    ];
  }

  static p_nodes_roles_2() {
    return [
      "**Mac Role:** Best for Safari web testing, iOS/macOS compilation, and design-heavy workflows. **Windows Role:** Best for gaming, DirectX graphics pipelines, Windows-only engineering tools, and secondary display monitors."
    ];
  }

  static sidebar_workload_matrix() {
    return [
      "Fleet Workload Matrix:\n" +
      "• Linux Host: Server hub, code generation testbench, continuous development.\n" +
      "• Mac: Cross-browser verification, mobile device syncing, portable work.\n" +
      "• Windows: CAD/BIM desktop tools, GPU render passes, PC hardware testing.\n" +
      "• Phones: Mobile testing, two-handed gesture controller, instant QR scan testbeds."
    ];
  }
}

globalThis.HomeNodesContent = HomeNodesContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeNodesContent;