class CadPromptBundlerDialog {

  static open(baseController = null) {
      const hostContainer = document.body;

      const content = makeElement('div', {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          color: '#c9d1d9',
          fontFamily: 'system-ui, -apple-system, monospace',
          fontSize: '12px'
        }
      });

      const presetRow = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '4px' } }, [
        makeElement('label', { style: { fontWeight: 'bold', color: '#00f2fe' } }, '🎯 Context Granularity & Starter Prompt Preset:'),
        makeElement('select', {
          id: 'cp-bundle-preset',
          style: {
            background: '#0d1117',
            color: '#f0f6fc',
            border: '1px solid #30363d',
            padding: '6px 8px',
            borderRadius: '6px',
            fontFamily: 'monospace'
          },
          onchange: (e) => {
            CadPromptBundlerDialog._applyPreset(e.target.value);
          }
        }, [
          makeElement('option', { value: 'handoff', selected: true }, '🌱 Fresh-Thread Handoff Bundle (~7.5k tokens • Seeding Next AI Session)'),
          makeElement('option', { value: 'full' }, '📚 Full Home Infrastructure Dossier (All Chapters • ~18k tokens)'),
          makeElement('option', { value: 'wire' }, '⚡ Network, Storage & Orchestration Focus (~10k tokens)'),
          makeElement('option', { value: 'secrets' }, '🔒 Security & Secret Boundaries (~5k tokens)')
        ])
      ]);
      content.appendChild(presetRow);

      const checkGrid = makeElement('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: '#070a13',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #21262d',
          maxHeight: '380px',
          overflowY: 'auto'
        }
      });

      const options = [
        { id: 'opt_topology', label: '0. Hardware Topology & Fleet Matrix', default: true },
        { id: 'opt_network', label: '1. Local Network & Connection Mesh', default: true },
        { id: 'opt_storage', label: '2. Shared Storage & Portable Drive', default: true },
        { id: 'opt_nodes', label: '3. Machine Workspaces & Luno Nodes', default: true },
        { id: 'opt_orchestration', label: '4. Cross-Wire LLM Orchestration', default: true },
        { id: 'opt_secrets', label: '5. Credentials & Safe Key Storage', default: true },
        { id: 'opt_handoff', label: '6. Thread Continuity & Active Handoff', default: true },
        { id: 'opt_runner', label: '⚡ File-Based Task Queue (runner.mjs)', default: true }
      ];

      options.forEach(opt => {
        const chk = makeElement('input', {
          type: 'checkbox',
          id: opt.id,
          checked: opt.default,
          style: { accentColor: '#00f2fe', cursor: 'pointer' }
        });
        const lbl = makeElement('label', {
          htmlFor: opt.id,
          style: {
            cursor: 'pointer',
            fontSize: '11px',
            color: opt.id === 'opt_handoff' ? '#00f2fe' : (opt.id === 'opt_secrets' ? '#f59e0b' : '#c9d1d9')
          }
        }, opt.label);

        checkGrid.appendChild(makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [chk, lbl]));
      });

      content.appendChild(checkGrid);

      const statsBox = makeElement('div', {
        id: 'cp-bundle-stats',
        style: { fontSize: '11px', color: '#8b949e', fontStyle: 'italic', textAlign: 'right' }
      }, 'Estimated payload: ~7,500 tokens • Ready for Fresh AI Thread');
      content.appendChild(statsBox);

      const btnRow = makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }
      }, [
        makeElement('button', {
          className: 'dr-nav-btn',
          style: { padding: '6px 12px', background: '#271052', color: '#d2a8ff', borderColor: '#8257e5' },
          onclick: () => {
            const text = CadPromptBundlerDialog._generateMarkdownBundle();
            if (typeof OutboxQueue !== 'undefined' && OutboxQueue.addBundle) {
              OutboxQueue.addBundle('HomeSetup Fleet & Continuity Bundle', text, { priority: 'high' });
              alert('✓ Pushed bundle directly to Luno Outbox!');
              dlg.close();
            } else {
              CadPromptBundlerDialog._copyText(text);
              dlg.close();
            }
          }
        }, '📤 Send to Outbox'),
        makeElement('button', {
          className: 'dr-nav-btn primary',
          style: { padding: '6px 14px', fontWeight: 'bold' },
          onclick: () => {
            const text = CadPromptBundlerDialog._generateMarkdownBundle();
            CadPromptBundlerDialog._copyText(text);
            dlg.close();
          }
        }, '📋 Copy Fresh-Thread Markdown')
      ]);
      content.appendChild(btnRow);

      const dlg = UITools.makeDialog({
        title: '📋 HomeSetup Prompt Bundler & Fresh-Thread Dispatch',
        size: [600, 520],
        position: [Math.max(20, (window.innerWidth - 600) / 2), Math.max(10, (window.innerHeight - 520) / 2)],
        contentElement: content,
        appendTo: hostContainer
      });
    }

  static _applyPreset(preset) {
      const setChecked = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.checked = val;
      };

      if (preset === 'handoff') {
        setChecked('opt_topology', true);
        setChecked('opt_network', true);
        setChecked('opt_storage', true);
        setChecked('opt_nodes', true);
        setChecked('opt_orchestration', true);
        setChecked('opt_secrets', true);
        setChecked('opt_handoff', true);
        setChecked('opt_runner', false);
        document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~7,500 tokens (🌱 Lean Fresh-Thread Continuity Bundle)';
      } else if (preset === 'full') {
        const checkboxes = document.querySelectorAll('#cp-bundle-preset ~ div input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = true);
        document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~18,000 tokens (📚 Complete Infrastructure Dossier)';
      } else if (preset === 'wire') {
        setChecked('opt_topology', false);
        setChecked('opt_network', true);
        setChecked('opt_storage', true);
        setChecked('opt_nodes', false);
        setChecked('opt_orchestration', true);
        setChecked('opt_secrets', false);
        setChecked('opt_handoff', true);
        setChecked('opt_runner', true);
        document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~10,000 tokens (⚡ Network, Storage & Orchestration Focus)';
      } else if (preset === 'secrets') {
        setChecked('opt_topology', false);
        setChecked('opt_network', true);
        setChecked('opt_storage', false);
        setChecked('opt_nodes', false);
        setChecked('opt_orchestration', false);
        setChecked('opt_secrets', true);
        setChecked('opt_handoff', true);
        setChecked('opt_runner', false);
        document.getElementById('cp-bundle-stats').textContent = 'Estimated payload: ~5,000 tokens (🔒 Security & Secret Boundaries Focus)';
      }
    }

  static _generateMarkdownBundle() {
      let out = '# HOMESETUP: MULTI-NODE INFRASTRUCTURE SPECIFICATION & FRESH-THREAD HANDOFF\n';
      out += `Generated: ${new Date().toISOString()} • Host: Linux Workstation (Node.js Port 3000)\n`;
      out += 'Nodes: Linux Host • Mac Workstation • Windows Rig • 2 Mobile Phones • Portable External Drive\n\n';
      out += '---\n\n';

      const isChecked = (id) => {
        const el = document.getElementById(id);
        return el ? el.checked : false;
      };

      // Inject Author Notes if present
      if (globalThis.CadPlanNotesManager) {
        const notes = CadPlanNotesManager.getNotes();
        if (notes && notes.trim().length > 0) {
          out += '## AUTHOR WORKING NOTES (DIRECT DIRECTIVES)\n\n';
          out += notes.trim() + '\n\n';
          out += '---\n\n';
        }
      }

      // Always include Chapter 6 Handoff Ledger first if selected
      if (isChecked('opt_handoff') && globalThis.HomeHandoffComponent) {
        out += globalThis.HomeHandoffComponent.getHandoffMarkdown() + '\n\n---\n\n';
      }

      if (isChecked('opt_topology') && globalThis.HomeTopologyContent) {
        out += '## CHAPTER 0: HARDWARE TOPOLOGY & FLEET MATRIX\n\n';
        out += HomeTopologyContent.p_topo_intro_1().join('\n\n') + '\n\n';
        out += '> **Fleet Roles:** ' + HomeTopologyContent.sidebar_fleet_roles().join('\n> ') + '\n\n';
        out += HomeTopologyContent.p_topo_linux_1().join('\n\n') + '\n\n';
        out += HomeTopologyContent.p_topo_mac_1().join('\n\n') + '\n\n';
        out += HomeTopologyContent.p_topo_win_1().join('\n\n') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_network') && globalThis.HomeNetworkContent) {
        out += '## CHAPTER 1: LOCAL NETWORK & CONNECTION MESH\n\n';
        out += HomeNetworkContent.p_net_mesh_1().join('\n\n') + '\n\n';
        out += '> **Network Ports:** ' + HomeNetworkContent.sidebar_network_ports().join('\n> ') + '\n\n';
        out += HomeNetworkContent.p_net_ssh_1().join('\n\n') + '\n\n';
        out += HomeNetworkContent.p_net_webrtc_1().join('\n\n') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_storage') && globalThis.HomeStorageContent) {
        out += '## CHAPTER 2: SHARED STORAGE & PORTABLE DRIVE\n\n';
        out += HomeStorageContent.p_store_drive_1().join('\n\n') + '\n\n';
        out += '> **Mount Table:** ' + HomeStorageContent.sidebar_mount_table().join('\n> ') + '\n\n';
        out += HomeStorageContent.p_store_sync_1().join('\n\n') + '\n\n';
        out += '> **Rsync Recipes:** ' + HomeStorageContent.sidebar_transfer_scripts().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_nodes') && globalThis.HomeNodesContent) {
        out += '## CHAPTER 3: MACHINE WORKSPACES & LUNO NODES\n\n';
        out += HomeNodesContent.p_nodes_layout_1().join('\n\n') + '\n\n';
        out += '> **Root Directory Map:** ' + HomeNodesContent.sidebar_path_directory().join('\n> ') + '\n\n';
        out += HomeNodesContent.p_nodes_roles_1().join('\n\n') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_orchestration') && globalThis.HomeOrchestrationContent) {
        out += '## CHAPTER 4: CROSS-WIRE LLM ORCHESTRATION\n\n';
        out += HomeOrchestrationContent.p_orch_flow_1().join('\n\n') + '\n\n';
        out += '> **Server Runner Directives:** ' + HomeOrchestrationContent.sidebar_server_runner_patterns().join('\n> ') + '\n\n';
        out += HomeOrchestrationContent.p_orch_runner_1().join('\n\n') + '\n\n';
        out += '> **Queue Specs:** ' + HomeOrchestrationContent.sidebar_runner_architecture().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      if (isChecked('opt_secrets') && globalThis.HomeSecretsContent) {
        out += '## CHAPTER 5: CREDENTIALS & SAFE KEY STORAGE\n\n';
        out += HomeSecretsContent.p_sec_rule_1().join('\n\n') + '\n\n';
        out += HomeSecretsContent.p_sec_rule_2().join('\n\n') + '\n\n';
        out += '> **Security Directives:** ' + HomeSecretsContent.sidebar_secret_policy().join('\n> ') + '\n\n';
        out += HomeSecretsContent.p_sec_locations_1().join('\n\n') + '\n\n';
        out += '> **Safe Secret Paths:** ' + HomeSecretsContent.sidebar_credential_paths().join('\n> ') + '\n\n';
        out += '---\n\n';
      }

      return out.trim();
    }
  static _copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('📋 Copied configured HomeSetup prompt bundle to clipboard!');
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      alert('📋 Copied configured HomeSetup prompt bundle to clipboard!');
    }
  }
}

globalThis.CadPromptBundlerDialog = CadPromptBundlerDialog;
if (typeof module !== 'undefined' && module.exports) module.exports = CadPromptBundlerDialog;