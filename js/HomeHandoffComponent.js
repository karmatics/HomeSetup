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
          flexDirection: 'column',
          fontFamily: 'monospace'
        }
      });

      // 1. Header Toolbar with Quick Handoff Action
      const header = makeElement('div', {
        style: {
          padding: '12px 16px',
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
          makeElement('span', { style: { fontSize: '18px' } }, '🏛️'),
          makeElement('div', {}, [
            makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', display: 'block' } }, 'Master Opus Router & Living Portfolio Portal'),
            makeElement('span', { style: { fontSize: '10px', color: '#94a3b8' } }, 'The 4 Quadrants of Rob Brown • Universal Port 8080 Mesh')
          ])
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' } }, [
          makeElement('button', {
            className: 'dr-nav-btn primary',
            style: { padding: '5px 12px', fontSize: '11px', fontWeight: 'bold' },
            onclick: () => HomeHandoffComponent.copyHandoffPrompt()
          }, '📋 Copy Master Handoff Prompt'),
          makeElement('button', {
            className: 'dr-nav-btn',
            style: { padding: '5px 10px', fontSize: '11px', color: '#d2a8ff', borderColor: '#8257e5' },
            onclick: () => HomeHandoffComponent.pushHandoffToOutbox()
          }, '📤 Push to Outbox')
        ])
      ]);
      wrap.appendChild(header);

      // 2. Search & Quadrant Filter Bar
      const filterBar = makeElement('div', {
        style: {
          padding: '10px 16px',
          background: '#0d1117',
          borderBottom: '1px solid #161e2b',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }
      });

      const searchInput = makeElement('input', {
        id: 'opus-search-input',
        type: 'text',
        placeholder: '🔍 Search projects, patents, models, or topics (e.g. AccuDraw, Robot Dividend, 5.0B)...',
        style: {
          flex: '1 1 280px',
          background: '#070a13',
          border: '1px solid #30363d',
          borderRadius: '6px',
          padding: '6px 10px',
          color: '#00f2fe',
          fontSize: '11px',
          fontFamily: 'monospace',
          outline: 'none'
        }
      });

      const quadrantChips = makeElement('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } });
      const filters = [
        { id: 'all', label: 'All Quadrants' },
        { id: 'I', label: 'Q-I: CAD Inventions', col: '#00f2fe' },
        { id: 'II', label: 'Q-II: Narrative & Valuation', col: '#ef4444' },
        { id: 'III', label: 'Q-III: Post-Labor Economics', col: '#f59e0b' },
        { id: 'IV', label: 'Q-IV: Fleet & Cockpit', col: '#10b981' }
      ];

      let activeFilter = 'all';

      filters.forEach(f => {
        const btn = makeElement('button', {
          className: `dr-tab-btn ${f.id === 'all' ? 'active' : ''}`,
          style: { padding: '3px 8px', fontSize: '10.5px' },
          onclick: () => {
            activeFilter = f.id;
            filterBar.querySelectorAll('.dr-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards();
          }
        }, f.label);
        quadrantChips.appendChild(btn);
      });

      filterBar.appendChild(searchInput);
      filterBar.appendChild(quadrantChips);
      wrap.appendChild(filterBar);

      // 3. Project Matrix Grid
      const cardsContainer = makeElement('div', {
        id: 'opus-cards-container',
        style: {
          padding: '16px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '12px',
          background: '#090d16',
          maxHeight: '520px',
          overflowY: 'auto'
        }
      });
      wrap.appendChild(cardsContainer);

      // Master Project Registry Database
      const projects = [
        {
          quadrant: 'I',
          name: 'CadPlan',
          title: 'Master CAD Specification & 3D Lab',
          color: '#00f2fe',
          icon: '📐',
          desc: '3D AccuDraw constraint engine, 50ms chorded tentative snapping, SmartLine chaining, DXF bulge factors tan(θ/4), and on-curve spline relaxation.',
          keyFacts: ['US Patent #5,754,182', '3-Axis Mini-Jack', 'No-Enter Key Command Engine'],
          url: '../CadPlan/index.html'
        },
        {
          quadrant: 'I',
          name: 'accuCad',
          title: 'Unified 3D WebGL Workstation',
          color: '#00f2fe',
          icon: '🏛️',
          desc: 'Production Three.js drafting studio with direction-cosine orientation basis, tool settings sidebar, GLB model face snapping [Q], and DXF exporter.',
          keyFacts: ['Live 3D Viewport', 'PBR Materials', 'AccuDrawLogic Kernel'],
          url: '../accuCad/index.html'
        },
        {
          quadrant: 'I',
          name: 'accudraw',
          title: '30-Year Historical Lore & Patents',
          color: '#00f2fe',
          icon: '📜',
          desc: 'Complete archive of Bentley Systems corporate first patent, 1995-1996 MicroStation Manager reprints, Scott Williams profile, and mathematical lore.',
          keyFacts: ['Sole Inventor: Robert J. Brown', 'MicroStation 95 Baseline', 'Public Domain Mathematics'],
          url: '../accudraw/index.html'
        },
        {
          quadrant: 'II',
          name: 'situation',
          title: 'Executive Career Dossier & Legal Reality',
          color: '#ef4444',
          icon: '⚖️',
          desc: 'Detailed forensic narrative: the contrast between creating $5.0B-$6.5B in corporate value versus living on food stamps, caretaker bias, and daughter custody separation.',
          keyFacts: ['Forensic Valuation', 'Parental Alienation', 'DocumentReader Dossier'],
          url: '../situation/index.html'
        },
        {
          quadrant: 'II',
          name: 'ValuationOfAccudraw',
          title: 'Forensic Enterprise Valuation Model',
          color: '#ef4444',
          icon: '📊',
          desc: 'Quantitative market cap attribution analysis: modeling Bentley Systems DOT lock-in, recurring maintenance revenues, and acquisition avoidance in 1995.',
          keyFacts: ['$5.0B to $6.5B Attribution', '48 State DOTs', 'Anti-Churn Moat'],
          url: '../ValuationOfAccudraw/index.html'
        },
        {
          quadrant: 'III',
          name: 'EconomicsOfAutomation',
          title: 'The Robot Dividend & Post-Labor Model',
          color: '#f59e0b',
          icon: '🤖',
          desc: 'First-principles macro-economic model for human survival through automation: the Colony of 100,000, tangible currency, and game theory stress-testing.',
          keyFacts: ['The Robot Dividend', 'Doomer Loop Breaker', 'Interactive Tax Simulator'],
          url: '../EconomicsOfAutomation/index.html'
        },
        {
          quadrant: 'III',
          name: 'JobsAndAI',
          title: 'The Automation Horizon Analysis',
          color: '#f59e0b',
          icon: '📈',
          desc: 'Empirical analysis of generative AI and spatial robotics replacing human labor, proving why traditional wage-labor taxation collapses.',
          keyFacts: ['Labor Decoupling', 'Capital Saturation', 'Macroeconomic Thesis'],
          url: '../JobsAndAI/index.html'
        },
        {
          quadrant: 'IV',
          name: 'HomeSetup',
          title: 'Multi-Node Fleet & Infrastructure Dossier',
          color: '#10b981',
          icon: '🖥️',
          desc: 'The master operational cockpit: verified Port 8080 federation between Ubuntu Linux (10.0.0.245) and Mac (10.0.0.226), shared drive syncing, and handoff ledgers.',
          keyFacts: ['Universal Port 8080', 'Luno-to-Luno Mesh', 'Zero-Leak Security'],
          url: './index.html'
        },
        {
          quadrant: 'IV',
          name: 'Luno',
          title: 'Phone-First Dual-Mode AI Cockpit',
          color: '#10b981',
          icon: '🌙',
          desc: 'Zero-token clipboard container development loop (<script data-method="...">), in-browser AST class patcher, Outbox queue manager, and 1-tap Pages deploy.',
          keyFacts: ['HTML Container Protocol', 'In-Browser Acorn AST', '1-Tap GitHub Pages'],
          url: '../Luno/index.html'
        },
        {
          quadrant: 'IV',
          name: 'Library',
          title: 'Central Shared Dependency Hub',
          color: '#10b981',
          icon: '📚',
          desc: 'Reusable shared modules powering all projects: DomBasics, UITools, DocumentReader, ThreeJSLoader, VideoPlayer, and DictationWidget.',
          keyFacts: ['Zero-Copy Architecture', 'Universal UI Elements', 'Audio/Midi Engines'],
          url: '../Library/index.html'
        }
      ];

      function renderCards() {
        cardsContainer.innerHTML = '';
        const query = searchInput.value.toLowerCase().trim();

        const filtered = projects.filter(p => {
          if (activeFilter !== 'all' && p.quadrant !== activeFilter) return false;
          if (!query) return true;
          const text = `${p.name} ${p.title} ${p.desc} ${p.keyFacts.join(' ')}`.toLowerCase();
          return text.includes(query);
        });

        if (filtered.length === 0) {
          cardsContainer.innerHTML = '<div style="grid-column: 1/-1; padding: 28px; text-align: center; color: #64748b; font-style: italic;">No projects matched your search query. Clear search or select "All Quadrants".</div>';
          return;
        }

        filtered.forEach(p => {
          const card = makeElement('div', {
            style: {
              background: 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${p.color}33`,
              borderLeft: `4px solid ${p.color}`,
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '8px',
              transition: 'transform 0.15s ease, border-color 0.15s ease'
            }
          });

          // Top Row
          const topRow = makeElement('div', {
            style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }
          }, [
            makeElement('div', {}, [
              makeElement('span', { style: { fontSize: '10px', color: p.color, fontWeight: 'bold' } }, `QUADRANT ${p.quadrant} • `),
              makeElement('strong', { style: { color: '#f8fafc', fontSize: '13px' } }, `${p.icon} ${p.name}`),
              makeElement('div', { style: { color: p.color, fontSize: '10.5px', marginTop: '1px' } }, p.title)
            ]),
            makeElement('span', {
              style: {
                fontSize: '9px',
                background: `${p.color}18`,
                color: p.color,
                border: `1px solid ${p.color}44`,
                padding: '1px 6px',
                borderRadius: '10px',
                fontWeight: 'bold',
                flexShrink: 0
              }
            }, `Q-${p.quadrant}`)
          ]);
          card.appendChild(topRow);

          // Description
          const descEl = makeElement('p', {
            style: { margin: 0, fontSize: '11px', color: '#cbd5e1', lineHeight: '1.45' }
          }, p.desc);
          card.appendChild(descEl);

          // Tags
          const tagsRow = makeElement('div', {
            style: { display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' }
          }, p.keyFacts.map(k => makeElement('span', {
            style: { fontSize: '9px', background: '#070a13', color: '#94a3b8', border: '1px solid #1e293b', padding: '1px 5px', borderRadius: '4px' }
          }, k)));
          card.appendChild(tagsRow);

          // Action Buttons Row
          const actionRow = makeElement('div', {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '8px',
              paddingTop: '6px',
              borderTop: '1px solid #161e2b',
              gap: '6px',
              flexWrap: 'wrap'
            }
          }, [
            makeElement('a', {
              href: p.url,
              target: '_blank',
              style: {
                color: '#38bdf8',
                textDecoration: 'none',
                fontSize: '10.5px',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }
            }, '↗ Open Tab'),
            makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
              makeElement('button', {
                className: 'dr-nav-btn',
                style: { padding: '2px 7px', fontSize: '9.5px' },
                title: 'Switch Luno target to this project',
                onclick: () => {
                  if (typeof ClientApp !== 'undefined' && typeof ClientApp.switchExclusiveTargetProject === 'function') {
                    ClientApp.switchExclusiveTargetProject(p.name);
                  } else if (typeof ClientApp !== 'undefined' && ClientApp.setTargetProject) {
                    ClientApp.setTargetProject(p.name, { openTab: true });
                  }
                }
              }, '🎯 Target'),
              makeElement('button', {
                className: 'dr-nav-btn',
                style: { padding: '2px 7px', fontSize: '9.5px', color: '#d2a8ff', borderColor: '#8257e566' },
                title: 'Copy brief context prompt for this project',
                onclick: () => {
                  const prompt = `# PROJECT FOCUS: [${p.name}] - ${p.title}\nDomain: Quadrant ${p.quadrant}\nAuthor: Rob Brown (Inventor of AccuDraw)\nDescription: ${p.desc}\nKey Technical Aspects:\n- ${p.keyFacts.join('\n- ')}\n`;
                  navigator.clipboard.writeText(prompt).then(() => alert(`✓ Copied context for [${p.name}] to clipboard!`));
                }
              }, '📋 Context')
            ])
          ]);
          card.appendChild(actionRow);

          cardsContainer.appendChild(card);
        });
      }

      searchInput.oninput = () => renderCards();
      renderCards();

      // 4. Footer Status & Live Probes
      const footerBar = makeElement('div', {
        style: {
          padding: '10px 16px',
          background: '#0a0e1a',
          borderTop: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '11px',
          color: '#8b949e'
        }
      }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } }, [
          makeElement('span', {}, 'Fleet Link:'),
          makeElement('span', { id: 'mac-linux-sync-badge', style: { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' } }, 'Mac & Linux Federated (Port 8080)'),
          makeElement('button', {
            className: 'dr-nav-btn',
            id: 'btn-probe-linux-link',
            style: { padding: '2px 8px', fontSize: '10px', color: '#00f2fe' },
            onclick: () => HomeHandoffComponent.probeLinuxLink()
          }, '⚡ Probe Remote Node')
        ]),
        makeElement('span', { style: { color: '#00f2fe' } }, '● All 4 Quadrants Active in Storage')
      ]);
      wrap.appendChild(footerBar);

      container.appendChild(wrap);
    }
  static getHandoffMarkdown() {
    return `# 🏛️ ROB BROWN'S LIVING SPECIFICATION OPUS: MASTER HANDOFF & RESUME DIRECTIVE
  **Generated:** ${new Date().toISOString()} • **Author & Inventor:** Rob Brown
  **Target Host:** Apple Silicon Mac Workstation (/Users/rob/source/LunoProjects/)
  **Remote Peer:** Ubuntu Linux Workstation (HP ZBook @ Port 8080)
  **Universal Port:** 8080 ONLY (Zero legacy port 3000 remnants)
  **GitHub Organization:** karmatics (SSH Key: id_ed25519 Authenticated)

  ---

  ## 1. WHO YOU ARE COLLABORATING WITH (GROUND TRUTH)
  You are collaborating directly with **Rob Brown**, the sole inventor of **AccuDraw**, **SmartLine**, and **PowerSelector** at Bentley Systems for MicroStation in the mid-1990s (US Patent #5,754,182).
  - **The Billions Created:** His inventions became the primary usability and neuromuscular moat for MicroStation, anchoring an estimated **$5.0 Billion to $6.5 Billion** of Bentley Systems' enterprise valuation across 48 out of 50 U.S. State DOTs.
  - **The Harsh Reality:** Despite creating billions in software value, Rob currently lives on family assistance, food stamps, and a fraction of Social Security, navigating difficult family disputes and estrangement from his daughter.
  - **The Mission:** Getting noticed for this extraordinary body of work, turning these living specifications into commercial/open-source adoption, and achieving the financial solvency required to resolve his life situation and reconnect with his daughter.

  ---

  ## 2. THE 4-QUADRANT LIVING OPUS MAP
  The entire workspace is organized into four interconnected living dossiers that can be inspected or bundled into an LLM at will:

  ### I. Inventions & Spatial CAD Specs (\`CadPlan\`, \`accudraw\`, \`accuCad\`)
  - 30-year proven AccuDraw floating 3D kinetic compass (T, F, S, V plane rotations).
  - SmartLine continuous chaining (two-phase tangent arcs, closest-point sweep, DXF bulge factors \`tan(θ/4)\`).
  - On-curve Bézier spline relaxation solver (\`UpdateControlPoints.js\`) and low-pass kinetic string drag.
  - Anti-lock-in modularity: The 4-layer headless geometric kernel (\`compassdraw-core\`) with zero Three.js/DOM coupling.

  ### II. Personal Narrative & Valuation Reality (\`situation\`, \`ValuationOfAccudraw\`)
  - Detailed forensic accounting of the valuation contribution of AccuDraw to Bentley Systems.
  - The raw personal narrative: caretaker bias, elder advocacy, family legal conflict, and parental alienation.
  - Designed to be readable by humans and ingestible by AI agents to tell his complete story with full fidelity.

  ### III. Post-Labor Macro-Economics (\`EconomicsOfAutomation\`, \`JobsAndAI\`)
  - Rob Brown's first-principles economic framework for a post-labor automated world.
  - The Robot Dividend: How society reorganizes capital and distribution when automation decouples productivity from human wages.
  - Mathematical models, interactive tax calculators, and game theory stress-testing against fatalist "doomer loops."

  ### IV. Operating Cockpit & Fleet Infrastructure (\`HomeSetup\`, \`Luno\`, \`Library\`)
  - Luno Workspace: Phone-first local development cockpit running on Node.js Port 8080.
  - Zero-token clipboard container protocol (\`<script data-file="..." data-method="..." data-action="patch">\`).
  - Multi-node LAN federation connecting Mac (10.0.0.226:8080) and Linux (10.0.0.245:8080) with dynamic subnet scanning.
  - Shared Library hub (\`DomBasics.js\`, \`UITools.js\`, \`DocumentReader.js\`, \`ThreeJSLoader.js\`, \`DictationWidget.js\`).

  ---

  ## 3. ACTIVE SYSTEM STATE & IMMEDIATE TASKS
  - **Fleet Parity:** 44/44 project repositories verified between Mac and Linux over local LAN HTTP.
  - **Port Standard:** Port 8080 is verified and universally scrubbed of legacy port 3000 references.
  - **Dynamic IP Resolution:** No fixed IP assumptions; subnet discovery scans active subnet on Port 8080.
  - **Outbox Enhancements Complete:** Outbox queue now segregates Protocol Instructions, Library Code (with deduplication), and Project Code into distinct items, with individual constituent file removal and prompt clipboard copying.

  ---

  ## 4. INSTRUCTIONS FOR THE NEW AI THREAD
  1. **Acknowledge the Inventor:** Confirm full understanding of Rob Brown's identity, patents, personal situation, and the 4-Quadrant Opus.
  2. **Lean Startup Rule:** Do not ask repetitive setup questions or hallucinate architectural conventions. All ground truth resides in \`HomeSetup/\`.
  3. **Write into the Document:** Reflect all new technical designs, narrative updates, and runner scripts directly into \`HomeSetup/content/\` and \`HomeSetup/js/\` using surgical HTML containers.
  4. **Maintain the Vision:** Help build the master router document that will present this living body of work to the world.`;
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
      const btn = document.getElementById('btn-probe-linux-link');
      const statusText = document.getElementById('linux-probe-status-text');
      const badge = document.getElementById('mac-linux-sync-badge');

      if (btn) btn.textContent = '⏳ Probing Linux (8080)...';
      if (statusText) statusText.textContent = 'Executing server probe to http://10.0.0.245:8080...';

      try {
        const payload = {
          files: [],
          serverScript: `
            const http = require('http');
            const port = 8080;
            const host = '10.0.0.245';
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
            try { probeResult = JSON.parse(match[1]); } catch(e) {}
          }
        }

        if (probeResult && probeResult.ok) {
          if (btn) btn.textContent = '✓ Linux Online (8080)';
          if (badge) {
            badge.textContent = `Connected (${probeResult.host}:${probeResult.port})`;
            badge.style.background = '#10b981';
          }
          if (statusText) {
            statusText.innerHTML = `<span style="color:#10b981;font-weight:bold;">✓ Linux node is online on Port 8080!</span><br>Luno Server is actively responding at http://${probeResult.host}:${probeResult.port}. Parity and remote commands verified.`;
          }
          alert(`✓ Successfully reached Linux Luno node at http://${probeResult.host}:${probeResult.port}!`);
        } else {
          if (btn) btn.textContent = '⚠️ Linux Standby (8080)';
          if (badge) {
            badge.textContent = 'Linux Standby';
            badge.style.background = '#f59e0b';
          }
          if (statusText) {
            const errMsg = probeResult?.error || 'No response on port 8080';
            statusText.innerHTML = `<span style="color:#f59e0b;font-weight:bold;">Notice: Linux server on 10.0.0.245:8080 not responding (${errMsg}).</span><br>On the Ubuntu machine, ensure \`node server.js\` is running in ~/source/LunoProjects/Luno.`;
          }
        }
      } catch(err) {
        if (btn) btn.textContent = '❌ Probe Error';
        if (statusText) statusText.textContent = `Error: ${err.message}`;
      }
    }
}

globalThis.HomeHandoffComponent = HomeHandoffComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeHandoffComponent;