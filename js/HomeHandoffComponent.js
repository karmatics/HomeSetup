class HomeHandoffComponent {
  /**
   * Interactive Handoff Dashboard & Fresh-Thread Dispatch Deck.
   * Displays the active session state, recent commits, and lets the user
   * copy the clean thread-handoff bundle or send it to Luno's Outbox.
   */
  static render(container) {
    container.innerHTML = '';

    const wrap = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1.5px solid #21262d',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex',
        flexDirection: 'column'
      }
    });

    const header = makeElement('div', {
      style: {
        padding: '10px 16px',
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid #21262d',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '🔄'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Session State & Fresh-Thread Continuity Deck'),
        makeElement('span', { style: { fontSize: '10px', background: '#38bdf8', color: '#070a13', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, 'Thread-Safe State')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: 'bold' },
          onclick: () => HomeHandoffComponent.copyHandoffPrompt()
        }, '📋 Copy Fresh-Thread Prompt'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 8px', fontSize: '10px', color: '#d2a8ff', borderColor: '#8257e5' },
          onclick: () => HomeHandoffComponent.pushHandoffToOutbox()
        }, '📤 Send to Outbox')
      ])
    ]);
    wrap.appendChild(header);

    const body = makeElement('div', {
      style: {
        padding: '16px',
        background: '#090d16',
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1.2fr) minmax(280px, 1fr)',
        gap: '14px'
      }
    });

    // Left Column: Active State Snapshot
    const leftCol = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '10px' }
    });

    leftCol.appendChild(makeElement('div', {
      style: { fontSize: '11px', textTransform: 'uppercase', color: '#00f2fe', fontWeight: 'bold', letterSpacing: '0.06em' }
    }, 'Current Session Snapshot'));

    const checklist = [
      { status: 'done', label: 'CAD prototype content stripped from HomeSetup' },
      { status: 'done', label: '6 HomeSetup chapters created & wired in DocumentReader' },
      { status: 'done', label: 'Interactive HomeFleetVisualizer active in Chapter 0' },
      { status: 'done', label: 'Zero-leak security policy & credential paths formalized' },
      { status: 'active', label: 'Documenting specific local paths, IPs, and mount scripts' },
      { status: 'pending', label: 'Setting up automated multi-machine SSH runner scripts' },
      { status: 'pending', label: 'Testing roving portable drive auto-detection' }
    ];

    const listEl = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '6px' }
    });

    checklist.forEach(item => {
      const isDone = item.status === 'done';
      const isActive = item.status === 'active';
      const col = isDone ? '#10b981' : (isActive ? '#00f2fe' : '#64748b');
      const icon = isDone ? '✓' : (isActive ? '●' : '○');

      listEl.appendChild(makeElement('div', {
        style: {
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e293b',
          borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontFamily: 'monospace'
        }
      }, [
        makeElement('span', { style: { color: col, fontWeight: 'bold' } }, icon),
        makeElement('span', { style: { color: isDone ? '#cbd5e1' : (isActive ? '#f8fafc' : '#64748b') } }, item.label)
      ]));
    });

    leftCol.appendChild(listEl);
    body.appendChild(leftCol);

    // Right Column: Directives for Incoming AI
    const rightCol = makeElement('div', {
      style: {
        background: '#0a0e1a',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#cbd5e1',
        lineHeight: '1.45'
      }
    });

    rightCol.appendChild(makeElement('strong', { style: { color: '#f59e0b' } }, 'INCOMING AI ASSISTANT DIRECTIVE:'));
    rightCol.appendChild(makeElement('p', { style: { margin: 0, color: '#94a3b8' } },
      'When this session is migrated to a new chat thread, the AI must read this handoff ledger first. It must always write updates directly back into HomeSetup files rather than only speaking in chat, preserving continuity indefinitely.'
    ));

    const quickActionBtn = makeElement('button', {
      className: 'dr-nav-btn',
      style: { marginTop: '8px', padding: '6px 12px', color: '#00f2fe', borderColor: '#00f2fe66', width: '100%', justifyContent: 'center' },
      onclick: () => {
        if (typeof CadPromptBundlerDialog !== 'undefined') {
          CadPromptBundlerDialog.open();
        }
      }
    }, '⚙️ Open Configurable Prompt Bundler');
    rightCol.appendChild(quickActionBtn);

    body.appendChild(rightCol);
    wrap.appendChild(body);
    container.appendChild(wrap);
  }

  static getHandoffMarkdown() {
    return `# HOMESETUP: MULTI-NODE INFRASTRUCTURE SPECIFICATION & FRESH-THREAD HANDOFF
  **Generated:** ${new Date().toISOString()} • **Host:** Ubuntu Linux Laptop (HP ZBook @ 10.0.0.245:3000)
  **Remote Peer:** Apple Silicon Mac Mini (mac-mini-rob.local @ 10.0.0.226:8080, Luno v3.8.0, 36 Git repos)
  **Tethered Node:** Windows Laptop (Permanently powered on HP dock charger)
  **Mobile Nodes:** 2 Phones (Mobile dictation & WebRTC touch decks)

  ---

  ## 1. MANDATE FOR INCOMING AI ASSISTANT
  1. **Always Update the Document:** Reflect all structural decisions, file paths, script snippets, and architectural updates directly back into HomeSetup class files and HTML templates using the HTML Container Protocol.
  2. **Preserve Thread-Safe Portability:** Ensure that at any moment, this document can be exported or copied to seed a fresh LLM thread without context degradation.
  3. **Zero-Leak Security Boundary:** Never embed, request, or print passwords, private SSH keys, or access tokens in prompts. Document file paths on disk (\`~/.config/credentials/\`) and environment variables that scripts can read locally.
  4. **Current Execution Host:** The Linux laptop is the active server host running Node.js on port 3000 with Luno Workspace and the file-based task runner (\`runner.mjs\`).
  5. **Cross-Machine Execution:** Remote scripts on the Mac can be executed directly via \`POST http://10.0.0.226:8080/api/save?project=Luno\` with \`{ project, files, serverScript }\`.

  ---

  ## 2. VERIFIED FLEET & REPOSITORY SNAPSHOT
  - **Node 1: Ubuntu Linux Laptop (Active Authoring Host):**
    - IP: 10.0.0.245:3000 • OS: Linux 7.0.0 • Location: Bedroom
    - Workspace: /root/source/LunoProjects/
    - HomeSetup Status: Initialized with Git on branch \`main\`, remote set to \`git@github.com:karmatics/HomeSetup.git\`.
  - **Node 2: Apple Silicon Mac Mini (Living Room Workstation):**
    - IP: 10.0.0.226:8080 • Platform: darwin arm64 • User: rob
    - Workspace: /Users/rob/source/LunoProjects/
    - Video Suite: ScreenFlow v10.5.2 (/Applications/ScreenFlow.app)
    - Git Repos: 36 repositories on branch main (\`git@github.com:karmatics/<repo>.git\`)
  - **Cloud Layer: GitHub Pages & Supabase:**
    - 1-tap GitHub Pages deployment managed directly by Luno UI.
    - Supabase database to store public comments, user reputation, and annotations.

  ---

  ## 3. ACTIVE MIGRATION & RECONCILIATION MILESTONES
  1. **[Done] Live Cross-Machine Recon:** Mac verified online on 10.0.0.226:8080; projects inventory completed.
  2. **[Done] Git Initialization:** \`HomeSetup\` initialized with Git on Linux, configured with remote origin.
  3. **[Done] Parity Audit:** Full sync status written to \`HomeSetup/state/recon_report.json\` and \`HomeSetup/messages/sync_status.md\`.
  4. **[Next] Push Initial HomeSetup Commit to GitHub:** Push to \`git@github.com:karmatics/HomeSetup.git\` to establish the remote repo and configure 1-tap GitHub Pages publishing.`;
  }
  static copyHandoffPrompt() {
    const md = HomeHandoffComponent.getHandoffMarkdown();
    navigator.clipboard.writeText(md).then(() => {
      alert('✓ Copied Fresh-Thread Handoff Prompt to clipboard!\nYou can paste this into a new chat thread to immediately resume with 100% context.');
    }).catch(() => {
      prompt('Copy Fresh-Thread Prompt:', md);
    });
  }

  static pushHandoffToOutbox() {
    const md = HomeHandoffComponent.getHandoffMarkdown();
    if (typeof OutboxQueue !== 'undefined' && OutboxQueue.addBundle) {
      OutboxQueue.addBundle('HomeSetup Fresh-Thread Handoff Ledger', md, { priority: 'high' });
      alert('✓ Dispatched Fresh-Thread Handoff Ledger directly to Luno Outbox!');
    } else {
      HomeHandoffComponent.copyHandoffPrompt();
    }
  }
}

globalThis.HomeHandoffComponent = HomeHandoffComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeHandoffComponent;