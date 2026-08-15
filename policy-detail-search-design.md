# AI-SDLC Policy Detail and Docs Retrieval Design

## Purpose

This design turns the current read-only Policy Registry into a route-addressable control catalogue and makes the Docs page searchable and shareable at section level. The design preserves the Governance Blueprint principle: the public portal explains deterministic controls; it does not edit, approve, or execute them.

## Policy detail routes

| Pack ID | YAML source | Public route | Docs backlink |
|---|---|---|---|
| `AGENT-LAUNCH` | `agent-launch.yml` | `/policies/agent-launch` | `/docs#validation` |
| `SPEC-STRUCT` | `spec-structure.yml` | `/policies/spec-struct` | `/docs#kit` |
| `TRACE` | `traceability.yml` | `/policies/traceability` | `/docs#lifecycle` |

Every record must present a stable policy ID, source filename, pack version, status, lifecycle stage, scope, owner, review cadence, expected evidence, exception process, and a rule ledger. Each rule ledger row records the rule ID, severity, declared check kind, machine-readable arguments, user-facing message, and the remediation intent. The current release is a public baseline, not a substitute for a signed Kit Registry.

## Docs search model

The in-page search index covers eight stable sections: `start`, `foundation`, `lifecycle`, `kit`, `validation`, `adoption`, `operations`, and `reference`. Each document entry has an English title, Vietnamese title, bilingual summary, keywords, a section identifier, and a reading-path context. Search is case-insensitive, works across both languages regardless of the selected display locale, and returns a focused result set that can be opened from keyboard or pointer interaction.

## Deep-link convention

The canonical Docs deep link is `https://ai.xdev.asia/docs#{section-id}`. Section IDs are stable control identifiers, not visual labels. The page resolves an incoming hash on first load, on browser back/forward navigation, and when a user selects a search result or the document outline. A visible copy-link action writes the same canonical hash URL to the clipboard and provides feedback without changing the reader's locale.

## Accessibility and language behavior

The search input has an explicit label, visible result count, empty state, and keyboard-operable result controls. The existing `EN / VI` preference continues to apply to labels and result presentation, while matching considers both language variants. Policy routes inherit the global language control and keep the Policy Registry as the active document-spine category.
