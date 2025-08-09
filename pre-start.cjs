const { execSync } = require('child_process');

// Get git hash with fallback
const getGitHash = () => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'no-git-info';
  }
};

let commitJson = {
  hash: JSON.stringify(getGitHash()),
  version: JSON.stringify(process.env.npm_package_version),
};

// ASCII Banner for SLOTH CODER
console.log(`
███████╗██╗      ██████╗ ████████╗██╗  ██╗     ██████╗  ██████╗ ██████╗ ███████╗██████╗
██╔════╝██║     ██╔═══██╗╚══██╔══╝██║  ██║    ██╔════╝ ██╔═══██╗██╔══██╗██╔════╝██╔══██╗
███████╗██║     ██║   ██║   ██║   ███████║    ██║  ███╗██║   ██║██████╔╝█████╗  ██████╔╝
╚════██║██║     ██║   ██║   ██║   ██╔══██║    ██║   ██║██║   ██║██╔══██╗██╔══╝  ██╔══██╗
███████║███████╗╚██████╔╝   ██║   ██║  ██║    ╚██████╔╝╚██████╔╝██║  ██║███████╗██║  ██║
╚══════╝╚══════╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝     ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`);

console.log('★═══════════════════════════════════════★');
console.log('       🦥  Welcome to SLOTH CODER  🦥');
console.log('★═══════════════════════════════════════★');
console.log('📍 Current Version Tag:', `v${commitJson.version}`);
console.log('📍 Current Commit Version:', commitJson.hash);
console.log('  ⌛ Please wait until the URL appears here...');
console.log('★═══════════════════════════════════════★');
