class HomeSetup {

  constructor() {
      this.reader = null;
      this.sidePanel = null;
      this.rootElement = null;
      this.activePageId = 'topology';
      this._safeAreaHandler = null;
      this._unsubNotes = null;
      this._pages = [];
    }

  async run(env) {
          if (this.rootElement) {
            this.destroy();
          }

          if (!env || !env.container) {
            throw new Error('[HomeSetup] run() requires an environment object with a valid container.');
          }

          if (typeof DomBasics !== 'undefined' && typeof DomBasics.run === 'function') {
            DomBasics.run();
          }

          this.env = env;
          this.rootElement = env.container;

          globalThis._homeSetupInstance = this;
          globalThis._cadPlanInstance = this;

          document.documentElement.style.overflowY = 'auto';
          document.body.style.overflowY = 'auto';

          this.rootElement.style.overflowX = 'hidden';
          this.rootElement.style.overflowY = 'visible';
          this.rootElement.style.height = 'auto';
          this.rootElement.style.minHeight = '100vh';
          this.rootElement.style.boxSizing = 'border-box';
          this.rootElement.style.marginLeft = '0px';
          this.rootElement.style.width = '100%';

          if (typeof KeyCommandHandler !== 'undefined' && typeof KeyCommandHandler.setPaused === 'function') {
            KeyCommandHandler.setPaused(true);
          }

          const pages = [
            { id: 'topology', title: '0. Hardware Topology & Fleet Matrix', docClass: () => globalThis.HomeTopologyContent },
            { id: 'network', title: '1. Local Network & Connection Mesh', docClass: () => globalThis.HomeNetworkContent },
            { id: 'storage', title: '2. Shared Storage & Portable Drive', docClass: () => globalThis.HomeStorageContent },
            { id: 'nodes', title: '3. Machine Workspaces & Luno Nodes', docClass: () => globalThis.HomeNodesContent },
            { id: 'orchestration', title: '4. Cross-Wire LLM Orchestration', docClass: () => globalThis.HomeOrchestrationContent },
            { id: 'secrets', title: '5. Credentials & Safe Key Storage', docClass: () => globalThis.HomeSecretsContent },
            { id: 'handoff', title: '6. Thread Continuity & Active Handoff Ledger', docClass: () => globalThis.HomeHandoffContent },
            { id: 'dictation', title: '7. Dictation Architecture & Audio Reconnaissance', docClass: () => globalThis.HomeDictationContent }
          ];
          this._pages = pages;

          this.reader = new DocumentReader({
            container: env.container,
            brandTitle: 'Home Infrastructure & Fleet Setup',
            brandIcon: '🖥️',
            dossierId: 'HomeSetup',
            pages: pages,
            itemNotes: globalThis.CadPlanItemNotes || null,
            itemNotesClass: globalThis.CadPlanItemNotes || null,
            editorClass: globalThis.CadPlanDocumentEditor || null
          });

          this.activePageId = this.reader.currentPageId || 'topology';

          const origSwitchPage = this.reader.switchPage.bind(this.reader);
          this.reader.switchPage = (pageId, updateUrl = true) => {
            origSwitchPage(pageId, updateUrl);
            this._syncSidebarActiveState(pageId);
          };

          await this.reader.init();

          if (typeof CadPlanAardvark !== 'undefined') {
            this.aardvark = new CadPlanAardvark({
              container: this.rootElement,
              dossierId: 'HomeSetup',
              itemNotes: globalThis.CadPlanItemNotes || null,
              documentReader: this.reader
            });
            this.aardvark.init();
            if (this.reader) {
              this.reader.aardvark = this.aardvark;
            }
          }

          if (typeof SidePanel !== 'undefined') {
            this.sidePanel = new SidePanel('left', 320, null);
            this.reader.options.sidePanel = this.sidePanel;
            this._buildSidePanelNavigation(pages);
            this._syncSidebarActiveState(this.reader.currentPageId);
            if (window.innerWidth >= 860) {
              this.sidePanel.open();
            }
          }

          if (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.subscribe === 'function') {
            this._unsubNotes = CadPlanItemNotes.subscribe(() => {
              if (this.sidePanel && this._pages) {
                this._buildSidePanelNavigation(this._pages);
                this._syncSidebarActiveState(this.activePageId);
              }
            });
          }

          this._setupHeaderToggleButton();
          return this;
        }

  _buildSidePanelNavigation(pages) {
    if (!this.sidePanel) return;
    globalThis._homeSetupInstance = this;
    this.sidePanel.header.innerHTML = '';
    const headerTitle = document.createElement('div');
    headerTitle.style.cssText = 'font-family: var(--cp-font-mono, monospace); font-size: 11px; font-weight: 800; color: #00f2fe; display: flex; align-items: center; gap: 8px; flex: 1;';
    headerTitle.innerHTML = '<span>🖥️</span><span>Home Infrastructure Fleet</span>';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dr-nav-btn';
    closeBtn.style.cssText = 'padding: 3px 8px; font-size: 10px; border-radius: 4px;';
    closeBtn.textContent = '✕';
    closeBtn.onclick = () => this.sidePanel.close();
    this.sidePanel.header.append(headerTitle, closeBtn);

    const container = this.sidePanel.contentContainer;
    container.innerHTML = '';
    container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px; font-family: var(--cp-font-sans, system-ui);';

    const banner = document.createElement('div');
    banner.style.cssText = 'background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: monospace;';
    banner.innerHTML = '<div><strong style="color:#00f2fe; display:block;">🌐 Port 8080 Fleet Mesh</strong><span style="color:#10b981; font-size:10px;">Mac Mini ↔ Linux Peer • Synced</span></div><span style="background:rgba(16,185,129,0.2); color:#10b981; padding:2px 6px; border-radius:4px; font-weight:bold; font-size:10px;">ONLINE</span>';
    container.appendChild(banner);

    const searchInput = document.createElement('input');
    searchInput.className = 'cp-sidebar-search';
    searchInput.placeholder = '🔍 Filter nodes, mounts, or scripts...';
    searchInput.oninput = (e) => {
      const q = e.target.value.toLowerCase().trim();
      container.querySelectorAll('.cp-chapter-card').forEach(c => { c.style.display = (!q || c.textContent.toLowerCase().includes(q)) ? 'block' : 'none'; });
    };
    container.appendChild(searchInput);

    const localMap = (typeof CadPlanItemNotes !== 'undefined' && CadPlanItemNotes.getLocalMap) ? CadPlanItemNotes.getLocalMap() : {};
    pages.forEach((page) => {
      const doc = page.docClass ? page.docClass() : null;
      const manifest = doc?.manifest ? doc.manifest() : [];
      const isCur = page.id === this.activePageId;
      let notesCnt = 0;
      Object.keys(localMap).forEach(k => { if (k.startsWith(`HomeSetup:${page.id}:`)) notesCnt += (localMap[k] || []).filter(n => n.status !== 'resolved').length; });
      const hasLab = manifest.some(sec => (sec.blocks || []).some(b => b.type === 'component'));
      const parts = page.title.split('.');

      const card = document.createElement('div');
      card.className = `cp-chapter-card ${isCur ? 'active' : ''}`;
      card.dataset.pageId = page.id;

      const headerRow = document.createElement('div');
      headerRow.className = 'cp-chapter-header-row';
      headerRow.innerHTML = `
        <div style="display:flex; align-items:flex-start; gap:8px; flex:1; min-width:0;">
          <span class="cp-chapter-chevron" style="font-size:9px; color:#64748b; width:10px; flex-shrink:0; margin-top:2px;">${isCur ? '▼' : '▶'}</span>
          <span class="cp-chapter-num-badge">${parts[0].trim()}</span>
          <span class="cp-chapter-title-text">${parts.slice(1).join('.').trim() || page.title}</span>
        </div>
        <div style="display:flex; gap:4px; align-items:center; flex-shrink:0; margin-top:1px;">
          ${hasLab ? '<span style="background:rgba(0,242,254,0.18); color:#00f2fe; border:1px solid rgba(0,242,254,0.4); font-size:8.5px; padding:1px 5px; border-radius:4px; font-weight:800; font-family:var(--cp-font-mono);">⚡ Lab</span>' : ''}
          ${notesCnt > 0 ? `<span style="background:rgba(16,185,129,0.2); color:#10b981; border:1px solid #10b98188; font-size:9px; padding:1px 6px; border-radius:10px; font-weight:800; font-family:monospace;">${notesCnt} 📝</span>` : ''}
        </div>`;
      headerRow.onclick = () => this.selectChapter(page.id, null);
      card.appendChild(headerRow);

      const sectionsList = document.createElement('div');
      sectionsList.className = 'cp-chapter-sections-list';
      sectionsList.style.display = isCur ? 'flex' : 'none';
      manifest.forEach((sec) => {
        const secItem = document.createElement('div');
        secItem.className = 'cp-section-item';
        secItem.textContent = `• ${sec.title}`;
        secItem.onclick = (e) => { e.stopPropagation(); this.selectChapter(page.id, sec.blocks?.[0]?.id || (sec.section ? `sec-${sec.section}` : null)); };
        sectionsList.appendChild(secItem);
      });
      card.appendChild(sectionsList);
      container.appendChild(card);
    });

    container.appendChild(this._buildSidebarToolsGrid());
  }

  selectChapter(pageId, targetBlockId = null) {
      const isPageChange = (this.activePageId !== pageId);
      this.activePageId = pageId;

      if (typeof CadStudioDemoComponent !== 'undefined' && typeof CadStudioDemoComponent.dismissAccuDrawUi === 'function') {
        CadStudioDemoComponent.dismissAccuDrawUi();
      }

      if (this.sidePanel) {
        this.sidePanel.contentContainer.querySelectorAll('.cp-chapter-card').forEach(card => {
          const isCur = card.dataset.pageId === pageId;
          card.classList.toggle('active', isCur);
          const list = card.querySelector('.cp-chapter-sections-list');
          if (list) list.style.display = isCur ? 'flex' : 'none';
          const chevron = card.querySelector('.cp-chapter-chevron');
          if (chevron) chevron.textContent = isCur ? '▼' : '▶';
        });
        if (window.innerWidth < 860) {
          this.sidePanel.close();
        }
      }

      if (this.reader && typeof this.reader.switchPage === 'function') {
        if (isPageChange) {
          this.reader.switchPage(pageId, true);
        }
      }

      if (targetBlockId) {
        const delay = isPageChange ? 220 : 50;
        setTimeout(() => {
          if (this.reader && typeof this.reader.highlightTarget === 'function') {
            this.reader.highlightTarget(targetBlockId);
          }
        }, delay);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  _setupHeaderToggleButton() {
      // Top bar header is cleanly configured inside DocumentReader._renderChrome
      return true;
  }

  destroy() {
        if (this._unsubNotes) {
          try { this._unsubNotes(); } catch (e) {}
          this._unsubNotes = null;
        }

        if (this._safeAreaHandler) {
          window.removeEventListener('layout-safe-area-change', this._safeAreaHandler);
          this._safeAreaHandler = null;
        }

        if (this.aardvark) {
          this.aardvark.destroy();
          this.aardvark = null;
        }

        if (this.sidePanel) {
          this.sidePanel.destroy();
          this.sidePanel = null;
        }

        if (this.reader && typeof this.reader.destroy === 'function') {
          try {
            this.reader.destroy();
          } catch (e) {}
          this.reader = null;
        }

        if (typeof UITools !== 'undefined' && typeof UITools.setSafeArea === 'function') {
          UITools.setSafeArea({ left: 0, right: 0, top: 0, bottom: 0 });
        }

        if (globalThis._homeSetupInstance === this) globalThis._homeSetupInstance = null;
        if (globalThis._cadPlanInstance === this) globalThis._cadPlanInstance = null;
        this.rootElement = null;
      }
  _syncSidebarActiveState(pageId) {
        this.activePageId = pageId;
        if (this.sidePanel && this.sidePanel.contentContainer) {
          this.sidePanel.contentContainer.querySelectorAll('.cp-chapter-card').forEach(card => {
            const isCur = card.dataset.pageId === pageId;
            card.classList.toggle('active', isCur);
            const list = card.querySelector('.cp-chapter-sections-list');
            if (list) list.style.display = isCur ? 'flex' : 'none';
            const chevron = card.querySelector('.cp-chapter-chevron');
            if (chevron) chevron.textContent = isCur ? '▼' : '▶';
          });
        }
      }

  _buildSidebarToolsGrid() {
    const toolsDet = document.createElement('details');
    toolsDet.open = true;
    toolsDet.style.cssText = 'margin-top: 10px; border: 1px solid #1e293b; background: #080c16; border-radius: 8px; overflow: hidden;';
    const summary = document.createElement('summary');
    summary.style.cssText = 'padding: 8px 12px; font-family: var(--cp-font-mono); font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; cursor: pointer; user-select: none; background: #0f172a;';
    summary.textContent = '⚙️ Living Spec Utilities';
    toolsDet.appendChild(summary);

    const grid = document.createElement('div');
    grid.style.cssText = 'padding: 10px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px;';
    const makeBtn = (label, icon, color, onClick) => {
      const b = document.createElement('button');
      b.className = 'dr-nav-btn';
      b.style.cssText = `padding: 6px 8px; font-size: 10px; justify-content: center; color: ${color}; border-color: ${color}44; border-radius: 6px; font-family: monospace; font-weight: bold;`;
      b.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
      b.onclick = onClick;
      return b;
    };

    grid.appendChild(makeBtn('Directives', '⚡', '#d2a8ff', () => typeof CadPlanItemNotes !== 'undefined' && CadPlanItemNotes.openPromptBuilderDialog(this.reader)));
    grid.appendChild(makeBtn('Clip Notes', '📋', '#10b981', (e) => this.reader && this.reader.copyNotesBundle(e.currentTarget)));
    grid.appendChild(makeBtn('Inspect', '🔍', '#38bdf8', () => this.aardvark && this.aardvark.toggle()));
    grid.appendChild(makeBtn('Export MD', '📤', '#00f2fe', () => this.reader && this.reader.showExportDialog()));
    grid.appendChild(makeBtn('Voice Notes', '🎙️', '#10b981', () => typeof CadPlanNotesManager !== 'undefined' && CadPlanNotesManager.openDialog()));
    grid.appendChild(makeBtn('Revisions', '✏️', '#f59e0b', () => typeof CadPlanDocumentEditor !== 'undefined' && CadPlanDocumentEditor.openRevisionManager(() => this.reader.renderCurrentDocument(), 'HomeSetup')));
    grid.appendChild(makeBtn('Bundler', '📦', '#38bdf8', () => typeof CadPromptBundlerDialog !== 'undefined' && CadPromptBundlerDialog.open()));
    grid.appendChild(makeBtn('Summaries', '🧭', '#a3e635', () => typeof HomeSummaries !== 'undefined' && navigator.clipboard?.writeText(HomeSummaries.toMarkdown()).then(() => alert('✓ Copied HomeSetup Tier-0 Summaries!'))));

    toolsDet.appendChild(grid);
    return toolsDet;
  }
}

globalThis.HomeSetup = HomeSetup;
window.HomeSetup = HomeSetup;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeSetup;