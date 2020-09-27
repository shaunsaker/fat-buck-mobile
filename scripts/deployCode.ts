import { createBranchAndTag } from './utils/createBranchAndTag';
import { updatePackageVersion } from './utils/updatePackageVersion';

// get the current code version from package.json
const {
  version,
  code,
}: { version: string; code: string } = require('../package.json');

// increment the code version
const updatedCodeVersion = (Number(code) + 1).toString();

// add the updated code version to package.json
updatePackageVersion({ code: updatedCodeVersion });

// branch and tag
const versionString = `${version}.${code}`;
createBranchAndTag(versionString);
