class HomeDictationContent {
  static getMeta() {
    return {
      kicker: 'Audio Intelligence & Speech Ergonomics',
      title: '7. Dictation Architecture & Universal Speech Engine',
      subtitle: 'Complete architectural survey of speech modules across Library and sibling repos: comparing legacy SuperDictate vs DictationWidget, and blueprinting the Universal Drop-In & Chrome Extension engine.'
    };
  }

  static manifest() {
      return [
        {
          section: 'dictation_studio',
          partLabel: 'Chapter 7 • Interactive Laboratory',
          title: 'Live Dictation Studio, Spec Browser & Sub-Apps',
          blocks: [
            { id: 'comp_dictation_studio', type: 'component', component: 'HomeDictationStudioComponent' }
          ]
        },
        {
          section: 'dictation_overview',
          partLabel: 'Chapter 7 • The 2-in-1 Vision',
          title: 'Universal Dictation: Drop-In Web Module & Ambient Chrome Extension',
          blocks: [
            { id: 'p_dictation_vision_1', type: 'p' },
            { id: 'p_dictation_vision_2', type: 'p' },
            { id: 'sidebar_dual_modality', type: 'sidebar', kicker: 'Architecture', title: 'The 2-in-1 Speech Engine Specification' }
          ]
        },
        {
          section: 'old_vs_new_audit',
          partLabel: 'Chapter 7 • Deep Code Comparison',
          title: 'Old vs. New: Recovering the 470 Missing Lines from Scratchy',
          blocks: [
            { id: 'p_old_vs_new_1', type: 'p' },
            { id: 'sidebar_missing_features', type: 'sidebar', kicker: 'Feature Inventory', title: 'Dropped Methods & Capabilities in Current Version' }
          ]
        },
        {
          section: 'two_cursors_problem',
          partLabel: 'Chapter 7 • Core Innovation',
          title: 'The Two Cursors Problem & The Dictation Lattice',
          blocks: [
            { id: 'p_two_cursors_1', type: 'p' },
            { id: 'sidebar_two_cursors_math', type: 'sidebar', kicker: 'Lattice Graph Math', title: 'DictationLattice & The Two Cursors Solution' },
            { id: 'p_two_cursors_2', type: 'p' }
          ]
        },
        {
          section: 'discovered_roster',
          partLabel: 'Chapter 7 • Module Audit',
          title: 'Audit of Existing Dictation Code, Labs & Precursors',
          blocks: [
            { id: 'p_dictation_audit_1', type: 'p' },
            { id: 'sidebar_dictation_comparison', type: 'sidebar', kicker: 'Codebase Comparison', title: 'Generation 1 (DictationWidget) vs. Generation 2 (Lattice)' },
            { id: 'p_dictation_audit_2', type: 'p' }
          ]
        },
        {
          section: 'extension_integration',
          partLabel: 'Chapter 7 • Browser Extension & Drop-In',
          title: 'Universal Extension (AardvarkExtension) & 1-Line App Drop-In',
          blocks: [
            { id: 'p_extension_recipe_1', type: 'p' },
            { id: 'sidebar_drop_in_recipe', type: 'sidebar', kicker: 'Developer API', title: '1-Line Drop-In & Extension Content Script' }
          ]
        }
      ];
    }
  static p_dictation_vision_1() {
    return [
      "Voice dictation is one of the most powerful and distinctive aspects of Rob Brown's workflow. Luno itself was conceived and built largely from bed and couch on a smartphone using speech-to-text to dictate technical plans and software directives without typing fatigue.",
      "However, dictation should not be trapped exclusively inside Luno Workspace. Our architectural vision is to establish a **Universal 2-in-1 Speech Engine** that serves two distinct deployment modalities without duplicating code:"
    ];
  }

  static p_dictation_vision_2() {
    return [
      "1. **The 1-Line Drop-In Library**: Any web app across our ecosystem (or any external website) can include `/Library/DictationWidget.js` and attach speech capabilities to any input or container with a single line of code (`DictationWidget.attach(inputElement)`), with zero browser extension requirement.",
      "2. **The Universal Chrome Extension (`AardvarkExtension`)**: Packages the exact same core speech engine into our Chrome extension so that pressing a hotkey (or clicking an ambient floating microphone) allows you to dictate directly into any active input on *any* web page (ChatGPT, Claude, Google Docs, GitHub, forums) with shared custom phonetic replacements and caret tracking."
    ];
  }

  static sidebar_dual_modality() {
    return [
      "The Universal Speech Engine Architecture:\n" +
      "• 1. Headless Dictation Core (DictationCore.js / DictationLattice.js):\n" +
      "   - Web Speech API (webkitSpeechRecognition) continuous listening.\n" +
      "   - Phonetic replacement dictionary ('literal' escape protocol, learned word mappings).\n" +
      "   - Punctuation parsing: period, comma, question mark, newline, colon, dash.\n" +
      "   - Caret-aware text insertion with auto-capitalization.\n" +
      "• 2. Drop-In Web Component (DictationWidget.js):\n" +
      "   - Full floating or embedded editor widget with permanent Clear button.\n" +
      "   - `DictationWidget.attach(input)` decorator for any standard HTML input/textarea.\n" +
      "• 3. Ambient Chrome Extension Mode (AardvarkExtension):\n" +
      "   - Injected content script targeting `document.activeElement` across any website.\n" +
      "   - Shared phonetic replacement rules synced via `chrome.storage.sync`."
    ];
  }

  static p_two_cursors_1() {
    return [
      "In traditional speech recognition widgets, moving your text cursor while speaking creates a disastrous conflict: the ASR engine continues streaming interim text into the old position, overwriting your edits or creating duplicate words. Rob Brown formalized this in `Library/DictationDocs.js` as **The Two Cursors Problem**.",
      "The user has a physical text caret where they want to read and edit. The speech recognition engine has a streaming transcript pointer where words are arriving. If you couple them into a single pointer, text jumps violently whenever interim speech hypotheses are revised."
    ];
  }

  static sidebar_two_cursors_math() {
    return [
      "The Two Cursors Solution & DictationLattice (Rob Brown Specification):\n" +
      "• Decoupled Pointers: The Human Caret (navigation/selection) is decoupled from the ASR Stream Head.\n" +
      "• Word Lattice Graph: In `Library/DictationLattice.js`, tokens form a directed acyclic graph. When Web Speech API emits revised interim transcripts, the lattice computes `diff(a, b)` to splice words smoothly without cursor rubber-banding.\n" +
      "• Policy Engine: In `Library/DictationPolicy.js`, punctuation rules and custom replacements execute as decoupled middleware before words reach the DOM."
    ];
  }

  static p_two_cursors_2() {
    return [
      "By solving The Two Cursors Problem mathematically via `DictationLattice`, speech recognition stops feeling like an aggressive automated typist and begins operating like an attentive, quiet partner: you can click back, edit a typo, and continue dictating without the stream stomping on your work."
    ];
  }

  static p_dictation_audit_1() {
      return [
        "A thorough server inspection of all 117 speech-related files across the workspace clarified the landscape:",
        "• **`Library/DictationWidget.js` (Active Production Engine • ~1,300 lines)**: The real, working engine that powers Luno's prompt notes and HomeSetup. It features continuous listening, caret tracking, phonetic replacements, and the 1-line `DictationWidget.attach(element)` drop-in method.",
        "• **`DictationLab/` & `DictationExperiment/` (Unfinished Prototypes)**: Standalone experimental sandboxes exploring an alternative 'word lattice' concept. Both sub-apps depend on an unwritten component (`LatticeSurface`) and are completely disconnected from production. They remain quarantined in their sandboxes and do not affect active workflows.",
        "• **`AardvarkExtension/` (Chrome Extension Target)**: The existing extension currently scopes scripts to YouTube and localhost. Its older dictation feature relied on an iframe dialog; it is ready to be upgraded to inject the unified `DictationWidget` engine across all web pages."
      ];
    }

  static sidebar_dictation_comparison() {
      return [
        "Architecture Ground Truth:\n" +
        "• Active Engine: `Library/DictationWidget.js` is the sole production speech module. We do not break or destabilize it.\n" +
        "• Experimental Sandbox: `DictationLab`, `DictationExperiment`, and `DictationLattice.js` remain isolated research prototypes.\n" +
        "• Universal Drop-In: `DictationWidget.attach(input)` provides 1-line voice input for any app today.\n" +
        "• Chrome Extension Roadmap: Package the proven `DictationWidget` into `AardvarkExtension` with `<all_urls>` and an `Alt+D` trigger."
      ];
    }
  static p_dictation_audit_2() {
    return [
      "Crucially, we do not want to break or dismantle the working `Library/DictationWidget.js` while designing the next-generation engine. The current implementation is fully functional and powers Luno's prompt notes. We are refining it progressively—first adding the lightweight `.attach()` helper, then connecting the Lattice, and finally packaging the content script into `AardvarkExtension`."
    ];
  }

  static p_extension_recipe_1() {
    return [
      "Below is the concrete implementation blueprint for both the 1-line app drop-in and the Chrome extension content script:"
    ];
  }

  static sidebar_drop_in_recipe() {
    return [
      "Developer Integration Blueprint:\n" +
      "```html\n" +
      "<!-- Mode A: Standalone Drop-In (Any App) -->\n" +
      "<script src=\"/Library/DictationWidget.js\"></script>\n" +
      "<textarea id=\"notes\"></textarea>\n" +
      "<script>\n" +
      "  // 1-line attachment:\n" +
      "  DictationWidget.attach(document.getElementById('notes'));\n" +
      "</script>\n" +
      "\n" +
      "<!-- Mode B: Chrome Extension (Any Page) -->\n" +
      "// In AardvarkExtension/content.js:\n" +
      "document.addEventListener('keydown', (e) => {\n" +
      "  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {\n" +
      "    const target = document.activeElement;\n" +
      "    if (target) DictationWidget.attach(target).startListening();\n" +
      "  }\n" +
      "});\n" +
      "```"
    ];
  }

  static p_old_vs_new_1() {
      return [
        "A deep line-by-line comparison between our current `Library/DictationWidget.js` (1,324 lines) and Rob Brown's earlier production implementation in `Scratchy` (`recursi/web/Scratchy/js/DictationWidget.js`, 1,792 lines) revealed that **nearly 500 lines of specialized logic were omitted or simplified during migration**.",
        "The earlier version was significantly more sophisticated in several key domains: it had dedicated popup positioning geometry in a separate `DictationPopup.js` class, finer caret-tracking heuristics, audio feedback queues, and richer mobile/touch viewport accommodation. In this section, we catalog every dropped method and architectural difference so we can systematically restore those superpowers into our unified engine."
      ];
    }

  static sidebar_missing_features() {
      return [
        "Scratchy vs. Current Library Diff Inventory:\n" +
        "• Line Delta: 1,792 lines (Scratchy) vs. 1,324 lines (Current) = ~470 missing lines.\n" +
        "• Decoupled DictationPopup.js (205 lines): In Scratchy, popup positioning, SVG connector tension, and anchor side calculation were encapsulated in an independent class.\n" +
        "• Audio Feedback & Sound Cues: Audio tone generation for start/stop and speech events was active in the precursor.\n" +
        "• Caret & Selection Replacement: Finer handling of range deletion and replacement when text is actively highlighted during speech.\n" +
        "• Mobile Viewport Resilience: Enhanced handling of mobile virtual keyboard resizing and zoom scaling."
      ];
    }
}

globalThis.HomeDictationContent = HomeDictationContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeDictationContent;