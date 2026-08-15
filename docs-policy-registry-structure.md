# AI-SDLC Docs & Policy Registry — Detailed bilingual structure

## Information architecture principle

The **Docs** surface explains how a team adopts and operates governed AI-assisted delivery. The **Policy Registry** surface explains what the platform currently controls, how that control is enforced, and what evidence proves it. They use the same stable terms and identifiers, but solve different questions: Docs answers *how and why*; the Registry answers *what, where, by whom, and under which version*.

## Docs taxonomy

| ID | English | Tiếng Việt | Reader question | Primary links |
|---|---|---|---|---|
| `DOC-START` | Start here | Bắt đầu | What is AI-SDLC and where does it fit? | Platform model, adoption |
| `DOC-FOUNDATION` | Foundations | Nền tảng | What is governed, deterministic, and reviewable? | Artifact model, Policy Registry |
| `DOC-LIFECYCLE` | Delivery lifecycle | Vòng đời delivery | What record is expected from intent to release? | Requirements, specifications, evidence |
| `DOC-SPECKIT` | Spec Kit | Spec Kit | How are policy, templates, and contracts distributed? | Kit layout, compatibility |
| `DOC-VALIDATION` | Validation | Validation | Which checks run, what do failures mean, and how are exceptions handled? | Rule packs, check kinds |
| `DOC-ADOPTION` | Team adoption | Áp dụng cho team | How should roles onboard safely? | Role playbooks, rollout |
| `DOC-OPERATIONS` | Operations | Vận hành | How are versions, evidence, and policy changes operated? | Release record, review cycle |
| `DOC-REFERENCE` | Reference | Tham chiếu | Where are exact schemas, commands, and definitions? | CLI, config, glossary |

### Detailed Docs tree

```text
Docs / Tài liệu
├── Start here / Bắt đầu
│   ├── AI-SDLC in one page / AI-SDLC trong một trang
│   ├── Governance boundary / Ranh giới governance
│   ├── Roles and accountability / Vai trò và trách nhiệm
│   └── Read by role / Lộ trình theo vai trò
├── Foundations / Nền tảng
│   ├── Policy as data / Policy là data
│   ├── Deterministic decision path / Decision path deterministic
│   ├── Artifact graph / Đồ thị artifact
│   └── Evidence and auditability / Evidence và khả năng audit
├── Delivery lifecycle / Vòng đời delivery
│   ├── Intent → requirement / Ý định → requirement
│   ├── Requirement → specification / Requirement → specification
│   ├── Specification → task and change / Specification → task và thay đổi
│   ├── Test and validation / Test và validation
│   └── Release evidence / Evidence cho release
├── Spec Kit / Spec Kit
│   ├── Kit anatomy / Cấu trúc Kit
│   ├── check-kinds contract / Contract check-kinds
│   ├── Rule packs / Rule packs
│   ├── Templates, standards, and profiles / Templates, standards và profiles
│   ├── Local overrides / Override cục bộ
│   └── Version compatibility / Tương thích phiên bản
├── Validation / Validation
│   ├── Running a validation / Chạy validation
│   ├── Interpreting findings / Đọc kết quả phát hiện
│   ├── Severity and release gates / Severity và release gate
│   ├── Exception protocol / Quy trình exception
│   └── Evidence retention / Lưu giữ evidence
├── Team adoption / Áp dụng cho team
│   ├── Pilot one bounded flow / Pilot một flow có giới hạn
│   ├── BA, engineering, QA, and reviewer playbooks / Playbook theo vai trò
│   ├── Progressive control rollout / Rollout kiểm soát từng bước
│   └── Adoption review / Review áp dụng
├── Operations / Vận hành
│   ├── Kit release lifecycle / Vòng đời release Kit
│   ├── Policy change management / Quản lý thay đổi policy
│   ├── Review calendar / Lịch review
│   └── Incident and rollback / Incident và rollback
└── Reference / Tham chiếu
    ├── Artifact and ID grammar / Grammar cho artifact và ID
    ├── Configuration reference / Tham chiếu cấu hình
    ├── CLI and validator reference / Tham chiếu CLI và validator
    ├── Glossary / Thuật ngữ
    └── Compatibility matrix / Ma trận tương thích
```

### Reading paths

| Path | English sequence | Chuỗi đọc tiếng Việt | Intended outcome |
|---|---|---|---|
| Product / BA | Start here → Lifecycle → Spec Kit → Traceability policy | Bắt đầu → Vòng đời → Spec Kit → Policy traceability | Write reviewable intent and acceptance artifacts. |
| Engineer | Foundations → Validation → Rule packs → Reference | Nền tảng → Validation → Rule packs → Tham chiếu | Implement within pinned policy and resolve findings. |
| QA / reviewer | Lifecycle → Evidence → Policy Registry → Exceptions | Vòng đời → Evidence → Policy Registry → Exception | Decide whether a change has sufficient proof to proceed. |
| Platform owner | Spec Kit → Operations → Compatibility → Change management | Spec Kit → Vận hành → Tương thích → Quản lý thay đổi | Publish and evolve policy safely. |

## Policy Registry model

Every Registry record must be a read-only rendering of versioned policy data. A Registry page never substitutes for the policy artifact; it links the reader to the exact pack, version, rules, and supporting evidence.

| Field | English label | Nhãn tiếng Việt | Required | Purpose |
|---|---|---|---|---|
| `policy_id` | Policy ID | Mã policy | Yes | Stable ID, for example `POL-TRACE-001`. |
| `title` | Policy title | Tên policy | Yes | Human-readable bilingual control name. |
| `status` | Status | Trạng thái | Yes | `draft`, `active`, `deprecated`, or `retired`. |
| `control_intent` | Control intent | Mục tiêu kiểm soát | Yes | Risk or delivery behavior being controlled. |
| `scope` | Applies to | Phạm vi áp dụng | Yes | Command, specification, artifact graph, release, or domain. |
| `lifecycle_stage` | Lifecycle stage | Giai đoạn vòng đời | Yes | Intake, specify, build, validate, release, or operate. |
| `pack_ref` | Source pack | Pack nguồn | Yes | Path, version, digest, and signed-release link when available. |
| `enforcement` | Enforcement method | Phương thức enforce | Yes | Deterministic validator, review gate, or documented guidance. |
| `rule_count` | Declared rules | Số rule khai báo | Yes | Compact indicator for pack depth. |
| `severity` | Highest severity | Mức độ cao nhất | Yes | `error`, `warning`, or `advisory`. |
| `owner` | Control owner | Chủ sở hữu kiểm soát | Yes | Accountable team or role. |
| `review_cycle` | Review cadence | Chu kỳ review | Yes | Regular review interval and next review date. |
| `exceptions` | Exception protocol | Quy trình exception | Yes | Required owner, rationale, expiry, and approval path. |
| `evidence` | Evidence links | Liên kết evidence | Yes | Validation run, test result, review, or release record. |
| `compatibility` | Compatibility | Tương thích | Yes | Compatible validator and Kit version range. |
| `change_log` | Change record | Lịch sử thay đổi | Yes | Immutable version-to-version changes. |

### Policy Registry views

```text
Policy Registry / Kho chính sách
├── Current baseline / Baseline hiện tại
├── By lifecycle stage / Theo giai đoạn vòng đời
├── By scope / Theo phạm vi
├── By control family / Theo họ kiểm soát
├── By status / Theo trạng thái
├── Compatibility matrix / Ma trận tương thích
├── Change record / Lịch sử thay đổi
└── Policy detail / Chi tiết policy
    ├── Summary and control intent / Tóm tắt và mục tiêu kiểm soát
    ├── Version and source pack / Phiên bản và pack nguồn
    ├── Rule manifest / Danh sách rule
    ├── Enforcement and severity / Enforcement và severity
    ├── Exceptions and ownership / Exception và ownership
    ├── Evidence / Evidence
    └── Related docs and controls / Docs và control liên quan
```

## Initial control-family map

| Control family | Current pack | Policy IDs | Lifecycle stage | Core evidence |
|---|---|---|---|---|
| Agent launch controls | `agent-launch.yml` | `POL-LAUNCH-001`, `POL-LAUNCH-002` | Build | Command definition validation result |
| Specification structure | `spec-structure.yml` | `POL-SPEC-001` to `POL-SPEC-006` | Specify | Specification validation result |
| Traceability invariants | `traceability.yml` | `POL-TRACE-001` to `POL-TRACE-004` | Validate / Release | Resolved artifact graph and linked tests |

## Navigation rules

The main Docs navigation shows the eight top-level sections. Each section opens an anchored in-page outline today and can become a standalone route without changing its stable `DOC-*` ID later. Every Policy Registry detail panel must link to the related Docs section and every Docs section that explains an enforceable control must link back to its Registry record. Language choice is global and persists across both surfaces.
