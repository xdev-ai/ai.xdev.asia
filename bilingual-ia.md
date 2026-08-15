# Bilingual platform information architecture

## Shared navigation

The platform will have three primary public routes: **Platform** (`/`), **Docs** (`/docs`), and **Policy Registry** (`/policies`). Each route carries the same AI-SDLC / xDev AI identity, a direct route switcher, and an explicit language switch. English is the default for external sharing; Vietnamese is a first-class peer rather than a translated afterthought.

## Docs taxonomy

| Section | English label | Vietnamese label | Purpose |
|---|---|---|---|
| Start here | Start here | Bắt đầu | Explain AI-SDLC, its boundary, and the governed-delivery lifecycle. |
| Platform model | Platform model | Mô hình nền tảng | Describe policy-as-data, deterministic validation, and evidence trace. |
| Spec Kit | Spec Kit | Spec Kit | Document the kit layout, check-kinds contract, packs, and local overrides. |
| Adoption | Adoption | Áp dụng | Give a responsible onboarding sequence for teams. |

## Policy Registry model

The Registry is a browseable public catalogue, not a policy editor. Every entry exposes a stable ID, status, scope, severity, current pack version, enforcement method, and a short bilingual explanation. The initial data reflects real rule-pack facts already present in the repository: `AGENT-LAUNCH`, `SPEC-STRUCT`, and `TRACE`.
