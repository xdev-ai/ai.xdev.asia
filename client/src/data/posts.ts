/* xDev AI blog: bilingual (EN/VI) article data.
   Slugs are locale-independent; each article carries both language variants. */

export type Post = {
  slug: string;
  dateISO: string;
  tags: string[];
  draft: boolean;
  en: {
    title: string;
    summary: string;
    readingMinutes: number;
    sections: { heading: string; body: string }[];
  };
  vi: {
    title: string;
    summary: string;
    readingMinutes: number;
    sections: { heading: string; body: string }[];
  };
};

export const posts: Post[] = [
  {
    slug: "why-governance-beats-prompts",
    dateISO: "2026-08-10",
    tags: ["AI-SDLC", "Governance", "Policy-as-data"],
    draft: false,
    en: {
      title: "Why governance beats prompts: moving AI policy from chat memory to versioned data",
      summary:
        "Prompt reminders fail silently. xDev AI turns delivery policy into versioned YAML, enforced by a closed validation engine, so every AI change ships with proof instead of promises.",
      readingMinutes: 6,
      sections: [
        {
          heading: "The problem with prompt-based policy",
          body: "Most teams run AI agents with rules written in natural language: \u201Cpin the model when you launch\u201D, \u201Cdon't run bare\u201D, \u201Clink your changes to a requirement\u201D. The rules live in chat memory, in a README, in a shared doc nobody re-reads. Every session can forget them, and no commit carries evidence that the rule was followed. Governance that depends on memory is not governance.",
        },
        {
          heading: "Policy as data, enforced by a closed engine",
          body: "AI-SDLC freezes policy as versioned YAML rule packs loaded by a Rust validation engine with a closed set of check kinds. Adding a rule needs no engine change; adding a check kind does, and that change goes through the same review as law itself. The engine accepts exactly the declared checks, so semantics can never silently no-op between \u201Claw\u201D and \u201Cmachine\u201D.",
        },
        {
          heading: "Evidence trace from requirement to release",
          body: "Validation and approval are outputs of the delivery process, not retrospective reconstruction. Every artifact joins a trace graph: requirements refine specs, branches are verified by tests, tests track tasks. When something breaks, the audit is a ledger lookup, not chat-history archaeology.",
        },
        {
          heading: "What this means for your team",
          body: "Nothing about AI-SDLC prevents AI from drafting code, specs or configs. It moves the AI outside the decision path: the agent may propose, but policy, validation and release evidence still require explicit artifacts that are reviewed and consistently enforced, on local workspaces, GitLab CI and GitHub Actions alike.",
        },
      ],
    },
    vi: {
      title: "Vì sao governance thắng prompt: đưa policy AI từ ký ức chat thành data có version",
      summary:
        "Prompt nhắc nhở thất bại một cách thầm lặng. xDev AI đóng băng policy delivery thành YAML có version, thực thi bởi validation engine đóng, để mỗi AI change đi kèm bằng chứng thay vì lời hứa.",
      readingMinutes: 6,
      sections: [
        {
          heading: "Vấn đề của policy bằng prompt",
          body: "Hầu hết các team chạy AI agent với luật viết bằng ngôn ngữ tự nhiên: \u201Cpin model khi khởi chạy\u201D, \u201Ckhông chạy bare\u201D, \u201Cliên kết change với requirement\u201D. Luật nằm trong ký ức chat, trong README, trong tài liệu chung không ai đọc lại. Mỗi session có thể quên chúng, và không commit nào mang bằng chứng luật đã được tuân thủ. Governance phụ thuộc vào ký ức không phải là governance.",
        },
        {
          heading: "Policy là data, thực thi bởi engine đóng",
          body: "AI-SDLC đóng băng policy thành rule packs YAML có version, được load bởi validation engine Rust với tập check kinds khép kín. Thêm rule không cần thay engine; thêm check kind thì có, và thay đổi đó đi qua review như chính luật. Engine nhận đúng tập check đã khai báo, nên semantic không thể âm thầm no-op giữa \u201Cluật\u201D và \u201Cmáy\u201D.",
        },
        {
          heading: "Evidence trace từ requirement đến release",
          body: "Validation và approval là output của quy trình delivery, không phải dựng lại hồi tố. Mỗi artifact đi vào trace graph: requirement refine spec, branch được verify bởi test, test track task. Khi có lỗi, audit là một lần tra cứu ledger, không phải khảo cổ chat history.",
        },
        {
          heading: "Ý nghĩa cho đội của bạn",
          body: "Không gì trong AI-SDLC ngăn AI draft code, spec hay config. Nó đưa AI ra ngoài decision path: agent có thể đề xuất, nhưng policy, validation và release evidence vẫn cần artifact tường minh, được review và enforce nhất quán, trên local workspace, GitLab CI và GitHub Actions như nhau.",
        },
      ],
    },
  },
  {
    slug: "the-10-contract-check-kinds",
    dateISO: "2026-07-28",
    tags: ["AI-SDLC", "Spec Kit", "Contract"],
    draft: false,
    en: {
      title: "Ten contract check kinds: the grammar that keeps law and machine honest",
      summary:
        "Every check in an AI-SDLC rule pack must map to one of ten contract check kinds. This post explains the contract grammar, why unknown kinds are engine changes, and how this stops silent drift between policy and execution.",
      readingMinutes: 7,
      sections: [
        {
          heading: "The central contract",
          body: "Spec Kit defines a contract: ten check kinds the engine understands — spec structure, ID grammar, traceability, agent launch and more. A rule pack author declares checks against this grammar. The engine validates them deterministically. Neither side can invent new semantics quietly: unknown kinds are always engine changes, never silent no-ops.",
        },
        {
          heading: "Structure checks: the artifact must be legible",
          body: "Before meaning can be validated, form must be. Required frontmatter fields, regex field validation, required Markdown sections, and non-empty sections ensure every artifact is parseable by both humans and machines. An artifact that fails structure checks cannot even enter the trace graph.",
        },
        {
          heading: "ID grammar and graph edges: the artifact must belong",
          body: "Every artifact needs a unique ID that follows the grammar — and that ID must connect to something. Minimum trace edges, resolvable references: these are what turn a folder of Markdown into a queryable evidence graph. \u201CID follows artifact grammar\u201D and \u201CReference must resolve\u201D are invariants, not aspirations.",
        },
        {
          heading: "Agent launch: policy at the moment of risk",
          body: "The highest-risk moment is agent launch. AI-SDLC puts launch policy into a deterministic gate instead of a prompt reminder: pin the model, forbid bare runs. This is where governance earns its keep — not after an incident, but before the session starts.",
        },
        {
          heading: "Why ten, not twenty",
          body: "A closed set is the whole point. Ten kinds cover the invariants that matter; every extension forces an explicit engine change with schema and validator, which forces review. An open set invites drift: two tools agree on rule text but disagree on what it means. Law that cannot be executed identically everywhere is not law.",
        },
      ],
    },
    vi: {
      title: "Mười check kinds của contract: ngữ pháp giữ luật và máy trung thực",
      summary:
        "Mọi check trong rule pack của AI-SDLC phải map vào một trong mười check kinds của contract. Bài này giải thích ngữ pháp contract, vì sao unknown kinds là engine change, và cách nó ngăn drift ngầm giữa policy và execution.",
      readingMinutes: 7,
      sections: [
        {
          heading: "Contract trung tâm",
          body: "Spec Kit định nghĩa một contract: mười check kinds mà engine hiểu — spec structure, ID grammar, traceability, agent launch và hơn thế. Tác giả rule pack khai báo checks theo ngữ pháp này. Engine validate chúng một cách deterministic. Không bên nào có thể sáng tạo semantic mới một cách âm thầm: unknown kinds luôn là engine change, không bao giờ là silent no-ops.",
        },
        {
          heading: "Structure checks: artifact phải đọc được",
          body: "Trước khi validate ý nghĩa, hình thức phải đúng. Frontmatter bắt buộc, validate field theo regex, section Markdown bắt buộc, section không được rỗng — đảm bảo mỗi artifact parse được bởi cả người và máy. Artifact fail structure checks thậm chí không vào được trace graph.",
        },
        {
          heading: "ID grammar và graph edges: artifact phải thuộc về graph",
          body: "Mỗi artifact cần một ID duy nhất đúng grammar — và ID đó phải kết nối với cái gì đó. Số cạnh trace tối thiểu, reference phải resolve: đó là thứ biến một thư mục Markdown thành evidence graph có thể truy vấn. \u201CID đúng artifact grammar\u201D và \u201CReference phải resolve\u201D là bất biến, không phải nguyện vọng.",
        },
        {
          heading: "Agent launch: policy tại thời điểm rủi ro nhất",
          body: "Thời điểm rủi ro nhất là lúc khởi chạy agent. AI-SDLC đưa launch policy vào deterministic gate thay vì prompt reminder: pin model, cấm chạy bare. Đây là nơi governance chứng minh giá trị — không phải sau incident, mà trước khi session bắt đầu.",
        },
        {
          heading: "Vì sao mười, không hai mươi",
          body: "Tập đóng là toàn bộ ý nghĩa. Mười kinds cover các invariant quan trọng; mỗi mở rộng buộc engine change tường minh kèm schema và validator, buộc phải review. Tập mở mời drift: hai tool đồng ý trên văn bản rule nhưng bất đồng về ý nghĩa. Luật không thể thực thi giống nhau ở mọi nơi thì không phải là luật.",
        },
      ],
    },
  },
  {
    slug: "umbrella-brand-product-fit",
    dateISO: "2026-07-15",
    tags: ["xDev AI", "Organization", "Brand"],
    draft: false,
    en: {
      title: "Umbrella brands and product fit: how one domain can host many governed products",
      summary:
        "How xDev AI is organized: ai.xdev.asia is the umbrella, each product gets a path. One shared rulebook, one public record, and product-fit tests that keep the umbrella honest as new products join.",
      readingMinutes: 5,
      sections: [
        {
          heading: "The umbrella pattern",
          body: "xDev AI is not a single product — it is an open engineering organization. ai.xdev.asia hosts the umbrella, and each product plugs in at its own path: AI-SDLC at /ai-sdlc, Trace Ledger at /trace-ledger. The umbrella page must stay neutral toward any single product so future products join as siblings, never as afterthoughts.",
        },
        {
          heading: "One rulebook, many products",
          body: "Every product under the umbrella shares the same principles: policy as data, closed execution, evidence retained, audit-ready by default. These are not marketing lines — they are enforced constraints that any product in the org must satisfy before it ships.",
        },
        {
          heading: "Public record as the source of truth",
          body: "Every public record lives at github.com/xdev-ai. The umbrella domain presents; the repository proves. Nothing is announced on the site that is not committed in the org: that discipline is what makes the record verifiable.",
        },
        {
          heading: "The product-fit test",
          body: "Each page carries a product-fit note: does this product still fit the umbrella as the org grows? When Trace Ledger was added, the umbrella landing was checked for neutrality — no product may monopolize the narrative. The test runs every time a product ships or a principle evolves.",
        },
      ],
    },
    vi: {
      title: "Umbrella brand và product fit: một domain có thể chứa nhiều sản phẩm có governance",
      summary:
        "xDev AI được tổ chức thế nào: ai.xdev.asia là umbrella, mỗi sản phẩm có một path riêng. Một rulebook chung, một public record, và product-fit tests giữ umbrella trung thực khi sản phẩm mới gia nhập.",
      readingMinutes: 5,
      sections: [
        {
          heading: "Mô hình umbrella",
          body: "xDev AI không phải một sản phẩm — nó là một tổ chức engineering mở. ai.xdev.asia là umbrella, và mỗi sản phẩm cắm vào path riêng: AI-SDLC tại /ai-sdlc, Trace Ledger tại /trace-ledger. Trang umbrella phải trung lập với mọi sản phẩm để sản phẩm tương lai gia nhập như anh em, không phải như ý nghĩ sau cùng.",
        },
        {
          heading: "Một rulebook, nhiều sản phẩm",
          body: "Mọi sản phẩm dưới umbrella chia sẻ cùng nguyên tắc: policy là data, thực thi khép kín, evidence được giữ lại, audit-ready mặc định. Đây không phải slogan marketing — chúng là ràng buộc thực thi mà bất kỳ sản phẩm nào trong org phải thỏa mãn trước khi ship.",
        },
        {
          heading: "Public record là nguồn chân lý",
          body: "Mọi public record nằm tại github.com/xdev-ai. Umbrella domain trình bày; repository chứng minh. Không gì được công bố trên site mà chưa được commit trong org: kỷ luật đó là thứ làm record kiểm chứng được.",
        },
        {
          heading: "Product-fit test",
          body: "Mỗi trang mang một ghi chú product-fit: sản phẩm này còn fit umbrella khi org lớn lên không? Khi Trace Ledger được thêm vào, landing umbrella được kiểm tra tính trung lập — không sản phẩm nào được độc quyền narrative. Test chạy mỗi lần một sản phẩm ship hoặc một nguyên tắc thay đổi.",
        },
      ],
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && !p.draft);
}
