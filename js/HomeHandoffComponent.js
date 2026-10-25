class HomeHandoffComponent {

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
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Session State & Multi-Node Sync Deck'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '44 Projects Git-Wired')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('a', {
          href: 'https://github.com/new?name=HomeSetup',
          target: '_blank',
          className: 'dr-nav-btn primary',
          style: { padding: '4px 10px', fontSize: '10.5px', fontWeight: 'bold', textDecoration: 'none' }
        }, '➕ Create GitHub Repo (HomeSetup)'),
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '4px 10px', fontSize: '10.5px' },
          onclick: () => HomeHandoffComponent.copyHandoffPrompt()
        }, '📋 Copy Handoff Prompt')
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
      { status: 'done', label: 'Linux GitHub SSH key authenticated (isGitHubAuthorized: true)' },
      { status: 'done', label: 'Mac Mini verified online & serving 44 sibling projects' },
      { status: 'done', label: 'All 44 Linux projects initialized with Git and remotes wired' },
      { status: 'done', label: 'KeyCommandHandler.js synchronized from Mac (600 lines)' },
      { status: 'active', label: 'Create empty karmatics/HomeSetup repo on GitHub' },
      { status: 'pending', label: 'Push initial commit to GitHub Pages (karmatics.github.io/HomeSetup)' }
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

    // Right Column: Directives & Quick Links
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

    rightCol.appendChild(makeElement('strong', { style: { color: '#10b981' } }, '✓ FLEET SYNC ACCOMPLISHED:'));
    rightCol.appendChild(makeElement('p', { style: { margin: 0, color: '#94a3b8' } },
      'All 44 projects on Linux are now initialized with Git and wired to their GitHub remotes. KeyCommandHandler.js is synchronized from the Mac.'
    ));

    const instructionsBox = makeElement('div', {
      style: {
        background: '#070a13',
        border: '1px solid #232d3f',
        borderRadius: '6px',
        padding: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }
    }, [
      makeElement('div', {}, '1. Click "➕ Create GitHub Repo" above (or open github.com/new).'),
      makeElement('div', {}, '2. Name the repo: HomeSetup (leave unchecked: no README/license).'),
      makeElement('div', {}, '3. Tap "Paste from Chatbot" in Luno to push immediately!')
    ]);
    rightCol.appendChild(instructionsBox);

    body.appendChild(rightCol);
    wrap.appendChild(body);
    container.appendChild(wrap);
  }
  static getHandoffMarkdown() {
    return `# HOMESETUP: MULTI-NODE INFRASTRUCTURE SPECIFICATION & FRESH-THREAD HANDOFF
  **Generated:** ${new Date().toISOString()} • **Host:** Ubuntu Linux Laptop (HP ZBook @ 10.0.0.245:3000)
  **Remote Peer:** Apple Silicon Mac Mini (10.0.0.226:8080 • Luno v3.8.0 • /Users/rob/source/LunoProjects/)
  **GitHub Account:** karmatics (SSH Key: \`id_ed25519\` Authenticated)

  ---

  ## 1. MULTI-DEVICE PARITY AUDIT
  - **44/44 Projects Verified:** Both Linux and Mac hold all 44 projects at matching paths.
  - **HomeSetup Parity:** 82 files replicated directly to Mac over LAN HTTP (\`POST http://10.0.0.226:8080/api/save?project=HomeSetup\`).
  - **Core Checksum Audit:** Verified across \`Library/\`, \`Luno/\`, and \`HomeSetup/\`.
  - **Pages Routing Guard:** \`.nojekyll\` committed in \`HomeSetup/\` to guarantee clean static asset routing.
  - **SSH Key Status:** Linux public key (\`id_ed25519\`) authenticated on GitHub as \`karmatics\`.

  ---

  ## 2. SYNCHRONIZATION PIPELINE
  1. **Local-to-Local (LAN HTTP):** High-speed zero-password replication via Luno's \`/api/save\` endpoint.
  2. **Local-to-Cloud (Git / GitHub Pages):** Standard git commits on branch \`main\` pushing to GitHub remotes.
  3. **Living Document Single Source of Truth:** All file moves, ports, and sync scripts stay documented in \`HomeSetup/\`.`;
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