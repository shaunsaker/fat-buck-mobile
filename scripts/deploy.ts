import { createBranchAndTag } from './utils/createBranchAndTag';
import { execGit } from './utils/execGit';
import { updatePackageVersion } from './utils/updatePackageVersion';

// Only proceed if there are no uncommitted changes
execGit(
  ['diff', '--exit-code'],
  'Uncommitted changes, please commit/stash first!',
);

const args = process.argv.slice(2);
// base version e.g. 2.6.0
const baseVersion = checkBaseVersion(args[0]);

// the new version e.g. 2.6.0-5
const { newVersion } = getNewVersion(baseVersion);
const newBaseVersion = newVersion.split('-')[0];
const newBuildVersion = newVersion.split('-')[1];

updatePackageVersion({ version: newBaseVersion, build: newBuildVersion });
createBranchAndTag(newVersion);

// done
process.exit();

function checkBaseVersion(version: string): string {
  const baseRegex = /^[0-9]+\.[0-9]+\.[0-9]+$/g;
  if (version.match(baseRegex) === null) {
    console.error('Wrong base version, use x.y.z as base!');
    process.exit(1);
  }
  return version;
}

/**
 * Returns the next possible version from the given base version.
 * Checks all git tags to find the last version of base version and increments it.
 */
function getNewVersion(base: string): { newVersion: string } {
  const getBuildNumberFromTagName = (tagName: string) =>
    parseInt(tagName.replace(`${base}-`, ''), 10);

  const oldVersions = execGit(['tag', '-l', `${base}-*`])
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length !== 0 && getBuildNumberFromTagName(l))
    .map((l) => getBuildNumberFromTagName(l))
    .sort((a, b) => b - a);

  if (oldVersions.length !== 0) {
    const oldVersion = `${base}-${oldVersions[0]}`;
    const versionString = `${base}-${oldVersions[0] + 1}`;
    console.log(
      `Found old version \x1b[36m${oldVersion}\x1b[0m, new version \x1b[36m${versionString}\x1b[0m`,
    );
    return {
      newVersion: versionString,
    };
  }
  const versionString = `${base}-1`;
  console.log(`No old version found for ${base}, will create ${versionString}`);
  return {
    newVersion: versionString,
  };
}
