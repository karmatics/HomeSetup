class HomeSummaries {
  static getAll() {
    return {
      topology: {
        title: '0. Hardware Topology & Fleet Matrix',
        tldr: 'Inventories the physical fleet: Mac Mini living-room desktop, portable Ubuntu workhorse, tethered Windows laptop, two phones (Luno mobile origin), and the 60-project workspace layout.',
        whatsNext: 'Chapter 1 details how these nodes communicate over the Port 8080 LAN mesh.'
      },
      network: {
        title: '1. Local Network & Connection Mesh',
        tldr: 'Documents verified Luno v3.8.0 HTTP federation on Port 8080 between Ubuntu (10.0.0.245) and Mac Mini (10.0.0.226), dynamic subnet discovery, and WebRTC signaling.',
        whatsNext: 'Chapter 2 covers portable external storage and Git remote parity across all repositories.'
      },
      storage: {
        title: '2. Shared Storage & Portable Drive',
        tldr: 'Maps exFAT external drive mount paths across Linux/Mac/Windows, rsync workflows, and GitHub remote parity across the 50+ tracked repositories.',
        whatsNext: 'Chapter 3 outlines Luno directory conventions, 1-tap Pages deployment, and Supabase cloud comments.'
      },
      nodes: {
        title: '3. Machine Workspaces & Luno Nodes',
        tldr: 'Defines optimal machine roles (Linux servers, Mac ScreenFlow/Pages, Windows legacy checks, mobile dictation) and zero-CLI GitHub Pages publishing.',
        whatsNext: 'Chapter 4 explains programmatic cross-wire LLM orchestration via server runners and runner.mjs.'
      },
      orchestration: {
        title: '4. Cross-Wire LLM Orchestration',
        tldr: 'Specifies scope invariants for RUN: SERVER scripts (no __dirname/__filename), Port 8080 Luno-to-Luno HTTP automation, and the file-based background task queue (runner.mjs).',
        whatsNext: 'Chapter 5 locks down the zero-leak credential boundary protecting secrets from AI prompts.'
      },
      secrets: {
        title: '5. Credentials & Safe Key Storage',
        tldr: 'Enforces the Reference & Indirection Pattern: tokens and SSH keys live strictly in local config/keychain paths and are never pasted into prompts or git.',
        whatsNext: 'Chapter 6 acts as the living session state ledger and active fresh-thread handoff deck.'
      },
      handoff: {
        title: '6. Thread Continuity & Active Handoff Ledger',
        tldr: 'Holds the current session state, fleet Git synchronizer, 4-Quadrant continuity map, and active cleanup checklist so new AI threads resume with zero lost context.',
        whatsNext: 'Chapter 7 audits the speech-to-text dictation codebase and universal Chrome extension roadmap.'
      },
      dictation: {
        title: '7. Dictation Architecture & Universal Speech Engine',
        tldr: 'Compares production DictationWidget.js against Scratchy precursor features, explains the DictationLattice Two Cursors model, and blueprints the 1-line attach() and Chrome extension.',
        whatsNext: 'End of HomeSetup dossier; use Directives or Export MD to compile notes into your next prompt.'
      }
    };
  }

  static get(pageId) {
    return this.getAll()[pageId] || null;
  }

  static toMarkdown() {
    const all = this.getAll();
    const lines = ['# HomeSetup — Fleet Executive Summaries (Tier 0)', ''];
    for (const [id, s] of Object.entries(all)) {
      lines.push(`## ${s.title} (\`${id}\`)`);
      lines.push(`- **Summary:** ${s.tldr}`);
      lines.push(`- **What Follows:** ${s.whatsNext}`);
      lines.push('');
    }
    return lines.join('\n').trim();
  }
}

globalThis.HomeSummaries = HomeSummaries;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeSummaries;