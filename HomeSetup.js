class HomeSetup {
  constructor() {
    this.reader = null;
    this.sidePanel = null;
    this.rootElement = null;
    this.activePageId = 'meta';
    this._safeAreaHandler = null;
  }

  async run(env) {
        if (this.rootElement) {
          this.destroy();
        }

        if (!env || !env.container) {
          throw new Error('[HomeSetup] run() requires an environment object with a valid container.');
        }

        this.env = env;
        this.rootElement = env.container;

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

        this.reader = new DocumentReader({
          container: env.container,
          brandTitle: 'Home Infrastructure & Fleet Setup',
          brandIcon: '🖥️',
          dossierId: 'HomeSetup',
          pages: pages
        });

        await this.reader.init();

        if (typeof SidePanel !== 'undefined') {
          this.sidePanel = new SidePanel('left', 320, null);
          this._buildSidePanelNavigation(pages);
          this.sidePanel.open();
        }

        if (typeof CadPlanAardvark !== 'undefined') {
          this.aardvark = new CadPlanAardvark({ container: this.rootElement, dossierId: 'HomeSetup' });
          this.aardvark.init();
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

        this.sidePanel.header.appendChild(headerTitle);
        this.sidePanel.header.appendChild(closeBtn);

        const container = this.sidePanel.contentContainer;
        container.innerHTML = '';
        container.style.cssText = 'flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px; display: flex; flex-direction: column; gap: 10px; font-family: var(--cp-font-sans, system-ui);';

        const statusBanner = document.createElement('div');
        statusBanner.style.cssText = 'background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-family: monospace;';
        statusBanner.innerHTML = `
          <div>
            <strong style="color: #00f2fe; display: block;">🐧 Linux Workstation</strong>
            <span style="color: #10b981; font-size: 10px;">Primary Luno Host • Active</span>
          </div>
          <span style="background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 2px 6px; border-radius: 4px; font-weight: bold; font-size: 10px;">ONLINE</span>
        `;
        container.appendChild(statusBanner);

        const searchInput = document.createElement('input');
        searchInput.className = 'cp-sidebar-search';
        searchInput.placeholder = '🔍 Filter nodes, mounts, or scripts...';
        searchInput.oninput = (e) => {
          const q = e.target.value.toLowerCase().trim();
          container.querySelectorAll('.cp-chapter-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = (!q || text.includes(q)) ? 'block' : 'none';
          });
        };
        container.appendChild(searchInput);

        const chaptersWrapper = document.createElement('div');
        chaptersWrapper.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

        const localMap = (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.getLocalMap === 'function')
          ? CadPlanItemNotes.getLocalMap()
          : {};

        pages.forEach((page) => {
          const doc = page.docClass ? page.docClass() : null;
          const manifest = doc?.manifest ? doc.manifest() : [];
          const isCur = page.id === this.activePageId;

          let chapterNotesCount = 0;
          Object.keys(localMap).forEach(k => {
            if (k.includes(`:${page.id}:`)) {
              chapterNotesCount += (localMap[k] || []).filter(n => n.status !== 'resolved').length;
            }
          });

          const hasLab = manifest.some(sec => (sec.blocks || []).some(b => b.type === 'component'));

          const card = document.createElement('div');
          card.className = `cp-chapter-card ${isCur ? 'active' : ''}`;
          card.dataset.pageId = page.id;

          const headerRow = document.createElement('div');
          headerRow.className = 'cp-chapter-header-row';

          const leftGroup = document.createElement('div');
          leftGroup.style.cssText = 'display: flex; align-items: flex-start; gap: 8px; flex: 1; min-width: 0;';

          const chevron = document.createElement('span');
          chevron.className = 'cp-chapter-chevron';
          chevron.style.cssText = 'font-size: 9px; color: #64748b; width: 10px; flex-shrink: 0; margin-top: 2px;';
          chevron.textContent = isCur ? '▼' : '▶';

          const titleParts = page.title.split('.');
          const chapterNum = titleParts[0].trim();
          const chapterName = titleParts.slice(1).join('.').trim() || page.title;

          const numBadge = document.createElement('span');
          numBadge.className = 'cp-chapter-num-badge';
          numBadge.textContent = chapterNum;

          const titleText = document.createElement('span');
          titleText.className = 'cp-chapter-title-text';
          titleText.textContent = chapterName;

          leftGroup.appendChild(chevron);
          leftGroup.appendChild(numBadge);
          leftGroup.appendChild(titleText);
          headerRow.appendChild(leftGroup);

          const badgesGroup = document.createElement('div');
          badgesGroup.style.cssText = 'display: flex; gap: 4px; align-items: center; flex-shrink: 0; margin-top: 1px;';

          if (hasLab) {
            const labBadge = document.createElement('span');
            labBadge.style.cssText = 'background: rgba(0, 242, 254, 0.18); color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.4); font-size: 8.5px; padding: 1px 5px; border-radius: 4px; font-weight: 800; font-family: var(--cp-font-mono);';
            labBadge.textContent = '⚡ Lab';
            badgesGroup.appendChild(labBadge);
          }

          if (chapterNotesCount > 0) {
            const noteBadge = document.createElement('span');
            noteBadge.style.cssText = 'background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid #10b98188; font-size: 9px; padding: 1px 6px; border-radius: 10px; font-weight: 800; font-family: monospace;';
            noteBadge.textContent = `${chapterNotesCount} 📝`;
            badgesGroup.appendChild(noteBadge);
          }

          headerRow.appendChild(badgesGroup);
          card.appendChild(headerRow);

          const sectionsList = document.createElement('div');
          sectionsList.className = 'cp-chapter-sections-list';
          sectionsList.style.display = isCur ? 'flex' : 'none';

          manifest.forEach((sec) => {
            const secItem = document.createElement('div');
            secItem.className = 'cp-section-item';
            secItem.textContent = `• ${sec.title}`;
            secItem.title = sec.title;
            secItem.dataset.sectionTitle = sec.title;

            secItem.onclick = (e) => {
              e.stopPropagation();
              const firstBlockId = sec.blocks?.[0]?.id || (sec.section ? `sec-${sec.section}` : null);
              this.selectChapter(page.id, firstBlockId);
            };

            sectionsList.appendChild(secItem);
          });

          card.appendChild(sectionsList);

          headerRow.onclick = () => {
            this.selectChapter(page.id, null);
          };

          chaptersWrapper.appendChild(card);
        });
        container.appendChild(chaptersWrapper);

        const toolsDet = document.createElement('details');
        toolsDet.open = true;
        toolsDet.style.cssText = 'margin-top: 10px; border: 1px solid #1e293b; background: #080c16; border-radius: 8px; overflow: hidden;';

        const toolsSummary = document.createElement('summary');
        toolsSummary.style.cssText = 'padding: 8px 12px; font-family: var(--cp-font-mono); font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; cursor: pointer; user-select: none; background: #0f172a;';
        toolsSummary.textContent = '⚙️ Cross-Machine Utilities';
        toolsDet.appendChild(toolsSummary);

        const toolsBody = document.createElement('div');
        toolsBody.style.cssText = 'padding: 10px; display: flex; flex-direction: column; gap: 8px; font-family: var(--cp-font-sans); font-size: 11px;';

        const toolsGrid = document.createElement('div');
        toolsGrid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 6px;';

        const makeToolBtn = (label, icon, color, onClick) => {
          const b = document.createElement('button');
          b.className = 'dr-nav-btn';
          b.style.cssText = `padding: 6px 8px; font-size: 10px; justify-content: center; color: ${color}; border-color: ${color}44; border-radius: 6px; font-family: monospace; font-weight: bold;`;
          b.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
          b.onclick = onClick;
          return b;
        };

        toolsGrid.appendChild(makeToolBtn('Fleet Spec', '⚡', '#00f2fe', () => {
          if (typeof CadPlanItemNotes !== 'undefined') {
            CadPlanItemNotes.openPromptBuilderDialog(this.reader);
          }
        }));

        toolsGrid.appendChild(makeToolBtn('Bundler', '📋', '#38bdf8', () => {
          if (typeof CadPromptBundlerDialog !== 'undefined') {
            CadPromptBundlerDialog.open();
          }
        }));

        toolsGrid.appendChild(makeToolBtn('Notes', '🎙️', '#10b981', () => {
          if (typeof CadPlanNotesManager !== 'undefined') {
            CadPlanNotesManager.openDialog();
          }
        }));

        toolsGrid.appendChild(makeToolBtn('Mobile Web', '📱', '#c084fc', () => {
          if (typeof CadTouchPairingDialog !== 'undefined') {
            CadTouchPairingDialog.open();
          }
        }));

        toolsBody.appendChild(toolsGrid);
        toolsDet.appendChild(toolsBody);
        container.appendChild(toolsDet);
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

      this.rootElement = null;
    }
}

globalThis.HomeSetup = HomeSetup;
window.HomeSetup = HomeSetup;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeSetup;