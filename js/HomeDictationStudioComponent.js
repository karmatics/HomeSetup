class HomeDictationStudioComponent {
  /**
   * Interactive In-Dossier Dictation Studio & Testbed for Chapter 7.
   * Features:
   * 1. 🎮 Live Testbed: Tests DictationWidget.attach(input) on single/multi-line fields + full widget.
   * 2. 📖 Master Spec Browser: Interactive browser for all 26 sections of Rob Brown's DictationDocs.js.
   * 3. 🚀 Sub-Apps & Extension Bridge: 1-click launchers for DictationLab, DictationExperiment, and AardvarkExtension.
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
        flexDirection: 'column',
        fontFamily: 'monospace'
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
        makeElement('span', { style: { fontSize: '15px' } }, '🎙️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe' } }, 'Universal Speech & Dictation Interactive Studio'),
        makeElement('span', { style: { fontSize: '10px', background: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe', padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' } }, 'Live Audio & Spec Studio')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        btnTabPlay = makeElement('button', {
          className: 'dr-tab-btn active', id: 'btn-dstud-play',
          onclick: () => switchTab('play')
        }, '🎮 Live Testbed'),
        btnTabDocs = makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-dstud-docs',
          onclick: () => switchTab('docs')
        }, '📖 DictationDocs (26 Sections)'),
        btnTabApps = makeElement('button', {
          className: 'dr-tab-btn', id: 'btn-dstud-apps',
          onclick: () => switchTab('apps')
        }, '🚀 Sub-Apps & Extension')
      ])
    ]);
    let btnTabPlay, btnTabDocs, btnTabApps;
    wrap.appendChild(header);

    const body = makeElement('div', {
      id: 'dictation-studio-body',
      style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '14px' }
    });
    wrap.appendChild(body);
    container.appendChild(wrap);

    let activeTab = 'play';

    function switchTab(tab) {
      activeTab = tab;
      btnTabPlay.classList.toggle('active', tab === 'play');
      btnTabDocs.classList.toggle('active', tab === 'docs');
      btnTabApps.classList.toggle('active', tab === 'apps');
      renderActiveTab();
    }

    function renderActiveTab() {
      body.innerHTML = '';

      if (activeTab === 'play') {
        // --- TAB 1: LIVE TESTBED ---
        const dropInCard = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e293b',
            borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px'
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
            makeElement('strong', { style: { color: '#38bdf8', fontSize: '12px' } }, '1. The 1-Line Drop-In: DictationWidget.attach(input)'),
            makeElement('span', { style: { fontSize: '10px', color: '#10b981' } }, 'Zero Extension Required')
          ]),
          makeElement('div', { style: { fontSize: '11px', color: '#94a3b8', lineHeight: '1.4' } },
            'Turn any input on any page into a speech field. Includes automatic space padding, punctuation parsing, and learned phonetic replacements:'
          )
        ]);

        const inputContainer = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } });
        inputContainer.appendChild(makeElement('label', { style: { fontSize: '10px', color: '#64748b', fontWeight: 'bold' } }, 'SAMPLE INPUT A (Search Field with 🎙️ Badge):'));

        const testInput = makeElement('input', {
          id: 'dict-test-input-a',
          type: 'text',
          placeholder: 'Click the 🎙️ mic badge on the right to speak into this field...',
          style: {
            width: '100%', background: '#050811', color: '#f8fafc', border: '1px solid #30363d',
            borderRadius: '6px', padding: '8px 10px', fontSize: '12px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box'
          }
        });
        inputContainer.appendChild(testInput);
        dropInCard.appendChild(inputContainer);

        const textareaContainer = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' } });
        textareaContainer.appendChild(makeElement('label', { style: { fontSize: '10px', color: '#64748b', fontWeight: 'bold' } }, 'SAMPLE INPUT B (Multi-Line Notes with 🎙️ Badge):'));

        const testTextarea = makeElement('textarea', {
          id: 'dict-test-textarea-b',
          placeholder: 'Speak full sentences: say "comma", "period", or "new line" to test automatic punctuation...',
          style: {
            width: '100%', minHeight: '65px', background: '#050811', color: '#7ee787', border: '1px solid #30363d',
            borderRadius: '6px', padding: '8px 10px', fontSize: '11.5px', fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', resize: 'vertical'
          }
        });
        textareaContainer.appendChild(testTextarea);
        dropInCard.appendChild(textareaContainer);

        body.appendChild(dropInCard);

        // Full Embedded Widget
        const widgetCard = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e293b',
            borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px'
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
            makeElement('strong', { style: { color: '#00f2fe', fontSize: '12px' } }, '2. Full Production DictationWidget Instance'),
            makeElement('span', { style: { fontSize: '10px', color: '#f59e0b' } }, 'Permanent 🧹 Clear Button Active')
          ]),
          widgetMount = makeElement('div', { style: { minHeight: '160px' } })
        ]);
        let widgetMount;
        body.appendChild(widgetCard);

        // Phonetic Vocabulary Trainer
        const vocabCard = makeElement('div', {
          style: {
            background: '#0a0e1a', border: '1px solid #232d3f',
            borderRadius: '8px', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px'
          }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
            makeElement('strong', { style: { color: '#d2a8ff', fontSize: '11.5px' } }, '3. Phonetic Vocabulary Trainer (Shared Dictionary)'),
            makeElement('span', { style: { fontSize: '10px', color: '#94a3b8' } }, 'Auto-Synced across attached inputs')
          ]),
          makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, [
            heardInput = makeElement('input', {
              type: 'text', placeholder: 'When heard (e.g. "luna")...',
              style: { flex: 1, minWidth: '150px', background: '#050811', border: '1px solid #30363d', borderRadius: '4px', padding: '5px 8px', color: '#f8fafc', fontSize: '11px', outline: 'none' }
            }),
            writeInput = makeElement('input', {
              type: 'text', placeholder: 'Write as (e.g. "Luno")...',
              style: { flex: 1, minWidth: '150px', background: '#050811', border: '1px solid #30363d', borderRadius: '4px', padding: '5px 8px', color: '#00f2fe', fontSize: '11px', outline: 'none' }
            }),
            makeElement('button', {
              className: 'dr-nav-btn primary',
              style: { padding: '5px 12px', fontSize: '11px', fontWeight: 'bold' },
              onclick: () => {
                const heard = heardInput.value.trim().toLowerCase();
                const write = writeInput.value.trim();
                if (heard && write) {
                  const existing = JSON.parse(localStorage.getItem('dictation_custom_replacements') || '{}');
                  existing[heard] = write;
                  localStorage.setItem('dictation_custom_replacements', JSON.stringify(existing));
                  heardInput.value = '';
                  writeInput.value = '';
                  renderVocabList();
                }
              }
            }, '+ Add Rule')
          ]),
          vocabListEl = makeElement('div', {
            style: { display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }
          })
        ]);
        let heardInput, writeInput, vocabListEl;
        body.appendChild(vocabCard);

        function renderVocabList() {
          vocabListEl.innerHTML = '';
          const existing = JSON.parse(localStorage.getItem('dictation_custom_replacements') || '{}');
          const keys = Object.keys(existing);
          if (keys.length === 0) {
            vocabListEl.innerHTML = '<span style="color:#64748b;font-size:10px;font-style:italic;">No custom replacements saved yet. Add rules above to teach speech recognition your domain terms.</span>';
            return;
          }
          keys.forEach(k => {
            const pill = makeElement('span', {
              style: {
                background: 'rgba(210, 168, 255, 0.1)', border: '1px solid #8257e566',
                borderRadius: '4px', padding: '2px 6px', fontSize: '10px', color: '#d2a8ff', display: 'inline-flex', alignItems: 'center', gap: '6px'
              }
            }, [
              makeElement('span', { style: { color: '#ff7b72' } }, `"${k}"`),
              makeElement('span', { style: { color: '#64748b' } }, '➔'),
              makeElement('strong', { style: { color: '#00f2fe' } }, `"${existing[k]}"`),
              makeElement('button', {
                style: { background: 'none', border: 'none', color: '#ff7b72', cursor: 'pointer', fontSize: '10px', padding: 0, marginLeft: '2px' },
                onclick: () => {
                  delete existing[k];
                  localStorage.setItem('dictation_custom_replacements', JSON.stringify(existing));
                  renderVocabList();
                }
              }, '✕')
            ]);
            vocabListEl.appendChild(pill);
          });
        }
        renderVocabList();

        setTimeout(() => {
          if (typeof DictationWidget !== 'undefined') {
            DictationWidget.attach(testInput);
            DictationWidget.attach(testTextarea);
            const fullWidget = new DictationWidget({ compact: true, placeholder: 'Speak into full DictationWidget instance...' });
            widgetMount.appendChild(fullWidget.getElement());
          }
        }, 40);

      } else if (activeTab === 'docs') {
        // --- TAB 2: MASTER DICTATIONDOCS BROWSER ---
        const sectionsData = (typeof HomeDictationDocsData !== 'undefined' && HomeDictationDocsData.getSections)
          ? HomeDictationDocsData.getSections()
          : {};

        const keys = Object.keys(sectionsData);

        const docsBrowserCard = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e293b',
            borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px'
          }
        });

        const topRow = makeElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }
        }, [
          makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px' } }, 'Rob Brown\'s DictationDocs.js Master Specification'),
          secSelect = makeElement('select', {
            style: {
              background: '#070a13', color: '#00f2fe', border: '1px solid #00f2fe66',
              borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontFamily: 'monospace', outline: 'none', cursor: 'pointer'
            },
            onchange: (e) => renderDocSection(e.target.value)
          }, keys.length > 0 ? keys.map(k => {
            const sec = sectionsData[k] || {};
            return makeElement('option', { value: k }, sec.title || k.replace(/^sec/, ''));
          }) : [
            makeElement('option', { value: 'secTwoCursors' }, 'Two cursors, never confused'),
            makeElement('option', { value: 'secWhatThisIs' }, 'What this is'),
            makeElement('option', { value: 'secScenarioU2' }, 'The U2 / YouTube Scenario'),
            makeElement('option', { value: 'secDecisions' }, 'Decisions Log (Owner Decisions)')
          ])
        ]);
        let secSelect;
        docsBrowserCard.appendChild(topRow);

        const secContentEl = makeElement('div', {
          id: 'dict-docs-sec-content',
          style: {
            background: '#050811', border: '1px solid #1e293b', borderRadius: '6px',
            padding: '14px', minHeight: '260px', maxHeight: '420px', overflowY: 'auto',
            fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.6'
          }
        });
        docsBrowserCard.appendChild(secContentEl);
        body.appendChild(docsBrowserCard);

        function renderDocSection(secKey) {
          secContentEl.innerHTML = '';
          const sec = sectionsData[secKey];
          if (!sec) {
            secContentEl.innerHTML = `
              <strong style="color:#00f2fe;font-size:13px;display:block;margin-bottom:6px;">Two cursors, never confused (Core Invariant)</strong>
              <p style="margin-bottom:8px;">The speaking cursor, which we call the <strong>write head</strong>, is the cyan bar. It marks where the next words you say will appear. It follows the newest speech automatically and it only moves when you deliberately move it: Alt+click on any phrase to dictate right after it, or click empty space to send it back to the end.</p>
              <p style="margin-bottom:8px;">The <strong>editing selection</strong> is a different thing entirely. It is the word and the space you are working on with the mouse or the keyboard. Selecting, retyping, punctuating and capitalising <strong>never move the write head</strong>. This is the whole point. You can pause, click a mistaken word, type the correct one, press Enter, and carry on speaking, and the speaking cursor never left the end of your sentence.</p>
              <div style="background:#090d16;border-left:3px solid #00f2fe;padding:8px 10px;border-radius:4px;color:#94a3b8;font-size:11px;">
                • Governed by: <code>Library/DictationLattice.js</code><br>
                • Eliminates speech rubber-banding when user edits with mouse/keyboard.
              </div>
            `;
            return;
          }

          if (sec.title) {
            secContentEl.appendChild(makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px', display: 'block', marginBottom: '8px' } }, sec.title));
          }
          if (Array.isArray(sec.paras)) {
            sec.paras.forEach(p => {
              secContentEl.appendChild(makeElement('p', { style: { marginBottom: '8px', lineHeight: '1.55' } }, p));
            });
          }
          if (Array.isArray(sec.list)) {
            const ul = makeElement('ul', { style: { paddingLeft: '18px', color: '#f8fafc', fontSize: '11px', lineHeight: '1.5' } });
            sec.list.forEach(item => ul.appendChild(makeElement('li', { style: { marginBottom: '4px' } }, item)));
            secContentEl.appendChild(ul);
          }
        }

        renderDocSection(keys[0] || 'secTwoCursors');

      } else {
        // --- TAB 3: SUB-APPS & CHROME EXTENSION ---
        const appsCard = makeElement('div', {
          style: {
            background: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e293b',
            borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px'
          }
        }, [
          makeElement('strong', { style: { color: '#00f2fe', fontSize: '13px' } }, 'Standalone Sub-Apps & Chrome Extension Target'),
          makeElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } }, [
            // App 1: DictationLab
            makeElement('div', { style: { background: '#050811', border: '1px solid #10b98144', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' } }, [
              makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
                makeElement('strong', { style: { color: '#10b981', fontSize: '12px' } }, '🧪 DictationLab Sub-App'),
                makeElement('span', { style: { fontSize: '9px', background: '#10b98122', color: '#10b981', padding: '1px 5px', borderRadius: '4px' } }, 'Lattice Test Harness')
              ]),
              makeElement('p', { style: { fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.4' } },
                'The Generation 2 test harness built on DictationLattice and DictationEngineAdapter. Includes automated phrase playback and lattice graph inspection.'
              ),
              makeElement('div', { style: { display: 'flex', gap: '6px', marginTop: '4px' } }, [
                makeElement('a', {
                  href: '../DictationLab/index.html', target: '_blank',
                  style: { background: '#0d2818', color: '#3fb950', border: '1px solid #238636', borderRadius: '4px', padding: '4px 8px', fontSize: '10.5px', textDecoration: 'none', fontWeight: 'bold' }
                }, '🌐 Open Standalone Tab ↗'),
                makeElement('button', {
                  className: 'dr-nav-btn',
                  style: { padding: '4px 8px', fontSize: '10px' },
                  onclick: () => {
                    if (typeof ClientApp !== 'undefined' && ClientApp.setTargetProject) ClientApp.setTargetProject('DictationLab', { openTab: true });
                    if (typeof LunoSpaDock !== 'undefined') LunoSpaDock.mountView('app_DictationLab');
                  }
                }, '📱 Luno Tab Frame')
              ])
            ]),

            // App 2: DictationExperiment
            makeElement('div', { style: { background: '#050811', border: '1px solid #38bdf844', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' } }, [
              makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
                makeElement('strong', { style: { color: '#38bdf8', fontSize: '12px' } }, '🔬 DictationExperiment Sub-App'),
                makeElement('span', { style: { fontSize: '9px', background: '#38bdf822', color: '#38bdf8', padding: '1px 5px', borderRadius: '4px' } }, 'Sandbox & Docs')
              ]),
              makeElement('p', { style: { fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: '1.4' } },
                'The architectural experiment sandbox hosting live interactive doc viewing, timing tests, and audio visualizer widgets.'
              ),
              makeElement('div', { style: { display: 'flex', gap: '6px', marginTop: '4px' } }, [
                makeElement('a', {
                  href: '../DictationExperiment/index.html', target: '_blank',
                  style: { background: '#003847', color: '#00f2fe', border: '1px solid #00f2fe', borderRadius: '4px', padding: '4px 8px', fontSize: '10.5px', textDecoration: 'none', fontWeight: 'bold' }
                }, '🌐 Open Standalone Tab ↗'),
                makeElement('button', {
                  className: 'dr-nav-btn',
                  style: { padding: '4px 8px', fontSize: '10px' },
                  onclick: () => {
                    if (typeof ClientApp !== 'undefined' && ClientApp.setTargetProject) ClientApp.setTargetProject('DictationExperiment', { openTab: true });
                    if (typeof LunoSpaDock !== 'undefined') LunoSpaDock.mountView('app_DictationExperiment');
                  }
                }, '📱 Luno Tab Frame')
              ])
            ])
          ]),

          // Extension Bridge Card
          makeElement('div', {
            style: { background: '#0a0e1a', border: '1px solid #8257e566', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }
          }, [
            makeElement('strong', { style: { color: '#d2a8ff', fontSize: '12px' } }, '🌐 Ambient Chrome Extension Target (AardvarkExtension)'),
            makeElement('p', { style: { fontSize: '11px', color: '#cbd5e1', margin: 0, lineHeight: '1.45' } },
              'When packaged into AardvarkExtension, pressing a global shortcut on any web page (ChatGPT, Claude, Google Docs, GitHub) invokes `DictationWidget.attach(document.activeElement).startListening()`, giving you identical voice dictation across the entire web with shared custom phonetic replacements.'
            )
          ])
        ]);
        body.appendChild(appsCard);
      }
    }

    renderActiveTab();
  }
}

globalThis.HomeDictationStudioComponent = HomeDictationStudioComponent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeDictationStudioComponent;