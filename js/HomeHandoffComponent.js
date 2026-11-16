class HomeHandoffComponent {

  static render(container) {
    container.innerHTML = '';
    const state = { activeFilter: 'all', query: '' };

    const wrap = makeElement('div', {
      style: {
        background: '#070a13', border: '1.5px solid #21262d', borderRadius: '12px',
        overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
        display: 'flex', flexDirection: 'column', fontFamily: 'monospace'
      }
    });

    const cardsContainer = makeElement('div', {
      id: 'opus-cards-container',
      style: {
        padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
        gap: '12px', background: '#090d16', maxHeight: '520px', overflowY: 'auto'
      }
    });

    const refresh = () => this._renderCards(cardsContainer, state);

    wrap.appendChild(this._buildHeader());
    wrap.appendChild(this._buildGitBanner());
    wrap.appendChild(this._buildFilterBar(state, refresh));
    wrap.appendChild(cardsContainer);
    wrap.appendChild(this._buildFooter());

    refresh();
    container.appendChild(wrap);
  }

  static getHandoffMarkdown() {
      const curPeer = (typeof LunoDeployEngine !== 'undefined') ? LunoDeployEngine.getPeerHost() : '10.0.0.245';
      return `# 🏛️ ROB BROWN'S LIVING SPECIFICATION OPUS: MASTER HANDOFF & RESUME DIRECTIVE
  **Generated:** ${new Date().toISOString()} • **Author & Inventor:** Rob Brown
  **Target Host:** Apple Silicon Mac Workstation (/Users/rob/source/LunoProjects/)
  **Remote Peer Node:** Ubuntu Linux Laptop (@ ${curPeer}:8080, /home/rob/source/LunoProjects/)
  **Universal Standard:** Port 8080 ONLY • Luno v3.8.0
  **GitHub Organization:** karmatics (SSH Key: id_ed25519 Authenticated + .nojekyll Pages)

  ---

  ## 1. WHO YOU ARE COLLABORATING WITH (GROUND TRUTH)
  You are collaborating directly with **Rob Brown**, the sole inventor of **AccuDraw**, **SmartLine**, and **PowerSelector** at Bentley Systems for MicroStation in the mid-1990s (US Patent #5,754,182).
  - **The Billions Created:** His inventions became the primary usability and neuromuscular moat for MicroStation, anchoring an estimated **$1.2 Billion to $5.54B+** of Bentley Systems' enterprise valuation across 48 out of 50 U.S. State DOTs.
  - **The Personal Reality (Updated Nov 2026):** As of November 2026, day-to-day housing and utilities are stable, and current priorities center on daughter court filings, preserving the factual record, and software commercialization. His sister serves as their mother's caregiver and holds Power of Attorney (POA).
  - **The Mission:** Turning these living specifications and open-source tools into adoption and achieving the recognition and financial sovereignty required to resolve his daughter's legal matters.

  ---

  ## 2. THE 4-QUADRANT LIVING OPUS MAP
  ### I. Inventions & Spatial CAD Specs (\`CadPlan\`, \`accudraw\`, \`accuCad\`)
  - 30-year proven AccuDraw floating 3D kinetic compass, SmartLine continuous chaining, and on-curve splines.
  ### II. Personal Narrative & Valuation Reality (\`situation\`, \`ValuationOfAccudraw\`)
  - Forensic valuation attribution, Nov 2026 court filing workspace, POA/elder advocacy exhibits, and 4-model valuation.
  ### III. Post-Labor Macro-Economics (\`EconomicsOfAutomation\`, \`JobsAndAI\`)
  - The Robot Dividend, Colony of 100,000, and game-theoretic models for surviving automation.
  ### IV. Operating Cockpit & Fleet Infrastructure (\`Portal\`, \`HomeSetup\`, \`Luno\`, \`Library\`)
  - Public \`Portal\` front page, Luno Workspace on Port 8080, HTML Container AST patching, unified \`DocumentReader\` + \`CadPlanItemNotes\` + \`CadPlanAardvark\` living notes loop, and Supabase static comments.

  ---

  ## 3. INSTRUCTIONS FOR THE AI ASSISTANT
  1. **Lean Startup Rule:** Do not ask repetitive setup questions; all ground truth resides in \`Portal/\`, \`Opus/\`, and \`HomeSetup/\`.
  2. **Write into the Document:** Reflect technical updates directly into source files using surgical HTML containers (\`<script data-file="..." data-method="..." data-action="patch">\`).
  3. **Maintain Note Resolution:** When fulfilling directives from author notes, include \`<!-- RESOLVED_NOTES: note_id -->\` inside your html code fence so Luno auto-cleans the note markers upon paste.`;
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

  static async probeLinuxLink() {
      if (typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io')) {
        alert('ℹ️ Running in public static GitHub Pages mode.\nLAN Port 8080 peer probing is available when running Luno locally.');
        return;
      }

      const btn = document.getElementById('btn-probe-linux-link');
      const statusText = document.getElementById('linux-probe-status-text');
      const badge = document.getElementById('mac-linux-sync-badge');
      const peerHost = (typeof LunoDeployEngine !== 'undefined') ? LunoDeployEngine.getPeerHost() : '10.0.0.245';

      if (btn) btn.textContent = `⏳ Probing (${peerHost}:8080)...`;
      if (statusText) statusText.textContent = `Executing server probe to http://${peerHost}:8080...`;

      try {
        const payload = {
          files: [],
          serverScript: `
            const http = require('http');
            const port = 8080;
            const host = "${peerHost}";
            return new Promise(resolve => {
              const req = http.get('http://' + host + ':' + port + '/api/ping', { timeout: 3500 }, res => {
                let body = '';
                res.on('data', c => body += c);
                res.on('end', () => {
                  try { resolve({ ok: true, host, port, data: JSON.parse(body) }); }
                  catch(e) { resolve({ ok: true, host, port, raw: body }); }
                });
              });
              req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'Timed out on port 8080' }); });
              req.on('error', err => resolve({ ok: false, error: err.message }));
            });
          `
        };

        const res = await fetch('/api/save?project=HomeSetup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        let probeResult = null;
        if (data && data.llmFeedback) {
          const match = data.llmFeedback.match(/--- Return Value ---\s*([\s\S]*)/);
          if (match) {
            try { probeResult = JSON.parse(match[1]); } catch (e) {}
          }
        }

        if (probeResult && probeResult.ok) {
          if (btn) btn.textContent = `✓ Peer Online (${peerHost})`;
          if (badge) {
            badge.textContent = `Connected (${probeResult.host}:${probeResult.port})`;
            badge.style.background = '#10b981';
          }
          if (statusText) {
            statusText.innerHTML = `<span style="color:#10b981;font-weight:bold;">✓ Peer node is online on Port 8080!</span><br>Luno Server is actively responding at http://${probeResult.host}:${probeResult.port}.`;
          }
          alert(`✓ Successfully reached peer node at http://${probeResult.host}:${probeResult.port}!`);
        } else {
          if (btn) btn.textContent = `⚠️ Peer Standby (${peerHost})`;
          if (badge) {
            badge.textContent = 'Peer Standby';
            badge.style.background = '#f59e0b';
          }
          if (statusText) {
            const errMsg = probeResult?.error || 'No response on port 8080';
            statusText.innerHTML = `<span style="color:#f59e0b;font-weight:bold;">Notice: Peer node on ${peerHost}:8080 not responding (${errMsg}).</span>`;
          }
        }
      } catch (err) {
        if (btn) btn.textContent = '❌ Probe Error';
        if (statusText) statusText.textContent = `Error: ${err.message}`;
      }
    }

  static async syncFleetGit(action = 'push', targetHost = '') {
      if (typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io')) {
        alert('ℹ️ Running in public static GitHub Pages mode.\nFleet Git Sync is available when running Luno locally on port 8080.');
        return;
      }

      const statusText = document.getElementById('linux-probe-status-text') || document.getElementById('mac-linux-sync-badge');
      if (typeof LunoDeployEngine === 'undefined') {
        alert('LunoDeployEngine module is only mounted inside Luno Workspace. Open Luno to run Fleet Git Sync.');
        return;
      }

      const peerHost = targetHost || LunoDeployEngine.getPeerHost();
      const isLinux = typeof ClientApp !== 'undefined' && (ClientApp.isLinux || ClientApp.activePlatform === 'linux');
      const hostLabel = targetHost ? `Node (${targetHost}:8080)` : (isLinux ? 'Linux' : 'Mac');
      const actionLabel = action === 'push' ? 'Push All' : (action === 'pull' ? 'Catch Up (Pull All)' : 'Cross-Node Fleet Sync');

      if (statusText) statusText.textContent = `⏳ Executing ${actionLabel} on ${hostLabel}...`;

      if (action === 'cross_node') {
        if (statusText) statusText.textContent = `⏳ Syncing ${hostLabel} with peer (${peerHost}:8080)...`;
        const res = await LunoDeployEngine.syncEverything({
          peerHost: peerHost,
          onProgress: function(msg) {
            if (statusText) statusText.textContent = msg;
          }
        });

        if (res && res.success) {
          alert(`✅ Fleet Sync Complete!\n${res.summary}`);
          if (statusText) statusText.textContent = '✓ Repositories in sync with peer & GitHub Pages';
        } else {
          alert(`⚠️ Fleet sync notice:\n${res?.error || 'Check network connection'}`);
        }
        return;
      }

      const res = await LunoDeployEngine.fleetSync(action, { host: targetHost });
      if (res && res.success) {
        alert(`✅ ${actionLabel} Complete for ${res.totalRepos || 0} repositories on ${hostLabel}!`);
        if (statusText) statusText.textContent = `✓ ${actionLabel} Succeeded (${new Date().toLocaleTimeString()})`;
      } else {
        alert(`❌ ${actionLabel} Error:\n${res?.error || 'Failed'}`);
      }
    }
  static _buildHeader() {
    return makeElement('div', {
      style: { padding: '12px 16px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '18px' } }, '🏛️'),
        makeElement('div', {}, [
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', display: 'block' } }, 'Master Opus Router & Fleet Git Synchronizer'),
          makeElement('span', { style: { fontSize: '10px', color: '#94a3b8' } }, 'The 4 Quadrants of Rob Brown • Universal Port 8080 Git Mesh')
        ])
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' } }, [
        makeElement('button', { className: 'dr-nav-btn primary', style: { padding: '5px 12px', fontSize: '11px', fontWeight: 'bold' }, onclick: () => this.copyHandoffPrompt() }, '📋 Copy Handoff Prompt'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '5px 10px', fontSize: '11px', color: '#d2a8ff', borderColor: '#8257e5' }, onclick: () => this.pushHandoffToOutbox() }, '📤 Push to Outbox')
      ])
    ]);
  }

  static _buildGitBanner() {
    return makeElement('div', {
      style: { padding: '10px 16px', background: 'linear-gradient(135deg, #0d2818 0%, #0d1117 100%)', borderBottom: '1px solid #238636', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('strong', { style: { color: '#3fb950', fontSize: '12px' } }, '⚡ 1-Tap Fleet Git Sync:'),
        makeElement('span', { id: 'fleet-mini-status', style: { color: '#8b949e', fontSize: '11px' } }, 'Mac Mini & Linux synchronized across 50+ Git repositories')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '3px 8px', fontSize: '10.5px', background: '#238636', color: '#fff', border: 'none', fontWeight: 'bold' }, onclick: () => this.syncFleetGit('push') }, '⬆️ Push All (Local)'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '3px 8px', fontSize: '10.5px', color: '#00f2fe', borderColor: '#00f2fe66' }, onclick: () => this.syncFleetGit('pull') }, '⬇️ Pull All (Local)'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '3px 8px', fontSize: '10.5px', background: '#271052', color: '#d2a8ff', border: '1px solid #8257e5', fontWeight: 'bold' }, onclick: () => this.syncFleetGit('cross_node') }, '🌐 Sync Mac ➔ Linux (1-Tap)')
      ])
    ]);
  }

  static _buildFilterBar(state, onFilterChange) {
    const searchInput = makeElement('input', {
      id: 'opus-search-input', type: 'text',
      placeholder: '🔍 Search projects, patents, models (e.g. QuoraToys, AccuDraw, Robot Dividend)...',
      style: { flex: '1 1 280px', background: '#070a13', border: '1px solid #30363d', borderRadius: '6px', padding: '6px 10px', color: '#00f2fe', fontSize: '11px', fontFamily: 'monospace', outline: 'none' },
      oninput: (e) => { state.query = e.target.value.toLowerCase().trim(); onFilterChange(); }
    });

    const chips = makeElement('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } });
    const filters = [
      { id: 'all', label: 'All Projects' }, { id: 'OPUS', label: '👑 Opus Master' },
      { id: 'I', label: 'Q-I: CAD Inventions' }, { id: 'II', label: 'Q-II: Narrative & Valuation' },
      { id: 'III', label: 'Q-III: Post-Labor Economics' }, { id: 'IV', label: 'Q-IV: Fleet & Cockpit' }
    ];
    filters.forEach(f => {
      const btn = makeElement('button', {
        className: `dr-tab-btn ${f.id === 'all' ? 'active' : ''}`, style: { padding: '3px 8px', fontSize: '10.5px' },
        onclick: () => {
          state.activeFilter = f.id;
          chips.querySelectorAll('.dr-tab-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          onFilterChange();
        }
      }, f.label);
      chips.appendChild(btn);
    });

    return makeElement('div', {
      style: { padding: '10px 16px', background: '#0d1117', borderBottom: '1px solid #161e2b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }
    }, [searchInput, chips]);
  }

  static _renderCards(cardsContainer, state) {
    cardsContainer.innerHTML = '';
    const filtered = this.getProjectsCatalog().filter(p => {
      if (state.activeFilter !== 'all' && p.quadrant !== state.activeFilter) return false;
      if (!state.query) return true;
      return `${p.name} ${p.title} ${p.desc} ${p.keyFacts.join(' ')}`.toLowerCase().includes(state.query);
    });
    if (filtered.length === 0) {
      cardsContainer.innerHTML = '<div style="grid-column: 1/-1; padding: 28px; text-align: center; color: #64748b; font-style: italic;">No projects matched your search query.</div>';
      return;
    }
    filtered.forEach(p => cardsContainer.appendChild(this._renderProjectCard(p)));
  }

  static _renderProjectCard(p) {
      const isOpus = p.name === 'Opus' || p.name === 'Portal', isQuora = p.name === 'QuoraToys';
      const card = makeElement('div', {
        style: {
          background: isOpus ? 'rgba(0, 242, 254, 0.08)' : (isQuora ? 'rgba(192, 132, 252, 0.08)' : 'rgba(255, 255, 255, 0.02)'),
          border: `1.5px solid ${isOpus ? '#00f2fe' : (isQuora ? '#c084fc' : p.color + '33')}`,
          borderLeft: `5px solid ${p.color}`, borderRadius: '8px', padding: '12px 14px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px'
        }
      });
      card.appendChild(makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' } }, [
        makeElement('div', {}, [
          makeElement('span', { style: { fontSize: '10px', color: p.color, fontWeight: 'bold' } }, isOpus ? 'MASTER GATEWAY • ' : `QUADRANT ${p.quadrant} • `),
          makeElement('strong', { style: { color: isOpus ? '#00f2fe' : (isQuora ? '#d2a8ff' : '#f8fafc'), fontSize: '13.5px' } }, `${p.icon} ${p.name}`),
          makeElement('div', { style: { color: p.color, fontSize: '10.5px', marginTop: '1px' } }, p.title)
        ]),
        makeElement('span', { style: { fontSize: '9px', background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}44`, padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold', flexShrink: 0 } }, isOpus ? 'MASTER' : (isQuora ? 'ACTIVE TARGET' : `Q-${p.quadrant}`))
      ]));
      card.appendChild(makeElement('p', { style: { margin: 0, fontSize: '11px', color: '#cbd5e1', lineHeight: '1.45' } }, p.desc));
      card.appendChild(makeElement('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' } }, p.keyFacts.map(k => makeElement('span', {
        style: { fontSize: '9px', background: '#070a13', color: '#94a3b8', border: '1px solid #1e293b', padding: '1px 5px', borderRadius: '4px' }
      }, k))));
      card.appendChild(makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #161e2b', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('a', { href: p.url, target: '_blank', rel: 'noopener noreferrer', style: { color: '#38bdf8', textDecoration: 'none', fontSize: '10.5px', fontWeight: 'bold' } }, '↗ Open Tab'),
        makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
          makeElement('button', {
            className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '9.5px', color: isOpus ? '#00f2fe' : (isQuora ? '#d2a8ff' : '#c9d1d9') },
            onclick: () => {
              const lunoApp = globalThis.ClientApp || window.parent?.ClientApp || window.opener?.ClientApp;
              if (lunoApp && typeof lunoApp.switchExclusiveTargetProject === 'function') {
                lunoApp.switchExclusiveTargetProject(p.name);
              } else if (lunoApp && typeof lunoApp.setTargetProject === 'function') {
                lunoApp.setTargetProject(p.name, { openTab: true });
              } else {
                window.open(p.url, '_blank', 'noopener,noreferrer');
              }
            }
          }, '🎯 Target'),
          makeElement('button', {
            className: 'dr-nav-btn', style: { padding: '2px 7px', fontSize: '9.5px', color: '#d2a8ff', borderColor: '#8257e566' },
            onclick: () => navigator.clipboard.writeText(`# PROJECT FOCUS: [${p.name}] - ${p.title}\nDomain: ${p.quadrant}\nAuthor: Rob Brown (Inventor of AccuDraw)\nDescription: ${p.desc}\nKey Technical Aspects:\n- ${p.keyFacts.join('\n- ')}\n`).then(() => alert(`✓ Copied context for [${p.name}] to clipboard!`))
          }, '📋 Context')
        ])
      ]));
      return card;
    }
  static _buildFooter() {
    return makeElement('div', {
      style: { padding: '10px 16px', background: '#0a0e1a', borderTop: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '11px', color: '#8b949e' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } }, [
        makeElement('span', {}, 'Fleet Link:'),
        makeElement('span', { id: 'mac-linux-sync-badge', style: { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' } }, 'Mac & Linux Federated (Port 8080)'),
        makeElement('button', { className: 'dr-nav-btn', id: 'btn-probe-linux-link', style: { padding: '2px 8px', fontSize: '10px', color: '#00f2fe' }, onclick: () => this.probeLinuxLink() }, '⚡ Probe Remote Node')
      ]),
      makeElement('span', { style: { color: '#00f2fe' } }, '● All 4 Quadrants + QuoraToys Synced')
    ]);
  }

  static getProjectsCatalog() {
      const u = (p, h = '') => HomeHandoffComponent.resolveAppUrl(p, h);
      return [
        { quadrant: 'OPUS', name: 'Portal', title: 'Public Front Page & Live Summary Engine', color: '#00f2fe', icon: '🌐', desc: 'Visitor-ready front page presenting Luno, HomeSetup, Career/CAD, Financial Valuation, Family Context, and Economics with live summaries.json generation and AI export keys.', keyFacts: ['Public Front Door', 'Summary JSON Engine', 'Non-Inflammatory Tone', 'DocumentReader Dual-Mode'], url: u('Portal') },
        { quadrant: 'OPUS', name: 'Opus', title: 'The Master Opus Router & Living Portfolio', color: '#00f2fe', icon: '👑', desc: 'Master orchestrator uniting all four quadrants of Rob Brown: CAD inventions, personal narrative & legal valuation, post-labor economics, and the multi-node cockpit.', keyFacts: ['All 4 Quadrants', 'Master Gateway', 'Tiered Summaries'], url: u('Opus') },
        { quadrant: 'IV', name: 'QuoraToys', title: 'Quora Spatial Annotation & Archival Tools', color: '#c084fc', icon: '🧸', desc: 'In-situ bookmarklet, Chrome extension, and archival tool for rich canvas annotations, drawing layers, and thread capturing directly in Quora.', keyFacts: ['Bookmarklet Workshop', 'DrawingApp', 'Archival Engine'], url: u('QuoraToys') },
        { quadrant: 'I', name: 'CadPlan', title: 'Master CAD Specification & 3D Lab', color: '#00f2fe', icon: '📐', desc: '3D AccuDraw constraint engine, 50ms chorded tentative snapping, SmartLine chaining, DXF bulge factors tan(θ/4), and on-curve spline relaxation.', keyFacts: ['US Patent #5,754,182', '3-Axis Mini-Jack', 'No-Enter Key Commands'], url: u('CadPlan') },
        { quadrant: 'I', name: 'accuCad', title: 'Unified 3D WebGL Workstation', color: '#00f2fe', icon: '🏛️', desc: 'Production Three.js drafting studio with direction-cosine orientation basis, GLB model face snapping [Q], and DXF exporter.', keyFacts: ['Live 3D Viewport', 'PBR Materials', 'AccuDrawLogic Kernel'], url: u('accuCad') },
        { quadrant: 'I', name: 'accudraw', title: '30-Year Historical Lore & Patents', color: '#00f2fe', icon: '📜', desc: 'Archive of Bentley Systems corporate first patent, 1995–1996 MicroStation Manager reprints, and public-domain spatial math.', keyFacts: ['Sole Inventor: Rob Brown', 'MicroStation 95 Baseline', 'Public Domain Math'], url: u('accudraw') },
        { quadrant: 'II', name: 'situation', title: 'Executive Career Dossier & Legal Reality', color: '#ef4444', icon: '⚖️', desc: 'Nov 2026 personal & legal dossier: $1.2B–$5.54B+ ($2.3B midpoint) valuation vs. past hardship, stabilized living status, daughter court filings, and POA boundary exhibits.', keyFacts: ['$2.3B Midpoint Valuation', 'Nov 2026 Stabilized', 'Court & Elder Advocacy'], url: u('situation') },
        { quadrant: 'II', name: 'ValuationOfAccudraw', title: 'Forensic Enterprise Valuation Model', color: '#ef4444', icon: '📊', desc: 'Quantitative market cap attribution modeling Bentley Systems State DOT lock-in, recurring revenues, and AutoCAD R13 anti-churn moat.', keyFacts: ['$1.2B–$5.54B+ Attribution', '48 State DOTs', 'Anti-Churn Moat'], url: u('ValuationOfAccudraw') },
        { quadrant: 'III', name: 'EconomicsOfAutomation', title: 'The Robot Dividend & Post-Labor Model', color: '#f59e0b', icon: '🤖', desc: 'First-principles macroeconomic model for surviving automation: the Colony of 100,000, tangible currency, and game theory stress-testing.', keyFacts: ['The Robot Dividend', 'Doomer Loop Breaker', 'Interactive Tax Simulator'], url: u('EconomicsOfAutomation') },
        { quadrant: 'III', name: 'JobsAndAI', title: 'The Automation Horizon Analysis', color: '#f59e0b', icon: '📈', desc: 'Empirical analysis of generative AI and spatial robotics replacing human labor, proving why traditional payroll taxation collapses.', keyFacts: ['Labor Decoupling', 'Capital Saturation', 'Macroeconomic Thesis'], url: u('JobsAndAI') },
        { quadrant: 'IV', name: 'HomeSetup', title: 'Multi-Node Fleet & Infrastructure Dossier', color: '#10b981', icon: '🖥️', desc: 'Operational cockpit: Port 8080 federation between Ubuntu (10.0.0.245) and Mac Mini (10.0.0.226), 60 projects, shared storage, and handoff ledgers.', keyFacts: ['Universal Port 8080', '60 Projects / 50+ Repos', 'Zero-Leak Security'], url: u('HomeSetup') },
        { quadrant: 'IV', name: 'Luno', title: 'Phone-First Dual-Mode AI Cockpit', color: '#10b981', icon: '🌙', desc: 'Zero-token clipboard container development loop, in-browser Acorn AST class patcher, Outbox queue manager, and 1-tap Pages deploy.', keyFacts: ['HTML Container Protocol', 'In-Browser Acorn AST', '1-Tap GitHub Pages'], url: u('Luno') },
        { quadrant: 'IV', name: 'Library', title: 'Central Shared Dependency Hub', color: '#10b981', icon: '📚', desc: 'Reusable shared modules powering all projects: DomBasics, UITools, DocumentReader, ThreeJSLoader, VideoPlayer, and DictationWidget.', keyFacts: ['Zero-Copy Architecture', 'Universal UI Elements', 'Audio/Midi Engines'], url: u('Library') }
      ];
    }
  static resolveAppUrl(projectName, hash = '') {
      if (!projectName) return '#';
      const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
      if (typeof window !== 'undefined' && window.location) {
        const host = window.location.hostname || '';
        if (host.endsWith('.github.io')) {
          const user = host.split('.')[0] || 'karmatics';
          return `https://${user}.github.io/${projectName}/index.html${cleanHash}`;
        }
        if (window.location.protocol === 'about:') {
          try {
            const pHost = window.parent?.location?.hostname || '';
            if (pHost.endsWith('.github.io')) {
              const user = pHost.split('.')[0] || 'karmatics';
              return `https://${user}.github.io/${projectName}/index.html${cleanHash}`;
            }
            if (window.parent?.location?.origin && window.parent.location.origin !== 'null') {
              return `${window.parent.location.origin}/${projectName}/index.html${cleanHash}`;
            }
          } catch (e) {}
          return `https://karmatics.github.io/${projectName}/index.html${cleanHash}`;
        }
      }
      return `../${projectName}/index.html${cleanHash}`;
    }
}

globalThis.HomeHandoffComponent = HomeHandoffComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeHandoffComponent;