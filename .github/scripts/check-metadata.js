const fs = require('fs');

function validateMetadata() {
  const known = JSON.parse(fs.readFileSync('known.json', 'utf8'));
  const patched = JSON.parse(fs.readFileSync('patched.json', 'utf8'));

  // Verify counts
  if (known.metadata.totalActiveBugs !== known.bugs.length) {
    throw new Error('Known bugs count mismatch');
  }

  if (patched.metadata.totalFixed !== patched.bugs.length) {
    throw new Error('Patched bugs count mismatch');
  }

  // Verify lastUpdated is a valid date
  const knownDate = new Date(known.metadata.lastUpdated);
  const patchedDate = new Date(patched.metadata.lastUpdated);

  if (isNaN(knownDate.getTime())) {
    throw new Error('Known bugs lastUpdated is not a valid date');
  }

  if (isNaN(patchedDate.getTime())) {
    throw new Error('Patched bugs lastUpdated is not a valid date');
  }

  console.log('Metadata validation passed');
}

validateMetadata();
