class HomeSecretsContent {
  static getMeta() {
    return {
      kicker: 'Security & Secret Management',
      title: '5. Credentials & Safe Key Storage',
      subtitle: 'The zero-leak security architecture: how scripts locate passwords and tokens locally without ever exposing them to LLMs.'
    };
  }

  static manifest() {
    return [
      {
        section: 'security_boundary',
        partLabel: 'Chapter 5 • Policy',
        title: 'The Zero-Leak AI Boundary Rule',
        blocks: [
          { id: 'p_sec_rule_1', type: 'p' },
          { id: 'p_sec_rule_2', type: 'p' },
          { id: 'sidebar_secret_policy', type: 'sidebar', kicker: 'Security Mandate', title: 'The Zero-Leak Directives' }
        ]
      },
      {
        section: 'secret_paths',
        partLabel: 'Chapter 5 • Storage Locations',
        title: 'Where Credentials Live on Each Machine',
        blocks: [
          { id: 'p_sec_locations_1', type: 'p' },
          { id: 'p_sec_locations_2', type: 'p' },
          { id: 'sidebar_credential_paths', type: 'sidebar', kicker: 'Secret File Map', title: 'Standard Credential File Paths' }
        ]
      }
    ];
  }

  static p_sec_rule_1() {
    return [
      "**The Cardinal Rule:** Never paste, print, or hardcode passwords, API tokens, private SSH keys, or access tokens into LLM prompts, chat windows, or tracked git files.",
      "Because this living specification is frequently bundled and sent to language models for architectural updates, any sensitive secret written into these pages would immediately leak into cloud inference logs. Instead, we follow the **Reference & Indirection Pattern**."
    ];
  }

  static p_sec_rule_2() {
    return [
      "Under this pattern, the specification documents **where the credential file lives on disk** and what environment variable name it uses. When an automation script needs a token (for example, to call an API or authenticate an SSH session), the script reads the local file or reads `process.env` at runtime. The secret stays 100% on your local machine and never enters the prompt text."
    ];
  }

  static sidebar_secret_policy() {
    return [
      "Zero-Leak Security Mandates:\n" +
      "• 1. Never put credentials in HomeSetup or Luno files: Always use `.gitignore` for `.env`.\n" +
      "• 2. Name the file, not the secret: Document path `~/.config/tokens.env`, not the contents.\n" +
      "• 3. Scripts read locally: Node.js scripts use `require('dotenv').config()` or `fs.readFileSync`.\n" +
      "• 4. SSH Key Protection: Keys protected by SSH agent (`ssh-add`) with passphrase memory."
    ];
  }

  static p_sec_locations_1() {
    return [
      "**Local Secret Storage Locations Across the Fleet:**",
      "• **Linux Host:** Secrets are stored in `~/.config/credentials/` or local project `.env` files (which are strictly excluded in `.gitignore`). SSH keys live in `~/.ssh/id_ed25519`.",
      "• **Mac Workstation:** Credentials live in `~/.config/credentials/` or macOS Keychain. Keychain items can be retrieved by local scripts via `/usr/bin/security find-generic-password` without user interaction.",
      "• **Windows Machine:** Secrets live in `%USERPROFILE%\\.config\\credentials\\` or Windows Credential Manager."
    ];
  }

  static p_sec_locations_2() {
    return [
      "By establishing this uniform directory layout across machines, an automation script can cleanly resolve credentials regardless of which node executes the job."
    ];
  }

  static sidebar_credential_paths() {
    return [
      "Safe Credential File Locations (Excluded from Git & Prompts):\n" +
      "• Linux: `~/.config/secrets/env.sh` and `~/.ssh/`\n" +
      "• Mac: `~/.config/secrets/env.sh` and macOS Keychain\n" +
      "• Windows: `%APPDATA%\\Secrets\\env.bat` and `~/.ssh/`\n" +
      "• Local Luno Projects: `<project>/.env.local` (Never committed)"
    ];
  }
}

globalThis.HomeSecretsContent = HomeSecretsContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeSecretsContent;