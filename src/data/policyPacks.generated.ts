/* Generated from xdev-ai/ai-sdlc-policies YAML. Do not edit by hand. */
export const policyRegistrySnapshot = [
  {
    "id": "AGENT-LAUNCH",
    "slug": "agent-launch",
    "file": "agent-launch.yml",
    "sourcePath": "packs/agent-launch.yml",
    "sourceRepository": "xdev-ai/ai-sdlc-policies",
    "sourceRevision": "workspace",
    "version": "1.0.0",
    "appliesTo": [
      "command"
    ],
    "description": "Verified findings (SDD §32): headless Claude Code works with subscription auth, but --bare forces API-key auth (breaks verified flow) and un-pinned --model makes cost/behavior non-reproducible. These rules enforce the mandatory argv contract.\n",
    "rules": [
      {
        "id": "LAUNCH-001",
        "severity": "error",
        "check": "argv_must_contain",
        "message": "Automated command must pin --model explicitly",
        "arguments": {
          "value": "--model"
        }
      },
      {
        "id": "LAUNCH-002",
        "severity": "error",
        "check": "argv_must_not_contain",
        "message": "Kit command must not use --bare (forces API-key auth)",
        "arguments": {
          "value": "--bare"
        }
      }
    ]
  },
  {
    "id": "SPEC-STRUCT",
    "slug": "spec-struct",
    "file": "spec-structure.yml",
    "sourcePath": "packs/spec-structure.yml",
    "sourceRepository": "xdev-ai/ai-sdlc-policies",
    "sourceRevision": "workspace",
    "version": "1.0.0",
    "appliesTo": [
      "spec"
    ],
    "description": "Every spec in specs/ must carry a valid artifact ID in its frontmatter and contain the mandatory sections required for the artifact type to be useful downstream (SDD §5.2.3).\n",
    "rules": [
      {
        "id": "SPEC-STRUCT-001",
        "severity": "error",
        "check": "frontmatter_field_present",
        "message": "Spec is missing frontmatter field 'id'",
        "arguments": {
          "value": "id"
        }
      },
      {
        "id": "SPEC-STRUCT-002",
        "severity": "error",
        "check": "frontmatter_matches",
        "message": "Frontmatter field 'id' must be a valid artifact ID",
        "arguments": {
          "value": "id",
          "from": "^(SPEC|REQ|BR|AC|TASK|TC)-[A-Z0-9]{2,5}-\\d{3}(-\\d{2,3})?$"
        }
      },
      {
        "id": "SPEC-STRUCT-003",
        "severity": "error",
        "check": "section_not_empty",
        "message": "Spec {id} is missing required section 'Description'",
        "arguments": {
          "section": "Description"
        }
      },
      {
        "id": "SPEC-STRUCT-004",
        "severity": "warning",
        "check": "sections_present",
        "message": "Spec {id} is missing recommended section 'Acceptance Criteria'",
        "arguments": {
          "section": "Acceptance Criteria"
        }
      },
      {
        "id": "SPEC-STRUCT-005",
        "severity": "warning",
        "check": "sections_present",
        "message": "Spec {id} is missing recommended section 'Non-functional Requirements'",
        "arguments": {
          "section": "Non-functional Requirements"
        }
      },
      {
        "id": "SPEC-STRUCT-006",
        "severity": "error",
        "check": "id_unique",
        "message": "Artifact ID {id} is declared in more than one spec file",
        "arguments": {}
      }
    ]
  },
  {
    "id": "TRACE",
    "slug": "traceability",
    "file": "traceability.yml",
    "sourcePath": "packs/traceability.yml",
    "sourceRepository": "xdev-ai/ai-sdlc-policies",
    "sourceRevision": "workspace",
    "version": "1.0.0",
    "appliesTo": [
      "spec"
    ],
    "description": "Enforces graph edge invariants over the merged artifact graph built from all specs/ files plus test-marker scans of tests/.\n",
    "rules": [
      {
        "id": "TRACE-001",
        "severity": "error",
        "check": "graph_edge_exists",
        "message": "Business rule {id} has no verified_by link to any test case (TC)",
        "arguments": {
          "from": "BR",
          "edge": "verified_by",
          "to": "TC",
          "min": "1"
        }
      },
      {
        "id": "TRACE-002",
        "severity": "error",
        "check": "graph_edge_exists",
        "message": "Requirement {id} is not refined by any specification (SPEC)",
        "arguments": {
          "from": "REQ",
          "edge": "refines",
          "to": "SPEC",
          "min": "1"
        }
      },
      {
        "id": "TRACE-003",
        "severity": "warning",
        "check": "graph_edge_exists",
        "message": "Acceptance criteria {id} has no tracked_by link to an implementation task (TASK)",
        "arguments": {
          "from": "AC",
          "edge": "tracked_by",
          "to": "TASK",
          "min": "1"
        }
      },
      {
        "id": "TRACE-004",
        "severity": "error",
        "check": "reference_resolves",
        "message": "Reference to undeclared ID in {id} file — not declared in any spec",
        "arguments": {}
      }
    ]
  }
] as const;
