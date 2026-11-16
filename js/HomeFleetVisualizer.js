class HomeFleetVisualizer {
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

    const stage = makeElement('div', {
      style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
    });
    stage.appendChild(this._buildDiagramSvg());
    stage.appendChild(this._buildStatusFooter());

    wrap.appendChild(this._buildHeader());
    wrap.appendChild(stage);
    container.appendChild(wrap);
  }

  static _buildHeader() {
    return makeElement('div', {
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
        makeElement('span', { style: { fontSize: '15px' } }, '🖥️'),
        makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Home Fleet: Ubuntu (10.0.0.245) ↔ Mac Mini (10.0.0.226:8080)'),
        makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '60 Projects • 50+ Repos')
      ]),
      makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, '● Luno v3.8.0 Active')
    ]);
  }

  static _makeSvgNode(x, y, w, h, icon, title, subtitle, statusText, col, isCenter = false) {
    const g = makeElement('svg:g', { transform: `translate(${x}, ${y})`, style: { cursor: 'pointer' } });
    g.appendChild(makeElement('svg:rect', {
      width: w, height: h, rx: '8', fill: isCenter ? 'rgba(15, 23, 42, 0.95)' : '#0a0d16',
      stroke: col, 'stroke-width': isCenter ? '2.5' : '1.5',
      filter: isCenter ? 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.5))' : 'none'
    }));
    g.appendChild(makeElement('svg:text', { x: '14', y: '22', fill: col, 'font-family': 'monospace', 'font-size': '12px', 'font-weight': 'bold' }, `${icon} ${title}`));
    g.appendChild(makeElement('svg:text', { x: '14', y: '38', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold' }, subtitle));
    g.appendChild(makeElement('svg:text', { x: '14', y: '54', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9px' }, statusText));
    return g;
  }

  static _makeSvgWire(x1, y1, x2, y2, col, label) {
    const g = makeElement('svg:g');
    g.appendChild(makeElement('svg:line', { x1, y1, x2, y2, stroke: col, 'stroke-width': '2', 'stroke-dasharray': '5,3', opacity: '0.85' }));
    if (label) {
      g.appendChild(makeElement('svg:text', {
        x: (x1 + x2) / 2, y: ((y1 + y2) / 2) - 4, fill: col, 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle'
      }, label));
    }
    return g;
  }

  static _buildDiagramSvg() {
    const svg = makeElement('svg:svg', {
      viewBox: '0 0 740 340', width: '100%', height: '340px',
      style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
    });
    const connLayer = makeElement('svg:g');
    const nodesLayer = makeElement('svg:g');

    connLayer.appendChild(this._makeSvgWire(135, 92, 260, 135, '#10b981', 'Port 8080 LAN Sync'));
    connLayer.appendChild(this._makeSvgWire(605, 92, 480, 135, '#f59e0b', 'Shares HP Charger'));
    connLayer.appendChild(this._makeSvgWire(130, 240, 280, 182, '#c084fc', 'Wi-Fi / WebRTC'));
    connLayer.appendChild(this._makeSvgWire(610, 240, 460, 182, '#c084fc', 'Wi-Fi / WebRTC'));
    connLayer.appendChild(this._makeSvgWire(370, 182, 370, 250, '#10b981', '1-Tap Pages Deploy'));
    connLayer.appendChild(this._makeSvgWire(135, 92, 260, 270, '#10b981', 'GitHub Remote Link'));

    nodesLayer.appendChild(this._makeSvgNode(260, 110, 220, 72, '🐧', 'Ubuntu Laptop (Peer)', '10.0.0.245:8080', '/home/rob/source/LunoProjects', '#00f2fe', true));
    nodesLayer.appendChild(this._makeSvgNode(25, 20, 215, 72, '🍎', 'Mac Mini Workstation', '10.0.0.226:8080 (v3.8.0)', 'Living Room • 60 Projects • Git', '#10b981'));
    nodesLayer.appendChild(this._makeSvgNode(500, 20, 215, 72, '🪟', 'Windows Laptop', 'Dead Battery (Tethered)', 'Shares HP Charger Hub', '#f59e0b'));
    nodesLayer.appendChild(this._makeSvgNode(25, 240, 215, 68, '📱', 'Phone 1 (Mobile Luno)', 'Bed / Couch Dictation', 'Origin of Luno Workspace', '#c084fc'));
    nodesLayer.appendChild(this._makeSvgNode(500, 240, 215, 68, '📱', 'Phone 2 (Test Node)', 'Companion View / P2P', 'Wi-Fi / Remote Access', '#c084fc'));
    nodesLayer.appendChild(this._makeSvgNode(260, 250, 220, 68, '☁️', 'Supabase & Pages', 'Cloud DB & Static Hosting', 'Public Comments & Repos', '#10b981'));

    svg.appendChild(connLayer);
    svg.appendChild(nodesLayer);
    return svg;
  }

  static _buildStatusFooter() {
    return makeElement('div', {
      style: {
        background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
        padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
      }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', display: 'block', marginBottom: '4px' } }, 'Verified Luno Port 8080 Federation Active'),
      'Mac Mini (',
      makeElement('strong', { style: { color: '#10b981' } }, '10.0.0.226:8080'),
      ') and Ubuntu Linux (',
      makeElement('strong', { style: { color: '#00f2fe' } }, '10.0.0.245:8080'),
      ') synchronize 60 workspace projects and 50+ Git repositories over native HTTP and GitHub Pages.'
    ]);
  }
}

globalThis.HomeFleetVisualizer = HomeFleetVisualizer;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeFleetVisualizer;