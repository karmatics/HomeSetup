class HomeStorageContent {
  static getMeta() {
    return {
      kicker: 'Storage & Drive Mobility',
      title: '2. Shared Storage & Portable Drive',
      subtitle: 'Managing the roving external drive across Linux, Mac, and Windows with consistent paths, file systems, and sync routines.'
    };
  }

  static manifest() {
    return [
      {
        section: 'drive_architecture',
        partLabel: 'Chapter 2 • Portable Drive',
        title: 'The Roving Hard Drive & Cross-OS Mount Points',
        blocks: [
          { id: 'p_store_drive_1', type: 'p' },
          { id: 'p_store_drive_2', type: 'p' },
          { id: 'sidebar_mount_table', type: 'sidebar', kicker: 'Mount Directory', title: 'Mount Paths by Operating System' }
        ]
      },
      {
        section: 'sync_strategies',
        partLabel: 'Chapter 2 • Synchronization',
        title: 'Transfer Strategies: Physical Swapping vs. Over-the-Wire Sync',
        blocks: [
          { id: 'p_store_sync_1', type: 'p' },
          { id: 'p_store_sync_2', type: 'p' },
          { id: 'sidebar_transfer_scripts', type: 'sidebar', kicker: 'Transfer Recipes', title: 'rsync & rclone Workflow Recipes' }
        ]
      }
    ];
  }

  static p_store_drive_1() {
    return [
      "A core asset of this workstation setup is the high-capacity external hard drive. It can physically connect over USB-C / USB-A to any of the three main machines: the Linux host, the Mac, or the Windows workstation.",
      "Because it moves between different operating systems, it is formatted with a universally readable filesystem (typically **exFAT** with consistent 4K cluster sizing, or dual-partitioned with NTFS/ext4). This allows multi-gigabyte files, 3D asset libraries, model weights, and backup archives to move instantly without network bandwidth saturation."
    ];
  }

  static p_store_drive_2() {
    return [
      "To prevent scripts from breaking when the drive moves from one machine to another, we document the canonical mount paths for each operating system below."
    ];
  }

  static sidebar_mount_table() {
    return [
      "Cross-Platform Mount Locations:\n" +
      "• Linux Host:\n" +
      "   - Auto-mount: `/media/<username>/<VolumeName>/`\n" +
      "   - Static fstab mount: `/mnt/shared_drive/`\n" +
      "• Mac Workstation:\n" +
      "   - Standard mount: `/Volumes/<VolumeName>/`\n" +
      "• Windows Workstation:\n" +
      "   - Native Win32: `D:\\` or `E:\\`\n" +
      "   - WSL2 Subsystem: `/mnt/d/` or `/mnt/e/`\n" +
      "• Canonical Workspace Folder on Drive:\n" +
      "   - `<DriveRoot>/Workspace/` and `<DriveRoot>/Backups/`"
    ];
  }

  static p_store_sync_1() {
    return [
      "**Physical Plug vs. Network Pull:** When the drive is plugged into the Linux box, bulk transfers are local and blazing fast. If the drive is currently plugged into the Mac or Windows machine, the Linux host can still reach it across the LAN over an SSH/SMB share: `rsync -avz --progress user@mac:/Volumes/<VolumeName>/ /local/target/`."
    ];
  }

  static p_store_sync_2() {
    return [
      "This provides the best of both worlds: high-throughput physical portability when doing massive dump operations, plus network accessibility when the drive is attached to a remote machine across the room."
    ];
  }

  static sidebar_transfer_scripts() {
    return [
      "Quick Synchronization Recipes:\n" +
      "• 1. Pull from Mac to Linux:\n" +
      "  `rsync -avz --exclude='.git' user@macbook:/Volumes/External/ ./destination/`\n" +
      "• 2. Push from Linux to Windows Share:\n" +
      "  `rsync -avz ./projects/ user@winbox:/mnt/d/Workspace/`\n" +
      "• 3. Fast Verification:\n" +
      "  Compare checksums using `sha256sum` or file size manifests."
    ];
  }

  static p_store_catalog_1() {
    return [
      "**Verified Workspace Synchronization (Ubuntu vs. Mac):**",
      "Our live cross-wire probe verified that all 44 project repositories on Linux are now initialized with Git on branch `main` and wired to their authoritative GitHub remotes (`git@github.com:karmatics/<repo>.git`, with `teacup` tracking `Lunocracy/teacup.git`).",
      "`Library/KeyCommandHandler.js` was synchronized directly from the Mac over HTTP GET, bringing Linux to the complete 600-line implementation.",
      "Both Linux and Mac now hold matching, Git-configured working repositories across all 44 projects, ready for continuous synchronization and 1-tap deployment to GitHub Pages."
    ];
  }
  static sidebar_git_repo_table() {
    return [
      "Verified Multi-Node Repository Matrix:\n" +
      "• Mac Mini (`/Users/rob/source/LunoProjects`):\n" +
      "   - 36 Repositories on branch `main` -> `git@github.com:karmatics/<repo>.git`\n" +
      "   - ScreenFlow v10.5.2 video recording suite active\n" +
      "• Ubuntu Laptop (`/root/source/LunoProjects`):\n" +
      "   - `HomeSetup`: Initialized with Git, remote wired to `git@github.com:karmatics/HomeSetup.git`\n" +
      "   - `Library` & `Luno`: Configured with matching karmatics GitHub remotes\n" +
      "   - SSH Identity: Key pair configured in `/root/.ssh/id_ed25519`\n" +
      "   - State Report: Live synchronization telemetry saved to `HomeSetup/state/recon_report.json`"
    ];
  }
}

globalThis.HomeStorageContent = HomeStorageContent;
if (typeof module !== 'undefined' && module.exports) module.exports = HomeStorageContent;