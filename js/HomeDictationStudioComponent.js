class HomeDictationStudioComponent {
  static render(container) {
    container.innerHTML = '';
    const state = { activeTab: 'play' };
    const wrap = makeElement('div', {
      style: { background: '#070a13', border: '1.5px solid #21262d', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.65)', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }
    });
    const body = makeElement('div', { id: 'dictation-studio-body', style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '14px' } });
    const renderBody = () => {
      body.innerHTML = '';
      if (state.activeTab === 'play') this._renderTestbedTab(body);
      else if (state.activeTab === 'docs') this._renderDocsTab(body);
      else this._renderAppsTab(body);
    };

    wrap.appendChild(this._buildHeader(state, renderBody));
    wrap.appendChild(body);
    container.appendChild(wrap);
    renderBody();
  }

  static _buildHeader(state, onTabChange) {
    const tabs = [
      { id: 'play', label: '🎮 Live Testbed' },
      { id: 'docs', label: '📖 DictationDocs (26 Sections)' },
      { id: 'apps', label: '🚀 Sub-Apps & Extension' }
    ];
    const btns = tabs.map(t => makeElement('button', {
      className: `dr-tab-btn ${state.activeTab === t.id ? 'active' : ''}`,
      onclick: () => {
        state.activeTab = t.id;
        btns.forEach((b, i) => b.classList.toggle('active', tabs[i].id === t.id));
        onTabChange();
      }
    }, t.label));

    return makeElement('div', {
      style: { padding: '10px 16px', background: 'rgba(15, 23, 42, 0.95)', borderBottom: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { fontSize: '15px' } }, '🎙️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe' } }, 'Universal Speech & Dictation Interactive Studio'),
        makeElement('span', { style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Live Audio & Spec Studio')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, btns)
    ]);
  }

  static _renderTestbedTab(body) {
    const testInput = makeElement('input', {
      id: 'dict-test-input-a', type: 'text', placeholder: 'Click the 🎙️ mic badge on the right to speak into this field...',
      style: { width: '100%', background: '#050811', color: '#f8fafc', border: '1px solid #30363d', borderRadius: '6px', padding: '8px 10px', fontSize: '12px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }
    });
    const testTextarea = makeElement('textarea', {
      id: 'dict-test-textarea-b', placeholder: 'Speak full sentences: say "comma", "period", or "new line"...',
      style: { width: '100%', minHeight: '65px', background: '#050811', color: '#7ee787', border: '1px solid #30363d', borderRadius: '6px', padding: '8px 10px', fontSize: '11.5px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }
    });
    const widgetMount = makeElement('div', { style: { minHeight: '160px' } });

    body.appendChild(makeElement('div', { style: { background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' } }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('strong', { style: { color: '#38bdf8', fontSize: '12px' } }, '1. The 1-Line Drop-In: DictationWidget.attach(input)'),
        makeElement('span', { style: { fontSize: '10px', color: '#10b981' } }, 'Zero Extension Required')
      ]),
      makeElement('label', { style: { fontSize: '10px', color: '#64748b', fontWeight: 'bold' } }, 'SAMPLE INPUT A (Search Field with 🎙️ Badge):'),
      testInput,
      makeElement('label', { style: { fontSize: '10px', color: '#64748b', fontWeight: 'bold' } }, 'SAMPLE INPUT B (Multi-Line Notes with 🎙️ Badge):'),
      testTextarea
    ]));

    body.appendChild(makeElement('div', { style: { background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' } }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('strong', { style: { color: '#00f2fe', fontSize: '12px' } }, '2. Full Production DictationWidget Instance'),
        makeElement('span', { style: { fontSize: '10px', color: '#f59e0b' } }, 'Permanent 🧹 Clear Button Active')
      ]),
      widgetMount
    ]));

    body.appendChild(this._buildVocabTrainer());

    setTimeout(() => {
      if (typeof DictationWidget !== 'undefined') {
        DictationWidget.attach(testInput);
        DictationWidget.attach(testTextarea);
        widgetMount.appendChild(new DictationWidget({ compact: true, placeholder: 'Speak into full DictationWidget instance...' }).getElement());
      }
    }, 40);
  }

  static _buildVocabTrainer() {
    const heardInput = makeElement('input', { type: 'text', placeholder: 'When heard (e.g. "luna")...', style: { flex: 1, minWidth: '150px', background: '#050811', border: '1px solid #30363d', borderRadius: '4px', padding: '5px 8px', color: '#f8fafc', fontSize: '11px', outline: 'none' } });
    const writeInput = makeElement('input', { type: 'text', placeholder: 'Write as (e.g. "Luno")...', style: { flex: 1, minWidth: '150px', background: '#050811', border: '1px solid #30363d', borderRadius: '4px', padding: '5px 8px', color: '#00f2fe', fontSize: '11px', outline: 'none' } });
    const vocabListEl = makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' } });

    const renderList = () => {
      vocabListEl.innerHTML = '';
      const existing = JSON.parse(localStorage.getItem('dictation_custom_replacements') || '{}');
      const keys = Object.keys(existing);
      if (!keys.length) {
        vocabListEl.innerHTML = '<span style="color:#64748b;font-size:10px;font-style:italic;">No custom replacements saved yet.</span>';
        return;
      }
      keys.forEach(k => vocabListEl.appendChild(makeElement('span', {
        style: { background: 'rgba(210,168,255,0.1)', border: '1px solid #8257e566', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', color: '#d2a8ff', display: 'inline-flex', alignItems: 'center', gap: '6px' }
      }, [
        makeElement('span', { style: { color: '#ff7b72' } }, `"${k}"`),
        makeElement('span', { style: { color: '#64748b' } }, '➔'),
        makeElement('strong', { style: { color: '#00f2fe' } }, `"${existing[k]}"`),
        makeElement('button', { style: { background: 'none', border: 'none', color: '#ff7b72', cursor: 'pointer', fontSize: '10px', padding: 0 }, onclick: () => { delete existing[k]; localStorage.setItem('dictation_custom_replacements', JSON.stringify(existing)); renderList(); } }, '✕')
      ])));
    };
    renderList();

    return makeElement('div', { style: { background: '#0a0e1a', border: '1px solid #232d3f', borderRadius: '8px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px' } }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('strong', { style: { color: '#d2a8ff', fontSize: '11.5px' } }, '3. Phonetic Vocabulary Trainer (Shared Dictionary)'),
        makeElement('span', { style: { fontSize: '10px', color: '#94a3b8' } }, 'Auto-Synced across attached inputs')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, [
        heardInput, writeInput,
        makeElement('button', {
          className: 'dr-nav-btn primary', style: { padding: '5px 12px', fontSize: '11px', fontWeight: 'bold' },
          onclick: () => {
            const h = heardInput.value.trim().toLowerCase(), w = writeInput.value.trim();
            if (h && w) {
              const ex = JSON.parse(localStorage.getItem('dictation_custom_replacements') || '{}');
              ex[h] = w;
              localStorage.setItem('dictation_custom_replacements', JSON.stringify(ex));
              heardInput.value = ''; writeInput.value = '';
              renderList();
            }
          }
        }, '+ Add Rule')
      ]),
      vocabListEl
    ]);
  }

  static _renderDocsTab(body) {
    const sections = (typeof HomeDictationDocsData !== 'undefined' && HomeDictationDocsData.getSections) ? HomeDictationDocsData.getSections() : {};
    const keys = Object.keys(sections);
    const contentEl = makeElement('div', { style: { background: '#050811', border: '1px solid #1e293b', borderRadius: '6px', padding: '14px', minHeight: '260px', maxHeight: '420px', overflowY: 'auto', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.6' } });

    const showSec = (key) => {
      contentEl.innerHTML = '';
      const sec = sections[key];
      if (!sec) { contentEl.textContent = 'Select a section above.'; return; }
      if (sec.title) contentEl.appendChild(makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px', display: 'block', marginBottom: '8px' } }, sec.title));
      if (Array.isArray(sec.paras)) sec.paras.forEach(p => contentEl.appendChild(makeElement('p', { style: { marginBottom: '8px', lineHeight: '1.55' } }, p)));
      if (Array.isArray(sec.list)) {
        const ul = makeElement('ul', { style: { paddingLeft: '18px', color: '#f8fafc', fontSize: '11px', lineHeight: '1.5' } });
        sec.list.forEach(item => ul.appendChild(makeElement('li', { style: { marginBottom: '4px' } }, item)));
        contentEl.appendChild(ul);
      }
    };

    const select = makeElement('select', {
      style: { background: '#070a13', color: '#00f2fe', border: '1px solid #00f2fe66', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontFamily: 'monospace', outline: 'none', cursor: 'pointer' },
      onchange: (e) => showSec(e.target.value)
    }, keys.map(k => makeElement('option', { value: k }, (sections[k] && sections[k].title) || k)));

    body.appendChild(makeElement('div', { style: { background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' } }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' } }, [
        makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px' } }, 'Rob Brown\'s DictationDocs.js Master Specification'), select
      ]),
      contentEl
    ]));
    showSec(keys[0]);
  }

  static _renderAppsTab(body) {
      const resolveSubUrl = (proj) => {
        if (typeof window !== 'undefined' && window.location) {
          const host = window.location.hostname || '';
          if (host.endsWith('.github.io')) {
            const user = host.split('.')[0] || 'karmatics';
            return `https://${user}.github.io/${proj}/index.html`;
          }
          if (window.location.protocol === 'about:') {
            try {
              const pHost = window.parent?.location?.hostname || '';
              if (pHost.endsWith('.github.io')) {
                return `https://${pHost.split('.')[0] || 'karmatics'}.github.io/${proj}/index.html`;
              }
              if (window.parent?.location?.origin && window.parent.location.origin !== 'null') {
                return `${window.parent.location.origin}/${proj}/index.html`;
              }
            } catch (e) {}
            return `https://karmatics.github.io/${proj}/index.html`;
          }
        }
        return `../${proj}/index.html`;
      };

      const appCard = (icon, title, badge, color, desc, projName) => {
        const href = resolveSubUrl(projName);
        return makeElement('div', {
          style: { background: '#050811', border: `1px solid ${color}44`, borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
            makeElement('strong', { style: { color, fontSize: '12px' } }, `${icon} ${title}`),
            makeElement('span', { style: { fontSize: '9px', background: `${color}22`, color, padding: '1px 5px', borderRadius: '4px' } }, badge)
          ]),
          makeElement('p', { style: { fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.4' } }, desc),
          makeElement('div', { style: { display: 'flex', gap: '6px', marginTop: '4px' } }, [
            makeElement('a', { href, target: '_blank', rel: 'noopener noreferrer', style: { background: '#0d2818', color: '#3fb950', border: '1px solid #238636', borderRadius: '4px', padding: '4px 8px', fontSize: '10.5px', textDecoration: 'none', fontWeight: 'bold' } }, '🌐 Open Standalone Tab ↗'),
            makeElement('button', {
              className: 'dr-nav-btn',
              style: { padding: '4px 8px', fontSize: '10px' },
              onclick: () => {
                const lunoApp = globalThis.ClientApp || window.parent?.ClientApp || window.opener?.ClientApp;
                const lunoDock = globalThis.LunoSpaDock || window.parent?.LunoSpaDock || window.opener?.LunoSpaDock;
                if (lunoApp?.setTargetProject) {
                  lunoApp.setTargetProject(projName, { openTab: true });
                  if (lunoDock) lunoDock.mountView('app_' + projName);
                } else {
                  window.open(href, '_blank', 'noopener,noreferrer');
                }
              }
            }, '📱 Luno Tab Frame')
          ])
        ]);
      };

      body.appendChild(makeElement('div', { style: { background: 'rgba(255,255,255,0.02)', border: '1px solid #1e293b', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' } }, [
        makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px' } }, 'Standalone Sub-Apps & Chrome Extension Target'),
        makeElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } }, [
          appCard('🧪', 'DictationLab Sub-App', 'Lattice Test Harness', '#10b981', 'Generation 2 test harness built on DictationLattice and DictationEngineAdapter.', 'DictationLab'),
          appCard('🔬', 'DictationExperiment Sub-App', 'Sandbox & Docs', '#38bdf8', 'Experiment sandbox hosting live interactive doc viewing and audio visualizers.', 'DictationExperiment')
        ]),
        makeElement('div', { style: { background: '#0a0e1a', border: '1px solid #8257e566', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' } }, [
          makeElement('strong', { style: { color: '#d2a8ff', fontSize: '12px' } }, '🌐 Ambient Chrome Extension Target (AardvarkExtension)'),
          makeElement('p', { style: { fontSize: '11px', color: '#cbd5e1', margin: 0, lineHeight: '1.45' } }, 'Global shortcut invokes `DictationWidget.attach(document.activeElement).startListening()` on any web page with shared phonetic replacements.')
        ])
      ]));
    }
}

globalThis.HomeDictationStudioComponent = HomeDictationStudioComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeDictationStudioComponent;