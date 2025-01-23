# JSON Schema Documentation

## Field Descriptions

### Common Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Unique identifier with format BUG-XXX where XXX is a zero-padded number | `"BUG-001"` |
| `title` | string | Yes | Brief, descriptive title (max 100 chars) | `"Quality Of Life Filter Not Working"` |
| `description` | string | Yes | Detailed explanation of the issue | `"The QualityOfLife enum member value..."` |
| `severity` | enum | Yes | One of: "critical", "high", "medium", "low" | `"medium"` |
| `reportedBy` | string | Yes | GitHub username of reporter | `"SilverMoonDev"` |
| `dateReported` | string | Yes | ISO 8601 date format | `"2025-01-21"` |
| `affected` | array | Yes | Array of affected components | `["UI", "ModFilters"]` |

### Known Bugs Specific

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `status` | enum | Yes | One of: "investigating", "confirmed", "in-progress", "pending-release" | `"investigating"` |
| `assignedTo` | array | No | Array of GitHub usernames | `["dvhsh"]` |
| `priority` | enum | No | One of: "immediate", "next-release", "future" | `"next-release"` |
| `workaround` | string | No | Temporary solution if available | `"Manually reset config file"` |

### Patched Bugs Specific

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `dateFixed` | string | Yes | ISO 8601 date format | `"2025-01-21"` |
| `fixedBy` | array | Yes | Array of GitHub usernames | `["SilverMoonDev"]` |
| `fixedIn` | string | Yes | Version or branch where fix was implemented | `"main"` |
| `commits` | array | Yes | Array of commit hashes | `["56f19cc"]` |
| `pullRequest` | string | No | PR number if applicable | `"1"` |
| `resolution` | string | No | Brief description of the fix | `"Updated enum value"` |

### Metadata

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `lastUpdated` | string | Yes | ISO 8601 date format | `"2025-01-23"` |
| `repository` | string | Yes | Repository name | `"dskt-cc/dskt.cc"` |
| `totalActiveBugs` | number | Yes | Count of active bugs | `0` |
| `totalFixed` | number | Yes | Count of fixed bugs | `1` |

## JSON Schema for Validation

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "commonBug": {
      "type": "object",
      "required": ["id", "title", "description", "severity", "reportedBy", "dateReported", "affected"],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^BUG-\\d{3}$"
        },
        "title": {
          "type": "string",
          "maxLength": 100
        },
        "description": {
          "type": "string"
        },
        "severity": {
          "type": "string",
          "enum": ["critical", "high", "medium", "low"]
        },
        "reportedBy": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9-]+$"
        },
        "dateReported": {
          "type": "string",
          "format": "date"
        },
        "affected": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "minItems": 1
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "bugs": {
      "type": "array",
      "items": {
        "oneOf": [
          {
            "allOf": [
              { "$ref": "#/definitions/commonBug" },
              {
                "type": "object",
                "required": ["status"],
                "properties": {
                  "status": {
                    "type": "string",
                    "enum": ["investigating", "confirmed", "in-progress", "pending-release"]
                  },
                  "assignedTo": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^[a-zA-Z0-9-]+$"
                    }
                  },
                  "priority": {
                    "type": "string",
                    "enum": ["immediate", "next-release", "future"]
                  },
                  "workaround": {
                    "type": "string"
                  }
                }
              }
            ]
          },
          {
            "allOf": [
              { "$ref": "#/definitions/commonBug" },
              {
                "type": "object",
                "required": ["dateFixed", "fixedBy", "fixedIn", "commits"],
                "properties": {
                  "dateFixed": {
                    "type": "string",
                    "format": "date"
                  },
                  "fixedBy": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^[a-zA-Z0-9-]+$"
                    },
                    "minItems": 1
                  },
                  "fixedIn": {
                    "type": "string"
                  },
                  "commits": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "pattern": "^[a-f0-9]+$"
                    },
                    "minItems": 1
                  },
                  "pullRequest": {
                    "type": "string"
                  },
                  "resolution": {
                    "type": "string"
                  }
                }
              }
            ]
          }
        ]
      }
    },
    "metadata": {
      "type": "object",
      "required": ["lastUpdated", "repository", "totalActiveBugs", "totalFixed"],
      "properties": {
        "lastUpdated": {
          "type": "string",
          "format": "date"
        },
        "repository": {
          "type": "string",
          "pattern": "^[a-zA-Z0-9-]+/[a-zA-Z0-9-]+$"
        },
        "totalActiveBugs": {
          "type": "number",
          "minimum": 0
        },
        "totalFixed": {
          "type": "number",
          "minimum": 0
        }
      }
    }
  },
  "required": ["bugs", "metadata"]
}
```

## Example Usage

### Known Bug Entry
```json
{
  "id": "BUG-002",
  "title": "Memory leak in mod loader",
  "description": "Memory usage increases over time when switching mods",
  "severity": "high",
  "reportedBy": "dvhsh",
  "dateReported": "2025-01-23",
  "status": "investigating",
  "assignedTo": ["dvhsh"],
  "affected": ["ModLoader", "Performance"],
  "priority": "immediate"
}
```

### Patched Bug Entry
```json
{
  "id": "BUG-001",
  "title": "Quality Of Life Filter Not Working",
  "description": "The QualityOfLife enum member value in the ModCategory enum did not match the corresponding JSON value",
  "severity": "medium",
  "reportedBy": "SilverMoonDev",
  "dateReported": "2025-01-21",
  "dateFixed": "2025-01-21",
  "fixedBy": ["SilverMoonDev"],
  "fixedIn": "main",
  "affected": ["UI", "ModFilters"],
  "commits": ["56f19cc"],
  "pullRequest": "1",
  "resolution": "Updated enum value to match JSON schema"
}
```
