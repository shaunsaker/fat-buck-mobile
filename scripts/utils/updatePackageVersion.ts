import * as fs from 'fs';

/**
 * Updates the package.json version with the given version string
 */
export function updatePackageVersion({
  version,
  build,
  code,
}: {
  version?: string;
  build?: string;
  code?: string;
}): void {
  const pkg = require('../../package.json');

  if (version) {
    pkg.version = version;
  }

  if (build) {
    pkg.build = build;
  }

  if (code) {
    pkg.code = code;
  }

  fs.writeFileSync('package.json', `${JSON.stringify(pkg, undefined, 2)}\n`);
  console.log('Package version updated');
}
