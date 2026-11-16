class HomeHandoffContent {
  static getMeta() {
    return {
      kicker: 'Session State & Thread Migration',
      title: '6. Thread Continuity & Active Handoff Ledger',
      subtitle: 'The living state ledger: current session milestones, fleet status, incoming AI directives, and zero-loss thread-hopping.'
    };
  }

  static manifest() {
      return [
        {
          section: 'handoff_deck',
          partLabel: 'Chapter 6 • State Ledger',
          title: 'Active Session State & Fresh-Thread Deck',
          blocks: [
            { id: 'comp_handoff_deck', type: 'component', component: 'HomeHandoffComponent' },
            { id: 'p_handoff_intro_1', type: 'p' },
            { id: 'p_handoff_intro_2', type: 'p' },
            { id: 'sidebar_thread_hopping_mandate', type: 'sidebar', kicker: 'Thread-Hopping Protocol', title: 'Why The Document Holds Session State' }
          ]
        },
        {
          section: 'portal_frontpage_plan',
          partLabel: 'Chapter 6 • Public Front Page',
          title: 'The Public Front Page Project: Portal',
          blocks: [
            { id: 'p_handoff_portal_1', type: 'p' },
            { id: 'sidebar_portal_fork_spec', type: 'sidebar', kicker: 'Portal Architecture', title: 'Forking Workflow, Summary JSON & Sensitive Layer' }
          ]
        },
        {
          section: 'next_actions',
          partLabel: 'Chapter 6 • Action Items',
          title: 'Immediate Next Engineering Priorities',
          blocks: [
            { id: 'p_handoff_tasks_1', type: 'p' },
            { id: 'sidebar_next_thread_checklist', type: 'sidebar', kicker: 'Handoff Checklist', title: 'Actionable Next-Thread Checklist' }
          ]
        }
      ];
    }
  static p_handoff_intro_1() {
    return [
      "In standard software development, AI chat conversations hit usage limits or context fatigue, stranding unfinished thoughts inside closed browser tabs. In our architecture, **the document itself preserves the active session state, recent accomplishments, and exact next steps.**",
      "This dossier acts as the **Fleet Cockpit & Continuity Router** within the 4-Quadrant Opus:",
      "• **Quadrant I: Inventions & Technical Moat (`CadPlan`, `accudraw`, `accuCad`):** 30-year proven spatial CAD constraint engine, SmartLine chaining, on-curve splines, and expired US Patent #5,754,182.",
      "• **Quadrant II: Personal Narrative & Economic Reality (`situation`, `ValuationOfAccudraw`):** The documented contrast between creating $1.2B–$5.54B+ in corporate enterprise value versus personal hardship and ongoing daughter court matters (living situation stabilized Nov 2026; sensitive family context gated in `Opus`).",
      "• **Quadrant III: Post-Labor Macro-Economics (`EconomicsOfAutomation`, `JobsAndAI`):** A first-principles economic framework for surviving automation through the Robot Dividend and capital saturation.",
      "• **Quadrant IV: Fleet & Operational Cockpit (`HomeSetup`, `Luno`, `Library`):** The live multi-node computational environment on Port 8080 (`v3.8.0`) connecting Mac Mini and Ubuntu Linux with zero-token clipboard container execution."
    ];
  }
  static p_handoff_intro_2() {
    return [
      "**The Universal Ground-Truth Mandate for the AI:** The incoming AI assistant must treat this document as the living single source of truth. When the AI solves a task or architects a new cross-machine workflow, it must write the solution directly into the HomeSetup files (`HomeSetup/js/*.js` and `HomeSetup/content/*.html`) using surgical HTML containers, keeping the specification perpetually up to date."
    ];
  }

  static sidebar_thread_hopping_mandate() {
    return [
      "Thread Continuity Mandates for Incoming AI:\n" +
      "• 1. Always Update the Document: Never just output answers in chat. Reflect all new paths, runner scripts, and setup details into HomeSetup files.\n" +
      "• 2. Maintain Zero-Leak Security: Never place plaintext passwords or tokens into the document or prompts.\n" +
      "• 3. Respect the Host Environment: The current host is the Linux box running Node.js on port 8080 with Luno Workspace.\n" +
      "• 4. Use Surgical Containers: Default to `<script data-file=\"...\" data-method=\"...\" data-action=\"patch\">` for class edits."
    ];
  }

  static p_handoff_tasks_1() {
    return [
      "The multi-machine fleet is organized under a **Unified Git & Fleet Deck**:",
      "1. **Current Project Checkpoint (Single Target):** Displays live modified-file status for the active project (`HomeSetup`, `Opus`, etc.). Tap **\"📸 Checkpoint & Deploy\"** to commit and publish directly to its GitHub Pages site.",
      "2. **Fleet-Wide Multi-Machine Sync (All 50+ Repos):** When sitting down at either Mac or Linux, tap **\"⬇️ Catch Up Fleet\"** to pull all updates with automatic local snapshot safety. When finishing work, tap **\"🚀 Sync Fleet to Peer\"** to push all repos to GitHub and signal your peer over Port 8080."
    ];
  }

  static sidebar_next_thread_checklist() {
    return [
      "Active Multi-Step Cleanup & Polish Plan (Nov 2026 — Completed):\n" +
      "• [Step 1 • Done] Workspace recon saved to `HomeSetup/state/cleanup_recon.json` (60 projects mapped).\n" +
      "• [Step 2 • Done] Added `OpusSummaries.js` & `HomeSummaries.js` + `summaries-only` sets; removed 15 duplicate `content/*.html` files; modularized `HomeFleetVisualizer.js`.\n" +
      "• [Step 3 • Done] Refactored `OpusRouterComponent`, `HomeHandoffComponent`, and `HomeDictationStudioComponent` into small (<55 line) methods.\n" +
      "• [Step 4 • Done] Unified toolbars across `Opus`, `HomeSetup`, and `situation`; auto-rendered chapter summary cards; added 1-tap `📋 Clip Notes` + sub-element excerpt references.\n" +
      "• [Step 5 • Done] Added `SensitiveContextGate.js` lock/unlock gate (`family` / `poa`) + locked export masking.\n" +
      "• [Step 6 • Done] Added `SituationSummaries.js`, aligned `CadOriginsContent` valuation ($1.2B–$5.54B+ / $2.3B midpoint), and pruned 9 dead `JobsAndAI` files."
    ];
  }

  static p_handoff_portal_1() {
      const pUrl = typeof HomeHandoffComponent !== 'undefined' ? HomeHandoffComponent.resolveAppUrl('Portal') : '../Portal/index.html';
      const aUrl = typeof HomeHandoffComponent !== 'undefined' ? HomeHandoffComponent.resolveAppUrl('accuCad') : '../accuCad/index.html';
      const dUrl = typeof HomeHandoffComponent !== 'undefined' ? HomeHandoffComponent.resolveAppUrl('DrawingApp') : '../DrawingApp/index.html';
      const eUrl = typeof HomeHandoffComponent !== 'undefined' ? HomeHandoffComponent.resolveAppUrl('EconomicsOfAutomation') : '../EconomicsOfAutomation/index.html';
      return [
        `**The Public Front Page ([Portal](${pUrl})):** While \`Opus\` serves as the internal 4-quadrant developer router and \`HomeSetup\` documents the fleet, **[Portal](${pUrl})** is the welcoming, visitor-ready front page application for the entire ecosystem.`,
        `It promotes two public Tip-of-the-Spear initiatives—the **[AccuCAD 3D Studio](${aUrl})** / **[DrawingApp](${dUrl})** software showcase and the accessible **[Economics of Automation](${eUrl})** visual essay—alongside Luno, HomeSetup, Financial Valuation, and Family Stability, with live \`summaries.json\` generation and AI export keys.`
      ];
    }
  static sidebar_portal_fork_spec() {
      return [
        "Portal Front Page Specification:\n" +
        "• Project & Class Name: `Portal` (`Portal/Portal.js`, URL: `../Portal/index.html`).\n" +
        "• Forking Origin: Forked from `BasicsWithDialogBox` (simple dialog-ready shell) and upgraded with `DocumentReader`, `GlowingTooltip`, `SensitiveContextGate`, and `PortalSummaryEngine`.\n" +
        "• Live Summary JSON Generator: `Portal/js/PortalSummaryEngine.js` scans sibling `luno.json` and `*Summaries.js` files to emit `Portal/state/summaries.json`.\n" +
        "• Tone & Privacy Balance: Public front page stays calm, factual, and non-inflammatory; deeper family/POA administrative details reside behind `SensitiveContextGate` (`family` / `poa` / `rob`) and remain inspectable in source."
      ];
    }
}

globalThis.HomeHandoffContent = HomeHandoffContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeHandoffContent;