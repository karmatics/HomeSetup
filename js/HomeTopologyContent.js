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
        "The setup currently centers around four physical compute points plus two mobile phones: the new **Ubuntu Linux laptop** (working in the bedroom, powerful, clean install), the **Mac workstation** (living room, connected to the big dual monitors, long-time primary host with all GitHub remotes), the **Windows laptop** (dead battery, tethered 24/7 to the HP charger hub), and **two smartphones** (where Luno was originally developed, serving as primary dictation and review decks)."
      ];
    }

  static p_topo_intro_2() {
      return [
        "Our system audit on the Ubuntu laptop confirmed the local repository layout at `/root/source/LunoProjects/`. The initial USB transfer successfully brought over the Git histories and GitHub remotes for over 35 projects (such as `CadPlan`, `accuCad`, `Comments`, and `TouchController`, all wired to `git@github.com:karmatics/...`).",
        "Only this newly forked `HomeSetup` workspace is currently unversioned (`hasGit: false`).",
        "Crucially, the Mac in the living room is actively running its own instance of Luno on **port 8080**. This eliminates the need for manual SSH authentication: the Linux Luno server can communicate directly with the Mac's Luno server over LAN HTTP, creating a native peer-to-peer Luno federation."
      ];
    }
  static sidebar_fleet_roles() {
      return [
        "Physical Fleet Breakdown:\n" +
        "• 1. Ubuntu Laptop (The New Workhorse):\n" +
        "   - Origin: Old work laptop, wiped clean of Windows; fresh Ubuntu install 2 days ago.\n" +
        "   - Health & Mobility: Great battery life; portable. Currently used in bedroom, ideal for traveling and live demos.\n" +
        "   - Future Plan: Strong candidate to move to living room big monitors as primary workstation.\n" +
        "• 2. Mac Workstation (Living Room):\n" +
        "   - Current Role: Primary desktop connected to the big monitors for years. Holds all original `.git` repos.\n" +
        "   - The Anchor: Sole dependency is ScreenFlow for video editing; almost all other work can run on Ubuntu.\n" +
        "• 3. Windows Laptop (Deskbound):\n" +
        "   - Condition: Dead battery (cannot hold charge, dies immediately if unplugged).\n" +
        "   - Power Supply: Shares the large HP dock/hub charger from the Linux laptop; permanently tethered.\n" +
        "• 4. Two Phones (Phone 1 & Phone 2):\n" +
        "   - Origin: Luno was conceived and developed first on a phone!\n" +
        "   - Role: Couch/bed review, one-handed navigation, speech-to-text dictation notes away from desk."
      ];
    }

  static p_topo_linux_1() {
      return [
        "**Ubuntu Laptop (Bedroom Workhorse & Demo Rig):** This machine is an old corporate laptop gifted to me. I wiped Windows completely and installed fresh Ubuntu a couple days ago. It is fast, clean, and has a healthy battery. I am currently using it in the bedroom, but it is powerful enough to take over the living room setup with the big monitors.",
        "Crucially, because it is portable and runs a complete local Luno web server, this is the machine I can unplug and take anywhere to give live, offline demos of Luno and our spatial software tools."
      ];
    }

  static p_topo_mac_1() {
      return [
        "**Mac Workstation (Living Room Big Monitors):** The Mac has been my primary development machine for years. It is currently wired to the big desktop monitors out in the living room. It holds all original Git repositories and deployment keys for our GitHub Pages sites.",
        "My goal is to transition daily coding to Ubuntu. The single major application holding me to the Mac is **ScreenFlow** for screencasting and video production. Aside from ScreenFlow, my entire toolchain (Luno, Three.js, WebGL, Node.js, and documentation) runs cleanly on Linux."
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