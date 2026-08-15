# AI-SDLC platform portal scope

## Product architecture

**AI-SDLC** is the governance layer for AI-assisted software delivery. It turns requirements, policy, validation, and evidence into versioned, reviewable artifacts. **xDev AI** maintains the platform openly. **`ai.xdev.asia`** is the public product and documentation address.

| Surface | Purpose | Primary visitor question |
|---|---|---|
| Platform | Explain the governed delivery lifecycle and the division between AI assistance and deterministic enforcement. | What does AI-SDLC control? |
| Spec Kit | Present policy-as-data, rule packs, contracts, templates, and domain packs. | What is versioned and validated? |
| Evidence | Explain the requirement-to-test trace graph, quality-gate outputs, and auditability. | How is delivery proven? |
| Open record | Link the repository, architecture note, releases, and dated decisions. | Where is the source of truth? |

## Portal experience

The homepage remains a documentation-first technical editorial experience with a persistent evidence rail. It adds a platform framing layer ahead of the existing Spec Kit deep dive, making the relationship explicit: **AI-SDLC Platform → Spec Kit → deterministic validator → evidence record**.

The hero must state the platform promise without claiming autonomous orchestration or unverified performance improvement. A compact lifecycle strip will introduce **Intent → Specification → Policy gate → Evidence → Release**. The secondary platform section will contrast ad-hoc AI output with governed delivery in terms of reviewability and evidence rather than productivity claims.

## Content and interaction rules

The site will use actual repository facts only: the closed set of check kinds, the local-to-bundled rule-resolution order, the three currently available YAML packs, and the SP1-to-SP2 delivery roadmap. The navigation should move visitors between Platform, Spec Kit, Evidence, and Open record while preserving the technical-note sections for detailed inspection. Links to the current personal repository remain accurate until its transfer to `xdev-ai` is explicitly approved.
