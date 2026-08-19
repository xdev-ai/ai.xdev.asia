"use client";
/* Governance Blueprint usage guide: how to operate the AI-SDLC platform, from first login to connected AI assistants. */
import { ArrowRight, Bot, CheckCircle2, CircleAlert, Database, KeyRound, Layers, Search, Settings2, ShieldCheck, ShieldCheckIcon, TerminalSquare, Users, Workflow } from "lucide-react";
import { useState } from "react";
import { PortalShell, type Locale } from "@/components/PortalShell";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { Breadcrumb } from "@/components/Breadcrumb";

type Dict = {
  eyebrow: string; title: string; lead: string;
  rules: { label: string; items: readonly { no: string; title: string; text: string }[] };
  roles: { label: string; items: readonly { role: string; desc: string; perms: string }[] };
  config: { eyebrow: string; title: string; lead: string; note: string; steps: readonly { no: string; title: string; text: string }[] };
  cli: { eyebrow: string; title: string; lead: string; note: string; command: string; after: string };
  evidence: { eyebrow: string; title: string; lead: string; items: readonly { icon: string; title: string; text: string }[] };
  knowledge: { eyebrow: string; title: string; lead: string; para: string; exportCmd: string; importCmd: string; exportNote: string; importNote: string; searchNote: string };
  ai: { eyebrow: string; title: string; lead: string; loginCmd: string; mcpCmd: string; tools: readonly { name: string; text: string }[]; ruleNote: string };
  pitfalls: { eyebrow: string; title: string; lead: string; rows: readonly { symptom: string; cause: string }[] };
  local: { eyebrow: string; title: string; lead: string; steps: readonly { no: string; text: string }[]; realCmds: readonly { cmd: string; note: string }[] };
  close: string; closeText: string;
};
const copy: Record<Locale, Dict> = {
  en: {
    eyebrow: "04 / USAGE GUIDE / FROM FIRST LOGIN TO CONNECTED AI",
    title: "How to operate the AI-SDLC platform.",
    lead: "This guide answers exactly one question: once you are logged in, what do you do? Every step below is checked against the real repository code.",
    rules: {
      label: "RULES OF THE HOUSE",
      items: [
        { no: "01", title: "Setup order is mandatory.", text: "No organization, no project. No pinned Spec Kit, no validation runs. The dashboard shows a step checklist with real status — click an unfinished step to jump straight to it." },
        { no: "02", title: "Every screen depends on the selected scope.", text: "The ORG / PROJECT selector at the top of the page decides what you see. Until you pick one and press Apply scope, most screens are intentionally empty — that is correct, not a bug." },
        { no: "03", title: "The portal reads and decides; it never enters evidence.", text: "Validated evidence enters through the CLI or SCM webhooks. There is no \"run validation\" button on the UI, by design: evidence must come from a real run, never typed in by hand." },
      ],
    },
    roles: {
      label: "WHO CAN DO WHAT",
      items: [
        { role: "admin", desc: "Creates organizations, registers Spec Kits, and activates constitutions and policies. Steps that shape the governance model are admin-only.", perms: "Organization create · Spec Kit register · Constitution activate · Policy activate" },
        { role: "developer", desc: "Pushes validation evidence from the local CLI into the platform. Does not need portal privileges to feed the system.", perms: "CLI evidence push · Validation sync" },
        { role: "reviewer", desc: "Reads findings, works the review queue, and issues the approval or rejection decision that gates a release.", perms: "Findings review · Approval quorum · Release decision" },
      ],
    },
    config: {
      eyebrow: "STEP 01",
      title: "Configure the platform in eight steps.",
      lead: "The sequence is fixed. Later steps silently fail until the earlier ones exist, so follow it top to bottom on first use.",
      note: "Steps 1, 5, 7, and 8 require the admin role. Project membership is checked in addition to realm roles — an organization-level developer still cannot read a project they are not a member of.",
      steps: [
        { no: "01", title: "Create the organization.", text: "The organization form lives inside the Projects screen." },
        { no: "02", title: "Select the scope.", text: "Pick ORG, then PROJECT, in the top bar and press Apply scope." },
        { no: "03", title: "Create the project.", text: "Project slugs allow a-z, 0-9, and hyphens only." },
        { no: "04", title: "Invite members.", text: "The Subject field takes a Keycloak user UUID — not an email. Find it in the Keycloak admin console." },
        { no: "05", title: "Register a Spec Kit.", text: "Paste the kit manifest JSON into the Spec Kit registry. An empty {} is a valid starting point. Layers: CORE, EXTENSION, PRESET, OVERRIDE." },
        { no: "06", title: "Pin the kit to the project.", text: "Requires the project scope selected first. Precedence is 0–10000." },
        { no: "07", title: "Write the constitution.", text: "After creating it, press Activate — a constitution that is not activated has no effect." },
        { no: "08", title: "Write the policies.", text: "Each policy must also be activated separately." },
      ],
    },
    cli: {
      eyebrow: "STEP 09",
      title: "Feed data through the CLI.",
      lead: "The management API deliberately never listens on the host. Run the validator inside the Compose network, then init, validate, and sync the project.",
      note: "Validation never calls a model. The pinned model identity is stored as provenance only. After sync, data appears in Validations, Traceability, and Quality.",
      command: `docker run --rm --network ai-sdlc_platform -v "$PWD:/w" -w /w/cli golang:1.24 \\
  go run ./cmd/aisdlc init --project <project-uuid> \\
  --api-url http://management-server:8081 \\
  --spec-dir ../my-project/spec-kit \\
  --kit-version core@1.0.0 \\
  --model provider/model@revision`,
      after: "Then run validate and sync. The acceptance suite will fail if localhost:8081 ever answers — the isolation is intentional.",
    },
    evidence: {
      eyebrow: "AFTER DATA ARRIVES",
      title: "Read what the system recorded.",
      lead: "Four screens form the operating loop once evidence is in the platform.",
      items: [
        { icon: "layers", title: "Validations", text: "Inspect each run and classify every finding. FALSE_POSITIVE and ACCEPTED_RISK both require a stated reason — not fixing something is still a decision that must be recorded." },
        { icon: "database", title: "Evidence repository", text: "Upload artifacts and lock them with a governance or compliance retention key. The server computes SHA-256 and cross-checks any digest you send." },
        { icon: "users", title: "Review queue", text: "Open review items and issue an APPROVED or REJECTED decision that the release gates consume." },
        { icon: "shield", title: "Audit ledger", text: "An append-only hash chain with a one-click integrity verification." },
      ],
    },
    knowledge: {
      eyebrow: "KNOWLEDGE BASE",
      title: "Give the AI your project documentation.",
      lead: "The knowledge space is where project documents live so that AI assistants can read them and cite the exact section.",
      para: "Search matches keywords and ignores Vietnamese diacritics — typing \"tiep nhan\" still finds \"tiếp nhận\". Results return the matching passages with the heading path so a citation lands in the right section.",
      exportCmd: `python3 scripts/workbook-to-pages.py <file.xlsx> --space-key DOCS \\
  --parent-slug workbook-index --out pages.json`,
      exportNote: "Offline by design: it writes pages.json first so sensitive documents can be reviewed before anything is sent. Add --preview to inspect the structure only.",
      importCmd: `bash scripts/import-pages.sh --payload pages.json \\
  --org <organization-uuid> --note "reason for this import"`,
      importNote: "Re-running the import updates existing pages into new versions with the reason recorded — no duplication, no errors. Unchanged pages report same and write nothing. Each sheet becomes a page; each row becomes its own child entry so columns stay self-describing.",
      searchNote: "This is keyword search, not semantic search. This implementation has no embedding layer, so a question phrased differently from the documents will not match. No results means no shared word, not that the topic is absent.",
    },
    ai: {
      eyebrow: "AI ON THE DEVELOPER MACHINE",
      title: "Connect any MCP-capable assistant to the platform.",
      lead: "Every developer machine installs exactly one thing — the aisdlc binary, which also runs an MCP server. Claude Code, Claude Desktop, Cursor, and Windsurf all work.",
      loginCmd: "aisdlc login --token-url https://auth.example/realms/ai-sdlc/protocol/openid-connect/token --client-secret <secret>",
      mcpCmd: "claude mcp add aisdlc -- aisdlc mcp --api-url https://control.example.com --project <project-uuid>",
      tools: [
        { name: "aisdlc_get_rules", text: "Read the currently effective constitution, enabled policies, pinned Spec Kit, and platform invariants." },
        { name: "aisdlc_search_docs", text: "Find document passages with diacritic-free matching and heading paths for citation." },
        { name: "aisdlc_get_context", text: "Fetch exactly the amount of context that fits a prompt, each passage carrying its citation." },
        { name: "aisdlc_read_page", text: "Read one complete page at its current version." },
      ],
      ruleNote: "The rule bundle is emitted by the server, never assembled by the client. If clients assembled rules themselves, two machines on two client versions would believe different laws — and a law that differs per machine is not a law. The bundle also reports completeness (COMPLETE / PARTIAL / UNCONFIGURED) so the AI can tell \"no law applies\" from \"nobody configured the law\".",
    },
    pitfalls: {
      eyebrow: "COMMON PITFALLS",
      title: "Symptoms and their real causes.",
      lead: "Most \"the system is broken\" moments are one of these.",
      rows: [
        { symptom: "Every screen is empty.", cause: "ORG / PROJECT not selected and Apply scope not pressed." },
        { symptom: "Policy or constitution created but has no effect.", cause: "Activate was not pressed." },
        { symptom: "Validation reports a missing kit.", cause: "The kit was never pinned to the project; the system deliberately never guesses a default." },
        { symptom: "Waiting forever for a validation run to appear.", cause: "No UI button can create one — runs come from the CLI." },
        { symptom: "Member invitations fail.", cause: "Subject must be a Keycloak UUID, not an email address." },
        { symptom: "Search returns nothing.", cause: "Keyword search is literal and diacritic-aware but not semantic — try fewer, exact words." },
        { symptom: "\"Keycloak session needs renewal\".", cause: "The OIDC session expired; press Đăng nhập lại." },
      ],
    },
    local: {
      eyebrow: "LOCAL DEVELOPMENT",
      title: "Run the whole platform on your machine.",
      lead: "The Compose topology brings up Keycloak, PostgreSQL, MinIO, the management server, and the portal in one command.",
      steps: [
        { no: "01", text: "Copy .env.example to .env and replace every development-only secret." },
        { no: "02", text: "Run docker compose up --build to start the local topology." },
        { no: "03", text: "Open http://localhost:8080; Keycloak lives behind the identity gateway at http://auth.localhost:8180." },
        { no: "04", text: "Run mvn test at the repository root for the server, portal, and Java SDK; cd cli && go test ./... for the validator." },
        { no: "05", text: "Verify the TypeScript SDK with cd sdk/typescript && npm ci --ignore-scripts && npm run build && npm test." },
      ],
      realCmds: [
        { cmd: "scripts/integration-smoke.sh", note: "Full Compose topology driven through one governed project: organization → project → repository link → validation evidence → policy bundle → approval quorum → signed webhook → release provenance → audit-chain verification. 32 assertions." },
        { cmd: "scripts/verify-recovery.sh", note: "Migrates a disposable database, writes a chained ledger, restores it, and requires the restored chain to recompute to the same head digest — then tampers with a row to prove the check detects it. 10 assertions." },
      ],
    },
    close: "GOVERNANCE BOUNDARY",
    closeText: "Screenshots in this repository are real runtime evidence only; login states are never staged. Evidence that enters the ledger must come from an actual run — the platform does not let anyone type a finding into existence.",
  },
  vi: {
    eyebrow: "04 / HƯỚNG DẪN SỬ DỤNG / TỪ LẦN ĐĂNG NHẬP ĐẦU ĐẾN AI ĐƯỢC KẾT NỐI",
    title: "Cách vận hành nền tảng AI-SDLC.",
    lead: "Tài liệu này trả lời đúng một câu hỏi: đăng nhập vào rồi thì làm gì? Mọi bước dưới đây được đối chiếu với code thật của repository.",
    rules: {
      label: "LUẬT CHƠI",
      items: [
        { no: "01", title: "Thứ tự cấu hình là bắt buộc.", text: "Không có tổ chức thì không tạo được dự án; không ghim Spec Kit thì xác thực không chạy. Trang tổng quan hiện checklist các bước kèm trạng thái thật — bấm vào bước chưa xong sẽ nhảy thẳng tới chỗ đó." },
        { no: "02", title: "Mọi màn hình phụ thuộc phạm vi đang chọn.", text: "Thanh chọn ORG / PROJECT ở đầu trang quyết định bạn thấy gì. Chưa chọn và chưa bấm Apply scope thì phần lớn màn hình trống — đó là đúng, không phải lỗi." },
        { no: "03", title: "Portal chỉ đọc và quyết định; không nhập bằng chứng.", text: "Bằng chứng xác thực vào hệ thống bằng CLI hoặc webhook SCM. Không có nút \"chạy xác thực\" nào trên giao diện, có chủ đích: bằng chứng phải sinh ra từ một lần chạy thật, không gõ tay." },
      ],
    },
    roles: {
      label: "QUYỀN HẠN TỪNG VAI TRÒ",
      items: [
        { role: "admin", desc: "Tạo tổ chức, đăng ký Spec Kit, kích hoạt constitution và policy. Các bước định hình mô hình quản trị chỉ dành cho admin.", perms: "Tạo tổ chức · Đăng ký Spec Kit · Kích hoạt constitution · Kích hoạt policy" },
        { role: "developer", desc: "Đẩy bằng chứng xác thực từ CLI cục bộ lên nền tảng. Không cần quyền portal để nạp dữ liệu vào hệ thống.", perms: "Đẩy evidence từ CLI · Sync validation" },
        { role: "reviewer", desc: "Đọc findings, làm việc với review queue và đưa ra quyết định APPROVED / REJECTED chặn release.", perms: "Rà findings · Quorum phê duyệt · Quyết định release" },
      ],
    },
    config: {
      eyebrow: "BƯỚC 01",
      title: "Cấu hình nền tảng trong tám bước.",
      lead: "Thứ tự là cố định. Bước sau sẽ im lặng thất bại nếu bước trước chưa tồn tại, nên lần đầu hãy làm từ trên xuống.",
      note: "Bước 1, 5, 7, 8 cần vai trò admin. Máy chủ còn kiểm tra thành viên dự án ngoài vai trò realm — developer có quyền tổ chức vẫn không đọc được dự án mình không phải thành viên.",
      steps: [
        { no: "01", title: "Tạo tổ chức.", text: "Form tạo tổ chức nằm trong trang Projects." },
        { no: "02", title: "Chọn phạm vi.", text: "Chọn ORG rồi PROJECT ở thanh đầu trang và bấm Apply scope." },
        { no: "03", title: "Tạo dự án.", text: "Slug dự án chỉ gồm a-z, 0-9 và dấu gạch nối." },
        { no: "04", title: "Mời thành viên.", text: "Trường Subject nhận UUID người dùng Keycloak — không phải email. Lấy trong Keycloak admin console." },
        { no: "05", title: "Đăng ký Spec Kit.", text: "Dán manifest JSON của kit vào Spec Kit registry. {} rỗng là hợp lệ để bắt đầu. Layer: CORE, EXTENSION, PRESET, OVERRIDE." },
        { no: "06", title: "Ghim kit vào dự án.", text: "Cần chọn scope dự án trước. Precedence từ 0 đến 10000." },
        { no: "07", title: "Viết constitution.", text: "Tạo xong phải bấm Activate — constitution chưa kích hoạt không có tác dụng gì." },
        { no: "08", title: "Viết các policy.", text: "Mỗi policy cũng phải được Activate riêng." },
      ],
    },
    cli: {
      eyebrow: "BƯỚC 09",
      title: "Đưa dữ liệu vào bằng CLI.",
      lead: "API quản trị cố ý không nghe trên host. Chạy validator trong mạng Compose, rồi init, validate và sync cho dự án.",
      note: "Xác thực không gọi mô hình; bản ghim mô hình chỉ được lưu làm xuất xứ. Sau khi sync, dữ liệu xuất hiện ở Validations, Traceability và Quality.",
      command: `docker run --rm --network ai-sdlc_platform -v "$PWD:/w" -w /w/cli golang:1.24 \\
  go run ./cmd/aisdlc init --project <project-uuid> \\
  --api-url http://management-server:8081 \\
  --spec-dir ../my-project/spec-kit \\
  --kit-version core@1.0.0 \\
  --model provider/model@revision`,
      after: "Sau đó chạy validate và sync. Bộ acceptance sẽ fail nếu localhost:8081 trả lời — sự cô lập này có chủ đích.",
    },
    evidence: {
      eyebrow: "SAU KHI CÓ DỮ LIỆU",
      title: "Đọc những gì hệ thống đã ghi.",
      lead: "Bốn màn hình tạo thành vòng vận hành một khi bằng chứng đã vào nền tảng.",
      items: [
        { icon: "layers", title: "Validations", text: "Xem từng lần chạy và phân loại từng finding. FALSE_POSITIVE và ACCEPTED_RISK đều bắt buộc có lý do — không sửa cũng là một quyết định phải được ghi lại." },
        { icon: "database", title: "Evidence repository", text: "Tải hiện vật lên và khoá bằng retention key governance hoặc compliance. Máy chủ tự tính SHA-256 và đối chiếu với digest bạn gửi." },
        { icon: "users", title: "Review queue", text: "Tạo mục rà soát và đưa ra quyết định APPROVED hoặc REJECTED mà release gate tiêu thụ." },
        { icon: "shield", title: "Audit ledger", text: "Chuỗi băm chỉ-ghi-thêm, kèm nút kiểm tra tính toàn vẹn bằng một cú nhấp." },
      ],
    },
    knowledge: {
      eyebrow: "KHO TÀI LIỆU",
      title: "Đưa tài liệu dự án cho AI.",
      lead: "Kho tài liệu là nơi tài liệu dự án được lưu để AI trợ lý đọc được và trích dẫn đúng mục.",
      para: "Tìm kiếm khớp từ khoá và bỏ dấu tiếng Việt — gõ \"tiep nhan\" vẫn ra \"tiếp nhận\". Kết quả trả về từng đoạn kèm đường dẫn tiêu đề để trích dẫn rơi đúng mục.",
      exportCmd: `python3 scripts/workbook-to-pages.py <file.xlsx> --space-key DOCS \\
  --parent-slug workbook-index --out pages.json`,
      exportNote: "Cố tình không nối mạng: lệnh ghi ra pages.json trước để tài liệu mật được xem lại trước khi bất cứ thứ gì được gửi đi. Thêm --preview nếu chỉ muốn xem cấu trúc.",
      importCmd: `bash scripts/import-pages.sh --payload pages.json \\
  --org <organization-uuid> --note "lý do lần nạp này"`,
      importNote: "Chạy lại lệnh import sẽ cập nhật trang đã có thành phiên bản mới kèm lý do — không nhân bản, không lỗi. Trang không đổi báo same và không ghi gì. Mỗi sheet thành một trang; mỗi dòng thành một mục con riêng để cột luôn tự mô tả.",
      searchNote: "Đây là tìm theo từ khoá, không theo ngữ nghĩa. Bản triển khai này không có embedding layer, nên câu hỏi diễn đạt khác tài liệu sẽ không khớp. Không có kết quả nghĩa là không từ nào trùng, không phải chủ đề không tồn tại.",
    },
    ai: {
      eyebrow: "AI TRÊN MÁY LẬP TRÌNH VIÊN",
      title: "Kết nối bất kỳ trợ lý nào hỗ trợ MCP.",
      lead: "Mỗi máy chỉ cài một thứ — binary aisdlc, cũng chạy được MCP server. Claude Code, Claude Desktop, Cursor, Windsurf đều dùng được.",
      loginCmd: "aisdlc login --token-url https://auth.example/realms/ai-sdlc/protocol/openid-connect/token --client-secret <secret>",
      mcpCmd: "claude mcp add aisdlc -- aisdlc mcp --api-url https://control.example.com --project <project-uuid>",
      tools: [
        { name: "aisdlc_get_rules", text: "Đọc luật: constitution đang hiệu lực, policy đang bật, Spec Kit đã ghim và các bất biến của nền tảng." },
        { name: "aisdlc_search_docs", text: "Tìm mục tài liệu, có bỏ dấu, kèm đường dẫn tiêu đề để trích dẫn." },
        { name: "aisdlc_get_context", text: "Lấy đúng lượng ngữ cảnh vừa prompt, mỗi đoạn có trích dẫn." },
        { name: "aisdlc_read_page", text: "Đọc trọn một trang ở phiên bản hiện tại." },
      ],
      ruleNote: "Bundle luật do server phát ra, không phải client tự ghép. Nếu client tự ghép, hai máy với hai phiên bản client sẽ tin hai bộ luật khác nhau — luật khác nhau theo máy thì không còn là luật. Bundle cũng báo completeness (COMPLETE / PARTIAL / UNCONFIGURED) để AI phân biệt \"không có luật nào áp dụng\" với \"chưa ai cấu hình luật\".",
    },
    pitfalls: {
      eyebrow: "LỖI THƯỜNG GẶP",
      title: "Hiện tượng và nguyên nhân thật.",
      lead: "Hầu hết khoảnh khắc \"hệ thống hỏng rồi\" thuộc một trong các trường hợp này.",
      rows: [
        { symptom: "Màn hình nào cũng trống.", cause: "Chưa chọn ORG / PROJECT và chưa bấm Apply scope." },
        { symptom: "Tạo policy/constitution mà không thấy tác dụng.", cause: "Chưa bấm Activate." },
        { symptom: "Xác thực báo thiếu kit.", cause: "Kit chưa được ghim vào dự án; hệ thống cố ý không đoán bản mặc định." },
        { symptom: "Chờ mãi không thấy validation run.", cause: "Không có nút nào trên UI tạo được; run chỉ đến từ CLI." },
        { symptom: "Mời thành viên không được.", cause: "Subject phải là UUID Keycloak, không phải email." },
        { symptom: "Tìm tài liệu không ra.", cause: "Tìm theo từ khoá, chữ nào từ đó — thử ít từ hơn, đúng chữ trong tài liệu." },
        { symptom: "\"Phiên Keycloak cần được gia hạn\".", cause: "Phiên OIDC hết hạn; bấm Đăng nhập lại." },
      ],
    },
    local: {
      eyebrow: "PHÁT TRIỂN CỤC BỘ",
      title: "Chạy toàn bộ nền tảng trên máy bạn.",
      lead: "Topology Compose dựng Keycloak, PostgreSQL, MinIO, management server và portal chỉ bằng một lệnh.",
      steps: [
        { no: "01", text: "Copy .env.example thành .env và thay mọi secret chỉ dành cho development." },
        { no: "02", text: "Chạy docker compose up --build để khởi động topology cục bộ." },
        { no: "03", text: "Mở http://localhost:8080; Keycloak nằm sau identity gateway tại http://auth.localhost:8180." },
        { no: "04", text: "Chạy mvn test ở root repository cho server, portal và Java SDK; cd cli && go test ./... cho validator." },
        { no: "05", text: "Kiểm TypeScript SDK bằng cd sdk/typescript && npm ci --ignore-scripts && npm run build && npm test." },
      ],
      realCmds: [
        { cmd: "scripts/integration-smoke.sh", note: "Toàn topology Compose đi qua một dự án quản trị hoàn chỉnh: tổ chức → dự án → liên kết repository → evidence xác thực → bundle policy → quorum phê duyệt → webhook ký → provenance release → kiểm tra chuỗi audit. 32 assertion." },
        { cmd: "scripts/verify-recovery.sh", note: "Di chuyển database dùng một lần, ghi ledger chuỗi, khôi phục sang database khác và yêu cầu chuỗi khôi phục tính lại ra cùng head digest — rồi làm giả một dòng để chứng minh kiểm tra phát hiện được. 10 assertion." },
      ],
    },
    close: "RANH GIỚI QUẢN TRỊ",
    closeText: "Ảnh chụp trong repository này chỉ là bằng chứng runtime thật; trạng thái đăng nhập không bao giờ được dựng sẵn. Bằng chứng vào ledger phải đến từ lần chạy thật — nền tảng không cho phép ai gõ một finding thành hiện hữu.",
  },
};

const iconOf: Record<string, typeof Layers> = { layers: Layers, database: Database, users: Users, shield: ShieldCheckIcon };

export default function Guide() { return <PortalShell route="guide">{(locale) => <GuideContent locale={locale} />}</PortalShell>; }

function GuideContent({ locale }: { locale: Locale }) {
  const t = copy[locale as "en" | "vi"];
  return (
    <div className="handbook-page">
            <Breadcrumb page="guide" />
      <section className="handbook-hero"><span className="handbook-grid" aria-hidden="true" /><div><div className="eyebrow"><i className="pulse-line" /> {t.eyebrow}</div><h1>{t.title}</h1><p>{t.lead}</p></div><aside className="quickstart-proof"><ShieldTraceMark decorative /><code>{locale === "en" ? "PLATFORM OPERATING MANUAL" : "CẨM NANG VẬN HÀNH"}</code><p>{locale === "en" ? "Every step below checked against the real repository code." : "Mọi bước dưới đây đối chiếu với code repository thật."}</p><div aria-label={locale === "en" ? "Login to evidence chain" : "Từ đăng nhập đến chuỗi evidence"}><span>LOGIN</span><i /><span>SCOPE</span><i /><span>VALIDATE</span><i /><span>RECORD</span></div><Settings2 size={19} /></aside></section>

      <div className="route-dossier-band"><span>04</span><i /><strong>{locale === "en" ? "USAGE / LOGIN → EVIDENCE" : "SỬ DỤNG / ĐĂNG NHẬP → EVIDENCE"}</strong><ShieldTraceMark decorative /><code><b className="verify-dot" /> OPERATING MANUAL</code></div>

      <section className="guide-rules" aria-label={t.rules.label}>
        <span className="mono-label">{t.rules.label}</span>
        <div>{t.rules.items.map((item) => <article key={item.no}><span>{item.no}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="guide-roles" aria-label={t.roles.label}>
        <span className="mono-label">{t.roles.label}</span>
        <div>{t.roles.items.map((item) => <article key={item.role}><code>ROLE / {item.role.toUpperCase()}</code><p>{item.desc}</p><strong>{item.perms}</strong></article>)}</div>
      </section>

      <section className="role-dossier" aria-label={t.config.title}>
        <header><code>{t.config.eyebrow}</code><h2>{t.config.title}</h2><p>{t.config.lead}</p><strong><CheckCircle2 size={16} /> {t.config.note}</strong></header>
        <div className="role-steps">{t.config.steps.map((item) => <article key={item.no}><span>{item.no}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
      </section>

      <section className="role-dossier" aria-label={t.cli.title}>
        <header><code>{t.cli.eyebrow}</code><h2>{t.cli.title}</h2><p>{t.cli.lead}</p><strong><CheckCircle2 size={16} /> {t.cli.note}</strong></header>
        <div className="role-steps"><article><span>CLI</span><div><h3>{locale === "en" ? "Initialize the project in the Compose network" : "Khởi tạo dự án trong mạng Compose"}</h3><pre><code>{t.cli.command}</code></pre><p>{t.cli.after}</p></div></article></div>
      </section>

      <section className="guide-evidence" aria-label={t.evidence.title}>
        <span className="mono-label">{t.evidence.eyebrow}</span><h2>{t.evidence.title}</h2><p className="guide-lead">{t.evidence.lead}</p>
        <div>{t.evidence.items.map((item) => <article key={item.icon}><span aria-hidden="true">{(() => { const Icon = iconOf[item.icon]; return Icon ? <Icon size={18} /> : null; })()}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="role-dossier" aria-label={t.knowledge.title}>
        <header><code>{t.knowledge.eyebrow}</code><h2>{t.knowledge.title}</h2><p>{t.knowledge.lead}</p></header>
        <div className="role-steps">
          <article><span>01</span><div><h3>{locale === "en" ? "Export the workbook offline" : "Xuất workbook offline"}</h3><pre><code>{t.knowledge.exportCmd}</code></pre><p>{t.knowledge.exportNote}</p></div></article>
          <article><span>02</span><div><h3>{locale === "en" ? "Import after review" : "Nạp sau khi đã xem lại"}</h3><pre><code>{t.knowledge.importCmd}</code></pre><p>{t.knowledge.importNote}</p></div></article>
          <article><span>03</span><div><h3>{locale === "en" ? "Search as it really works" : "Tìm kiếm hoạt động đúng như thế"}</h3><p>{t.knowledge.para}</p><p>{t.knowledge.searchNote}</p></div></article>
        </div>
      </section>

      <section className="role-dossier" aria-label={t.ai.title}>
        <header><code>{t.ai.eyebrow}</code><h2>{t.ai.title}</h2><p>{t.ai.lead}</p></header>
        <div className="role-steps">
          <article><span>01</span><div><h3>{locale === "en" ? "Log the binary into the realm" : "Đăng nhập binary vào realm"}</h3><pre><code>{t.ai.loginCmd}</code></pre></div></article>
          <article><span>02</span><div><h3>{locale === "en" ? "Register the MCP server" : "Đăng ký MCP server"}</h3><pre><code>{t.ai.mcpCmd}</code></pre></div></article>
          <article><span>03</span><div><h3>{locale === "en" ? "Four tools the assistant receives" : "Bốn công cụ trợ lý nhận được"}</h3>
            <div className="guide-tools">{t.ai.tools.map((tool) => <div key={tool.name}><code>{tool.name}</code><p>{tool.text}</p></div>)}</div>
            <p>{t.ai.ruleNote}</p></div></article>
        </div>
      </section>

      <section className="guide-pitfalls" aria-label={t.pitfalls.title}>
        <span className="mono-label">{t.pitfalls.eyebrow}</span><h2>{t.pitfalls.title}</h2><p className="guide-lead">{t.pitfalls.lead}</p>
        <div>{t.pitfalls.rows.map((row) => <article key={row.symptom}><CircleAlert size={16} /><div><h3>{row.symptom}</h3><p>{row.cause}</p></div></article>)}</div>
      </section>

      <section className="role-dossier" aria-label={t.local.title}>
        <header><code>{t.local.eyebrow}</code><h2>{t.local.title}</h2><p>{t.local.lead}</p></header>
        <div className="role-steps">
          <article><span>ENV</span><div>{t.local.steps.map((item) => <p key={item.no}><strong>{item.no}</strong> {item.text}</p>)}</div></article>
          <article><span>REAL</span><div><h3>{locale === "en" ? "Runs that actually find defects" : "Các lần chạy thật tìm ra khiếm khuyết"}</h3>{t.local.realCmds.map((item) => <div key={item.cmd}><pre><code>{item.cmd}</code></pre><p>{item.note}</p></div>)}</div></article>
        </div>
      </section>

      <section className="control-boundary"><ShieldCheck size={20} /><div><span className="mono-label">{t.close}</span><p>{t.closeText}</p></div></section>
    </div>
  );
}
