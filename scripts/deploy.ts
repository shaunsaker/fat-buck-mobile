import { argv } from 'yargs';
import * as fs from 'fs';
import { spawnSync } from 'child_process';

// Only proceed if there are no uncommitted changes
execGit(
  ['diff', '--exit-code'],
  'Uncommitted changes, please commit/stash first!',
);

const releaseBranchBase = 'release/';

const codeReleaseVersion = argv.code as string;

if (codeReleaseVersion) {
  // RELEASE CODE FLOW

  // get the latest build release branch for the given version
  const latestReleaseBranchName = getLatestReleaseBranchName(
    codeReleaseVersion,
  );

  // check out that release branch
  execGit(['checkout', latestReleaseBranchName]);

  // rebase master
  execGit(['rebase', 'master']);

  // push the rebase branch
  execGit(['push', '-f']);

  // get the new code version
  const currentCodeVersion = require('../package.json').code;
  const nextCodeVersion = (Number(currentCodeVersion) + 1).toString();

  updatePackageVersion({
    code: nextCodeVersion,
  });

  // commit the updated package.json
  const latestReleaseVersionString = latestReleaseBranchName.split(
    releaseBranchBase,
  )[1]; // e.g. 1.0.0-1
  const versionString = `${latestReleaseVersionString}-${nextCodeVersion}`; // e.g. 1.0.0-1-1 === VERSION-BUILD-CODE
  const commitMessage = versionString;
  execGit(['commit', '--no-verify', '-m', `${commitMessage}`, 'package.json']);
  console.log(`Created commit ${commitMessage}`);

  // create a new tag with the code version
  const tagName = versionString;
  execGit(['tag', tagName]);
  console.log(`Created tag ${tagName}`);

  // Push
  execGit([
    'push',
    '--no-verify',
    '--set-upstream',
    'origin',
    latestReleaseBranchName,
  ]);
  console.log('Pushed branch to origin');
  execGit(['push', 'origin', `${tagName}`, '--no-verify']);
  console.log('Pushed tag to origin');
} else {
  // RELEASE BUILD FLOW

  // base version e.g. 2.6.0
  const baseVersion = checkBaseVersion(process.argv.slice(2)[0]);

  // the new version e.g. 2.6.0-5
  const { newVersion } = getNewVersion(baseVersion);
  const newBaseVersion = newVersion.split('-')[0];
  const newBuildVersion = newVersion.split('-')[1];

  updatePackageVersion({
    version: newBaseVersion,
    build: newBuildVersion,
  });
  createBranchAndTag(newVersion);
}

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

function getLatestReleaseBranchName(base: string) {
  const oldReleaseBranches = execGit([
    'branch',
    '-l',
    `${releaseBranchBase}${base}-*`,
  ])
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l)
    .sort((a, b) => {
      // sort by version
      const sortOnA = a.replace(releaseBranchBase, '').split('-')[0];
      const sortOnB = b.replace(releaseBranchBase, '').split('-')[0];

      if (sortOnA > sortOnB) {
        return -1;
      }
      if (sortOnB > sortOnA) {
        return 1;
      }
      return 0;
    })
    .sort((a, b) => {
      // sort by build number
      const sortOnA = parseInt(
        a.replace(releaseBranchBase, '').split('-')[1],
        10,
      );
      const sortOnB = parseInt(
        b.replace(releaseBranchBase, '').split('-')[1],
        10,
      );

      if (sortOnA > sortOnB) {
        return -1;
      }
      if (sortOnB > sortOnA) {
        return 1;
      }
      return 0;
    });

  return oldReleaseBranches[0];
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

/**
 * Updates the package.json version with the given version string
 */
function updatePackageVersion({
  version,
  build,
  code,
}: {
  version?: string;
  build?: string;
  code?: string;
}): void {
  const pkg = require('../package.json');

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

/**
 * Creates and checkout a new branch `release/${version}`,
 * creates a commit and tags it with the given version and pushes them to origin.
 */
function createBranchAndTag(version: string): void {
  const branchName = `${releaseBranchBase}${version}`;
  const tagName = version;
  execGit(['checkout', '-b', branchName]);
  const commitMessage = version;
  console.log(`Created branch ${branchName}`);
  execGit(['commit', '--no-verify', '-m', `${commitMessage}`, 'package.json']);
  console.log(`Created commit ${commitMessage}`);
  execGit(['tag', tagName]);
  console.log(`Created tag ${tagName}`);
  execGit(['push', '--no-verify', '--set-upstream', 'origin', branchName]);
  console.log('Pushed branch to origin');
  execGit(['push', 'origin', `${tagName}`, '--no-verify']);
  console.log('Pushed tag to origin');
}

function execGit(gitArgs: string[], message?: string): string {
  const ret = spawnSync('git', gitArgs);
  if (ret.status !== 0) {
    console.error(`git ${gitArgs.join(' ')}:`);
    console.error(message || ret.stderr.toString());
    process.exit(ret.status || 1);
  }
  return ret.stdout.toString();
}
