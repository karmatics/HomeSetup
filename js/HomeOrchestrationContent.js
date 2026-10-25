class HomeOrchestrationContent {
  static getMeta() {
    return {
      kicker: 'LLM Orchestration & Remote Automation',
      title: '4. Cross-Wire LLM Orchestration',
      subtitle: 'Using the AI assistant to programmatically trigger tasks, transfer files, and coordinate operations across machines.'
    };
  }

  static manifest() {
    return [
      {
        section: 'orchestration_flow',
        partLabel: 'Chapter 4 • Automation',
        title: 'Programmatic Cross-Wire Operations via LLM',
        blocks: [
          { id: 'p_orch_flow_1', type: 'p' },
          { id: 'p_orch_flow_2', type: 'p' },
          { id: 'sidebar_server_runner_patterns', type: 'sidebar', kicker: 'Runner Protocol', title: 'Server Runner Execution Directives' }
        ]
      },
      {
        section: 'task_queue',
        partLabel: 'Chapter 4 • Task Queue',
        title: 'The Local Task Queue (runner.mjs)',
        blocks: [
          { id: 'p_orch_runner_1', type: 'p' },
          { id: 'p_orch_runner_2', type: 'p' },
          { id: 'sidebar_runner_architecture', type: 'sidebar', kicker: 'Queue Anatomy', title: 'File-Based Task Queue Engine' }
        ]
      }
    ];
  }

  static p_orch_flow_1() {
      return [
        "With Luno running on the Mac on port 8080 and on the Ubuntu laptop on port 3000, cross-machine orchestration enters a clean, unified paradigm: **Luno-to-Luno HTTP Federation**.",
        "Instead of invoking complex terminal shell pipelines, an LLM generating `<script data-file=\"RUN: SERVER\" data-action=\"run-server\">` on the Ubuntu host can use Node's `http` module to send directives straight to `http://<mac-ip>:8080/api/...`.",
        "This allows the AI to query files on the Mac, verify Git configurations, and transfer project bundles across the wire with zero manual intervention."
      ];
    }
  static p_orch_flow_2() {
    return [
      "This turns the AI into an active system administrator for your home setup: you express your intent in plain English, the AI outputs an executable runner container, and with one click of 'Paste from Chatbot', the script executes on the Linux host and returns structured execution telemetry back to the screen."
    ];
  }

  static sidebar_server_runner_patterns() {
      return [
        "Luno-to-Luno Federation Recipes (Port 8080 Bridge):\n" +
        "• 1. Query Projects on the Mac:\n" +
        "  ```javascript\n" +
        "  const http = require('http');\n" +
        "  // Fetch Mac project list directly from its Luno server\n" +
        "  http.get('http://<mac-ip>:8080/api/projects', (res) => { ... });\n" +
        "  ```\n" +
        "• 2. Forward Script to Run on Mac:\n" +
        "  Post code to Mac's Luno endpoint to execute in Darwin environment.\n" +
        "• 3. Automated Git Linkage:\n" +
        "  Initialize `HomeSetup` Git repo and push to GitHub Pages without touching terminal."
      ];
    }
  static p_orch_runner_1() {
    return [
      "**The File-Based Task Queue (`runner.mjs`):** In addition to real-time Luno container execution, your workspace includes a dedicated background task runner (`HomeSetup/runner.mjs`).",
      "The runner monitors a local file queue (`queue/incoming/`, `queue/running/`, `queue/done/`, `queue/failed/`). External tools, cron jobs, or LLM-generated scripts can drop a JSON task into the queue, and `runner.mjs` executes it asynchronously in the background, logging full stdout/stderr and updating `state/status.json`."
    ];
  }

  static p_orch_runner_2() {
    return [
      "This architecture decouples heavy compilation or long-running transfers from the browser UI: jobs run reliably in background daemon mode while you continue editing documents or drafting in Luno."
    ];
  }

  static sidebar_runner_architecture() {
    return [
      "Task Runner Specifications (runner.mjs):\n" +
      "• Supported Task Types: `write-file`, `run-script`, `run-command`, `return-message`.\n" +
      "• Status Reporting: Live updates to `state/status.json` with PID, task counter, and heartbeat.\n" +
      "• Fault Tolerance: Failed jobs move cleanly to `queue/failed/` with error stacks preserved."
    ];
  }
}

globalThis.HomeOrchestrationContent = HomeOrchestrationContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeOrchestrationContent;