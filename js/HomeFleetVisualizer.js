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
          makeElement('span', { style: { fontSize: '15px' } }, '🖥️'),
          makeElement('strong', { style: { fontSize: '13px', color: '#00f2fe', fontFamily: 'monospace' } }, 'Home Fleet Verified: Ubuntu (10.0.0.245) ↔ Mac (10.0.0.226:8080)'),
          makeElement('span', { style: { fontSize: '10px', background: '#10b981', color: '#000', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' } }, '44 Projects Verified')
        ]),
        makeElement('span', { style: { fontSize: '11px', color: '#10b981', fontFamily: 'monospace' } }, '● Mac Luno v3.8.0 Active')
      ]);
      wrap.appendChild(header);

      const stage = makeElement('div', {
        style: { padding: '16px', background: '#090d16', display: 'flex', flexDirection: 'column', gap: '12px' }
      });

      const svgW = 740, svgH = 340;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${svgW} ${svgH}`, width: '100%', height: '340px',
        style: { display: 'block', background: '#050811', border: '1px solid #1e293b', borderRadius: '10px' }
      });

      const connLayer = makeElement('svg:g');
      const nodesLayer = makeElement('svg:g');
      svg.appendChild(connLayer);
      svg.appendChild(nodesLayer);

      const makeNode = (x, y, w, h, icon, title, subtitle, statusText, col, isCenter = false) => {
        const g = makeElement('svg:g', { transform: `translate(${x}, ${y})`, style: { cursor: 'pointer' } });
        g.appendChild(makeElement('svg:rect', {
          width: w, height: h, rx: '8', fill: isCenter ? 'rgba(15, 23, 42, 0.95)' : '#0a0d16',
          stroke: col, 'stroke-width': isCenter ? '2.5' : '1.5',
          filter: isCenter ? 'drop-shadow(0 0 12px rgba(0, 242, 254, 0.5))' : 'none'
        }));
        g.appendChild(makeElement('svg:text', {
          x: '14', y: '22', fill: col, 'font-family': 'monospace', 'font-size': '12px', 'font-weight': 'bold'
        }, `${icon} ${title}`));
        g.appendChild(makeElement('svg:text', {
          x: '14', y: '38', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10px', 'font-weight': 'bold'
        }, subtitle));
        g.appendChild(makeElement('svg:text', {
          x: '14', y: '54', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9px'
        }, statusText));
        return g;
      };

      const makeWire = (x1, y1, x2, y2, col, label) => {
        const g = makeElement('svg:g');
        g.appendChild(makeElement('svg:line', {
          x1, y1, x2, y2, stroke: col, 'stroke-width': '2', 'stroke-dasharray': '5,3', opacity: '0.85'
        }));
        if (label) {
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          g.appendChild(makeElement('svg:text', {
            x: mx, y: my - 4, fill: col, 'font-family': 'monospace', 'font-size': '8.5px', 'text-anchor': 'middle'
          }, label));
        }
        return g;
      };

      // 1. Ubuntu Laptop (Current Host in Bedroom)
      const ubuntuNode = makeNode(260, 110, 220, 72, '🐧', 'Ubuntu Laptop (Host)', '10.0.0.245:8080', 'Bedroom • /root/source/LunoProjects', '#00f2fe', true);

      // 2. Mac Workstation (Living Room Big Monitors - 44 Projects Verified)
      const macNode = makeNode(25, 20, 215, 72, '🍎', 'Mac Workstation', '10.0.0.226:8080 (Luno v3.8.0)', 'Living Room • 44 Projects • Git Repos', '#10b981');

      // 3. Windows Laptop (Tethered Rig)
      const winNode = makeNode(500, 20, 215, 72, '🪟', 'Windows Laptop', 'Dead Battery (Tethered)', 'Shares HP Charger Hub', '#f59e0b');

      // 4. Two Phones (Mobile Command & Dictation)
      const phone1Node = makeNode(25, 240, 215, 68, '📱', 'Phone 1 (Mobile Luno)', 'Bed / Couch Dictation', 'Origin of Luno Workspace', '#c084fc');
      const phone2Node = makeNode(500, 240, 215, 68, '📱', 'Phone 2 (Test Node)', 'Companion View / P2P', 'Wi-Fi / Remote Access', '#c084fc');

      // 5. Cloud Storage: Supabase & GitHub Pages
      const cloudNode = makeNode(260, 250, 220, 68, '☁️', 'Supabase & Pages', 'Cloud DB & Static Hosting', 'Public Comments & Repos', '#10b981');

      // Connection Wires
      connLayer.appendChild(makeWire(135, 92, 260, 135, '#10b981', 'HTTP 200 (44 Projects Verified)'));
      connLayer.appendChild(makeWire(605, 92, 480, 135, '#f59e0b', 'Shares HP Charger'));
      connLayer.appendChild(makeWire(130, 240, 280, 182, '#c084fc', 'Wi-Fi / WebRTC'));
      connLayer.appendChild(makeWire(610, 240, 460, 182, '#c084fc', 'Wi-Fi / WebRTC'));
      connLayer.appendChild(makeWire(370, 182, 370, 250, '#10b981', '1-Tap Pages Deploy'));
      connLayer.appendChild(makeWire(135, 92, 260, 270, '#10b981', 'GitHub Remote Link'));

      nodesLayer.appendChild(ubuntuNode);
      nodesLayer.appendChild(macNode);
      nodesLayer.appendChild(winNode);
      nodesLayer.appendChild(phone1Node);
      nodesLayer.appendChild(phone2Node);
      nodesLayer.appendChild(cloudNode);

      stage.appendChild(svg);

      const desc = makeElement('div', {
        style: {
          background: '#0a0e1a', border: '1px solid #1e293b', borderRadius: '8px',
          padding: '12px 14px', fontSize: '11.5px', color: '#cbd5e1', lineHeight: '1.55'
        }
      }, [
        makeElement('strong', { style: { color: '#00f2fe', display: 'block', marginBottom: '4px' } }, 'Verified Luno Federation Active'),
        'The Mac is confirmed online at ',
        makeElement('strong', { style: { color: '#10b981' } }, '10.0.0.226:8080'),
        ' hosting 44 project repositories. The Ubuntu host at ',
        makeElement('strong', { style: { color: '#00f2fe' } }, '10.0.0.245:8080'),
        ' holds the brand-new HomeSetup project. All communication proceeds over native HTTP.'
      ]);
      stage.appendChild(desc);

      wrap.appendChild(stage);
      container.appendChild(wrap);
    }
}

globalThis.HomeFleetVisualizer = HomeFleetVisualizer;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeFleetVisualizer;