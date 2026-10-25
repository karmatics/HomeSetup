class CadITwinParityContent {
  static getMeta() {
    return {
      kicker: 'Lineage Parity & SmartLine Specification',
      title: '10. iTwin Parity Audit & SmartLine Spec',
      subtitle: 'Auditing Bentley’s 3,862-line TypeScript AccuDraw engine, formalizing the SmartLine state machine, and blueprinting compassdraw-core in Rust.'
    };
  }

  static manifest() {
          return [
            {
              section: 'universal_converter_top',
              partLabel: 'Chapter 10 • Transformation Lab',
              title: 'Universal Arc & Coordinate Transformation Engine',
              blocks: [
                { id: 'comp_coordinate_converter', type: 'component', component: 'CadCoordinateConverterLab' }
              ]
            },
            {
              section: 'smart_keyin_lab_top',
              partLabel: 'Chapter 10 • SmartKeyin & Backspace',
              title: 'Directional Sign Inference & CAD Smart Backspace Laboratory',
              blocks: [
                { id: 'comp_smart_keyin_lab', type: 'component', component: 'CadSmartKeyinLab' }
              ]
            },
            {
              section: 'tangent_arc_swing_top',
              partLabel: 'Chapter 10 • Tangent Arc Physics',
              title: 'Closest-Point Sweep Principle & Tangent Arc Swing Studio',
              blocks: [
                { id: 'comp_tangent_arc_swing_lab', type: 'component', component: 'CadTangentArcSwingLab' }
              ]
            },
            {
              section: 'itwin_audit',
              partLabel: 'Chapter 10 • Lineage',
              title: 'Inside Bentley iTwin AccuDraw.ts (3,862 Lines)',
              blocks: [
                { id: 'p_itwin_1', type: 'p' },
                { id: 'p_itwin_2', type: 'p' },
                { id: 'sidebar_itwin_architecture', type: 'sidebar', kicker: 'iTwin Symbols', title: 'AccuDraw.ts & AccuSnap.ts Core Topology' }
              ]
            },
            {
              section: 'smartline_spec',
              partLabel: 'Chapter 10 • SmartLine',
              title: 'The SmartLine Continuous Chaining State Machine',
              blocks: [
                { id: 'comp_3d_smartline_lab', type: 'component', component: 'Cad3DSmartLineLab' },
                { id: 'comp_svg_smartline_lab', type: 'component', component: 'SvgSmartLineLab' },
                { id: 'p_smartline_1', type: 'p' },
                { id: 'p_smartline_2', type: 'p' },
                { id: 'sidebar_smartline_transitions', type: 'sidebar', kicker: 'State Machine', title: 'SmartLine Continuous Geometry Transitions' },
                { id: 'p_smartline_3', type: 'p' }
              ]
            },
            {
              section: 'surface_and_state',
              partLabel: 'Chapter 10 • Surface Kinematics & State',
              title: 'Surface Normal Alignment (Q), Transactional Undo & winit Key Interception',
              blocks: [
                { id: 'p_surface_normal_1', type: 'p' },
                { id: 'sidebar_surface_normal_math', type: 'sidebar', kicker: 'Gram-Schmidt Math', title: '3D Face Normal Derivation & Non-Flipping Axes' },
                { id: 'p_state_stack_1', type: 'p' },
                { id: 'sidebar_smart_backspace_winit', type: 'sidebar', kicker: 'Event Interception', title: 'Single-Stroke Typing & Smart Backspace in winit' }
              ]
            },
            {
              section: 'fillet_comparison',
              partLabel: 'Chapter 10 • Mathematics',
              title: 'Fillet Geometry: CADCraft Newton-Raphson vs. Analytic Bisector',
              blocks: [
                { id: 'p_fillet_comp_1', type: 'p' },
                { id: 'p_fillet_comp_2', type: 'p' },
                { id: 'sidebar_fillet_comparison', type: 'sidebar', kicker: 'Algorithm Audit', title: 'CornerFit (Rust) vs. RoundingUtils3D (JS)' }
              ]
            },
            {
              section: 'smart_keyin',
              partLabel: 'Chapter 10 • Ergonomics',
              title: 'SmartKeyin: Directional Sign Inference & SavedState',
              blocks: [
                { id: 'p_smart_keyin_1', type: 'p' },
                { id: 'p_smart_keyin_2', type: 'p' },
                { id: 'sidebar_smart_keyin_math', type: 'sidebar', kicker: 'Math & State Stack', title: 'SmartKeyin Quadrant Inference & SavedState' }
              ]
            },
            {
              section: 'mcp_agents',
              partLabel: 'Chapter 10 • AI Agents',
              title: 'MCP Autonomous Drafting & Compass Constraints',
              blocks: [
                { id: 'p_mcp_agent_spec_1', type: 'p' },
                { id: 'p_mcp_agent_spec_2', type: 'p' },
                { id: 'sidebar_mcp_compass_tools', type: 'sidebar', kicker: 'Agent API', title: 'Model Context Protocol Compass Endpoints' }
              ]
            },
            {
              section: 'rust_core',
              partLabel: 'Chapter 10 • Rust Blueprint',
              title: 'compassdraw-core: The Headless Rust Crate',
              blocks: [
                { id: 'p_rust_crate_1', type: 'p' },
                { id: 'p_rust_crate_2', type: 'p' },
                { id: 'sidebar_rust_crate_api', type: 'sidebar', kicker: 'Rust Architecture', title: 'compassdraw-core Crate Specification' }
              ]
            }
          ];
        }
  static p_itwin_1() {
    return [
      "With the direct download of Bentley's `@itwin/core-frontend` production source into our workspace (`itwin_reference/AccuDraw.ts` and `AccuSnap.ts`), we can compare my original 1990s C implementation, our modern WebGL `accuCad` prototype, and Bentley's active 3,862-line TypeScript engine side-by-side."
    ];
  }

  static p_itwin_2() {
      return [
        "Our direct code inspection of Bentley's `AccuDraw.ts` confirms the five foundational pillars of the engine:",
        "1. **`ThreeAxes` (3D Direction Cosines):** Maintains three orthonormal unit vectors (`x`, `y`, `z`) derived from `Matrix3d`. It provides `fromMatrix3d`, `toMatrix3d`, and `equals`, allowing the compass plane to rotate into Top, Front, Side, View, or arbitrary surface normals without gimbal lock.",
        "2. **`RoundOff` (Screen-Space Inset & Hysteresis):** Computes distance and angle round-offs. As Rob Brown emphasizes, indexing hysteresis is evaluated in screen-space pixels to maintain uniform tactile feel across zoom ratios, preventing magnetic traps through single-keystroke axis isolation.",
        "3. **`ItemField` & `KeyinStatus`:** Tracks the active input focus across X, Y, Distance, Angle, and Z. Distinguishes between dynamic coordinate tracking (`KeyinStatus.Dynamic`) and hard numerical locks (`KeyinStatus.Locked`).",
        "4. **`AccuDrawHintBuilder`:** The standardized protocol whereby interactive CAD drawing tools communicate contextual intent to the compass—such as anchoring origin to the prior vertex, aligning orientation to the current stroke segment, or locking polar angles.",
        "5. **`SavedState`:** A transactional state stack that allows AccuDraw to push and pop coordinate frames across view manipulation and nested sub-commands."
      ];
    }

  static sidebar_itwin_architecture() {
      return [
        "Verified Bentley iTwin Production Architecture (itwinjs-core):\n" +
        "• `ThreeAxes`: True 3×3 direction-cosine basis managing spatial orientation vectors.\n" +
        "• `RoundOff`: Distance & angle roundoff engine with screen-space hysteresis tolerance.\n" +
        "• `AccuDrawFlags`: Packed state flags for auto-orientation, floating vs. fixed origin, and polar mode.\n" +
        "• Axis Lock Isolation: Single-stroke shortcut locks the axis constraint while disengaging distance indexing traps.\n" +
        "• `AccuDrawHintBuilder`: Methods including `setOrigin`, `setRotation`, `setLockAngle`, `setMode`, and `sendHints`.\n" +
        "• `AccuSnap.ts`: Proximity-based candidate element harvesting and tentative point latching."
      ];
    }

  static p_smartline_1() {
    return [
      "In 1994, alongside AccuDraw, I invented SmartLine. Prior to SmartLine, CAD users were forced to draw individual straight lines, circles, and arcs using separate disconnected tools, manually trimming intersections and using fillet commands to round corners afterwards. SmartLine combined all linear geometry into a single continuous gesture.",
      "Within SmartLine, there are two distinct kinds of arcs: **Rounded Corner Fillets** and **Independent Tangent Arc Segments**. If a rounded corner could do it, that's what was done. Crucially, when rounded corner is turned on, **it rounds the transition even when it is rounding into an arc**—we lock them down as soon as we can. The original SmartLine offered chamfers as well, but we are discarding chamfers because chamfering into an arc does not make geometric sense.",
      "For corner fillets, **if a segment was too short to physically fit the requested rounding radius, SmartLine simply rendered a clean, sharp corner**. It did not distort the drafter's requested radius, push adjacent vertices, or interrupt the user with modal error dialogs. The geometry stayed clean, predictable, and fast."
    ];
  }

  static p_smartline_2() {
      return [
        "In MicroStation, SmartLine and AccuDraw are two independent subsystems that multiply each other's power. You don't have to have AccuDraw on to use SmartLine—but when AccuDraw is active with Context Sensitivity turned on, the compass automatically rotates to align with the last placed line or arc.",
        "**The Tangency Synergy:** Because the compass is aligned with the incoming line, the perpendicular normal axis represents the exact locus of all centers for tangent arcs. Making an arc tangent is effortless: you simply move the center point until it indexes onto that axis. Furthermore, you can tap **`L` (Smart Lock)** to lock the center point strictly to that normal trajectory. Once locked, you can snap to any unrelated feature in the drawing—using AccuDraw's model-space perpendicular projection to determine the exact radius from background geometry—or type a numeric radius directly onto the locked axis and click.",
        "**Two-Phase Arc Placement:** Phase 1 places the Center Point $C$ (with a dashed reference circle of radius $R = \\|C - P_0\\|$ showing the exact circle the arc will lie on). Clicking commits $C$ and radius $R$. Phase 2 sweeps the arc around $C$ from $P_0$ to the cursor endpoint. Clicking commits the endpoint, stores the exact AutoCAD DXF bulge factor $\\tan(\\theta/4)$, and rotates the compass to the exit tangent vector so the next stroke flows continuously.",
        "If the drafter wants to break free of tangency, single keystrokes like **`T` (Top)**, **`F` (Front)**, or **`V` (View)** instantly reorient the compass to global planes without interrupting the continuous polyline chain."
      ];
    }

  static sidebar_smartline_transitions() {
      return [
        "The AccuDraw ↔ SmartLine Synergy (Rob Brown Provenance):\n" +
        "1. Independent Subsystems:\n" +
        "   • SmartLine functions standalone, but pairing with AccuDraw unlocks kinetic 3D superpowers.\n" +
        "2. Context Sensitivity Alignment:\n" +
        "   • Compass automatically rotates to align with the incoming segment's vector.\n" +
        "3. Tangency via Axis Indexing:\n" +
        "   • The perpendicular normal axis is the tangent center locus.\n" +
        "   • Moving the arc center near this axis snaps it into exact G1 tangency.\n" +
        "4. Smart Lock (L) on Normal Axis:\n" +
        "   • Tapping 'L' locks the center to the normal trajectory.\n" +
        "   • Drafter can snap to background geometry to set radius via perpendicular projection, or type a scalar radius.\n" +
        "5. Two-Phase Arc Geometry:\n" +
        "   • Phase 1 (Center): Cursor positions Center C; dashed circle of radius R = ||C - P_0|| is displayed.\n" +
        "   • Phase 2 (Sweep): Cursor sweeps arc from P_0 around C to endpoint; commits DXF bulge = tan(θ/4).\n" +
        "6. Exit Tangent & Plane Overrides:\n" +
        "   • Compass auto-orients to arc exit tangent upon commit.\n" +
        "   • Tapping T, F, S, or V breaks compass to orthogonal planes mid-stroke."
      ];
    }
  static p_smartline_3() {
      return [
        "To bring this interaction model into the modern open ecosystem, we implement the entire 2D drafting engine in pure SVG. In the live laboratory above, you can lay down lines, press `A` or `~` to swing dynamic tangent arcs, watch the Squircle Compass rotate to align with exit tangents, and press `T` or `V` to break onto standard planes.",
        "Each segment drawn in the SVG canvas maps 1:1 into CADCraft's `LwPolyline` with `PolyVertex { point, bulge: tan(θ/4) }`. When the user is drafting, they can swing arcs intuitively with their cursor, and the underlying mathematical engine preserves exact CAD fidelity for export."
      ];
    }

  static p_rust_crate_1() {
      return [
        "To bridge our interaction design into CADCraft and the broader Rust CAD ecosystem, we are blueprinting `compassdraw-core`—a standalone, pure-Rust crate with `no_std` compatibility that compiles to native desktop binaries (macOS Metal, Windows DX12, Linux Vulkan via `winit`/`wgpu`) as well as WebAssembly.",
        "The crate contains zero UI, windowing, or DOM allocations. It takes ray origins, ray directions, and key codes, and returns constrained coordinates, direction-cosine matrix bases, and arc bulge factors."
      ];
    }

  static p_rust_crate_2() {
      return [
        "Because `compassdraw-core` is decoupled from both the GPU and windowing systems, it satisfies both requirements simultaneously:",
        "1. **2D Drafting Replacement:** In 2D mode, it locks the projection plane to Top ($Z=0$), converting 3D ray intersections into 2D planar coordinates (`[x, y, 0.0]`) that feed directly into CADCraft's standard `Vec2` command machines.",
        "2. **3D Spatial Navigation:** In 3D mode, single-keystroke inputs (`T`, `F`, `S`, `V`, `Q`) reorient `ThreeAxes`, allowing `PlineM` and CADCraft's `Mat4::ocs` to extrude angled faces with exact topological continuity.",
        "3. **Dual Host Support:** The same crate feeds CADCraft's native `wgpu` overlay pass on desktop and drives Three.js / WebGL viewports via our `host.rs` postMessage bridge on the web."
      ];
    }

  static sidebar_rust_crate_api() {
      return [
        "compassdraw-core Rust Crate Blueprint (crates/compassdraw-core):\n" +
        "```rust\n" +
        "pub struct ThreeAxes {\n" +
        "    pub x: [f64; 3],\n" +
        "    pub y: [f64; 3],\n" +
        "    pub z: [f64; 3],\n" +
        "}\n\n" +
        "pub struct CompassDraw {\n" +
        "    pub origin: [f64; 3],\n" +
        "    pub axes: ThreeAxes,\n" +
        "    pub mode: CompassMode, // Rectangular | Polar | Mixed\n" +
        "    pub active_field: ItemField, // X | Y | Dist | Angle | Z\n" +
        "    pub is_3d: bool, // When false, clamps Z=0 for classic 2D AutoCAD mode\n" +
        "    pub locks: CoordinateLocks,\n" +
        "    pub roundoff: RoundOffEngine,\n" +
        "    pub smartline: SmartLineStateMachine,\n" +
        "}\n\n" +
        "impl CompassDraw {\n" +
        "    /// Intercepts mouse raycasts from winit or WebGL canvas\n" +
        "    pub fn on_pointer_motion(\n" +
        "        &mut self,\n" +
        "        ray_origin: [f64; 3],\n" +
        "        ray_dir: [f64; 3],\n" +
        "    ) -> ResolvedCoordinate;\n\n" +
        "    /// Single-stroke key execution (T, F, S, V, Space, L, X, Y, Z, G, N)\n" +
        "    pub fn handle_key_stroke(&mut self, key: &str) -> bool;\n" +
        "    pub fn handle_smart_lock(&mut self);\n" +
        "    pub fn apply_hint(&mut self, hint: AccuDrawHint);\n" +
        "    pub fn arc_to_bulge(&self, start: [f64; 2], end: [f64; 2], center: [f64; 2], cw: bool) -> f64;\n" +
        "}\n" +
        "```\n" +
        "• `no_std` compatible: Pure mathematical core with zero heap/OS bindings.\n" +
        "• Interoperable: Feeds `winit` on desktop and WebAssembly in browser viewports."
      ];
    }

  static p_hint_protocol_1() {
      return [
        "A critical discovery in Bentley's `AccuDraw.ts` is `AccuDrawHintBuilder` and the architectural separation between `floatingOrigin` and `contextSensitivity`. In inferior CAD systems, coordinate origins and axis rotations are mashed together into a monolithic state. In AccuDraw, they are governed by independent boolean flags.",
        "Tools communicate with the compass via an inverted dependency called Hints. When an element is drawn or snapped, the tool dispatches hints (`setOrigin`, `setRotation`). How AccuDraw acts on those hints depends strictly on whether the user has enabled **Context Sensitivity** (reorienting the axes) and **Floating Origin** (advancing the reference coordinate)."
      ];
    }

  static p_hint_protocol_2() {
      return [
        "Inside `AccuDraw.ts`, the `doProcessHints()` method reveals the exact execution sequence when hints are received:",
        "1. `flags.autoOrient`: If context sensitivity is enabled, it rotates the compass axes to align with the current segment vector (`setXAxis`) or surface normal (`setRotation`). When context sensitivity is disabled, orientation hints are ignored, keeping the construction plane locked.",
        "2. `flags.setOrigin`: If floating origin is enabled (or the user presses `O`/`G`), `this.origin` updates to the specified point, while delta buffers reset to $(0, 0, 0)$. As Rob Brown emphasized, moving the origin never forces an axis reorientation.",
        "3. `flags.lockDistance` / `flags.lockAngle`: Immediately locks polar coordinates to the tool's prescribed increments.",
        "4. `flags.smartRotation`: Preserves context rotation across viewports so moving between isometric and top views smoothly reorients the drawing plane without jarring coordinate jumps."
      ];
    }

  static sidebar_hint_protocol() {
      return [
        "The AccuDrawHintBuilder Context Protocol:\n" +
        "```typescript\n" +
        "export class AccuDrawHintBuilder {\n" +
        "  public setOrigin(origin: Point3d): void;\n" +
        "  public setRotation(rowMatrix: Matrix3d): void;\n" +
        "  public setXAxis(xAxis: Vector3d): void;\n" +
        "  public setLockDistance: boolean;\n" +
        "  public setLockAngle: boolean;\n" +
        "  public enableSmartRotation: boolean;\n" +
        "  public sendHints(activate = true): boolean;\n" +
        "}\n" +
        "```\n" +
        "• Floating Origin vs. Context Sensitivity:\n" +
        "  - `flags.floatingOrigin`: Automatic origin tracking to last data point.\n" +
        "  - `flags.contextSensitivity`: Reorients compass to element vectors (independently toggleable).\n" +
        "• Set Origin (O / G): Moving origin to a tentative point preserves existing axis orientation.\n" +
        "• Hysteresis Zoom Round-Off (`RoundOff`): Uses dynamic `units: Set<number>` to snap to the smallest discernible unit at the current viewport zoom level."
      ];
    }
  static p_fillet_comp_1() {
      return [
        "Our inspection of CADCraft's `crates/geom/src/fillet.rs` reveals a sophisticated numerical solver. Rather than just supporting simple circular arc fillets between straight line segments, CADCraft's `CornerFit` computes circles tangent across any combination of Lines, Circles, Ellipses, and Splines (`TanCurve`) using a 40-step damped Newton-Raphson method on exact offset curves."
      ];
    }

  static p_fillet_comp_2() {
      return [
        "By contrast, in `accuCad/js/RoundingUtils3D.js`, our 3D path filleting algorithm is closed-form and analytic: it calculates the 3D angle bisector between incoming and outgoing unit vectors (`uv1` and `uv2`), directly projecting tangent touch points `p1` and `p2`. This is ultra-fast ($O(1)$) and works across arbitrary 3D planes. By combining both approaches, `compassdraw-core` can use analytic 3D bisectors for real-time mouse hover previews, and CADCraft's Newton solver for complex spline/ellipse boundary fillets."
      ];
    }

  static sidebar_fillet_comparison() {
      return [
        "Fillet Mathematics Comparison:\n" +
        "• CADCraft (`crates/geom/src/fillet.rs`):\n" +
        "  - Multi-curve support: Lines, Circles, Ellipses, NURBS Splines.\n" +
        "  - Damped Newton-Raphson iteration (40 steps max) on offset curves.\n" +
        "  - Evaluates finite-difference Jacobian for non-linear curvatures.\n" +
        "• accuCad (`RoundingUtils3D.js`):\n" +
        "  - True 3D spatial vector bisector calculation.\n" +
        "  - Closed-form analytic solution ($O(1)$ speed, zero iterations).\n" +
        "  - Ideal for real-time 60 FPS interactive mouse cursor previewing."
      ];
    }

  static p_mcp_agent_spec_1() {
      return [
        "CADCraft includes `cadcraft-mcp`—a native Model Context Protocol server. Currently, AI agents interact with CADCraft using raw absolute coordinates (e.g. `create_line(x1, y1, x2, y2)`). Anyone who has watched an LLM draft knows the problem: models struggle with exact spatial trigonometry, producing misaligned corners, small gaps, and overlapping lines."
      ];
    }

  static p_mcp_agent_spec_2() {
      return [
        "By exposing CompassDraw endpoints to the MCP server (`compass_origin`, `compass_align`, `compass_lock_axis`, `smartline_segment`), the AI agent drafts using relative vectors: 'Move origin to vertex A, lock X-axis, offset 42.5 units, tangent arc of radius 10 to vertex B.' This allows the AI agent to produce geometrically perfect, manifold drawings on the first pass without spatial hallucinations."
      ];
    }

  static sidebar_mcp_compass_tools() {
      return [
        "MCP CompassDraw Tool Extensions (crates/mcp/src/tools.rs):\n" +
        "• `compass_set_origin(handle, vertex_index)`: Anchors compass to an element vertex.\n" +
        "• `compass_orient_plane(plane)`: Sets Front, Top, Side, or element normal.\n" +
        "• `compass_vector_input(distance, angle | dx, dy)`: Commits constrained displacement.\n" +
        "• `smartline_chain(points, radii, auto_close)`: Commits multi-segment tangent path.\n" +
        "• Result: Autonomous AI coding agents achieve CAD precision without coordinate math errors."
      ];
    }

  static p_smart_keyin_1() {
      return [
        "One of the most elegant interaction design details in AccuDraw—preserved in Bentley's `AccuDraw.ts` under `public smartKeyin = true`—is automatic directional sign inference. When drafting precisely, forcing a user to type `-12.5` versus `12.5` based on Cartesian signs breaks drafting rhythm. Your eyes are on the geometry, not on coordinate signs."
      ];
    }

  static p_smart_keyin_2() {
      return [
        "In `AccuDraw.ts`, when `smartKeyin` is active, the engine checks whether the current cursor delta vector points along the negative axis: `this._xIsNegative === (this.delta.x >= 0.0)`. If the user moves the mouse to the left and types `5`, AccuDraw automatically multiplies the value by `-1`. The sign is inferred entirely from physical human motion.",
        "Furthermore, `AccuDraw.ts` maintains `savedStateViewTool` and `savedStateInputCollector`. When the user pans, zooms, rotates the view, or runs a nested query command, AccuDraw pushes its coordinate frame to a state stack, restoring origin, locks, and orientation without resetting the active drawing command."
      ];
    }

  static sidebar_smart_keyin_math() {
      return [
        "SmartKeyin & SavedState Mechanics (itwin_reference/AccuDraw.ts):\n" +
        "• Directional Sign Inference:\n" +
        "  - When a user enters a positive scalar without an explicit sign, `AccuDraw` checks the quadrant of the mouse vector relative to the floating origin.\n" +
        "  - `delta.x < 0.0 ? -abs(val) : abs(val)`: Eliminates 100% of negative key-ins during drafting.\n" +
        "• Context Preservation (`SavedState`):\n" +
        "  - `savedStateViewTool`: Restores active compass frame after view manipulation (Pan, Zoom, Orbit).\n" +
        "  - `savedStateInputCollector`: Preserves origin and locks across nested measurement tools without resetting drawing progress."
      ];
    }

  static p_tool_actions_1() {
      return [
        "In `itwin_reference/AccuDrawTool.ts`, Bentley Systems encapsulates the interactive tool suite that drives AccuDraw during active drafting sessions. Instead of embedding shortcut logic directly into viewport event handlers, each AccuDraw operation is an independent, transaction-safe `InputCollector` or `PrimitiveTool` subclass."
      ];
    }

  static p_tool_actions_2() {
    return [
      "This architecture confirms why AccuDraw remains so resilient: when a user triggers Rotate Element (`R, E`) or Align to Surface (`R, Q`), a transient tool instance runs, snaps to the target element's normal vector, updates `ThreeAxes`, and immediately pops back to the primary drawing command via `SavedState`. The active line, polyline, or polygon placement is never broken.",
      "Furthermore, it enforces **Rob Brown's Context Reversion Rule**: while drawing, the compass tracks the orientation of the active stroke. Upon command completion or when `Reset` is pressed, `AccuDraw` unwinds the contextual rotation, smoothly animating the compass back to the baseline coordinate frame (Top, Front, Side, View, or ACS) that was active before the tool started. The drafter's spatial baseline is always preserved."
    ];
  }

  static sidebar_tool_actions() {
    return [
      "Bentley AccuDrawTool Subsystem & State Invariants:\n" +
      "• Coordinate Locks: `AccuDrawSetLockXTool` (X), `AccuDrawSetLockYTool` (Y), `AccuDrawSetLockZTool` (Z), `AccuDrawSetLockDistanceTool` (D), `AccuDrawSetLockAngleTool` (A), `AccuDrawSetLockSmartTool` (Enter/L).\n" +
      "• Spatial Plane Rotations: `AccuDrawRotateTopTool` (T), `AccuDrawRotateFrontTool` (F), `AccuDrawRotateSideTool` (S), `AccuDrawRotateViewTool` (V), `AccuDrawRotateCycleTool` (C).\n" +
      "• 90° Plane Stepping: `AccuDrawRotate90AboutXTool` (RX), `AccuDrawRotate90AboutYTool` (RY), `AccuDrawRotate90AboutZTool` (RZ).\n" +
      "• Context Reversion Invariant: Right-click / Reset pops active tool and reverts compass rotation to baseline plane.\n" +
      "• Modes & State: `AccuDrawChangeModeTool` (Space/P), `AccuDrawSuspendToggleTool` (WA)."
    ];
  }

  static p_plane_math_1() {
      return [
        "In MicroStation, spatial rotation was governed by two core commands: **Rotate Quick (`RQ`)** and **Rotate ACS (`RA`)**. (As Rob Brown notes, `RE` or 'Rotate to Element' was not in the original 1995 release—he built that later as a free utility after leaving Bentley).",
        "**`RQ` (Rotate Quick):** Designed for rapid in-plane reorientation. With the compass origin already positioned, you clicked a single point, and AccuDraw instantly rotated the primary $X$-axis toward that reference point while preserving the current construction plane normal.",
        "**`RA` (Rotate ACS):** An explicit 3-point 3D coordinate builder. Named after MicroStation's Auxiliary Coordinate System (ACS), Point 1 did not have to be the AccuDraw compass origin. In fact, AccuDraw was active during `RA`, allowing the drafter to use the compass to place the three points! Point 1 established the origin and Point 2 defined the primary $X$-axis. After Point 2, the compass flipped 90° to assist in placing Point 3 (defining the plane). Once Point 3 was committed, **the compass snapped right back to its working location, but adopted the newly derived 3D orientation**.",
        "**Persistent ACS vs. Ephemeral Rotations:** Unlike a transient compass tilt, an ACS could be saved and recalled at any time using **`GA` (Get ACS)**. A drafter working on a campus with an angled wing could store the wing's orientation as an ACS and instantly snap AccuDraw back to it with `GA` without re-measuring."
      ];
    }

  static p_plane_math_2() {
      return [
        "A vital insight from Rob Brown regarding orientation changes (`T`, `F`, `S`, `V`, or `RQ`) is **The Orientation Switch Lock Invariant**:",
        "When a drafter flips to a new construction plane or rotates the compass, AccuDraw **does not preserve active coordinate locks** (such as an active X lock or Distance lock). Preserving a numeric lock from an old orientation across a new plane would create a confusing 'phantom lock,' where the cursor suddenly feels stuck along an unexpected vector in the new coordinate frame.",
        "As Rob Brown observed, there is a theoretical edge case where an axis maps to the exact same physical 3D vector across planes (for example, the world X-axis shared between Top and Front views). But in daily production practice, clearing planar locks on orientation changes keeps drafting fluid, allowing the drafter's hands to establish the new trajectory immediately without fighting residual constraints."
      ];
    }
  static sidebar_plane_math_code() {
      return [
        "AccuDraw Plane Orientation Hierarchy (Rob Brown Provenance):\n" +
        "1. RQ (Rotate Quick):\n" +
        "   • Keeps current origin and plane normal; rotates X-axis toward a picked point.\n" +
        "2. RA (Rotate ACS - 3 Points in 3D Space):\n" +
        "   • Does not require starting at compass origin.\n" +
        "   • Point 1: Origin; Point 2: X-axis.\n" +
        "   • After Point 2, compass flips 90° to aid placing Point 3 (Plane).\n" +
        "   • On Point 3, compass snaps back to working location in the new orientation!\n" +
        "3. GA (Get ACS):\n" +
        "   • Snaps AccuDraw compass to active or named Auxiliary Coordinate System.\n" +
        "4. RE (Rotate to Element):\n" +
        "   • Created as a post-Bentley free utility; not in original 1995 MicroStation."
      ];
    }
  static p_val_history_1() {
      return [
        "A standout usability feature in `AccuDrawTool.ts` is the **Value Memory Stack**: `choosePreviousValue(index: ItemField)` and `chooseNextValue(index: ItemField)`. In high-production civil and architectural drafting, drafters repeatedly place geometry with recurring dimensions (e.g. wall thicknesses of 6\", door clearances of 36\", or column bays of 24')."
      ];
    }

  static p_val_history_2() {
      return [
        "Instead of forcing the user to retype numbers, AccuDraw caches a ring buffer of historical inputs per field. Tapping the Up or Down arrow keys instantly cycles through previously accepted distances or angles on that specific axis.",
        "Furthermore, `AccuDraw.ts` implements the `decorate(context: DecorateContext)` lifecycle method: it builds graphic overlays for the dynamic compass circle/square, primary axis cylinders, and index guidelines, drawing them as viewport decorators with independent z-buffer rendering so they remain crisp and visible above dense model geometry."
      ];
    }

  static sidebar_val_history_code() {
      return [
        "Value History & Decorator Pipeline:\n" +
        "• `choosePreviousValue(index)` / `chooseNextValue(index)`:\n" +
        "  - Caches a ring buffer of previously committed scalar inputs per `ItemField`.\n" +
        "  - Arrow keys cycle historical values into the input buffer on the fly.\n" +
        "• `decorate(context: DecorateContext)`:\n" +
        "  - Viewport-independent overlay pass (`GraphicType.Overlay`).\n" +
        "  - Renders compass frame, pulsing tick cylinders, and white index line with custom depth priorities."
      ];
    }

  static p_contrast_1() {
      return [
        "In `AccuDraw.ts`, Bentley’s `decorate(context: DecorateContext)` implements automatic luminance adaptation via `adjustedForContrast(bgColor, delta)`. When drafting on computers, backgrounds vary wildly: engineers frequently switch between pure black (`#000000`), drafting gray (`#222222`), architectural white (`#ffffff`), or blueprint navy."
      ];
    }

  static p_contrast_2() {
      return [
        "Instead of forcing users to customize compass colors or squint at washed-out lines, AccuDraw calculates the luminance of the viewport background and dynamically computes contrast offsets: delta `155` for high-contrast compass borders and primary X/Y axis lines, and delta `75` for the translucent compass body fill.",
        "The result is perfect visual contrast on any background color with zero configuration. In `compassdraw-core`, we preserve this exact luminance equation for both our Three.js WebGL overlay and CADCraft's `wgpu` shaders."
      ];
    }

  static sidebar_contrast_math() {
      return [
        "Luminance Adaptation Algorithm (AccuDraw.ts):\n" +
        "```typescript\n" +
        "const frameColor = (hasFocus ? this._frameColor : this._frameColorNoFocus).adjustedForContrast(bgColor, 155);\n" +
        "const fillColor = (hasFocus ? this._fillColor : this._fillColorNoFocus).adjustedForContrast(bgColor, 75);\n" +
        "const xColor = (hasFocus ? this._xColor : this._frameColorNoFocus).adjustedForContrast(bgColor, 155);\n" +
        "const yColor = (hasFocus ? this._yColor : this._frameColorNoFocus).adjustedForContrast(bgColor, 155);\n" +
        "```\n" +
        "• Delta 155: Guaranteed high-contrast borders and axis tick marks.\n" +
        "• Delta 75: Subtle translucent interior fill.\n" +
        "• Contrast Independence: Legible on pure black, bright white, or gradient viewports."
      ];
    }

  static p_snap_pipeline_1() {
      return [
        "In `itwin_reference/AccuSnap.ts` (1,352 lines), Bentley separates snapping into two synchronized subsystems: passive proximity pre-highlighting (`AccuSnap`) and active coordinate capture (`TentativePoint`).",
        "When the mouse moves freely, `AccuSnap.testHit` fires screen-space proximity tests against geometric display paths. When a valid vertex or edge falls within the snap aperture, it builds a `SnapDetail` and pre-highlights the element."
      ];
    }

  static p_snap_pipeline_2() {
      return [
        "When the user initiates a tentative point (via chorded click or shortcut), `AccuSnap` promotes the active `SnapDetail` into `IModelApp.tentativePoint`. This immediately calls `AccuDraw.onTentative()`, anchors the compass origin, and renders the 3-axis Mini-Jack cursor.",
        "In `accuCad/js/TentativePointHandler.js`, we implemented the identical dual-phase pipeline: standard 3D raycasting with a 10-pixel screen-space segment fallback (`_findClosestElementByScreenSegments`) for reliable wireframe picking."
      ];
    }

  static sidebar_accusnap_pipeline() {
      return [
        "AccuSnap Snapping Architecture (itwin_reference/AccuSnap.ts):\n" +
        "• Dual-Phase Latching:\n" +
        "  1. Passive Discovery: `AccuSnap.testHit()` scans candidate geometry within screen-space aperture.\n" +
        "  2. Active Tentative: Mouse chord promotes candidate to `IModelApp.tentativePoint`.\n" +
        "• `SnapDetail`: Records snap mode, element handle, world hit point, and normal vector.\n" +
        "• AccuDraw Handshake: `AccuDraw.onTentative()` grabs focus and updates the kinetic origin.\n" +
        "• Reset Cascade: Right-click calls `tentativePoint.clear(true)`, cleanly releasing the anchor."
      ];
    }

  static p_surface_normal_1() {
      return [
        "A primary capability proven in our `accuCad` prototype is **Instant Surface Normal Alignment (`Q`)**. When drafting in 3D, a user clicks or tentative-snaps onto an angled face of a 3D solid or imported assembly, and taps `Q`. The compass immediately tilts flush against that surface.",
        "The challenge in 3D space is that a face hit provides only a single vector: the surface normal $\\vec{n}$. To construct a stable drafting plane, we must derive two orthogonal tangent vectors ($\\vec{X}_c, \\vec{Y}_c$) without gimbal lock or sudden axis flipping as the camera moves."
      ];
    }

  static sidebar_surface_normal_math() {
      return [
        "Surface Normal Alignment & Non-Flipping Gram-Schmidt Math:\n" +
        "```rust\n" +
        "impl ThreeAxes {\n" +
        "    /// Derives stable, non-flipping 3D drafting axes from a surface hit normal.\n" +
        "    pub fn from_surface_normal(normal: [f64; 3]) -> Self {\n" +
        "        let z_c = normalize(normal);\n" +
        "        // Choose reference up vector to avoid collinear cross product\n" +
        "        let up = if z_c[1].abs() > 0.98 { [0.0, 0.0, 1.0] } else { [0.0, 1.0, 0.0] };\n" +
        "        let x_c = normalize(cross(up, z_c));\n" +
        "        let y_c = cross(z_c, x_c);\n" +
        "        Self { x: x_c, y: y_c, z: z_c }\n" +
        "    }\n" +
        "}\n" +
        "```\n" +
        "• Stable Orientation: Prevents compass jitter when snapping across adjacent angled faces.\n" +
        "• Automatic OCS Handshake: Feeds normal vector directly to CADCraft's `Mat4::ocs`."
      ];
    }

  static p_state_stack_1() {
      return [
        "To preserve continuity between AutoCAD and AccuDraw, we synchronize their state stacks. In CADCraft, drawing operations commit changes to `cadcraft-doc::EntityStore` with incremental transaction IDs.",
        "In `compassdraw-core`, we maintain a parallel **`SavedState` stack**. Whenever an entity point is committed, AccuDraw records its floating origin, active `ThreeAxes`, and coordinate locks. If the user invokes AutoCAD's `UNDO` command (`s.doc_mut()?.undo()`), CADCraft notifies CompassDraw, which pops its state stack to the matching transaction ID—instantly returning the compass origin and working depth to the prior vertex."
      ];
    }

  static sidebar_smart_backspace_winit() {
      return [
        "Single-Stroke Key Interception & Smart Backspace in winit:\n" +
        "```rust\n" +
        "// In PointInterceptor::handle_key_down\n" +
        "pub fn handle_key_down(&mut self, key: &str, ctrl: bool, shift: bool) -> bool {\n" +
        "    // 1. Intercept numbers without opening a command prompt\n" +
        "    if is_numeric_char(key) && !ctrl {\n" +
        "        self.typing_buffer.push_str(key);\n" +
        "        self.is_locked[self.active_axis] = true;\n" +
        "        self.apply_directional_sign(self.active_axis);\n" +
        "        return true; // Consumed: CADCraft prompt never sees this keystroke!\n" +
        "    }\n\n" +
        "    // 2. CAD Smart Backspace\n" +
        "    if key == \"Backspace\" {\n" +
        "        if !self.typing_buffer.is_empty() {\n" +
        "            self.typing_buffer.pop();\n" +
        "        } else {\n" +
        "            // Truncate least significant digit of live dynamic coordinate\n" +
        "            let val = self.last_delta[self.active_axis];\n" +
        "            self.typing_buffer = format!(\"{:.4}\", val);\n" +
        "            self.typing_buffer.pop(); // Remove last digit\n" +
        "            self.is_locked[self.active_axis] = true;\n" +
        "        }\n" +
        "        return true;\n" +
        "    }\n" +
        "    false\n" +
        "}\n" +
        "```\n" +
        "• Zero Double-Typing: Eliminates key conflicts between AccuDraw and CADCraft.\n" +
        "• Seamless Dimension Trimming: Smart Backspace allows rounding live measurements on the fly."
      ];
    }
}

globalThis.CadITwinParityContent = CadITwinParityContent;
if (typeof module !== 'undefined' && module.exports) module.exports = CadITwinParityContent;