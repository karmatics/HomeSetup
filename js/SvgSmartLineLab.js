class SvgSmartLineLab {

  static render(container) {
      container.innerHTML = '';

      let isShowPlaying = false;
      let showTimer = null;

      const wrap = makeElement('div', {
        style: {
          width: '100%',
          minHeight: '660px',
          background: '#070a13',
          borderRadius: '12px',
          border: '1.5px solid #21262d',
          boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          outline: 'none'
        },
        tabIndex: 0
      });

      // 1. Header Toolbar
      const toolbar = makeElement('div', {
        style: {
          padding: '8px 14px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid #21262d',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          zIndex: 10
        }
      });

      const modeGroup = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });

      const btnLine = makeElement('button', {
        className: 'dr-tab-btn active', id: 'sml-btn-line',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '📏 Line [L]');

      const btnArc = makeElement('button', {
        className: 'dr-tab-btn', id: 'sml-btn-arc',
        style: { fontSize: '11px', padding: '4px 10px', borderRadius: '6px' }
      }, '⌒ Arc: Center & Sweep [A]');

      const btnClose = makeElement('button', {
        className: 'dr-nav-btn', id: 'sml-btn-close-loop',
        style: { fontSize: '11px', padding: '4px 10px', color: '#00f2fe', borderColor: '#00f2fe66' }
      }, '🔒 Close Loop [C]');

      modeGroup.appendChild(btnLine);
      modeGroup.appendChild(btnArc);
      modeGroup.appendChild(btnClose);

      const rightControls = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });

      const btnShow = makeElement('button', {
        className: 'dr-nav-btn primary',
        style: { fontSize: '11px', padding: '4px 10px', fontWeight: 'bold' },
        onclick: () => toggleAutonomousShow()
      }, '🎭 SmartLine Showcase');

      const statusBadge = makeElement('span', {
        id: 'sml-status-badge',
        style: {
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#10b981',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '3px 8px',
          borderRadius: '12px'
        }
      }, 'Mode: Line • Click points to draw, click near start to close');

      const btnClear = makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '3px 8px', fontSize: '10px', color: '#ef4444' }
      }, '🗑️ Clear');

      const btnExportDxf = makeElement('button', {
        className: 'dr-nav-btn',
        style: { padding: '3px 8px', fontSize: '10px', color: '#10b981', borderColor: '#10b98166' }
      }, '📤 DXF Bulges');

      rightControls.appendChild(btnShow);
      rightControls.appendChild(statusBadge);
      rightControls.appendChild(btnClear);
      rightControls.appendChild(btnExportDxf);

      toolbar.appendChild(modeGroup);
      toolbar.appendChild(rightControls);
      wrap.appendChild(toolbar);

      // 2. Sub-Bar with Fillet Control, Plane Switching, and Smart Lock Toggle
      const subBar = makeElement('div', {
        style: {
          padding: '6px 14px',
          background: '#0d1117',
          borderBottom: '1px solid #161e2b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#94a3b8',
          fontFamily: 'monospace',
          flexWrap: 'wrap',
          gap: '8px'
        }
      });

      let filletValLabel;
      const filletControl = makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        makeElement('span', { style: { color: '#00f2fe', fontWeight: 'bold' } }, 'Corner Fillet Radius:'),
        makeElement('input', {
          type: 'range', min: '0', max: '60', value: '25',
          style: { width: '90px', accentColor: '#00f2fe', cursor: 'pointer' },
          oninput: (e) => {
            state.filletRadius = parseFloat(e.target.value);
            if (filletValLabel) filletValLabel.textContent = `${state.filletRadius}px`;
            renderPermanent();
          }
        }),
        filletValLabel = makeElement('span', { style: { color: '#f8fafc', fontWeight: 'bold' } }, '25px'),
        makeElement('span', { style: { color: '#64748b', fontSize: '10px' } }, '(Trailing corner live-tunable after placement)')
      ]);

      const shortcutHints = makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, [
        btnSmartLock = makeElement('button', {
          className: 'dr-nav-btn',
          id: 'sml-btn-smart-lock',
          style: { padding: '2px 8px', fontSize: '10px', color: '#00f2fe', borderColor: '#00f2fe66' },
          onclick: () => toggleSmartLock()
        }, 'Lock: [L] SmartLock'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('top') }, 'T: Top'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px' }, onclick: () => setPlane('front') }, 'F: Front'),
        makeElement('button', { className: 'dr-nav-btn', style: { padding: '2px 6px', fontSize: '10px', color: '#10b981' }, onclick: () => jumpOrigin() }, 'G: Origin')
      ]);
      let btnSmartLock;

      subBar.appendChild(filletControl);
      subBar.appendChild(shortcutHints);
      wrap.appendChild(subBar);

      // 3. SVG Stage
      const svgArea = makeElement('div', {
        style: { flex: 1, width: '100%', height: '520px', position: 'relative', background: '#090d16', overflow: 'hidden' }
      });
      wrap.appendChild(svgArea);

      const W = 800, H = 520;
      const svg = makeElement('svg:svg', {
        viewBox: `0 0 ${W} ${H}`, width: '100%', height: '100%', style: { display: 'block', cursor: 'crosshair' }
      });

      const gridPattern = makeElement('svg:pattern', {
        id: 'smartline-grid-pat', width: '25', height: '25', patternUnits: 'userSpaceOnUse'
      }, [
        makeElement('svg:path', { d: 'M 25 0 L 0 0 0 25', fill: 'none', stroke: 'rgba(255,255,255,0.035)', 'stroke-width': '1' })
      ]);
      svg.appendChild(makeElement('svg:defs', {}, gridPattern));
      svg.appendChild(makeElement('svg:rect', { width: '100%', height: '100%', fill: 'url(#smartline-grid-pat)' }));

      const guidesLayer = makeElement('svg:g');
      const permanentLayer = makeElement('svg:g');
      const previewLayer = makeElement('svg:g');
      const compassLayer = makeElement('svg:g');
      const ghostCursorLayer = makeElement('svg:g');

      svg.appendChild(guidesLayer);
      svg.appendChild(permanentLayer);
      svg.appendChild(previewLayer);
      svg.appendChild(compassLayer);
      svg.appendChild(ghostCursorLayer);
      svgArea.appendChild(svg);

      const state = {
        mode: 'line', // 'line' | 'arc'
        arcSubPhase: 'center', // 'center' (positioning Center with dashed circle) | 'sweep' (sweeping arc)
        points: [],
        isClosed: false,
        filletRadius: 25,
        exitTangent: [1, 0],
        compassAngleDeg: 0,
        compassSquircle: 0.35,
        hoverPt: [200, 200],
        lockedCenter: null,
        lockedRadius: 0,
        isNearStart: false,
        smartLocked: false
      };

      function setMode(newMode) {
        state.mode = newMode;
        state.arcSubPhase = 'center';
        state.lockedCenter = null;
        state.smartLocked = false;
        btnSmartLock.classList.remove('active');
        btnLine.classList.toggle('active', newMode === 'line');
        btnArc.classList.toggle('active', newMode === 'arc');
        state.compassSquircle = newMode === 'arc' ? 1.0 : 0.35;

        if (newMode === 'arc') {
          statusBadge.textContent = 'Arc Phase 1: Move mouse to position Center Point (Indexes onto normal axis for tangent arc)';
        } else {
          statusBadge.textContent = 'Mode: Line • Click points to draw, click near start to close';
        }
        renderCompass();
      }

      btnLine.onclick = () => setMode('line');
      btnArc.onclick = () => setMode('arc');

      function toggleSmartLock() {
        state.smartLocked = !state.smartLocked;
        btnSmartLock.classList.toggle('active', state.smartLocked);
        if (state.smartLocked) {
          statusBadge.textContent = '🔒 SmartLock: Locked strictly to perpendicular normal axis (Tangent guarantee)';
        } else {
          statusBadge.textContent = 'Unlocked: Center can move freely off-tangent';
        }
        updatePreview();
      }

      function closeLoop() {
        if (state.points.length >= 3 && !state.isClosed) {
          state.isClosed = true;
          renderPermanent();
          statusBadge.textContent = '✓ Loop Closed! Trailing corner is live-tunable with Fillet Radius slider.';
        }
      }
      btnClose.onclick = closeLoop;

      function jumpOrigin() {
        if (state.points.length > 0) {
          const last = state.points[state.points.length - 1];
          statusBadge.textContent = `✓ Origin relocated [G] to (${last.x.toFixed(0)}, ${last.y.toFixed(0)})`;
          renderCompass();
        }
      }

      function setPlane(plane) {
        if (plane === 'top') state.compassAngleDeg = 0;
        else if (plane === 'front') state.compassAngleDeg = 90;
        renderCompass();
      }

      btnClear.onclick = () => {
        pauseShow();
        state.points = [];
        state.isClosed = false;
        state.exitTangent = [1, 0];
        state.compassAngleDeg = 0;
        state.arcSubPhase = 'center';
        state.lockedCenter = null;
        state.smartLocked = false;
        permanentLayer.innerHTML = '';
        previewLayer.innerHTML = '';
        guidesLayer.innerHTML = '';
        compassLayer.innerHTML = '';
        statusBadge.textContent = 'Cleared • Click anywhere to begin drafting';
      };

      btnExportDxf.onclick = () => {
        if (state.points.length < 2) {
          alert('Draw at least 2 points to export DXF.');
          return;
        }
        exportDxf();
      };

      function exportDxf() {
        let dxf = "0\nSECTION\n2\nENTITIES\n0\nLWPOLYLINE\n8\nSMARTLINE\n";
        dxf += `90\n${state.points.length}\n70\n${state.isClosed ? 1 : 0}\n`;
        state.points.forEach(p => {
          dxf += `10\n${p.x.toFixed(4)}\n20\n${p.y.toFixed(4)}\n`;
          if (p.bulge && Math.abs(p.bulge) > 1e-5) dxf += `42\n${p.bulge.toFixed(6)}\n`;
        });
        dxf += "0\nENDSEC\n0\nEOF\n";

        const blob = new Blob([dxf], { type: 'application/dxf' });
        const url = URL.createObjectURL(blob);
        const a = makeElement('a', { href: url, download: `SmartLine_${Date.now()}.dxf` });
        a.click();
        URL.revokeObjectURL(url);
        statusBadge.textContent = '✓ Exported AutoCAD DXF with authentic tangent bulges!';
      }

      function renderPermanent() {
        permanentLayer.innerHTML = '';
        if (state.points.length === 0) return;

        const pts = state.points.slice();
        if (state.isClosed && pts.length >= 3) {
          pts.push({ x: pts[0].x, y: pts[0].y, type: 'line', bulge: 0 });
        }

        let pathCommands = [];
        pathCommands.push(`M ${pts[0].x} ${pts[0].y}`);

        for (let i = 1; i < pts.length; i++) {
          const pPrev = pts[i - 1];
          const pCurr = pts[i];
          const pNext = pts[i + 1];

          if (pCurr.type === 'arc' && pCurr.radius && Math.abs(pCurr.bulge) > 1e-5) {
            const largeArc = Math.abs(pCurr.theta) > Math.PI ? 1 : 0;
            const sweep = pCurr.bulge < 0 ? 0 : 1;
            pathCommands.push(`A ${pCurr.radius.toFixed(1)} ${pCurr.radius.toFixed(1)} 0 ${largeArc} ${sweep} ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
          } else if (pNext && state.filletRadius > 0 && pCurr.type !== 'arc') {
            const v1x = pCurr.x - pPrev.x, v1y = pCurr.y - pPrev.y;
            const v2x = pNext.x - pCurr.x, v2y = pNext.y - pCurr.y;
            const l1 = Math.hypot(v1x, v1y), l2 = Math.hypot(v2x, v2y);

            const u1x = v1x / l1, u1y = v1y / l1;
            const u2x = v2x / l2, u2y = v2y / l2;
            const dot = Math.max(-1, Math.min(1, u1x * u2x + u1y * u2y));
            const turningAngle = Math.acos(dot);

            if (turningAngle > 0.05 && turningAngle < Math.PI - 0.05) {
              const halfAngle = (Math.PI - turningAngle) / 2;
              const setback = state.filletRadius / Math.tan(halfAngle);

              if (setback > l1 * 0.48 || setback > l2 * 0.48) {
                pathCommands.push(`L ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
              } else {
                const t1x = pCurr.x - setback * u1x;
                const t1y = pCurr.y - setback * u1y;
                const t2x = pCurr.x + setback * u2x;
                const t2y = pCurr.y + setback * u2y;

                const cross = u1x * u2y - u1y * u2x;
                const sweep = cross > 0 ? 1 : 0;

                pathCommands.push(`L ${t1x.toFixed(1)} ${t1y.toFixed(1)}`);
                pathCommands.push(`A ${state.filletRadius} ${state.filletRadius} 0 0 ${sweep} ${t2x.toFixed(1)} ${t2y.toFixed(1)}`);
              }
            } else {
              pathCommands.push(`L ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
            }
          } else {
            pathCommands.push(`L ${pCurr.x.toFixed(1)} ${pCurr.y.toFixed(1)}`);
          }
        }

        if (state.isClosed) pathCommands.push('Z');

        permanentLayer.appendChild(makeElement('svg:path', {
          d: pathCommands.join(' '), fill: state.isClosed ? 'rgba(16, 185, 129, 0.12)' : 'none',
          stroke: '#10b981', 'stroke-width': '3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }));

        state.points.forEach((p, idx) => {
          permanentLayer.appendChild(makeElement('svg:circle', {
            cx: p.x, cy: p.y, r: 4, fill: idx === state.points.length - 1 ? '#00f2fe' : '#10b981'
          }));
        });
      }

      function renderCompass() {
        compassLayer.innerHTML = '';
        if (state.points.length === 0 || state.isClosed) return;

        const last = state.points[state.points.length - 1];
        const g = makeElement('svg:g', {
          transform: `translate(${last.x}, ${last.y}) rotate(${state.compassAngleDeg})`
        });

        const compass = SquircleCompassSvg.renderElement({
          size: 80,
          squircle: state.compassSquircle,
          activeAxis: state.mode === 'arc' ? 'y' : null, // Y is perpendicular normal axis!
          showMiniJack: false
        });
        compass.setAttribute('x', '-40');
        compass.setAttribute('y', '-40');
        g.appendChild(compass);
        compassLayer.appendChild(g);
      }

      function updatePreview() {
        previewLayer.innerHTML = '';
        guidesLayer.innerHTML = '';
        if (state.points.length === 0 || state.isClosed) return;

        const last = state.points[state.points.length - 1];
        const [x, y] = state.hoverPt;

        // Normal perpendicular vector to incoming tangent: (-ty, tx)
        const nx = -state.exitTangent[1];
        const ny = state.exitTangent[0];

        if (state.mode === 'arc') {
          if (state.arcSubPhase === 'center') {
            // Normal line trajectory guide (tangent center locus)
            const normLen = 400;
            guidesLayer.appendChild(makeElement('svg:line', {
              x1: last.x - nx * normLen, y1: last.y - ny * normLen,
              x2: last.x + nx * normLen, y2: last.y + ny * normLen,
              stroke: 'rgba(56, 189, 248, 0.4)', 'stroke-width': '1.5', 'stroke-dasharray': '4,4'
            }));

            // Measure distance from cursor to normal line
            const vx = x - last.x, vy = y - last.y;
            const parDist = vx * nx + vy * ny; // distance along normal
            const perpDist = Math.abs(vx * state.exitTangent[0] + vy * state.exitTangent[1]); // distance off normal

            let candX = x, candY = y;
            const isIndexed = perpDist < 18 || state.smartLocked;

            if (isIndexed) {
              // Clamped onto normal axis!
              candX = last.x + parDist * nx;
              candY = last.y + parDist * ny;

              // Highlight white constraint line along normal
              guidesLayer.appendChild(makeElement('svg:line', {
                x1: last.x, y1: last.y, x2: candX, y2: candY,
                stroke: '#ffffff', 'stroke-width': '2.5'
              }));
            }

            const R = Math.hypot(candX - last.x, candY - last.y);

            // Dashed circle around candidate center passing through P0
            previewLayer.appendChild(makeElement('svg:circle', {
              cx: candX, cy: candY, r: R,
              fill: 'none', stroke: isIndexed ? '#00f2fe' : 'rgba(56, 189, 248, 0.45)',
              'stroke-width': '1.8', 'stroke-dasharray': '4,4'
            }));

            // Radius line
            previewLayer.appendChild(makeElement('svg:line', {
              x1: last.x, y1: last.y, x2: candX, y2: candY,
              stroke: isIndexed ? '#10b981' : '#f59e0b', 'stroke-width': '1.5', 'stroke-dasharray': '2,2'
            }));

            // Center crosshair marker
            previewLayer.appendChild(makeElement('svg:circle', {
              cx: candX, cy: candY, r: 4.5, fill: isIndexed ? '#00f2fe' : '#f59e0b'
            }));

            if (isIndexed) {
              statusBadge.textContent = `🎯 Tangent Index Active: R = ${R.toFixed(0)}px • Click to lock Center Point`;
            } else {
              statusBadge.textContent = `Arc Center: Move near dashed normal for tangent arc, or press [L] for SmartLock`;
            }
          } else if (state.arcSubPhase === 'sweep') {
            // Phase 2: Sweeping the arc
            const C = state.lockedCenter;
            const R = state.lockedRadius;
            const a0 = Math.atan2(last.y - C[1], last.x - C[0]);
            const a1 = Math.atan2(y - C[1], x - C[0]);
            let delta = a1 - a0;
            if (delta < -Math.PI) delta += Math.PI * 2;
            if (delta > Math.PI) delta -= Math.PI * 2;

            const bulge = Math.tan(delta / 4);
            const largeArc = Math.abs(delta) > Math.PI ? 1 : 0;
            const sweep = delta >= 0 ? 1 : 0;

            const endX = C[0] + R * Math.cos(a1);
            const endY = C[1] + R * Math.sin(a1);

            // Base circle ghost
            previewLayer.appendChild(makeElement('svg:circle', {
              cx: C[0], cy: C[1], r: R,
              fill: 'none', stroke: 'rgba(56, 189, 248, 0.25)', 'stroke-width': '1', 'stroke-dasharray': '4,4'
            }));

            // Arc sweep
            const d = `M ${last.x} ${last.y} A ${R.toFixed(1)} ${R.toFixed(1)} 0 ${largeArc} ${sweep} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
            previewLayer.appendChild(makeElement('svg:path', {
              d, fill: 'none', stroke: '#00f2fe', 'stroke-width': '2.5'
            }));

            previewLayer.appendChild(makeElement('svg:circle', { cx: C[0], cy: C[1], r: 3.5, fill: '#f59e0b' }));
            previewLayer.appendChild(makeElement('svg:circle', { cx: endX, cy: endY, r: 4, fill: '#10b981' }));
          }
        } else {
          // Line preview
          previewLayer.appendChild(makeElement('svg:line', {
            x1: last.x, y1: last.y, x2: x, y2: y,
            stroke: '#00f2fe', 'stroke-width': '2', 'stroke-dasharray': '4,4'
          }));
        }
      }

      function toggleAutonomousShow() {
        isShowPlaying = !isShowPlaying;
        if (isShowPlaying) {
          btnShow.textContent = '⏸ Pause Show';
          btnShow.style.background = '#f59e0b';
          btnShow.style.color = '#000';
          startShowRoutine();
        } else {
          pauseShow();
        }
      }

      function pauseShow() {
        isShowPlaying = false;
        if (showTimer) clearTimeout(showTimer);
        showTimer = null;
        ghostCursorLayer.innerHTML = '';
        if (btnShow) {
          btnShow.textContent = '🎭 SmartLine Showcase';
          btnShow.style.background = '';
          btnShow.style.color = '';
        }
      }

      function startShowRoutine() {
        state.points = [];
        state.isClosed = false;
        state.exitTangent = [1, 0];
        state.compassAngleDeg = 0;
        state.arcSubPhase = 'center';
        renderPermanent();
        renderCompass();

        const script = [
          { mode: 'line', pt: [140, 360], note: 'Anchor Origin P0 at (140, 360)' },
          { mode: 'line', pt: [360, 360], note: 'Pull horizontal line along X-axis to P1' },
          // Two-phase Arc with Normal Indexing:
          { mode: 'arc_center', pt: [360, 240], note: 'Toggle [A] • Compass aligns with line • Center indexes onto normal (360, 240)' },
          { mode: 'arc_sweep', pt: [480, 240], note: 'Sweep 90° arc to (480, 240) • DXF bulge = +0.4142' },
          { mode: 'line', pt: [480, 140], note: 'Exit Arc along tangent into vertical line' },
          { mode: 'line', pt: [240, 140], note: 'Corner Fillet setback automatically applied' },
          { mode: 'close', pt: [140, 360], note: 'Close loop • Trailing corner live-tunable' }
        ];

        let stepIdx = 0;
        function nextShowStep() {
          if (!isShowPlaying || stepIdx >= script.length) {
            pauseShow();
            statusBadge.textContent = '✓ Autonomous SmartLine routine complete! Click canvas to take over.';
            return;
          }

          const s = script[stepIdx];
          statusBadge.textContent = `Auto Drafter: ${s.note}`;

          ghostCursorLayer.innerHTML = '';
          ghostCursorLayer.appendChild(makeElement('svg:circle', {
            cx: s.pt[0], cy: s.pt[1], r: 7, fill: 'none', stroke: '#00f2fe', 'stroke-width': 2, 'stroke-dasharray': '3,2'
          }));

          if (s.mode === 'close') {
            closeLoop();
          } else if (s.mode === 'arc_center') {
            setMode('arc');
            state.arcSubPhase = 'sweep';
            state.lockedCenter = s.pt.slice();
            const pLast = state.points[state.points.length - 1];
            state.lockedRadius = Math.hypot(s.pt[0] - pLast.x, s.pt[1] - pLast.y);
          } else if (s.mode === 'arc_sweep') {
            const pLast = state.points[state.points.length - 1];
            const C = state.lockedCenter;
            const R = state.lockedRadius;
            const a0 = Math.atan2(pLast.y - C[1], pLast.x - C[0]);
            const a1 = Math.atan2(s.pt[1] - C[1], s.pt[0] - C[0]);
            let delta = a1 - a0;
            if (delta < -Math.PI) delta += Math.PI * 2;
            if (delta > Math.PI) delta -= Math.PI * 2;
            const bulge = Math.tan(delta / 4);

            state.points.push({
              x: s.pt[0], y: s.pt[1], type: 'arc', bulge, theta: delta, radius: R, center: C
            });

            const sweepSign = delta >= 0 ? 1 : -1;
            state.exitTangent = [-Math.sin(a1) * sweepSign, Math.cos(a1) * sweepSign];
            state.compassAngleDeg = (Math.atan2(state.exitTangent[1], state.exitTangent[0]) * 180) / Math.PI;

            setMode('line');
            renderPermanent();
            renderCompass();
          } else {
            setMode(s.mode);
            state.points.push({ x: s.pt[0], y: s.pt[1], type: 'line', bulge: 0 });
            if (state.points.length >= 2) {
              const pPrev = state.points[state.points.length - 2];
              const dx = s.pt[0] - pPrev.x, dy = s.pt[1] - pPrev.y;
              const len = Math.hypot(dx, dy);
              if (len > 1e-4) {
                state.exitTangent = [dx / len, dy / len];
                state.compassAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
              }
            }
            renderPermanent();
            renderCompass();
          }

          stepIdx++;
          showTimer = setTimeout(nextShowStep, 1200);
        }

        nextShowStep();
      }

      svgArea.addEventListener('pointerdown', (e) => {
        pauseShow();
        if (e.button !== 0) return;

        if (state.isClosed) {
          state.points = [];
          state.isClosed = false;
          state.arcSubPhase = 'center';
        }

        const rect = svg.getBoundingClientRect();
        const rawX = (e.clientX - rect.left) * (W / rect.width);
        const rawY = (e.clientY - rect.top) * (H / rect.height);

        if (state.isNearStart && state.points.length >= 3) {
          closeLoop();
          previewLayer.innerHTML = '';
          return;
        }

        if (state.mode === 'arc') {
          if (state.points.length === 0) {
            state.points.push({ x: Math.round(rawX), y: Math.round(rawY), type: 'line', bulge: 0 });
            renderPermanent();
            renderCompass();
            return;
          }

          const pLast = state.points[state.points.length - 1];

          if (state.arcSubPhase === 'center') {
            const nx = -state.exitTangent[1];
            const ny = state.exitTangent[0];
            const vx = rawX - pLast.x, vy = rawY - pLast.y;
            const parDist = vx * nx + vy * ny;
            const perpDist = Math.abs(vx * state.exitTangent[0] + vy * state.exitTangent[1]);

            let cx = rawX, cy = rawY;
            if (perpDist < 18 || state.smartLocked) {
              cx = pLast.x + parDist * nx;
              cy = pLast.y + parDist * ny;
            }

            const R = Math.hypot(cx - pLast.x, cy - pLast.y);
            if (R < 5) return;

            state.lockedCenter = [cx, cy];
            state.lockedRadius = R;
            state.arcSubPhase = 'sweep';
            statusBadge.textContent = `Arc Center committed at (${cx.toFixed(0)}, ${cy.toFixed(0)}) • Move cursor to sweep arc and click endpoint!`;
            renderCompass();
            updatePreview();
            return;
          } else if (state.arcSubPhase === 'sweep') {
            const C = state.lockedCenter;
            const R = state.lockedRadius;
            const a0 = Math.atan2(pLast.y - C[1], pLast.x - C[0]);
            const a1 = Math.atan2(rawY - C[1], rawX - C[0]);
            let delta = a1 - a0;
            if (delta < -Math.PI) delta += Math.PI * 2;
            if (delta > Math.PI) delta -= Math.PI * 2;
            const bulge = Math.tan(delta / 4);

            const endX = Math.round(C[0] + R * Math.cos(a1));
            const endY = Math.round(C[1] + R * Math.sin(a1));

            state.points.push({
              x: endX, y: endY, type: 'arc', bulge, theta: delta, radius: R, center: C
            });

            const sweepSign = delta >= 0 ? 1 : -1;
            state.exitTangent = [-Math.sin(a1) * sweepSign, Math.cos(a1) * sweepSign];
            state.compassAngleDeg = (Math.atan2(state.exitTangent[1], state.exitTangent[0]) * 180) / Math.PI;

            setMode('line');
            renderPermanent();
            renderCompass();
            updatePreview();
            return;
          }
        }

        const x = Math.round(rawX), y = Math.round(rawY);
        state.points.push({ x, y, type: 'line', bulge: 0 });
        if (state.points.length >= 2) {
          const pPrev = state.points[state.points.length - 2];
          const dx = x - pPrev.x, dy = y - pPrev.y;
          const len = Math.hypot(dx, dy);
          if (len > 1e-4) {
            state.exitTangent = [dx / len, dy / len];
            state.compassAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
          }
        }

        renderPermanent();
        renderCompass();
        updatePreview();
      });

      svgArea.addEventListener('pointermove', (e) => {
        if (isShowPlaying) return;
        const rect = svg.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (W / rect.width);
        const y = (e.clientY - rect.top) * (H / rect.height);
        state.hoverPt = [x, y];
        updatePreview();
      });

      wrap.addEventListener('keydown', (e) => {
        pauseShow();
        const k = e.key.toUpperCase();
        if (k === 'A' || e.key === '~') setMode('arc');
        else if (k === 'L') {
          if (state.mode === 'arc') toggleSmartLock();
          else setMode('line');
        }
        else if (k === 'C') closeLoop();
        else if (k === 'G') jumpOrigin();
        else if (k === 'T') setPlane('top');
        else if (k === 'F') setPlane('front');
      });

      container.appendChild(wrap);
    }
}

globalThis.SvgSmartLineLab = SvgSmartLineLab;
if (typeof module !== 'undefined' && module.exports) module.exports = SvgSmartLineLab;