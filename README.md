# dskt.cc Bug Tracker

This repository tracks bugs and issues for [dskt.cc](https://dskt.cc) and its related services. It contains a record of both known and patched bugs, along with their statuses and resolutions.

## Structure
```
bugs/
├── .github/
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.yml
│       └── security_report.yml
├── docs/
│   ├── CONTRIBUTING.md
│   ├── SECURITY.md
│   └── JSON_SCHEMA.md
├── patched.json
├── known.json
└── LICENSE
```

## Bug Reporting

Before submitting a bug report:
1. Check if the bug is already reported in [known.json](known.json)
2. Check if it was recently fixed in [patched.json](patched.json)
3. Use the bug report template when creating a new issue

### Severity Levels

- **Critical**: Application crashes, data loss, security vulnerabilities
- **High**: Major feature broken, significant user impact
- **Medium**: Feature partially broken, moderate user impact
- **Low**: Minor issues, visual bugs, minimal impact

## JSON Schema

### Known Bugs (`known.json`)
```json
{
  "bugs": [
    {
      "id": "BUG-XXX",
      "title": "Bug Title",
      "description": "Detailed description of the bug",
      "severity": "critical | high | medium | low",
      "reportedBy": "GitHub Username",
      "dateReported": "YYYY-MM-DD",
      "status": "investigating | confirmed | in-progress",
      "assignedTo": ["username"],
      "affected": ["component1", "component2"],
      "type": "bug | security | enhancement",
      "component": "affected component"
    }
  ],
  "metadata": {
    "lastUpdated": "YYYY-MM-DD",
    "repository": "dskt-cc/dskt.cc",
    "totalActiveBugs": 0
  }
}
```

### Patched Bugs (`patched.json`)
```json
{
  "bugs": [
    {
      "id": "BUG-XXX",
      "title": "Bug Title",
      "description": "Detailed description of the bug",
      "severity": "critical | high | medium | low",
      "reportedBy": "GitHub Username",
      "dateReported": "YYYY-MM-DD",
      "dateFixed": "YYYY-MM-DD",
      "fixedBy": ["username"],
      "fixedIn": "version or branch",
      "affected": ["component1", "component2"],
      "commits": ["commit hash"],
      "pullRequest": "PR number"
    }
  ],
  "metadata": {
    "lastUpdated": "YYYY-MM-DD",
    "repository": "dskt-cc/dskt.cc",
    "totalFixed": 0
  }
}
```

## Security
For security-related issues, please follow our [security policy](docs/SECURITY.md). Do not create public issues for security vulnerabilities.

## Contributing
See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines on:
- Creating bug reports
- Updating bug statuses
- JSON file maintenance
- Pull request process
 
## License
MIT License - see [LICENSE](LICENSE)
