import { execGit } from './execGit';

/**
 * Creates and checkout a new branch `release/${version}`,
 * creates a commit and tags it with the given version and pushes them to origin.
 */
export function createBranchAndTag(version: string): void {
  const branchName = `release/${version}`;
  const tagName = version;
  execGit(['checkout', '-b', branchName]);
  const commitMessage = version;
  console.log(`Created branch ${branchName}`);
  execGit(['commit', '--no-verify', '-m', `${commitMessage}`, 'package.json']);
  execGit(['tag', tagName]);
  console.log(`Created tag ${tagName}`);
  execGit(['push', '--no-verify', '--set-upstream', 'origin', branchName]);
  console.log('Pushed branch to origin');
  execGit(['push', 'origin', `${tagName}`, '--no-verify']);
  console.log('Pushed tag to origin');
}
