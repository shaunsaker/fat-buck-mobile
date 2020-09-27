import { spawnSync } from 'child_process';

export function execGit(gitArgs: string[], message?: string): string {
  const ret = spawnSync('git', gitArgs);
  if (ret.status !== 0) {
    console.error(`git ${gitArgs.join(' ')}:`);
    console.error(message || ret.stderr.toString());
    process.exit(ret.status || 1);
  }
  return ret.stdout.toString();
}
