class HomeTopologyContent {
  static getMeta() {
    return {
      kicker: 'Hardware Fleet Architecture',
      title: '0. Hardware Topology & Fleet Matrix',
      subtitle: 'Complete physical and logical directory of your Linux box, Mac, Windows machine, two phones, and portable shared storage.'
    };
  }

  static manifest() {
      return [
        {
          section: 'fleet_overview',
          partLabel: 'Chapter 0 • Overview',
          title: 'Fleet Matrix & Real-World Machine Profiles',
          blocks: [
            { id: 'comp_fleet_map', type: 'component', component: 'HomeFleetVisualizer' },
            { id: 'p_topo_intro_1', type: 'p' },
            { id: 'p_topo_intro_2', type: 'p' },
            { id: 'sidebar_fleet_roles', type: 'sidebar', kicker: 'Fleet Hardware Reality', title: 'Machine Roles, Power & Physical Placement' }
          ]
        },
        {
          section: 'workstation_breakdown',
          partLabel: 'Chapter 0 • Workstations',
          title: 'The Workstations: Ubuntu, Mac, Windows & Mobile',
          blocks: [
            { id: 'p_topo_linux_1', type: 'p' },
            { id: 'p_topo_mac_1', type: 'p' },
            { id: 'p_topo_win_1', type: 'p' },
            { id: 'p_topo_phones_1', type: 'p' },
            { id: 'sidebar_mobile_deck', type: 'sidebar', kicker: 'Mobile-First Heritage', title: 'Why Phones Are First-Class Luno Nodes' }
          ]
        }
      ];
    }

  static p_topo_intro_1() {
    return [
      "This document records the exact physical and network architecture of my home workstation fleet. The machines are not identical clones—each has distinct physical constraints, battery health, and specialized software dependencies.",
      "The setup currently centers around four physical compute points plus two mobile phones: the **Ubuntu Linux laptop** (portable workhorse and live demo rig), the **Mac Mini workstation** (living room, connected to the big dual monitors, holding ScreenFlow and primary Git pushes), the **Windows laptop** (dead battery, tethered 24/7 to the HP charger hub), and **two smartphones** (where Luno was originally developed, serving as primary dictation and review decks)."
    ];
  }
  static p_topo_intro_2() {
        return [
          "Our fleet synchronization audit confirms the local repository layout on both primary development hosts: `/Users/rob/source/LunoProjects/` on the Mac Mini (`mac-mini-rob.local`) and `/home/rob/source/LunoProjects/` on the Ubuntu Linux laptop (`10.0.0.245:8080`). Over 50 projects—including `HomeSetup`, `Opus`, `CadPlan`, `accuCad`, `QuoraToys`, `situation`, `Library`, and `Luno`—are Git-initialized on branch `main`, wired to `karmatics` GitHub remotes, and deployed with `.nojekyll` active on GitHub Pages.",
          "Both machines run Luno `v3.8.0` on **Port 8080**, enabling zero-password HTTP peer discovery and live synchronization across the local Wi-Fi mesh without manual SSH."
        ];
      }

  static sidebar_fleet_roles() {
    return [
      "Physical Fleet Breakdown:\n" +
      "• 1. Ubuntu Laptop (Portable Workhorse & Demo Rig): Old work laptop wiped clean of Windows with Ubuntu installed; great battery life, ideal for traveling and live offline demos, and a strong candidate to drive the living room big monitors.\n" +
      "• 2. Mac Mini Workstation (Living Room): Primary Apple Silicon host wired to the big monitors; sole legacy dependency is ScreenFlow for video editing; holds primary Git pushes.\n" +
      "• 3. Windows Laptop (Deskbound): Dead battery (dies immediately if unplugged); shares the large HP hub/dock charger from the Linux laptop; permanently tethered.\n" +
      "• 4. Two Phones (Phone 1 & Phone 2): Luno was conceived and developed first on a phone; used for couch/bed review, one-handed navigation, and voice dictation notes."
    ];
  }

  static p_topo_linux_1() {
    return [
      "**Ubuntu Laptop (Portable Workhorse & Demo Rig):** This machine is an old corporate laptop gifted to me, wiped clean of Windows and running Ubuntu. It is fast, clean, and has a healthy battery.",
      "Crucially, because it is portable and runs a complete local Luno web server (`v3.8.0` on Port 8080), this is the machine I can unplug and take anywhere to give live, offline demos of Luno and our spatial software tools."
    ];
  }

  static p_topo_mac_1() {
    return [
      "**Mac Mini Workstation (Living Room Big Monitors):** The Mac Mini (`mac-mini-rob.local`) is wired to the big desktop monitors in the living room and holds synchronized GitHub deployment keys for our GitHub Pages sites.",
      "The single major application holding me to macOS is **ScreenFlow** for screencasting and video production. Aside from ScreenFlow, my entire toolchain (Luno, Three.js, WebGL, Node.js, and living documentation) runs identically on both Mac and Linux."
    ];
  }
  static p_topo_win_1() {
      return [
        "**Windows Laptop (Tethered Rig):** This machine was my only laptop before getting the Ubuntu machine, but its battery is completely shot—it must remain plugged in 24/7 to avoid immediate shutdown. It relies on the large HP hub/dock charger from the Linux laptop (the only compatible charger I have). It stays parked on the desk for Windows-only tasks and legacy checks."
      ];
    }

  static sidebar_mobile_deck() {
      return [
        "Mobile-First Dictation Workflow:\n" +
        "• Couch & Bed Cadence: Reviewing long-form technical plans without keyboard fatigue.\n" +
        "• Touch + Voice Synergy: Tap to select block -> tap mic -> dictate thoughts in natural speech -> auto-saved to IndexedDB.\n" +
        "• Away-from-Desk Continuity: Reading living documents on the go with zero laptop bulk."
      ];
    }
  static p_topo_phones_1() {
      return [
        "**The Two Phones (Mobile-First Luno Origins):** A critical architectural truth of Luno is that **I built Luno first on a smartphone**. Mobile is not an afterthought or scaled-down viewport—Luno is specifically optimized for phone ergonomics.",
        "When I am lounging on the couch or in bed, I don't need a bulky keyboard. I pull up Luno on the phone, browse the living document, highlight a section with Aardvark, tap the microphone button, and use voice dictation to leave technical directives. This works over home Wi-Fi and continues to function when I am away from the house."
      ];
    }
}

globalThis.HomeTopologyContent = HomeTopologyContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeTopologyContent;