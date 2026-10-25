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
      "Whenever a conversation thread approaches its token limit, you do not need to summarize the project from scratch. You simply export or copy this chapter's prompt bundle. The incoming AI receives 100% of the fleet topology, directory conventions, zero-leak secret guidelines, and the exact task backlog."
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
      "• 3. Respect the Host Environment: The current host is the Linux box running Node.js on port 3000 with Luno Workspace.\n" +
      "• 4. Use Surgical Containers: Default to `<script data-file=\"...\" data-method=\"...\" data-action=\"patch\">` for class edits."
    ];
  }

  static p_handoff_tasks_1() {
    return [
      "The task checklist below represents the active queue of items to implement across upcoming sessions. As items are completed, the AI will mark them resolved and append newly discovered infrastructure requirements to the list."
    ];
  }

  static sidebar_next_thread_checklist() {
      return [
        "Actionable Next-Thread Checklist:\n" +
        "• [Done] Verified Mac Mini (Apple Silicon arm64, ScreenFlow v10.5.2) on 10.0.0.226:8080.\n" +
        "• [Done] Verified 36 Git repositories on Mac mapped to git@github.com:karmatics/<repo>.git.\n" +
        "• [Done] Cross-wire remote code execution verified via POST /api/save?project=Luno.\n" +
        "• [Done] Linked missing remotes for Library and Luno on Linux.\n" +
        "• [Active] Verifying Linux GitHub SSH authorization.\n" +
        "• [Pending] Initialize dedicated Git repository for HomeSetup & wire to GitHub Pages.\n" +
        "• [Pending] Draft Supabase relational schema for public comments and annotations."
      ];
    }
}

globalThis.HomeHandoffContent = HomeHandoffContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeHandoffContent;