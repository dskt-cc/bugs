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

  // Verify lastUpdated is current
  const today = new Date().toISOString().split('T')[0];
  if (known.metadata.lastUpdated !== today) {
    throw new Error('Known bugs lastUpdated needs updating');
  }

  if (patched.metadata.lastUpdated !== today) {
    throw new Error('Patched bugs lastUpdated needs updating');
  }

  console.log('Metadata validation passed');
}

validateMetadata();
