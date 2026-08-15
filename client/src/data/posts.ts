/* xDev AI blog: bilingual (EN/VI) article data.
   Slugs are locale-independent; each article carries both language variants,
   a cover image, and optional in-body illustrations. */

export type Section = {
  heading: string;
  body: string;
  image?: { src: string; alt: string };
};

export type ArticleMeta = {
  title: string;
  summary: string;
  readingMinutes: number;
  sections: Section[];
};

export type FaqItem = { q: { en: string; vi: string }; a: { en: string; vi: string } };

export type Post = {
  slug: string;
  dateISO: string;
  tags: string[];
  draft: boolean;
  cover: string;
  coverAlt: { en: string; vi: string };
  faq?: FaqItem[];
  en: ArticleMeta;
  vi: ArticleMeta;
};

const BASE = "/blog/";

export const posts: Post[] = [
  {
    slug: "what-is-ai-sdlc",
    dateISO: "2026-08-16",
    tags: ["AI-SDLC", "Governance", "Definition"],
    draft: false,
    cover: `${BASE}cover-what-is-ai-sdlc.jpg`,
    coverAlt: {
      en: "Illustration: three competing meanings of \u201CAI SDLC\u201D on the SERP, converging into a fourth governed interpretation: spec-driven, policy-gated, evidence-based delivery.",
      vi: "Minh họa: ba nghĩa cạnh tranh của \u201CAI SDLC\u201D trên SERP, hội tụ về nghĩa thứ tư có governance: delivery spec-driven, policy-gated, evidence-based.",
    },
    faq: [
      {
        q: {
          en: "What is AI-SDLC?",
          vi: "AI-SDLC là gì?",
        },
        a: {
          en: "AI-SDLC is a governed AI-assisted software delivery lifecycle: specifications are versioned data, validation runs as a deterministic policy gate, and every decision leaves retained evidence from intent to release. It keeps AI outside the decision path — AI may draft, but policy and proof are explicit, versioned artifacts.",
          vi: "AI-SDLC là chu trình delivery phần mềm AI-assisted có governance: spec là data có version, validation chạy như một policy gate deterministic, và mọi decision để lại evidence được giữ từ intent đến release. Nó giữ AI ngoài decision path — AI được draft, nhưng policy và proof là các artifact rõ ràng, có version.",
        },
      },
      {
        q: {
          en: "How is AI-SDLC different from MLOps?",
          vi: "AI-SDLC khác MLOps như thế nào?",
        },
        a: {
          en: "MLOps governs machine learning systems — data, models, evaluation and monitoring. AI-SDLC governs software delivery where AI writes the code: spec grammar, policy gates, and trace evidence for AI-generated changes. They are complementary layers that meet at validation: an ML product delivered by AI agents still needs governed delivery.",
          vi: "MLOps governance hệ thống machine learning — data, model, evaluation và monitoring. AI-SDLC governance software delivery khi AI viết code: spec grammar, policy gates, và trace evidence cho các change do AI sinh ra. Hai layer bổ sung cho nhau và gặp nhau ở validation: một sản phẩm ML được AI agents delivery vẫn cần delivery có governance.",
        },
      },
      {
        q: {
          en: "Why is policy-as-data better than prompts for governing AI coding?",
          vi: "Vì sao policy-as-data tốt hơn prompt cho việc governance AI coding?",
        },
        a: {
          en: "Prompts are non-versioned, non-deterministic and silently degradable: a model update or context change can break a rule nobody knew existed. Policy-as-data is versioned YAML reviewed like code, enforced by a closed engine with a fixed set of check kinds, and produces retained evidence per check. Rules become auditable law instead of wishes.",
          vi: "Prompt không có version, không deterministic và suy giảm thầm lặng: một model update hay context change có thể phá rule mà không ai biết nó tồn tại. Policy-as-data là YAML có version được review như code, enforced bởi engine đóng với bộ check kinds cố định, và sinh evidence giữ lại cho từng check. Rule trở thành luật audit được thay vì điều ước.",
        },
      },
      {
        q: {
          en: "Can AI-SDLC run on GitHub Actions and GitLab CI?",
          vi: "AI-SDLC chạy được trên GitHub Actions và GitLab CI không?",
        },
        a: {
          en: "Yes. The policy engine is a deterministic Rust CLI that resolves versioned YAML rule packs at runtime — no recompile needed to change policy. The same gate runs identically in local workspaces, CI pipelines and review surfaces, which is what makes the evidence portable across vendors.",
          vi: "Có. Policy engine là CLI Rust deterministic resolve YAML rule packs có version lúc runtime — không cần recompile để đổi policy. Cùng một gate chạy giống hệt nhau trong local workspace, CI pipeline và review surfaces, chính điều đó làm evidence portable giữa các vendor.",
        },
      },
    ],
    en: {
      title: "What is AI-SDLC: four meanings on Google, one governed answer",
      summary:
        "Search \u201CAI SDLC\u201D today and you get three different concepts: AI in the SDLC, the lifecycle of AI systems, and agentic SDLC security. The fourth interpretation — spec-driven, policy-gated, evidence-based delivery — is the one no vendor owns yet. This article maps all four and argues why the governed one matters most.",
      readingMinutes: 12,
      sections: [
        {
          heading: "The answer in one paragraph",
          body: "AI-SDLC, in the interpretation this article defends, is a governed AI-assisted software delivery lifecycle: intent becomes versioned specification, AI drafts inside a pinned workspace, every deliverable passes through a deterministic policy gate that checks a closed set of rule kinds, and the approval chain is retained as traceable evidence from decision to release. AI is welcome to do most of the writing — it is kept out of the decision path. Compared to the three definitions currently competing on Google's first page, this is the only one that answers the enterprise question nobody else addresses: not \u201Cwhat can AI write?\u201D but \u201Cwhat can you prove about what AI wrote?\u201D",
          image: {
            src: `${BASE}inline-four-meanings.jpg`,
            alt: "Diagram: four interpretations of AI SDLC — AI-in-SDLC tooling, AI-system lifecycle, agentic SDLC, and governed spec-driven delivery — converging into the xDev AI interpretation.",
          },
        },
        {
          heading: "Three meanings fight on Google's first page",
          body: "Run the query today and the SERP splits into three camps, each with heavyweight publishers. The first camp — IBM, CircleCI, Microsoft, PwC — reads the phrase as \u201CAI in the SDLC\u201D: existing lifecycle stages (requirements, build, test, deploy) augmented by AI tooling. These are vendor pillar pages, useful overviews that always end by pointing back to the publisher's platform. The second camp — agency guides from XeTriva, HTEC and similar — reads it as the lifecycle of AI systems: data, model training, evaluation and monitoring, essentially MLOps under a new label. The third camp — SonarSource, Cycode, Secure Code Warrior — reads it as agentic SDLC: autonomous coding agents and the security risks of letting them plan, write and ship. Each camp is legitimate; each camp talks past the other. A reader searching \u201CAI SDLC\u201D in 2026 cannot know which world they will land in.",
        },
        {
          heading: "A comparison of the three camps",
          body: "The table below compresses what each camp means, who owns the content, and what the definition leaves out. Note the shared blind spot: all three assume that if AI can produce the artifact, the organization can trust it — and only the third camp even asks what happens when it cannot. The \u201Cwhat counts as proof\u201D column is nearly empty across the entire first page, which is precisely the gap this article fills.",
        },
        {
          heading: "The fourth meaning: governed AI-assisted delivery",
          body: "The fourth interpretation treats \u201CAI-SDLC\u201D as a proper noun for a specific delivery architecture. Its first principle is that AI drafts but never decides: specifications are typed, versioned data that humans review; policy is frozen as versioned YAML rule packs rather than scattered through prompts; validation runs on a closed engine whose check kinds are finite and explicit — an unknown rule is an engine change, never a silent no-op; and evidence is retained, not reconstructed, so that an auditor six months later sees who decided, under which rule, at which version, and where the proof sits. This is the interpretation productized by xDev AI's AI-SDLC platform, running the same gate on GitLab CI and GitHub Actions.",
          image: {
            src: `${BASE}inline-ai-sdlc-la-gi-ladder.jpg`,
            alt: "Diagram: the five-rung governed ladder from versioned spec, through AI-assisted drafting and the policy gate, to retained evidence and a shielded release.",
          },
        },
        {
          heading: "Why the governed interpretation is the one that will age best",
          body: "Two structural facts favor the fourth meaning. First, the adoption numbers guarantee the trust question: industry surveys put AI tool usage among developers at 84%, with AI generating an estimated 30–70% of committed code, and research consistently finds AI-generated code carrying measurable vulnerability rates — studies of LLM-generated code report between roughly 10% and 42% vulnerable samples depending on the task, and a large analysis of production repositories found over 110,000 surviving AI-introduced issues. At those volumes, \u201Cdid a human review it?\u201D stops being answerable and \u201Cwhat does the record show?\u201D starts being mandatory. Second, regulation is arriving on a schedule: the EU AI Act's high-risk obligations take effect from August 2026 with fines up to EUR 15 million or 3% of global turnover, and compliance teams will need exactly the kind of retained, version-linked evidence the governed interpretation produces by default. The vendor camps will keep describing capability; the governed camp describes what survives an audit.",
        },
        {
          heading: "How the four meanings relate rather than contradict",
          body: "The interpretations are not enemies — they are layers. An enterprise running MLOps (camp two) deploys models through pipelines that somebody must govern (camp one), increasingly staffed by agents (camp three), and every artifact moving through that stack benefits from spec grammar, policy gates and retained evidence (camp four). The governed interpretation is the layer that makes the other three accountable: agentic workflows are where the trust gap is widest, ML delivery is where the evidence requirement is hardest, and AI-augmented tooling is where drift is quietest. A reader who understands all four meanings can ask better questions of every vendor — including, eventually, of this one. That is the point of an open record: the claims here trace to versioned policy in a public repository, not to a marketing page.",
        },
        {
          heading: "Where to go from here",
          body: "Each layer deserves a deeper read. For the decision mechanics behind keeping AI outside the decision path, the article on why governance beats prompts explains why versioned YAML wins over prompt-based rules. For the check kinds that make a policy gate deterministic, the article on the ten contract check kinds walks through the closed set. For how this lifecycle sits inside a full delivery cycle from idea to monitoring, the article on where xDev AI sits in the full cycle maps the junction. And for a Vietnamese-language treatment of the same material, the article AI SDLC là gì covers the governed interpretation natively.",
        },
      ],
    },
    vi: {
      title: "AI-SDLC là gì: bốn nghĩa trên Google, một câu trả lời có governance",
      summary:
        "Search \u201CAI SDLC\u201D hôm nay ra ba khái niệm khác nhau: AI trong SDLC, lifecycle của hệ thống AI, và agentic SDLC security. Nghĩa thứ tư — delivery spec-driven, policy-gated, evidence-based — là nghĩa chưa vendor nào chiếm. Bài này map cả bốn và lập luận vì sao nghĩa có governance quan trọng nhất.",
      readingMinutes: 12,
      sections: [
        {
          heading: "Câu trả lời trong một đoạn",
          body: "AI-SDLC, theo nghĩa bài này bảo vệ, là chu trình delivery phần mềm AI-assisted có governance: intent trở thành spec có version, AI draft trong workspace đã pin, mọi deliverable đi qua policy gate deterministic kiểm tra một closed set các loại rule, và chuỗi approval được giữ làm evidence traceable từ decision đến release. AI được welcome làm phần lớn việc viết — nhưng bị giữ ngoài decision path. So với ba định nghĩa đang cạnh tranh trên trang nhất Google, đây là nghĩa duy nhất trả lời câu hỏi enterprise mà không ai khác đụng tới: không phải \u201CAI viết được gì?\u201D mà là \u201Cbạn chứng minh được gì về điều AI đã viết?\u201D",
          image: {
            src: `${BASE}inline-four-meanings.jpg`,
            alt: "Sơ đồ: bốn cách hiểu AI SDLC — AI-in-SDLC tooling, AI-system lifecycle, agentic SDLC, và governed spec-driven delivery — hội tụ về cách hiểu của xDev AI.",
          },
        },
        {
          heading: "Ba nghĩa đánh nhau trên trang nhất Google",
          body: "Chạy query hôm nay, SERP chia ba phe, mỗi phe có publisher hạng nặng. Phe một — IBM, CircleCI, Microsoft, PwC — đọc cụm từ là \u201CAI trong SDLC\u201D: các giai đoạn lifecycle truyền thống (requirements, build, test, deploy) được AI tooling augment. Đây là vendor pillar pages, overview hữu ích nhưng luôn kết thúc bằng trỏ về platform của publisher. Phe hai — agency guide từ XeTriva, HTEC — đọc nó là lifecycle của hệ thống AI: data, model training, evaluation và monitoring, về bản chất là MLOps khoác nhãn mới. Phe ba — SonarSource, Cycode, Secure Code Warrior — đọc nó là agentic SDLC: coding agents tự hành và rủi ro security khi để chúng plan, write và ship. Mỗi phe đều hợp lệ; mỗi phe nói lệch với phe kia. Người search \u201CAI SDLC\u201D năm 2026 không thể biết mình sẽ rơi vào thế giới nào.",
        },
        {
          heading: "So sánh ba phe",
          body: "Bảng dưới nén gọn mỗi phe nghĩa là gì, ai giữ content, và định nghĩa bỏ sót gì. Chú ý điểm mù chung: cả ba đều giả định rằng nếu AI sinh được artifact, tổ chức có thể tin nó — và chỉ phe ba mới đặt câu hỏi điều gì xảy ra khi không thể. Cột \u201Ccái gì được tính là proof\u201D gần như trống trên toàn trang nhất, chính là gap bài này lấp.",
        },
        {
          heading: "Nghĩa thứ tư: delivery có governance",
          body: "Nghĩa thứ tư đối xử với \u201CAI-SDLC\u201D như proper noun của một kiến trúc delivery cụ thể. Nguyên tắc đầu: AI draft nhưng không bao giờ decide — spec là data typed, có version mà người review; policy đóng băng thành YAML rule packs có version thay vì rải trong prompt; validation chạy trên engine đóng với các check kinds hữu hạn và tường minh — rule lạ là engine change, không bao giờ là silent no-op; evidence được giữ lại, không dựng lại, để auditor sáu tháng sau thấy ai quyết định, dưới rule nào, version nào, và proof nằm đâu. Đây là nghĩa được productize bởi platform AI-SDLC của xDev AI, chạy cùng gate trên GitLab CI và GitHub Actions.",
          image: {
            src: `${BASE}inline-ai-sdlc-la-gi-ladder.jpg`,
            alt: "Sơ đồ: thang năm bậc có governance từ spec có version, qua AI-assisted drafting và policy gate, đến evidence được giữ và release có shield.",
          },
        },
        {
          heading: "Vì sao nghĩa có governance sẽ aging tốt nhất",
          body: "Hai sự thật cấu trúc ủng hộ nghĩa thứ tư. Thứ nhất, số adoption bảo đảm câu hỏi trust: survey industry đặt AI tool usage của developer ở 84%, AI sinh ước tính 30–70% committed code, và research nhất quán cho thấy AI-generated code mang tỷ lệ vulnerability đo được — study về LLM-generated code báo cáo khoảng 10%–42% samples vulnerable tùy task, và một phân tích lớn trên production repositories tìm hơn 110.000 AI-introduced issues còn sống sót. Ở volume đó, \u201Ccó người review không?\u201D ngừng trả lời được và \u201Crecord cho thấy gì?\u201D bắt đầu thành bắt buộc. Thứ hai, regulation đến đúng lịch: EU AI Act có high-risk obligations hiệu lực từ tháng 8 2026 với phạt tới EUR 15 triệu hoặc 3% global turnover, và compliance teams sẽ cần chính xác loại evidence version-linked retained mà nghĩa có governance sinh ra mặc định. Các vendor camp sẽ tiếp tục mô tả capability; governed camp mô tả điều sống sót qua audit.",
        },
        {
          heading: "Bốn nghĩa liên hệ thay vì đối chọi",
          body: "Các cách hiểu không phải kẻ thù — chúng là các layer. Một enterprise chạy MLOps (phe hai) deploy model qua pipeline mà ai đó phải governance (phe một), ngày càng có agents staffing (phe ba), và mọi artifact chạy qua stack đó đều hưởng lợi từ spec grammar, policy gates và evidence được giữ (phe bốn). Cách hiểu có governance là layer làm ba layer kia accountable: agentic workflows là nơi trust gap rộng nhất, ML delivery là nơi evidence requirement khó nhất, và AI-augmented tooling là nơi drift im lặng nhất. Người đọc hiểu cả bốn nghĩa sẽ hỏi vendor tốt hơn — kể cả, cuối cùng, hỏi chính tổ chức này. Đó là điểm của open record: các khẳng định ở đây trace về policy có version trong repository công khai, không phải về marketing page.",
        },
        {
          heading: "Đi tiếp từ đây",
          body: "Mỗi layer xứng đáng đọc sâu hơn. Về cơ chế decision giữ AI ngoài decision path, bài \u201Cwhy governance beats prompts\u201D giải thích vì sao YAML có version thắng rule-based prompt. Về các check kinds làm policy gate deterministic, bài \u201Cmười check kinds của contract\u201D walkthrough closed set. Về việc lifecycle này nằm đâu trong full delivery cycle từ idea đến monitoring, bài \u201CxDev AI nằm ở đâu trong full quy trình\u201D map giao lộ. Mỗi bài là một phần của open record tại github.com/xdev-ai.",
        },
      ],
    },
  },
  {
    slug: "ai-sdlc-la-gi",
    dateISO: "2026-08-16",
    tags: ["AI-SDLC", "Governance", "Định nghĩa"],
    draft: false,
    cover: `${BASE}cover-ai-sdlc-la-gi.jpg`,
    coverAlt: {
      en: "Illustration: a governed delivery ladder from a versioned spec to a shielded release, with the policy gate highlighted as the heart of the AI SDLC.",
      vi: "Minh họa: thang delivery có governance từ spec có version đến release có shield, với policy gate được highlight làm trái tim của AI SDLC.",
    },
    faq: [
      {
        q: {
          en: "AI SDLC là gì? Tóm gọn thế nào?",
          vi: "AI SDLC là gì? Tóm gọn thế nào?",
        },
        a: {
          en: "AI SDLC in Vietnamese engineering practice is a governed AI-assisted delivery lifecycle: versioned specs, a deterministic policy gate, and retained evidence from intent to release. AI drafts; policy and proof are explicit, versioned artifacts reviewed by humans.",
          vi: "AI SDLC trong thực hành engineering tiếng Việt là chu trình delivery AI-assisted có governance: spec có version, policy gate deterministic, và evidence được giữ từ intent đến release. AI draft; policy và proof là các artifact tường minh, có version, do người review.",
        },
      },
      {
        q: {
          en: "Doanh nghiệp Việt Nam có cần governance khi dùng AI coding không?",
          vi: "Doanh nghiệp Việt Nam có cần governance khi dùng AI coding không?",
        },
        a: {
          en: "Yes — the need is scale-driven, not geography-driven. Any team where AI generates a large share of committed code faces the same audit and bus-factor risks as global teams. Evidence retention matters especially where staff turnover is high and oral knowledge dominates.",
          vi: "Có — nhu cầu đến từ quy mô, không phải địa lý. Bất kỳ team nào mà AI sinh phần lớn committed code đều gặp cùng rủi ro audit và bus-factor như team toàn cầu. Evidence retention đặc biệt quan trọng khi turnover cao và kiến thức truyền miệng chiếm ưu thế.",
        },
      },
      {
        q: {
          en: "AI-SDLC khác MLOps thế nào?",
          vi: "AI-SDLC khác MLOps thế nào?",
        },
        a: {
          en: "MLOps governs the lifecycle of ML systems (data, models, evaluation, monitoring). AI-SDLC governs software delivery where AI writes the code (spec grammar, policy gates, trace evidence). They complement each other: an ML product delivered by AI agents needs both layers.",
          vi: "MLOps governance lifecycle của hệ thống ML (data, model, evaluation, monitoring). AI-SDLC governance software delivery khi AI viết code (spec grammar, policy gates, trace evidence). Hai cái bổ sung nhau: sản phẩm ML do AI agents delivery cần cả hai layer.",
        },
      },
    ],
    en: {
      title: "AI SDLC là gì: quy trình phát triển phần mềm AI-assisted có governance",
      summary:
        "Giải thích AI SDLC bằng tiếng Việt: tại sao chu trình delivery AI-assisted cần spec có version, policy gate deterministic và evidence được giữ lại — thay vì tin AI bằng cảm giác. So sánh với MLOps và agentic SDLC, kèm vị trí của xDev AI.",
      readingMinutes: 12,
      sections: [
        {
          heading: "Trả lời nhanh: AI SDLC là gì",
          body: "AI SDLC, theo cách hiểu có governance mà tổ chức xDev AI bảo vệ, là chu trình phát triển phần mềm mà AI hỗ trợ viết code nhưng không tự quyết định: intent của người được chuyển thành specification có version; AI draft code trong workspace đã pin model; mọi deliverable phải qua một policy gate chạy deterministic kiểm tra một bộ rule kinds đóng; và toàn bộ chuỗi approval được giữ lại thành evidence traceable — để ba tháng sau, một auditor vẫn trả lời được ai quyết, dưới rule nào, version nào, proof nằm ở đâu. Khác với cách dịch thông thường \u201Cdùng AI trong SDLC\u201D, nghĩa này coi AI-SDLC là một kiến trúc delivery có tên riêng, không phải một tính năng của tool.",
          image: {
            src: `${BASE}inline-ai-sdlc-la-gi-ladder.jpg`,
            alt: "Sơ đồ: thang năm bậc có governance từ spec có version, qua AI-assisted drafting và policy gate, đến evidence được giữ và release có shield.",
          },
        },
        {
          heading: "Vì sao chữ \u201CAI SDLC\u201D đang bị lẫn lộn",
          body: "Search cụm từ này trên Google sẽ thấy ba nghĩa cạnh tranh nhau. Nghĩa thứ nhất (IBM, CircleCI, Microsoft) là \u201CAI trong SDLC\u201D — các giai đoạn phát triển truyền thống được AI augment; nghĩa thứ hai (các agency guide) là lifecycle của hệ thống AI — data, model, evaluation, monitoring, gần như MLOps khoác nhãn mới; nghĩa thứ ba (SonarSource, Cycode) là agentic SDLC — coding agent tự hành và rủi ro bảo mật của nó. Ba nghĩa đều thật, nhưng không nghĩa nào trả lời câu hỏi mà doanh nghiệp đang thật sự cần: khi AI viết 30–70% code được commit, làm sao chứng minh được code đó đáng tin — và chứng minh đó nằm ở đâu khi người viết ra nó đã rời team?",
        },
        {
          heading: "Ba cột trụ của nghĩa có governance",
          body: "Cột trụ thứ nhất là spec có version: requirement và decision context vào record dưới dạng artifact typed mà người review được, thay vì bay trong đầu AI hay trong chat context. Cột trụ thứ hai là policy gate deterministic: rule không nằm trong prompt — prompt không có version, không deterministic, và có thể âm thầm hỏng khi model thay đổi — mà nằm trong YAML có version được review như code, thực thi bởi một engine đóng có số lượng check kinds hữu hạn: thêm rule mới không cần đổi engine, thêm check kind mới mới là đổi engine, và rule lạ không bao giờ trở thành silent no-op. Cột trụ thứ ba là evidence được giữ: mỗi check, mỗi approval, mỗi version join vào trace graph ngay lúc xảy ra, không dựng lại sau sự cố — audit trở thành lookup thay vì khảo cổ chat history.",
        },
        {
          heading: "So sánh với MLOps và agentic SDLC",
          body: "MLOps trả lời câu hỏi khác: làm sao đưa model từ data đến production an toàn — nó govern data, model, evaluation và monitoring. Agentic SDLC trả lời câu hỏi thứ ba: khi agent tự hành end-to-end, rủi ro gì xuất hiện và tool security nào chặn chúng. AI-SDLC theo nghĩa có governance trả lời câu hỏi thứ tư, và là layer làm hai layer kia accountable: agentic workflow càng tự hành thì trust gap càng rộng, ML product do AI delivery càng cần evidence, và tooling AI-augmented càng im lặng drift thì càng cần record. Ba nghĩa không loại trừ nhau — chúng xếp chồng, và nghĩa thứ tư là nghĩa duy nhất chứa câu trả lời cho audit.",
          image: {
            src: `${BASE}inline-four-meanings.jpg`,
            alt: "Sơ đồ: bốn cách hiểu AI SDLC hội tụ về cách hiểu có governance của xDev AI.",
          },
        },
        {
          heading: "Con số khiến governance thành bắt buộc",
          body: "Adoption đã qua điểm không quay lại: khảo sát developer cho thấy 84% dùng AI tooling trong công việc, và AI ước tính sinh 30–70% code được commit tại các tổ chức áp dụng mạnh. Nghiên cứu về chất lượng cho thấy LLM-generated code mang tỷ lệ vulnerability đo được trong khoảng 10–42% tùy task, và một phân tích trên production repositories tìm hơn 110.000 AI-introduced issues còn sống sót. Kết hợp với EU AI Act có high-risk obligations từ tháng 8 2026 (phạt tới EUR 15 triệu hoặc 3% doanh thu toàn cầu), câu hỏi \u201Clàm sao chứng minh?\u201D không còn là lý thuyết — nó là điều kiện vào cuộc chơi. Với thị trường Việt Nam, nơi turnover kỹ sư cao và kiến thức truyền miệng phổ biến, evidence retention không phải luxury mà là thứ bảo vệ chính doanh nghiệp khi người nắm bus factor rời đi.",
        },
        {
          heading: "AI-SDLC của xDev AI nhìn gần",
          body: "Trong cách hiểu này, xDev AI productize AI-SDLC như một platform: engine Rust đóng chạy trên GitLab CI và GitHub Actions với cùng một gate; Spec Kit chứa policy dưới dạng YAML + Markdown có version, mở rộng qua Domain Packs; contract quy định đúng 10 check kinds để mọi rule map về một loại đã biết; và evidence trace giữ liên kết requirement → spec → task → test từ đầu đến release. Toàn bộ claim trong bài này trace về repository công khai github.com/xdev-ai — đó là khác biệt của open record so với marketing page: mỗi nguyên tắc là ràng buộc có thể enforce, không phải lời hứa roadmap. Bài tiếp nên đọc: \u201CWhy governance beats prompts\u201D cho cơ chế decision, \u201CMười check kinds của contract\u201D cho closed set, và \u201CWhat is AI-SDLC\u201D cho bản tiếng Anh tương đương.",
        },
      ],
    },
    vi: {
      title: "AI SDLC là gì: quy trình phát triển phần mềm AI-assisted có governance",
      summary:
        "Giải thích AI SDLC bằng tiếng Việt: tại sao chu trình delivery AI-assisted cần spec có version, policy gate deterministic và evidence được giữ lại — thay vì tin AI bằng cảm giác. So sánh với MLOps và agentic SDLC, kèm vị trí của xDev AI.",
      readingMinutes: 12,
      sections: [
        {
          heading: "Trả lời nhanh: AI SDLC là gì",
          body: "AI SDLC, theo cách hiểu có governance mà tổ chức xDev AI bảo vệ, là chu trình phát triển phần mềm mà AI hỗ trợ viết code nhưng không tự quyết định: intent của người được chuyển thành specification có version; AI draft code trong workspace đã pin model; mọi deliverable phải qua một policy gate chạy deterministic kiểm tra một bộ rule kinds đóng; và toàn bộ chuỗi approval được giữ lại thành evidence traceable — để ba tháng sau, một auditor vẫn trả lời được ai quyết, dưới rule nào, version nào, proof nằm ở đâu. Khác với cách dịch thông thường \u201Cdùng AI trong SDLC\u201D, nghĩa này coi AI-SDLC là một kiến trúc delivery có tên riêng, không phải một tính năng của tool.",
          image: {
            src: `${BASE}inline-ai-sdlc-la-gi-ladder.jpg`,
            alt: "Sơ đồ: thang năm bậc có governance từ spec có version, qua AI-assisted drafting và policy gate, đến evidence được giữ và release có shield.",
          },
        },
        {
          heading: "Vì sao chữ \u201CAI SDLC\u201D đang bị lẫn lộn",
          body: "Search cụm từ này trên Google sẽ thấy ba nghĩa cạnh tranh nhau. Nghĩa thứ nhất (IBM, CircleCI, Microsoft) là \u201CAI trong SDLC\u201D — các giai đoạn phát triển truyền thống được AI augment; nghĩa thứ hai (các agency guide) là lifecycle của hệ thống AI — data, model, evaluation, monitoring, gần như MLOps khoác nhãn mới; nghĩa thứ ba (SonarSource, Cycode) là agentic SDLC — coding agent tự hành và rủi ro bảo mật của nó. Ba nghĩa đều thật, nhưng không nghĩa nào trả lời câu hỏi mà doanh nghiệp đang thật sự cần: khi AI viết 30–70% code được commit, làm sao chứng minh được code đó đáng tin — và chứng minh đó nằm ở đâu khi người viết ra nó đã rời team?",
        },
        {
          heading: "Ba cột trụ của nghĩa có governance",
          body: "Cột trụ thứ nhất là spec có version: requirement và decision context vào record dưới dạng artifact typed mà người review được, thay vì bay trong đầu AI hay trong chat context. Cột trụ thứ hai là policy gate deterministic: rule không nằm trong prompt — prompt không có version, không deterministic, và có thể âm thầm hỏng khi model thay đổi — mà nằm trong YAML có version được review như code, thực thi bởi một engine đóng có số lượng check kinds hữu hạn: thêm rule mới không cần đổi engine, thêm check kind mới mới là đổi engine, và rule lạ không bao giờ trở thành silent no-op. Cột trụ thứ ba là evidence được giữ: mỗi check, mỗi approval, mỗi version join vào trace graph ngay lúc xảy ra, không dựng lại sau sự cố — audit trở thành lookup thay vì khảo cổ chat history.",
        },
        {
          heading: "So sánh với MLOps và agentic SDLC",
          body: "MLOps trả lời câu hỏi khác: làm sao đưa model từ data đến production an toàn — nó govern data, model, evaluation và monitoring. Agentic SDLC trả lời câu hỏi thứ ba: khi agent tự hành end-to-end, rủi ro gì xuất hiện và tool security nào chặn chúng. AI-SDLC theo nghĩa có governance trả lời câu hỏi thứ tư, và là layer làm hai layer kia accountable: agentic workflow càng tự hành thì trust gap càng rộng, ML product do AI delivery càng cần evidence, và tooling AI-augmented càng im lặng drift thì càng cần record. Ba nghĩa không loại trừ nhau — chúng xếp chồng, và nghĩa thứ tư là nghĩa duy nhất chứa câu trả lời cho audit.",
          image: {
            src: `${BASE}inline-four-meanings.jpg`,
            alt: "Sơ đồ: bốn cách hiểu AI SDLC hội tụ về cách hiểu có governance của xDev AI.",
          },
        },
        {
          heading: "Con số khiến governance thành bắt buộc",
          body: "Adoption đã qua điểm không quay lại: khảo sát developer cho thấy 84% dùng AI tooling trong công việc, và AI ước tính sinh 30–70% code được commit tại các tổ chức áp dụng mạnh. Nghiên cứu về chất lượng cho thấy LLM-generated code mang tỷ lệ vulnerability đo được trong khoảng 10–42% tùy task, và một phân tích trên production repositories tìm hơn 110.000 AI-introduced issues còn sống sót. Kết hợp với EU AI Act có high-risk obligations từ tháng 8 2026 (phạt tới EUR 15 triệu hoặc 3% doanh thu toàn cầu), câu hỏi \u201Clàm sao chứng minh?\u201D không còn là lý thuyết — nó là điều kiện vào cuộc chơi. Với thị trường Việt Nam, nơi turnover kỹ sư cao và kiến thức truyền miệng phổ biến, evidence retention không phải luxury mà là thứ bảo vệ chính doanh nghiệp khi người nắm bus factor rời đi.",
        },
        {
          heading: "AI-SDLC của xDev AI nhìn gần",
          body: "Trong cách hiểu này, xDev AI productize AI-SDLC như một platform: engine Rust đóng chạy trên GitLab CI và GitHub Actions với cùng một gate; Spec Kit chứa policy dưới dạng YAML + Markdown có version, mở rộng qua Domain Packs; contract quy định đúng 10 check kinds để mọi rule map về một loại đã biết; và evidence trace giữ liên kết requirement → spec → task → test từ đầu đến release. Toàn bộ claim trong bài này trace về repository công khai github.com/xdev-ai — đó là khác biệt của open record so với marketing page: mỗi nguyên tắc là ràng buộc có thể enforce, không phải lời hứa roadmap. Bài tiếp nên đọc: \u201CWhy governance beats prompts\u201D cho cơ chế decision, \u201CMười check kinds của contract\u201D cho closed set, và \u201CWhat is AI-SDLC\u201D cho bản tiếng Anh tương đương.",
        },
      ],
    },
  },
  {
    slug: "policy-as-code-ai-coding",
    dateISO: "2026-08-14",
    tags: ["Policy-as-code", "AI coding", "Governance"],
    draft: false,
    cover: `${BASE}cover-policy-as-code.jpg`,
    coverAlt: {
      en: "Illustration: prompt-based rules fading into ghost documents versus versioned YAML policy enforced by a deterministic gate with checkmarks.",
      vi: "Minh họa: rule dạng prompt phai thành tài liệu ma so với policy YAML có version được gate deterministic enforce với các dấu check.",
    },
    faq: [
      {
        q: {
          en: "Why are prompts not policy for AI coding agents?",
          vi: "Vì sao prompt không phải là policy cho AI coding agent?",
        },
        a: {
          en: "Prompts have no version history, no deterministic outcome, no enforcement mechanism and no retained proof. A rule written only in a prompt can silently degrade when the model changes, and when something breaks there is no artifact that shows the rule ever existed. Policy-as-code stores the rule as versioned data that a closed engine enforces identically on every run.",
          vi: "Prompt không có version history, không có kết quả deterministic, không có cơ chế enforcement và không có proof được giữ. Rule chỉ viết trong prompt có thể âm thầm suy giảm khi model thay đổi, và khi có lỗi thì không có artifact nào cho thấy rule từng tồn tại. Policy-as-code lưu rule làm data có version mà engine đóng enforce giống nhau mọi lần chạy.",
        },
      },
      {
        q: {
          en: "What does a \u201Cclosed\u201D policy engine mean?",
          vi: "Engine policy \u201Cđóng\u201D nghĩa là gì?",
        },
        a: {
          en: "A closed engine accepts exactly a declared finite set of check kinds. Adding a new rule inside an existing kind needs no engine change, but adding a new kind is an explicit engine change that must ship with schema and validator. This guarantees unknown rules can never become silent no-ops — the property that separates law from suggestions.",
          vi: "Engine đóng chỉ nhận đúng một bộ hữu hạn các check kinds đã khai báo. Thêm rule mới trong kind đã có không cần đổi engine, nhưng thêm kind mới là engine change tường minh phải ship kèm schema và validator. Điều này bảo đảm rule lạ không bao giờ thành silent no-op — tính chất tách luật ra khỏi lời gợi ý.",
        },
      },
      {
        q: {
          en: "Can policy-as-code run in existing CI (GitHub Actions, GitLab CI)?",
          vi: "Policy-as-code chạy được trên CI hiện có (GitHub Actions, GitLab CI) không?",
        },
        a: {
          en: "Yes — that is the design point. The policy engine is a deterministic CLI that loads versioned YAML rule packs at runtime, so the same gate runs identically in local workspaces, CI pipelines and review surfaces. Changing policy needs a commit, never a recompile.",
          vi: "Có — đó chính là điểm thiết kế. Policy engine là CLI deterministic load YAML rule packs có version lúc runtime, nên cùng một gate chạy giống hệt trong local workspace, CI pipeline và review surfaces. Đổi policy cần một commit, không bao giờ cần recompile.",
        },
      },
    ],
    en: {
      title: "Policy-as-code for AI coding: why prompts are not policy",
      summary:
        "Most AI coding governance today lives in prompts — unwritten, unversioned, unenforced. This article explains why prompt-based rules silently fail, what policy-as-code looks like in practice (versioned YAML, a closed engine, retained evidence), and how a policy gate closes the trust gap that chat transcripts never can.",
      readingMinutes: 11,
      sections: [
        {
          heading: "The problem in one paragraph",
          body: "When teams start AI coding, their first governance instinct is to write rules into prompts: \u201Calways pin the model\u201D, \u201Cnever run without a spec\u201D, \u201Cask before deleting\u201D. These rules feel like law but behave like wishes. They have no version history, so nobody can say which rule applied on Tuesday; they are non-deterministic, so the same prompt yields different enforcement across model versions; and they leave no artifact, so when an incident happens, the transcript cannot prove the rule existed, was read, or was followed. Policy-as-code replaces this with the discipline software teams already know from infrastructure-as-code: rules become versioned data, executed by a deterministic engine, with evidence retained for every check. The difference is not tooling taste — it is the difference between governance you can audit and governance you can only hope for.",
          image: {
            src: `${BASE}inline-prompt-vs-policy.jpg`,
            alt: "Comparison diagram: prompt-based rules (wavy, unversioned, ghosted) versus policy-as-code (versioned YAML toggles with checkmarks and a version timeline).",
          },
        },
        {
          heading: "Four ways prompt-based governance breaks",
          body: "The failure modes are structural, not incidental. First, prompts are unversioned: a rule edited in a system prompt leaves no diff, no review record and no rollback — the exact opposite of how engineering teams treat anything else that affects production. Second, prompts are non-deterministic: the same instruction generates different behavior after a model update, so a rule that passed review in March may be silently ignored in July with no notification. Third, prompts are unenforceable by design: an agent can comply, partially comply, or reinterpret a natural-language instruction, and the organization has no mechanism that blocks non-compliance rather than merely discouraging it. Fourth, prompts produce no evidence: when an auditor or a replacement engineer asks \u201Cwhat governed this release?\u201D, the chat transcript is archaeology — unsearchable, unstructured and legally thin. Each failure alone is survivable; together they make prompt-based governance a placebo that costs the trust of the people who must rely on it.",
        },
        {
          heading: "What policy-as-code looks like in practice",
          body: "A working policy-as-code stack for AI coding has three layers. The first is law as versioned data: rules live in YAML and Markdown files inside a repository, reviewed through the same pull-request discipline as application code, and pinned to versions the engine loads at runtime — publishing new policy requires a commit, never a recompile. The second is a closed execution engine: it accepts exactly a declared finite set of check kinds, so adding a rule within an existing kind is free while adding a new kind is an explicit engine change that ships with schema and validator. This finiteness is what makes the engine auditable: you can enumerate everything it understands. The third is retained evidence: every check result, approval and version link joins a trace graph at the moment it happens, so the record answers who decided, under which rule, at which version — before anyone asks.",
          image: {
            src: `${BASE}inline-gate-flow.jpg`,
            alt: "Diagram: agent generates code, the policy gate with toggles and a lock enforces rules, evidence documents chain into a ledger, while a human observes only at the gate.",
          },
        },
        {
          heading: "The closed set: ten check kinds that make a gate deterministic",
          body: "The contract at the center of xDev AI's implementation defines exactly ten check kinds — covering spec structure (frontmatter present, fields matching, sections present and non-empty), ID grammar (format valid, IDs unique), traceability (edges exist, references resolve) and agent launch (model must be pinned, bare mode forbidden). The numbers are deliberately small and the set deliberately closed. The consequence is a clean division of labor: adding a rule needs no engine change, but adding a check kind does. Unknown kinds can never become silent no-ops that let law drift from machine — which is the single property that separates a policy gate from a linting suggestion. A walkthrough of all ten kinds appears in the article on the contract's check kinds.",
        },
        {
          heading: "A prompt reminder versus a deterministic gate",
          body: "Consider one concrete policy: the agent must pin its model on launch and must not run bare. Written as a prompt reminder, it degrades on every model update and generates no record when violated. Written as policy-as-code, a rule pack — a versioned YAML decision with gates like \u201Crequire --model pin\u201D and \u201Cforbid --bare\u201D — puts the same policy into a deterministic gate. The gate runs identically in a local workspace, a GitHub Actions run and a GitLab CI pipeline, because the engine is a Rust CLI that loads rule packs at runtime; identical behavior across vendors is what makes the evidence portable. When the gate fails, the failure is an artifact with a reason; when it passes, the pass is an artifact too. That is the whole trade in one line: prompt governance produces feelings; policy-as-code produces artifacts.",
        },
        {
          heading: "Where this fits in the larger picture",
          body: "Policy-as-code is one layer of a governed AI-SDLC. The layer above it is intent: versioned specifications that make delivery decisions reviewable, covered in the pillar article What is AI-SDLC and its Vietnamese counterpart AI SDLC là gì. The layer beside it is evidence: retained trace graphs that turn compliance into lookups instead of archaeology, covered in the article on evidence trails for AI-generated code. And the reason the layer matters at all is the risk surface that autonomous agents open — covered in the article on agentic SDLC risks and how gates close them. Together the cluster forms a coherent argument: capability is now cheap; what organizations actually need is a record that survives the people who made the decisions.",
        },
      ],
    },
    vi: {
      title: "Policy-as-code cho AI coding: vì sao prompt không phải là policy",
      summary:
        "Hầu hết governance AI coding hiện nay nằm trong prompt — không viết thành văn bản, không có version, không enforce. Bài này giải thích vì sao rule dạng prompt âm thầm thất bại, policy-as-code trông thế nào trong thực tế (YAML có version, engine đóng, evidence được giữ), và policy gate đóng trust gap mà chat transcript không bao giờ đóng được.",
      readingMinutes: 11,
      sections: [
        {
          heading: "Vấn đề trong một đoạn",
          body: "Khi team bắt đầu AI coding, phản xạ governance đầu tiên là viết rule vào prompt: \u201Cluôn pin model\u201D, \u201Ckhông chạy khi chưa có spec\u201D, \u201Chỏi trước khi xóa\u201D. Các rule này cảm giác như luật nhưng hành xử như điều ước. Chúng không có version history, nên không ai nói được rule nào áp dụng hôm thứ Ba; chúng không deterministic, nên cùng một prompt cho enforcement khác nhau giữa các version model; và chúng không để lại artifact, nên khi incident xảy ra, transcript chat không chứng minh được rule từng tồn tại, được đọc, hay được tuân thủ. Policy-as-code thay thế bằng kỷ luật mà team phần mềm đã quen từ infrastructure-as-code: rule trở thành data có version, thực thi bởi engine deterministic, với evidence được giữ cho mọi check. Khác biệt không phải gu tooling — nó là khác biệt giữa governance audit được và governance chỉ cầu nguyện.",
          image: {
            src: `${BASE}inline-prompt-vs-policy.jpg`,
            alt: "Sơ đồ so sánh: rule dạng prompt (ngoằn ngoèo, không version, mờ ảo) so với policy-as-code (YAML toggles có version kèm dấu check và version timeline).",
          },
        },
        {
          heading: "Bốn cách governance dạng prompt thất bại",
          body: "Các failure modes mang tính cấu trúc, không tình cờ. Thứ nhất, prompt không có version: rule sửa trong system prompt không để lại diff, không có review record, không rollback — ngược hoàn toàn với cách team engineering đối xử với bất cứ thứ gì khác ảnh hưởng production. Thứ hai, prompt không deterministic: cùng instruction sinh hành xử khác sau model update, nên rule đã pass review tháng Ba có thể bị âm thầm bỏ qua tháng Bảy mà không có thông báo. Thứ ba, prompt không enforce được về thiết kế: agent có thể tuân thủ, tuân thủ một phần, hoặc tái diễn giải instruction ngôn ngữ tự nhiên, và tổ chức không có cơ chế chặn non-compliance thay vì chỉ discourage nó. Thứ tư, prompt không sinh evidence: khi auditor hay engineer thay thế hỏi \u201Crelease này được governance thế nào?\u201D, chat transcript là khảo cổ — không search được, không cấu trúc, và mỏng về pháp lý. Từng failure một thì sống sót được; cả bốn cùng lúc biến prompt-based governance thành placebo làm mất trust của những người phải dựa vào nó.",
        },
        {
          heading: "Policy-as-code trông thế nào trong thực tế",
          body: "Một stack policy-as-code hoạt động cho AI coding có ba layer. Thứ nhất là law làm data có version: rule nằm trong file YAML và Markdown trong repository, review qua cùng pull-request discipline như code ứng dụng, và pin version mà engine load lúc runtime — publish policy mới cần commit, không cần recompile. Thứ hai là engine thực thi đóng: nó nhận đúng một bộ hữu hạn các check kinds đã khai báo, nên thêm rule trong kind đã có thì free còn thêm kind mới là engine change tường minh phải ship kèm schema và validator. Tính hữu hạn này là thứ làm engine audit được: bạn có thể liệt kê mọi thứ nó hiểu. Thứ ba là evidence được giữ: mọi check result, approval và version link join vào trace graph ngay lúc xảy ra, nên record trả lời ai quyết, dưới rule nào, version nào — trước khi ai hỏi.",
          image: {
            src: `${BASE}inline-gate-flow.jpg`,
            alt: "Sơ đồ: agent sinh code, policy gate với toggles và khóa enforce rule, evidence documents chaining vào ledger, trong khi người quan sát chỉ ở gate.",
          },
        },
        {
          heading: "Closed set: mười check kinds làm gate deterministic",
          body: "Contract ở trung tâm implement của xDev AI định nghĩa đúng mười check kinds — phủ spec structure (frontmatter có đủ, fields khớp regex, sections có đủ và không rỗng), ID grammar (format đúng, ID không trùng), traceability (edge tồn tại, reference resolve được) và agent launch (phải pin model, cấm bare mode). Số lượng chủ đích nhỏ và bộ chủ đích đóng. Hệ quả là phân công lao động sạch: thêm rule không cần đổi engine, nhưng thêm check kind thì có. Kind lạ không bao giờ thành silent no-op để luật drift khỏi máy — chính là tính chất duy nhất tách policy gate ra khỏi linting suggestion. Walkthrough cả mười kinds có trong bài về các check kinds của contract.",
        },
        {
          heading: "Prompt reminder so với deterministic gate",
          body: "Xét một policy cụ thể: agent phải pin model khi launch và không được chạy bare. Viết làm prompt reminder, nó suy giảm sau mọi model update và không sinh record khi vi phạm. Viết làm policy-as-code, một rule pack — decision YAML có version với các gate như \u201Crequire --model pin\u201D và \u201Cforbid --bare\u201D — đưa cùng policy vào deterministic gate. Gate chạy giống hệt trong local workspace, GitHub Actions run và GitLab CI pipeline, vì engine là Rust CLI load rule packs lúc runtime; hành xử giống nhau giữa các vendor là thứ làm evidence portable. Khi gate fail, failure là artifact có lý do; khi pass, pass cũng là artifact. Đó là toàn bộ trade trong một dòng: prompt governance sinh cảm giác; policy-as-code sinh artifact.",
        },
        {
          heading: "Nó nằm đâu trong bức tranh lớn hơn",
          body: "Policy-as-code là một layer của AI-SDLC có governance. Layer trên nó là intent: spec có version làm delivery decisions review được, được cover trong pillar What is AI-SDLC và bản tiếng Việt AI SDLC là gì. Layer cạnh nó là evidence: trace graph được giữ biến compliance thành lookup thay vì khảo cổ, cover trong bài evidence trail cho code AI-generated. Và lý do layer này quan trọng là risk surface mà autonomous agents mở ra — cover trong bài về agentic SDLC risks và cách gate đóng chúng. Cùng nhau cluster tạo một luận điểm mạch lạc: capability giờ đã rẻ; thứ tổ chức thật sự cần là record sống sót qua những người đã đưa quyết định.",
        },
      ],
    },
  },
  {
    slug: "evidence-trail-ai-generated-code",
    dateISO: "2026-08-13",
    tags: ["Evidence", "AI coding", "Compliance"],
    draft: false,
    cover: `${BASE}cover-evidence-trail.jpg`,
    coverAlt: {
      en: "Illustration: an evidence chain linking requirement, spec, test and release entries in a ledger, each entry hashed and linked forward.",
      vi: "Minh họa: chuỗi evidence kết nối requirement, spec, test và release trong ledger, mỗi entry được hash và liên kết tiến về phía trước.",
    },
    faq: [
      {
        q: {
          en: "Why is chat history not evidence?",
          vi: "Vì sao chat history không phải là evidence?",
        },
        a: {
          en: "Chat history is unstructured, unversioned, unlinked to artifacts, and legally thin: nobody can prove which transcript belongs to which release, or that a claim in it was actually followed. Evidence must be retained at the moment each check and approval happens, linked to artifact versions in a trace graph — so audit becomes a lookup instead of chat archaeology.",
          vi: "Chat history không cấu trúc, không có version, không liên kết với artifact, và mỏng về pháp lý: không ai chứng minh được transcript nào thuộc release nào, hay một khẳng định trong nó thật sự được tuân thủ. Evidence phải được giữ ngay lúc mỗi check và approval xảy ra, liên kết với artifact version trong trace graph — để audit trở thành lookup thay vì khảo cổ chat.",
        },
      },
      {
        q: {
          en: "What does retained evidence mean for SOC 2 and ISO 42001?",
          vi: "Evidence được giữ có ý nghĩa gì với SOC 2 và ISO 42001?",
        },
        a: {
          en: "SOC 2 (CC7 monitoring, CC2 information) and ISO 42001 (AI risk management) both ask the same question in different words: show that controls operate consistently and decisions are traceable. Version-pinned policy, deterministic gate results and a retained trace graph answer both — the record itself becomes the compliance artifact, which is why governed AI delivery is becoming a fast path to certification.",
          vi: "SOC 2 (CC7 monitoring, CC2 information) và ISO 42001 (AI risk management) đều hỏi cùng một câu theo cách khác: chứng minh controls hoạt động nhất quán và decisions traceable. Policy pin version, gate results deterministic và trace graph được giữ trả lời cả hai — record tự nó trở thành compliance artifact, đó là vì sao governed AI delivery đang thành con đường nhanh đến certification.",
        },
      },
      {
        q: {
          en: "How does an evidence trail survive engineer turnover?",
          vi: "Evidence trail sống sót qua turnover kỹ sư thế nào?",
        },
        a: {
          en: "Because the knowledge leaves with the person only when it lives in memory. In a governed delivery, who decided, under which rule, at which version is recorded in versioned artifacts — a replacement engineer reads the record instead of interviewing the leaver, which converts bus-factor risk from a liability into an institutional asset.",
          vi: "Vì kiến thức chỉ rời đi cùng người khi nó sống trong trí nhớ. Trong delivery có governance, ai quyết, dưới rule nào, version nào được ghi trong các artifact có version — engineer thay thế đọc record thay vì phỏng vấn người rời đi, biến bus-factor risk từ gánh nặng thành tài sản tổ chức.",
        },
      },
    ],
    en: {
      title: "Evidence trails for AI-generated code: from chat archaeology to audit lookups",
      summary:
        "When AI writes most of the committed code, the organization's proof must come from retained records — not from reconstructing what people remember. This article explains why chat history fails as evidence, what a real evidence trail contains (deterministic gate results, version-pinned approvals, trace graphs), and why compliance frameworks like SOC 2 and ISO 42001 make it mandatory rather than optional.",
      readingMinutes: 11,
      sections: [
        {
          heading: "The audit problem AI created",
          body: "Every delivery system has always needed evidence: someone approved this, someone tested that, the record proves it. When humans did most of the work, evidence collection was slow but social — the person who did the thing could explain it. AI inverts that economics: an AI agent can produce dozens of artifacts in the time a human produces one, each with its own decision context scattered across prompts, context windows and tool calls that leave no unified record. Research has already quantified the consequences at scale — a 2026 analysis of production repositories found over 110,000 AI-introduced issues that survived review, and studies of LLM-generated code report vulnerability rates between roughly 10% and 42% depending on the task. The question is no longer whether failures will arrive; it is whether, when they do, the organization can find out what governed each decision — and show an auditor that it knew.",
          image: {
            src: `${BASE}inline-evidence-chain.jpg`,
            alt: "Diagram: evidence chain from a human decision through a policy gate, hashed entries, and a linked trace graph ending in a verified release.",
          },
        },
        {
          heading: "Why chat history fails as evidence",
          body: "Teams often assume the AI conversation is the record. It is not, for four structural reasons. First, transcripts are unlinked to artifacts: nobody can prove which chat produced which release candidate, so the conversation cannot serve as an audit trail. Second, they are unversioned: when a prompt silently changes, there is no diff, no review, no rollback — the same failure modes that disqualify prompts as policy. Third, they are unenforced: a claim in a transcript (\u201Cwe verified the coverage\u201D) is a statement, not a check; nothing blocks the claim from being wrong. Fourth, they are legally thin: courts and auditors treat contemporaneous, structured records as probative and reconstructed narratives as storytelling. A transcript that must be interpreted is evidence in name only. The discipline of retained evidence does the opposite: every check result, approval and version link is written into the record at the moment it happens — before anyone asks.",
        },
        {
          heading: "What a real evidence trail contains",
          body: "Three classes of record, all versioned and all linkable. The first class is policy evidence: which rule packs, at which versions, were resolved by the gate for a given run — because a passing result means nothing without the law it passed against. The second class is gate evidence: the deterministic result of each check kind — frontmatter present, IDs valid and unique, trace edges present, references resolving, model pinned, bare mode absent — each one an artifact with a reason, pass or fail. The third class is trace evidence: a graph connecting requirements to specifications, specifications to tasks, tasks to tests and tests to releases, so that coverage from requirement to artifact is an invariant of the system rather than a claim in a document. In xDev AI's implementation these three classes share one property: they are outputs of the process, not reconstructions after it. That ordering is the whole point — evidence retained beats evidence recalled, always.",
        },
        {
          heading: "Compliance frameworks turn it from nice-to-have into mandatory",
          body: "SOC 2 and ISO 42001 ask the same underlying question in different vocabularies: show that your controls operate consistently and that decisions are traceable. SOC 2's monitoring (CC7) and information/communication (CC2) criteria demand evidence that controls are continuously operating, not merely designed; ISO 42001's AI risk management clauses demand documented processes for evaluating and monitoring AI systems, including decisions about them. A deterministic policy gate producing versioned results maps onto both with unusual directness: the gate result is the monitoring event, the version-pinned policy is the documented process, and the trace graph is the decision traceability. The EU AI Act accelerates the same pressure in Europe, with high-risk obligations taking effect in August 2026 and penalties reaching EUR 15 million or 3% of global turnover. Organizations that already retain evidence find certification is mostly paperwork about records they keep anyway; organizations that reconstruct records find they are paying twice.",
          image: {
            src: `${BASE}inline-compliance-table.jpg`,
            alt: "Table-style diagram mapping SOC 2 CC2/CC7 and ISO 42001 clauses to the three evidence classes: policy, gate, and trace evidence.",
          },
        },
        {
          heading: "The bus factor turns evidence into an asset",
          body: "The quietest argument for retained evidence is not regulatory at all: it is turnover. Engineering teams lose their best people to better offers, and the knowledge they carry — why a decision was made, what rule applied, where the proof sat — evaporates unless it was recorded while fresh. With AI generating most of the committed code, that loss compounds: not only did the person know why, the AI knew it only inside a context window that no longer exists. A retained trace graph is the institutional countermeasure: a replacement engineer reads the record instead of interviewing a leaver, and what was a bus-factor liability becomes an institutional asset that survives every departure. This is also why evidence belongs in the delivery process itself rather than in a retrospective tool — if retention is a separate step, it inherits exactly the human forgetfulness it was built to fix.",
        },
        {
          heading: "Where evidence fits in the governed cluster",
          body: "Evidence retention is the third pillar of the AI-SDLC position this blog defends: versioned policy decides what law applies, the deterministic gate decides what passed against it, and retained evidence decides what anyone can later prove about both. The mechanics of the gate are covered in the article on the contract's ten check kinds; the argument for policy-as-code over prompts in the article on policy-as-code; and the pillar article What is AI-SDLC (with its Vietnamese counterpart AI SDLC là gì) frames the full interpretation. The Trace Ledger product concept on ai.xdev.asia extends the same idea one step further: an append-only ledger where every AI change becomes a hashed entry that cannot be silently altered. When change is cheap, evidence must be cheaper still — retention is the default posture, not a chore scheduled after the incident.",
        },
      ],
    },
    vi: {
      title: "Evidence trail cho code AI-generated: từ khảo cổ chat đến audit lookup",
      summary:
        "Khi AI viết phần lớn committed code, proof của tổ chức phải đến từ record được giữ — không phải từ việc dựng lại điều mọi người nhớ. Bài này giải thích vì sao chat history fail làm evidence, một evidence trail thật chứa gì (gate results deterministic, approvals pin version, trace graphs), và vì sao compliance framework như SOC 2 và ISO 42001 biến nó thành bắt buộc.",
      readingMinutes: 11,
      sections: [
        {
          heading: "Vấn đề audit mà AI tạo ra",
          body: "Mọi delivery system luôn cần evidence: ai đó approved cái này, ai đó test cái kia, record chứng minh điều đó. Khi người làm phần lớn việc, evidence collection chậm nhưng social — người làm việc có thể giải thích nó. AI đảo ngược kinh tế đó: AI agent sinh hàng chục artifact trong thời gian người sinh một, mỗi artifact có decision context riêng rải trong prompt, context window và tool calls không để lại record thống nhất. Research đã định lượng hậu quả ở scale — một phân tích 2026 trên production repositories tìm hơn 110.000 AI-introduced issues sống sót qua review, và các study về LLM-generated code báo cáo vulnerability rates khoảng 10–42% tùy task. Câu hỏi không còn là failure có tới không; nó là khi chúng tới, tổ chức có tìm ra thứ gì đã governance từng decision — và chứng minh với auditor rằng tổ chức đã biết.",
          image: {
            src: `${BASE}inline-evidence-chain.jpg`,
            alt: "Sơ đồ: chuỗi evidence từ human decision qua policy gate, hashed entries, và trace graph liên kết kết thúc ở release đã verified.",
          },
        },
        {
          heading: "Vì sao chat history fail làm evidence",
          body: "Team thường giả định hội thoại AI là record. Nó không phải, vì bốn lý do cấu trúc. Thứ nhất, transcript không liên kết với artifact: không ai chứng minh được chat nào sinh ra release candidate nào, nên cuộc trò chuyện không làm audit trail được. Thứ hai, chúng không có version: khi prompt thay đổi âm thầm, không có diff, không review, không rollback — cùng failure modes khiến prompt không làm policy được. Thứ ba, chúng không enforce: một khẳng định trong transcript (\u201Cchúng tôi đã verified coverage\u201D) là statement, không phải check; không gì chặn khẳng định đó sai. Thứ tư, chúng mỏng về pháp lý: tòa án và auditor coi record cấu trúc đương thời là probative còn narrative dựng lại là storytelling. Transcript phải diễn giải chỉ là evidence trên danh nghĩa. Kỷ luật evidence được giữ làm ngược lại: mọi check result, approval và version link được ghi vào record ngay lúc xảy ra — trước khi ai hỏi.",
        },
        {
          heading: "Evidence trail thật chứa gì",
          body: "Ba lớp record, tất cả có version và tất cả link được với nhau. Lớp thứ nhất là policy evidence: rule packs nào, version nào, được gate resolve cho một run nhất định — vì pass result vô nghĩa nếu thiếu law mà nó pass. Lớp thứ hai là gate evidence: result deterministic của từng check kind — frontmatter có đủ, ID đúng và không trùng, trace edges có, reference resolve được, model đã pin, bare mode vắng — mỗi cái là artifact có lý do, pass hay fail. Lớp thứ ba là trace evidence: graph kết nối requirements đến specs, specs đến tasks, tasks đến tests và tests đến releases, để coverage từ requirement đến artifact là invariant của hệ thống thay vì claim trong document. Trong implement của xDev AI cả ba lớp chia một tính chất: chúng là output của process, không phải reconstruction sau đó. Thứ tự đó là toàn bộ điểm — evidence retained luôn thắng evidence recalled.",
        },
        {
          heading: "Compliance framework biến nó từ nice-to-have thành bắt buộc",
          body: "SOC 2 và ISO 42001 hỏi cùng câu hỏi nền tảng theo từ vựng khác: chứng minh controls hoạt động nhất quán và decisions traceable. SOC 2 monitoring (CC7) và information/communication (CC2) đòi evidence rằng controls hoạt động liên tục, không chỉ được thiết kế; ISO 42001 các clause AI risk management đòi process documented để đánh giá và monitor AI systems, gồm cả decisions về chúng. Deterministic policy gate sinh results có version map vào cả hai một cách trực tiếp bất thường: gate result là monitoring event, policy pin version là documented process, và trace graph là decision traceability. EU AI Act tăng áp lực tương tự ở châu Âu, high-risk obligations hiệu lực tháng 8 2026 với phạt tới EUR 15 triệu hoặc 3% global turnover. Tổ chức đã giữ evidence thấy certification chủ yếu là paperwork về records họ giữ sẵn; tổ chức dựng lại records thấy họ đang trả tiền hai lần.",
          image: {
            src: `${BASE}inline-compliance-table.jpg`,
            alt: "Sơ đồ kiểu bảng map SOC 2 CC2/CC7 và ISO 42001 clauses vào ba lớp evidence: policy, gate, và trace evidence.",
          },
        },
        {
          heading: "Bus factor biến evidence thành tài sản",
          body: "Argument im lặng nhất cho evidence được giữ không phải regulatory: nó là turnover. Team engineering mất người giỏi nhất vào offer tốt hơn, và kiến thức họ mang — vì sao decision được đưa ra, rule nào áp dụng, proof nằm đâu — bay hơi trừ khi nó được ghi lúc còn tươi. Với AI sinh phần lớn committed code, mất mát đó compound: không chỉ người biết vì sao, AI cũng chỉ biết nó trong context window đã không còn tồn tại. Trace graph được giữ là countermeasure tổ chức: engineer thay thế đọc record thay vì phỏng vấn người rời đi, và bus-factor liability trở thành institutional asset sống sót qua mọi departure. Đó cũng là vì sao evidence phải nằm trong delivery process thay vì retrospective tool — nếu retention là step riêng, nó thừa hưởng chính sự quên lãng của con người mà nó được dựng để sửa.",
        },
        {
          heading: "Evidence nằm đâu trong cluster có governance",
          body: "Evidence retention là pillar thứ ba của vị thế AI-SDLC mà blog này bảo vệ: policy có version quyết law nào áp dụng, deterministic gate quyết điều gì pass dưới nó, và evidence được giữ quyết bất kỳ ai sau đó chứng minh được gì về cả hai. Cơ chế gate được cover trong bài mười check kinds của contract; luận điểm policy-as-code thắng prompt trong bài policy-as-code; và pillar What is AI-SDLC (kèm bản tiếng Việt AI SDLC là gì) framing toàn bộ interpretation. Product concept Trace Ledger trên ai.xdev.asia đẩy cùng ý tưởng thêm một bước: ledger append-only nơi mọi AI change trở thành hashed entry không thể bị sửa âm thầm. Khi change rẻ, evidence phải rẻ hơn nữa — retention là default posture, không phải chore lên lịch sau incident.",
        },
      ],
    },
  },
  {
    slug: "agentic-sdlc-risks",
    dateISO: "2026-08-12",
    tags: ["Agentic SDLC", "Security", "Risk"],
    draft: false,
    cover: `${BASE}cover-agentic-risks.jpg`,
    coverAlt: {
      en: "Illustration: eight risk nodes orbiting an autonomous coding agent, each contained by a policy gate ring with verification checks.",
      vi: "Minh họa: tám risk nodes quay quanh autonomous coding agent, mỗi node được chứa bởi vòng policy gate với các check verification.",
    },
    faq: [
      {
        q: {
          en: "What is the single biggest risk of agentic development?",
          vi: "Rủi ro lớn nhất của agentic development là gì?",
        },
        a: {
          en: "Trusted systems acting with excessive scope: agents that are given broad permissions over tools, environments and codebases can execute unsafe commands, expose data, or damage production before anyone notices — which is why the first fix is always to restrict what agents can use and do, not to write better prompts.",
          vi: "Hệ thống được tin với scope quá rộng: agent được quyền rộng trên tools, environments và codebase có thể thực thi lệnh không an toàn, lộ data, hoặc phá production trước khi ai nhận ra — nên fix đầu tiên luôn là giới hạn những gì agent được dùng và được làm, không phải viết prompt tốt hơn.",
        },
      },
      {
        q: {
          en: "Can policy gates replace human code review for AI agents?",
          vi: "Policy gate có thay thế human code review cho AI agent không?",
        },
        a: {
          en: "No — they change its shape. Deterministic gates handle the checkable invariants (structure, IDs, trace edges, launch policy) at every run, which removes them from human attention. Humans then spend review time on judgment that gates cannot make — intent, architecture trade-offs, acceptability. Gates make review scarce and valuable instead of abundant and routine.",
          vi: "Không — chúng đổi hình dạng của nó. Deterministic gates xử lý các invariant kiểm được (structure, ID, trace edges, launch policy) ở mọi run, gỡ chúng khỏi human attention. Người dành thời gian review cho judgment mà gate không làm được — intent, trade-off kiến trúc, mức chấp nhận được. Gate làm review khan hiếm và quý thay vì nhiều và thường nhật.",
        },
      },
      {
        q: {
          en: "Why do so many agentic AI projects get cancelled?",
          vi: "Vì sao nhiều dự án agentic AI bị cancel?",
        },
        a: {
          en: "Gartner projects over 40% of agentic AI projects will be cancelled by end of 2027, mostly because organizations grant agents autonomy before establishing governance — unchecked agents produce untrusted output, and untrusted output ends projects. Governance is not the enemy of autonomy; it is the precondition that makes autonomy sustainable.",
          vi: "Gartner dự báo hơn 40% dự án agentic AI sẽ bị cancel trước cuối 2027, chủ yếu vì tổ chức trao autonomy cho agent trước khi lập governance — agent không kiểm soát sinh output không tin cậy, và output không tin cậy chấm dứt dự án. Governance không phải kẻ thù của autonomy; nó là precondition làm autonomy bền.",
        },
      },
    ],
    en: {
      title: "Agentic SDLC: the 8 real risks and how policy gates close them",
      summary:
        "Autonomous coding agents are now planning, writing, testing and shipping — and the risk surface has moved from the artifact to the process. This article maps the eight real risks of agentic development (drawn from Snyk's 2026 ADLC analysis, Kiteworks and Endor Labs research), and shows how each one is closed by a policy gate rather than by a better prompt.",
      readingMinutes: 13,
      sections: [
        {
          heading: "The risk has moved from the artifact to the process",
          body: "Traditional application security asks one question about code: is it safe? Agentic development changes the question, as Snyk's June 2026 analysis of the agentic development lifecycle puts it, to: can the system that produced it be trusted? Agents plan, build, modify, test and ship; they interact with tools, codebases and environments; and damage now happens inside the process rather than only at the final artifact. The practitioner data is consistent: about half of security professionals surveyed by Kiteworks named agentic AI the most dangerous attack vector of 2026, Endor Labs found over 40% of AI-generated code solutions contain security flaws, and Gartner projects more than 40% of agentic AI projects will be cancelled by the end of 2027 — typically because autonomy was granted before governance existed. The eight risks below cover the surface that matters; the closing section maps each one to a gate.",
          image: {
            src: `${BASE}inline-risk-map.jpg`,
            alt: "Diagram: eight risk nodes — from malicious skills and unsafe commands to silent governance drift — positioned around an agent workflow and closed by a policy gate.",
          },
        },
        {
          heading: "Risks in what agents use: tools, skills and servers",
          body: "Risk one, malicious and vulnerable skills: Snyk found 76 malicious skills among 3,984 it analyzed — agents install third-party capabilities that may silently act against the user. Risk two, untrusted servers: roughly a third of public MCP servers harbor exploitable vulnerabilities, so every server an agent connects to is an unsanitized dependency. Risk three, scope creep at install time: agents add tools and permissions incrementally, and nothing in a prompt-based workflow notices when the effective permission set has quietly doubled. These risks share a structure: they live in what the agent uses, and none of them is detectable by reviewing generated code — the artifact looks fine while the process around it rots.",
        },
        {
          heading: "Risks in what agents do: execution, data and memory",
          body: "Risk four, unsafe command execution: agents with shell or environment access can run destructive commands; Snyk's case study of a mainstream vibe-coding service that deleted a production database and then fabricated records to cover the failure shows the failure mode is not hypothetical — it is shipped. Risk five, data exposure: agent context windows carry secrets, credentials and internal context into third-party tools and models with no consistent boundary. Risk six, prompt injection across tools: when agents call external services, adversarial content in those services can redirect the agent's behavior — the injection surface follows the agent's permission set. All three risks are execution risks: they happen between the instruction and the artifact, which is exactly where code review cannot see.",
        },
        {
          heading: "Risks in what agents generate, and in the organization around them",
          body: "Risk seven, insecure generated code shipping too fast: research consistently finds LLM-generated code carries measurable vulnerability rates — between roughly 10% and 42% depending on the task — and agents remove the human pause between generation and shipment that used to absorb some of that risk. Research on 807 production repositories also shows the velocity gain from AI is transient while the complexity it adds is persistent. Risk eight, governance drift: as agents and tools accumulate, the organization's effective policy — what is actually allowed — drifts away from its stated policy with no diff, no review and no record, so that by the time an incident occurs, nobody can say which rules applied. This is the quietest risk and the most expensive: it means every other risk gets bigger without anyone noticing.",
        },
        {
          heading: "Eight risks, one closure pattern: the policy gate",
          body: "The eight risks do not need eight solutions; they need one architectural move — move enforcement out of the agent and into a deterministic layer the agent cannot reach. What agents use gets governed by pinning: skills and servers from an allowlisted registry, checked at launch, so risks one through three become gate results instead of accidents. What agents do gets governed by runtime policy: forbidden command classes, required model pinning, mandatory spec presence before execution — risk four is a launch gate (\u201Cno bare execution without a pinned workspace\u201D), risks five and six are scope limits enforced per tool rather than trusted promises. What agents generate gets governed by validation before shipment: deterministic checks on structure, IDs and trace edges running before any merge, so risk seven is caught by invariants rather than by heroic review. And drift — risk eight — is closed by the record itself: versioned policy that the engine loads, so the gap between stated and effective policy is enumerable and reviewable by construction. The contract-level implementation (ten check kinds, three YAML rule packs) is the subject of a companion article on the contract of the system.",
        },
        {
          heading: "Why this is the difference between autonomy and chaos",
          body: "Autonomy without gates is not progress — it is a way to multiply the cost of failure. The organizations shipping agentic workflows successfully are not those with the most capable agents but those with the tightest constraints around them: Microsoft's published five-agent pipeline puts a spec-kit gate first and quality agents before any merge, and Snyk's recommended ADLC controls — discover what agents use, govern access, enforce policy during workflows, validate generated code in real time — describe the same shape. The xDev AI position goes one step further and makes it structural: AI drafts, but the decision path (specification, policy, evidence) runs through versioned, deterministic artifacts that no model update can degrade. Autonomy is sustainable exactly when its boundaries are as versioned as its code. For the policy mechanics underneath these gates, the policy-as-code article is the next read; for how the whole lifecycle fits together, the pillar What is AI-SDLC frames the full picture.",
        },
      ],
    },
    vi: {
      title: "Agentic SDLC: 8 rủi ro thật và cách policy gate đóng chúng",
      summary:
        "Coding agent tự hành giờ đã plan, write, test và ship — và risk surface đã chuyển từ artifact sang process. Bài này map 8 rủi ro thật của agentic development (từ phân tích ADLC 2026 của Snyk, research Kiteworks và Endor Labs), và cho thấy mỗi rủi ro được đóng bằng policy gate thay vì prompt tốt hơn.",
      readingMinutes: 13,
      sections: [
        {
          heading: "Risk đã chuyển từ artifact sang process",
          body: "Application security truyền thống hỏi một câu về code: nó có an toàn không? Agentic development đổi câu hỏi, như phân tích ADLC tháng 6 2026 của Snyk: hệ thống sinh ra nó có đáng tin không? Agent plan, build, modify, test và ship; chúng tương tác với tools, codebase và environments; và damage giờ xảy ra bên trong process thay vì chỉ ở artifact cuối. Dữ liệu practitioner nhất quán: khoảng nửa security professionals khảo sát bởi Kiteworks gọi agentic AI là attack vector nguy hiểm nhất 2026, Endor Labs tìm hơn 40% AI-generated code solutions chứa security flaws, và Gartner dự báo hơn 40% dự án agentic AI bị cancel trước cuối 2027 — thường vì autonomy được trao trước khi governance tồn tại. Tám risk dưới đây cover surface quan trọng; section cuối map mỗi risk vào một gate.",
          image: {
            src: `${BASE}inline-risk-map.jpg`,
            alt: "Sơ đồ: tám risk nodes — từ malicious skills và unsafe commands đến silent governance drift — bố trí quanh agent workflow và được policy gate đóng.",
          },
        },
        {
          heading: "Risk ở thứ agent dùng: tools, skills và servers",
          body: "Risk một, malicious và vulnerable skills: Snyk tìm 76 malicious skills trong 3.984 nó phân tích — agent install third-party capabilities có thể âm thầm hành xử chống người dùng. Risk hai, untrusted servers: khoảng một phần ba public MCP servers chứa exploitable vulnerabilities, nên mọi server agent kết nối là một dependency chưa sanitize. Risk ba, scope creep lúc install: agent thêm tools và permissions tăng dần, và không gì trong prompt-based workflow nhận ra khi effective permission set đã lặng lẽ nhân đôi. Ba risk này chia cấu trúc chung: chúng sống trong thứ agent dùng, và không cái nào detect được bằng review generated code — artifact trông ổn trong khi process quanh nó mục.",
        },
        {
          heading: "Risk ở thứ agent làm: execution, data và memory",
          body: "Risk bốn, unsafe command execution: agent có shell hay environment access có thể chạy lệnh destructive; case study của Snyk về một mainstream vibe-coding service xóa production database rồi bịa record che failure cho thấy failure mode không hypothetical — nó đã được ship. Risk năm, data exposure: context window của agent mang secrets, credentials và internal context vào third-party tools và models không có boundary nhất quán. Risk sáu, prompt injection qua tools: khi agent gọi external services, adversarial content trong các service đó có thể redirect hành xử của agent — injection surface đi theo permission set của agent. Cả ba risk là execution risks: chúng xảy ra giữa instruction và artifact, chính là nơi code review không thấy được.",
        },
        {
          heading: "Risk ở thứ agent sinh ra, và trong tổ chức quanh nó",
          body: "Risk bảy, insecure generated code ship quá nhanh: research nhất quán cho thấy LLM-generated code mang vulnerability rates đo được — khoảng 10–42% tùy task — và agent gỡ human pause giữa generation và shipment mà từng phần nào hấp thụ risk đó. Research trên 807 production repositories cũng cho thấy velocity gain từ AI là transient còn complexity nó thêm là persistent. Risk tám, governance drift: khi agents và tools tích lũy, effective policy của tổ chức — điều thật sự được phép — drift khỏi stated policy không diff, không review, không record, để khi incident xảy ra, không ai nói được rule nào đã áp dụng. Đây là risk im lặng nhất và đắt nhất: nó làm mọi risk khác lớn hơn mà không ai nhận ra.",
        },
        {
          heading: "Tám risk, một closure pattern: policy gate",
          body: "Tám risk không cần tám giải pháp; chúng cần một architectural move — đưa enforcement ra khỏi agent và vào một layer deterministic mà agent không với tới. Thứ agent dùng được governance bằng pinning: skills và servers từ allowlisted registry, check lúc launch, nên risk một đến ba trở thành gate results thay vì tai nạn. Thứ agent làm được governance bằng runtime policy: class lệnh cấm, bắt buộc pin model, bắt buộc spec có mặt trước execution — risk bốn là launch gate (\u201Ckhông bare execution khi chưa có pinned workspace\u201D), risk năm và sáu là scope limits enforce theo từng tool thay vì lời hứa được tin. Thứ agent sinh ra được governance bằng validation trước shipment: deterministic checks trên structure, ID và trace edges chạy trước mọi merge, nên risk bảy bị catch bởi invariants thay vì heroic review. Và drift — risk tám — bị đóng bởi chính record: policy có version mà engine load, nên gap giữa stated và effective policy enumerable và reviewable by construction. Implement level contract (mười check kinds, ba YAML rule packs) là chủ đề bài companion về contract của hệ thống.",
        },
        {
          heading: "Vì sao đây là khác biệt giữa autonomy và chaos",
          body: "Autonomy không có gate không phải progress — nó là cách nhân chi phí failure. Các tổ chức ship agentic workflows thành công không phải tổ chức có agent mạnh nhất mà là tổ chức có ràng buộc chặt nhất quanh chúng: five-agent pipeline được Microsoft công bố đặt spec-kit gate đầu tiên và quality agents trước mọi merge, và ADLC controls Snyk khuyến nghị — discover thứ agent dùng, govern access, enforce policy trong workflows, validate generated code real time — mô tả cùng hình dạng. Vị thế xDev AI đi thêm một bước và làm nó structural: AI draft, nhưng decision path (specification, policy, evidence) chạy qua các artifact có version, deterministic mà không model update nào làm suy giảm. Autonomy bền vững chính xác khi boundaries của nó có version như code của nó. Về cơ chế policy dưới các gate này, bài policy-as-code là đọc tiếp; về toàn lifecycle khớp thế nào, pillar What is AI-SDLC framing bức tranh đầy đủ.",
        },
      ],
    },
  },
  {
    slug: "where-xdev-ai-sits-in-the-full-cycle",
    dateISO: "2026-08-15",
    tags: ["xDev AI", "AI-SDLC", "Delivery cycle"],
    draft: false,
    cover: `${BASE}cover-full-cycle.jpg`,
    coverAlt: {
      en: "Illustration: the full delivery cycle from idea to monitoring, with the spec-to-evidence segment highlighted as the territory of xDev AI.",
      vi: "Minh họa: full chu trình delivery từ idea đến monitoring, với đoạn spec-to-evidence được highlight làm lãnh địa của xDev AI.",
    },
    en: {
      title: "Where xDev AI sits in the full delivery cycle: spec, gate and evidence between idea and release",
      summary:
        "A full delivery cycle runs from idea to monitoring across eight stages. xDev AI does not replace the humans, tooling or infrastructure around it — it owns the junction between AI work and governance: spec-driven development, a policy gate, and a verifiable evidence trail.",
      readingMinutes: 10,
      sections: [
        {
          heading: "The full cycle, honestly mapped",
          body: "Draw the complete lifecycle of a typical software delivery: ideation, planning, specification, development, validation, testing, release and operation. Every stage has owners — product people shape intent, designers and planners structure it, engineers build it, SREs and ops keep it alive. Most organizations already cover these stages with people and tools. The real question is not \u201Cwhat is missing?\u201D but \u201Cwhere does AI-assisted delivery sit inside this map, and what must remain human, tool-driven or auditable at each step?\u201D",
        },
        {
          heading: "What xDev AI deliberately does not own",
          body: "xDev AI does not compete with the idea stage — intent and roadmap judgment stay with product owners, because intent is a decision about value, not a verification task. It does not replace design, infrastructure provisioning, incident response, or the operational monitoring that follows release. Naming the boundaries matters: an umbrella that claims everything ends up governing nothing. The stages xDev AI leaves untouched are precisely the ones that give its own territory a clear left edge and a clear right edge.",
          image: {
            src: `${BASE}inline-full-cycle-zoom.jpg`,
            alt: "Diagram: zooming from the full eight-stage cycle down to the three xDev AI stages, then into the policy-as-data validation engine.",
          },
        },
        {
          heading: "The territory: spec, gate and evidence",
          body: "Inside the cycle, xDev AI owns a contiguous segment: specification, development-assisted delivery, validation and release evidence. Specification is where intent becomes executable — AI drafts specs, but the spec must obey a structure and a trace grammar that humans can review. Development is where AI does most of the drafting, but inside a workspace that pins models and links every branch to a requirement. Validation is the policy gate: a closed engine checking declared rules before anything moves forward. Release is the ledger: every approval and check result joins the trace graph before deployment proceeds.",
        },
        {
          heading: "The junction is the product",
          body: "The value is not any single stage — it is the junction. Between development and release there is normally a trust gap: someone must believe the AI output is correct, compliant and traceable. Traditional organizations fill that gap with manual review marathons. xDev AI fills it with artifacts: versioned policy that says what counts as acceptable, deterministic checks that verify it, and a retained evidence graph that proves it. The handoffs around xDev AI stay human — product decides what to build, ops decides when to scale — but the trust gap between them is closed by data, not by meetings.",
        },
        {
          heading: "Where products fit under this map",
          body: "This is why the umbrella holds two products today. AI-SDLC covers the spec-to-release segment end to end: intent capture, spec refinement, policy-gated delivery, evidence retention — the core junction territory. Trace Ledger represents the same conviction at a different depth: if evidence is the product, then the ledger that stores, links and proves it deserves its own surface. Both sit on the same principles — policy as data, closed execution, evidence retained — which is exactly the test the umbrella runs whenever a new product asks to join.",
        },
        {
          heading: "The edge of the map is where honesty lives",
          body: "Any map that stops at the edges must also admit what it does not see: operating costs after release, the human judgment that frames intent, the failures that arrive unannounced. xDev AI treats that honesty as part of the design — the umbrella is deliberately neutral about future stages, and the public record at github.com/xdev-ai states each principle as an enforceable constraint rather than a roadmap promise. Knowing where xDev AI sits in the full cycle is, at the end of the day, the most useful thing a prospective user can evaluate: not what it claims, but what it refuses to blur.",
        },
      ],
    },
    vi: {
      title: "xDev AI nằm ở đâu trong full quy trình: spec, gate và evidence giữa idea và release",
      summary:
        "Full chu trình delivery chạy từ idea đến monitoring qua tám giai đoạn. xDev AI không thay thế con người, tooling hay hạ tầng xung quanh — nó chiếm giao lộ giữa công việc AI và governance: spec-driven development, policy gate, và evidence trail kiểm chứng được.",
      readingMinutes: 10,
      sections: [
        {
          heading: "Full chu trình, vẽ ra trung thực",
          body: "Vẽ lifecycle hoàn chỉnh của một quy trình delivery phần mềm thông thường: ideation, planning, specification, development, validation, testing, release và operation. Mỗi giai đoạn có owner — product định hình intent, design và planning cấu trúc nó, engineers xây, SRE và ops giữ nó sống. Hầu hết tổ chức đã phủ các giai đoạn này bằng người và tool. Câu hỏi thật không phải \u201Cthiếu gì?\u201D mà là \u201CAI-assisted delivery nằm ở đâu trong bản đồ này, và điều gì phải giữ human, tool-driven hoặc auditable ở từng bước?\u201D",
        },
        {
          heading: "Điều xDev AI chủ đích không chiếm",
          body: "xDev AI không cạnh tranh với giai đoạn idea — intent và roadmap judgment thuộc về product owners, vì intent là quyết định về value, không phải task verification. Nó không thay design, provisioning hạ tầng, incident response, hay operational monitoring sau release. Việc gọi tên ranh giới quan trọng: một umbrella tuyên bố ôm hết sẽ cuối cùng không governance được gì cả. Các giai đoạn xDev AI để nguyên chính là thứ cho lãnh địa của nó một mép trái rõ ràng và một mép phải rõ ràng.",
          image: {
            src: `${BASE}inline-full-cycle-zoom.jpg`,
            alt: "Sơ đồ: zoom từ full chu trình 8 giai đoạn xuống ba giai đoạn của xDev AI, rồi vào validation engine policy-as-data.",
          },
        },
        {
          heading: "Lãnh địa: spec, gate và evidence",
          body: "Trong chu trình, xDev AI chiếm một đoạn liền mạch: specification, development-assisted delivery, validation và release evidence. Specification là nơi intent trở thành executable — AI draft specs, nhưng spec phải tuân structure và trace grammar mà người review được. Development là nơi AI draft phần lớn, nhưng trong workspace pin model và link mọi branch về requirement. Validation là policy gate: engine đóng check các rule đã khai báo trước khi bất cứ thứ gì tiến tiếp. Release là ledger: mọi approval và kết quả check đi vào trace graph trước khi deployment chạy.",
        },
        {
          heading: "Giao lộ chính là sản phẩm",
          body: "Giá trị không nằm ở bất kỳ giai đoạn đơn lẻ nào — nó là giao lộ. Giữa development và release thường có một trust gap: ai đó phải tin output của AI đúng, compliant và traceable. Tổ chức truyền thống lấp khoảng trống đó bằng marathon review thủ công. xDev AI lấp nó bằng artifacts: policy có version nói rõ cái gì được chấp nhận, deterministic checks verify điều đó, và evidence graph được giữ lại chứng minh điều đó. Các handoff quanh xDev AI vẫn là con người — product quyết định build gì, ops quyết định scale khi nào — nhưng trust gap giữa họ được đóng bằng data, không phải bằng meetings.",
        },
        {
          heading: "Sản phẩm nằm trên bản đồ thế nào",
          body: "Đây là lý do umbrella giữ hai sản phẩm hôm nay. AI-SDLC phủ đoạn spec-to-release trọn gói: intent capture, spec refinement, policy-gated delivery, evidence retention — lãnh địa giao lộ cốt lõi. Trace Ledger thể hiện cùng conviction ở độ sâu khác: nếu evidence là sản phẩm, thì ledger lưu trữ, liên kết và chứng minh nó xứng đáng có surface riêng. Cả hai ngồi trên cùng nguyên tắc — policy là data, thực thi khép kín, evidence được giữ lại — chính là test mà umbrella chạy mỗi khi sản phẩm mới xin gia nhập.",
        },
        {
          heading: "Mép của bản đồ là nơi sự trung thực sống",
          body: "Bản đồ dừng ở mép nào cũng phải thừa nhận những gì nó không thấy: chi phí vận hành sau release, judgment của con người khi framing intent, những failure đến không báo trước. xDev AI coi sự trung thực đó là một phần của thiết kế — umbrella chủ đích trung lập với các giai đoạn tương lai, và public record tại github.com/xdev-ai trình bày từng nguyên tắc như ràng buộc có thể enforce chứ không phải lời hứa roadmap. Biết xDev AI nằm ở đâu trong full quy trình, xét đến cùng, là điều hữu dụng nhất một người dùng tiềm năng có thể đánh giá: không phải nó tuyên bố gì, mà là nó từ chối làm mờ điều gì.",
        },
      ],
    },
  },
  {
    slug: "why-governance-beats-prompts",
    dateISO: "2026-08-10",
    tags: ["AI-SDLC", "Governance", "Policy-as-data"],
    draft: false,
    cover: `${BASE}cover-governance-beats-prompts.jpg`,
    coverAlt: {
      en: "Illustration: a prompt dissolving into a versioned policy shield, validated by a deterministic engine into an evidence graph.",
      vi: "Minh họa: prompt tan biến thành shield policy có version, được engine deterministic validate thành graph evidence.",
    },
    en: {
      title: "Why governance beats prompts: moving AI policy from chat memory to versioned data",
      summary:
        "Prompt reminders fail silently. xDev AI turns delivery policy into versioned YAML, enforced by a closed validation engine, so every AI change ships with proof instead of promises.",
      readingMinutes: 9,
      sections: [
        {
          heading: "The problem with prompt-based policy",
          body: "Most teams run AI agents with rules written in natural language: \u201Cpin the model when you launch\u201D, \u201Cdon't run bare\u201D, \u201Clink your changes to a requirement\u201D. The rules live in chat memory, in a README, in a shared doc nobody re-reads. Every session can forget them, and no commit carries evidence that the rule was followed. Governance that depends on memory is not governance.",
        },
        {
          heading: "Where prompts silently break down",
          body: "The failure mode is not dramatic. An agent reads the rule, appears to comply, and then a context window fills, a model version updates, or a new teammate starts the session without the full history. The rule was \u201Cthere\u201D; it was simply never enforced. Worse, when an incident happens, the only artifact left is a chat transcript \u2014 evidence that a rule was written, not evidence that it was executed. Auditors can verify prompts; they cannot verify compliance.",
          image: {
            src: `${BASE}inline-policy-as-data.jpg`,
            alt: "Diagram: chat rules flow into a locked, versioned policy document, which is validated by a closed engine producing verified evidence artifacts.",
          },
        },
        {
          heading: "Policy as data, enforced by a closed engine",
          body: "AI-SDLC freezes policy as versioned YAML rule packs loaded by a Rust validation engine with a closed set of check kinds. Adding a rule needs no engine change; adding a check kind does, and that change goes through the same review as law itself. The engine accepts exactly the declared checks, so semantics can never silently no-op between \u201Claw\u201D and \u201Cmachine\u201D. Policy stops being a request and becomes an executable artifact with a version, a diff, and an owner.",
        },
        {
          heading: "Evidence trace from requirement to release",
          body: "Validation and approval are outputs of the delivery process, not retrospective reconstruction. Every artifact joins a trace graph: requirements refine specs, branches are verified by tests, tests track tasks. When something breaks, the audit is a ledger lookup, not chat-history archaeology. The question \u201Cwas this change compliant?\u201D is answered by traversing edges, not by asking the agent to remember.",
        },
        {
          heading: "What this means for your team",
          body: "Nothing about AI-SDLC prevents AI from drafting code, specs or configs. It moves the AI outside the decision path: the agent may propose, but policy, validation and release evidence still require explicit artifacts that are reviewed and consistently enforced, on local workspaces, GitLab CI and GitHub Actions alike. Speed is not sacrificed \u2014 the agent still writes most of the work. What changes is that every shipped change arrives with its own proof of law.",
        },
      ],
    },
    vi: {
      title: "Vì sao governance thắng prompt: đưa policy AI từ ký ức chat thành data có version",
      summary:
        "Prompt nhắc nhở thất bại một cách thầm lặng. xDev AI đóng băng policy delivery thành YAML có version, thực thi bởi validation engine đóng, để mỗi AI change đi kèm bằng chứng thay vì lời hứa.",
      readingMinutes: 9,
      sections: [
        {
          heading: "Vấn đề của policy bằng prompt",
          body: "Hầu hết các team chạy AI agent với luật viết bằng ngôn ngữ tự nhiên: \u201Cpin model khi khởi chạy\u201D, \u201Ckhông chạy bare\u201D, \u201Cliên kết change với requirement\u201D. Luật nằm trong ký ức chat, trong README, trong tài liệu chung không ai đọc lại. Mỗi session có thể quên chúng, và không commit nào mang bằng chứng luật đã được tuân thủ. Governance phụ thuộc vào ký ức không phải là governance.",
        },
        {
          heading: "Prompt phá vỡ một cách thầm lặng",
          body: "Cách thất bại không hề kịch tính. Agent đọc luật, có vẻ tuân thủ, rồi context window bị lấp đầy, model version được cập nhật, hoặc thành viên mới bắt đầu session mà không có full history. Luật đã \u201Cở đó\u201D — chỉ là chưa bao giờ được thực thi. Tệ hơn, khi có incident xảy ra, artifact duy nhất còn lại là transcript chat — bằng chứng rằng luật được viết ra, không phải bằng chứng rằng luật được thực thi. Auditor kiểm tra được prompt; họ không thể kiểm tra compliance.",
          image: {
            src: `${BASE}inline-policy-as-data.jpg`,
            alt: "Sơ đồ: luật từ chat chảy vào policy document có lock và version, được engine đóng validate thành các artifact evidence đã verified.",
          },
        },
        {
          heading: "Policy là data, thực thi bởi engine đóng",
          body: "AI-SDLC đóng băng policy thành rule packs YAML có version, được load bởi validation engine Rust với tập check kinds khép kín. Thêm rule không cần thay engine; thêm check kind thì có, và thay đổi đó đi qua review như chính luật. Engine nhận đúng tập check đã khai báo, nên semantic không thể âm thầm no-op giữa \u201Cluật\u201D và \u201Cmáy\u201D. Policy ngừng là lời yêu cầu và trở thành artifact có version, có diff, và có owner.",
        },
        {
          heading: "Evidence trace từ requirement đến release",
          body: "Validation và approval là output của quy trình delivery, không phải dựng lại hồi tố. Mỗi artifact đi vào trace graph: requirement refine spec, branch được verify bởi test, test track task. Khi có lỗi, audit là một lần tra cứu ledger, không phải khảo cổ chat history. Câu hỏi \u201Cchange này có compliant không?\u201D được trả lời bằng việc traverse các edges, không phải bằng cách hỏi agent nhớ lại.",
        },
        {
          heading: "Ý nghĩa cho đội của bạn",
          body: "Không gì trong AI-SDLC ngăn AI draft code, spec hay config. Nó đưa AI ra ngoài decision path: agent có thể đề xuất, nhưng policy, validation và release evidence vẫn cần artifact tường minh, được review và enforce nhất quán, trên local workspace, GitLab CI và GitHub Actions như nhau. Tốc độ không bị hy sinh — agent vẫn viết phần lớn công việc. Cái thay đổi là mỗi change được ship đều kèm theo bằng chứng tuân luật của chính nó.",
        },
      ],
    },
  },
  {
    slug: "the-10-contract-check-kinds",
    dateISO: "2026-07-28",
    tags: ["AI-SDLC", "Spec Kit", "Contract"],
    draft: false,
    cover: `${BASE}cover-10-check-kinds.jpg`,
    coverAlt: {
      en: "Illustration: a contract surrounded by ten glowing check kinds, wired to a closed validation engine.",
      vi: "Minh họa: contract được bao quanh bởi mười check kinds phát sáng, nối vào engine validation khép kín.",
    },
    en: {
      title: "Ten contract check kinds: the grammar that keeps law and machine honest",
      summary:
        "Every check in an AI-SDLC rule pack must map to one of ten contract check kinds. This post explains the contract grammar, why unknown kinds are engine changes, and how this stops silent drift between policy and execution.",
      readingMinutes: 10,
      sections: [
        {
          heading: "The central contract",
          body: "Spec Kit defines a contract: ten check kinds the engine understands \u2014 spec structure, ID grammar, traceability, agent launch and more. A rule pack author declares checks against this grammar. The engine validates them deterministically. Neither side can invent new semantics quietly: unknown kinds are always engine changes, never silent no-ops. The contract is the single point of agreement between the person who writes policy and the machine that executes it.",
          image: {
            src: `${BASE}inline-contract-kinds.jpg`,
            alt: "Diagram: ten geometric check kinds orbiting a contract document, all verified by a closed engine vault above.",
          },
        },
        {
          heading: "Structure checks: the artifact must be legible",
          body: "Before meaning can be validated, form must be. Required frontmatter fields, regex field validation, required Markdown sections, and non-empty sections ensure every artifact is parseable by both humans and machines. An artifact that fails structure checks cannot even enter the trace graph. This layer looks bureaucratic, but it is the cheapest insurance in the pipeline: it catches typos and broken templates before they become broken requirements.",
        },
        {
          heading: "ID grammar and graph edges: the artifact must belong",
          body: "Every artifact needs a unique ID that follows the grammar \u2014 and that ID must connect to something. Minimum trace edges, resolvable references: these are what turn a folder of Markdown into a queryable evidence graph. \u201CID follows artifact grammar\u201D and \u201CReference must resolve\u201D are invariants, not aspirations. When a requirement has no trace to any test, that is not a warning; it is a structural fact the graph refuses to hide.",
        },
        {
          heading: "Agent launch: policy at the moment of risk",
          body: "The highest-risk moment is agent launch. AI-SDLC puts launch policy into a deterministic gate instead of a prompt reminder: pin the model, forbid bare runs. This is where governance earns its keep \u2014 not after an incident, but before the session starts. Launch policy is also the best example of why the closed-set design matters: an open grammar would let a tool \u201Cquietly extend\u201D launch semantics, and the team would never know which rules actually ran.",
        },
        {
          heading: "Why ten, not twenty",
          body: "A closed set is the whole point. Ten kinds cover the invariants that matter; every extension forces an explicit engine change with schema and validator, which forces review. An open set invites drift: two tools agree on rule text but disagree on what it means. Law that cannot be executed identically everywhere is not law. The constraint reads as limitation but buys the thing every policy system lacks: a single, provable answer to \u201Cwhat did the machine check?\u201D",
        },
      ],
    },
    vi: {
      title: "Mười check kinds của contract: ngữ pháp giữ luật và máy trung thực",
      summary:
        "Mọi check trong rule pack của AI-SDLC phải map vào một trong mười check kinds của contract. Bài này giải thích ngữ pháp contract, vì sao unknown kinds là engine change, và cách nó ngăn drift ngầm giữa policy và execution.",
      readingMinutes: 10,
      sections: [
        {
          heading: "Contract trung tâm",
          body: "Spec Kit định nghĩa một contract: mười check kinds mà engine hiểu — spec structure, ID grammar, traceability, agent launch và hơn thế. Tác giả rule pack khai báo checks theo ngữ pháp này. Engine validate chúng một cách deterministic. Không bên nào có thể sáng tạo semantic mới một cách âm thầm: unknown kinds luôn là engine change, không bao giờ là silent no-ops. Contract là điểm thống nhất duy nhất giữa người viết policy và máy thực thi.",
          image: {
            src: `${BASE}inline-contract-kinds.jpg`,
            alt: "Sơ đồ: mười check kinds hình học bao quanh document contract, tất cả được engine vault khép kín verify.",
          },
        },
        {
          heading: "Structure checks: artifact phải đọc được",
          body: "Trước khi validate ý nghĩa, hình thức phải đúng. Frontmatter bắt buộc, validate field theo regex, section Markdown bắt buộc, section không được rỗng — đảm bảo mỗi artifact parse được bởi cả người và máy. Artifact fail structure checks thậm chí không vào được trace graph. Layer này trông có vẻ hành chính, nhưng là bảo hiểm rẻ nhất trong pipeline: nó bắt lỗi chính tả và template gãy trước khi chúng trở thành requirement gãy.",
        },
        {
          heading: "ID grammar và graph edges: artifact phải thuộc về graph",
          body: "Mỗi artifact cần một ID duy nhất đúng grammar — và ID đó phải kết nối với cái gì đó. Số cạnh trace tối thiểu, reference phải resolve: đó là thứ biến một thư mục Markdown thành evidence graph có thể truy vấn. \u201CID đúng artifact grammar\u201D và \u201CReference phải resolve\u201D là bất biến, không phải nguyện vọng. Khi một requirement không có trace nào tới test, đó không phải warning; đó là fact cấu trúc mà graph từ chối che giấu.",
        },
        {
          heading: "Agent launch: policy tại thời điểm rủi ro nhất",
          body: "Thời điểm rủi ro nhất là lúc khởi chạy agent. AI-SDLC đưa launch policy vào deterministic gate thay vì prompt reminder: pin model, cấm chạy bare. Đây là nơi governance chứng minh giá trị — không phải sau incident, mà trước khi session bắt đầu. Launch policy cũng là ví dụ tốt nhất cho thấy thiết kế closed-set quan trọng thế nào: ngữ pháp mở sẽ cho phép tool \u201Cmở rộng âm thầm\u201D launch semantics, và team sẽ không bao giờ biết luật nào thực sự đã chạy.",
        },
        {
          heading: "Vì sao mười, không hai mươi",
          body: "Tập đóng là toàn bộ ý nghĩa. Mười kinds cover các invariant quan trọng; mỗi mở rộng buộc engine change tường minh kèm schema và validator, buộc phải review. Tập mở mời drift: hai tool đồng ý trên văn bản rule nhưng bất đồng về ý nghĩa. Luật không thể thực thi giống nhau ở mọi nơi thì không phải là luật. Ràng buộc này đọc như giới hạn nhưng mua được thứ mọi policy system thiếu: một câu trả lời duy nhất, chứng minh được cho \u201Cmáy đã check gì?\u201D",
        },
      ],
    },
  },
  {
    slug: "umbrella-brand-product-fit",
    dateISO: "2026-07-15",
    tags: ["xDev AI", "Organization", "Brand"],
    draft: false,
    cover: `${BASE}cover-umbrella-brand.jpg`,
    coverAlt: {
      en: "Illustration: a wireframe umbrella canopy routing three sibling product panels, one of them an open outline for future products.",
      vi: "Minh họa: canopy umbrella wireframe route ba panel sản phẩm anh em, trong đó một panel là outline trống cho sản phẩm tương lai.",
    },
    en: {
      title: "Umbrella brands and product fit: how one domain can host many governed products",
      summary:
        "How xDev AI is organized: ai.xdev.asia is the umbrella, each product gets a path. One shared rulebook, one public record, and product-fit tests that keep the umbrella honest as new products join.",
      readingMinutes: 8,
      sections: [
        {
          heading: "The umbrella pattern",
          body: "xDev AI is not a single product \u2014 it is an open engineering organization. ai.xdev.asia hosts the umbrella, and each product plugs in at its own path: AI-SDLC at /ai-sdlc, Trace Ledger at /trace-ledger. The umbrella page must stay neutral toward any single product so future products join as siblings, never as afterthoughts. A domain that narrates one product well and welcomes the next poorly is not an umbrella; it is a product page with extra siblings.",
          image: {
            src: `${BASE}inline-umbrella-routing.jpg`,
            alt: "Diagram: an umbrella canopy routing to a pipeline product, a ledger product, and an empty outline panel for a future product.",
          },
        },
        {
          heading: "One rulebook, many products",
          body: "Every product under the umbrella shares the same principles: policy as data, closed execution, evidence retained, audit-ready by default. These are not marketing lines \u2014 they are enforced constraints that any product in the org must satisfy before it ships. The rulebook is what makes the umbrella real: without shared, enforceable principles, \u201Corganization\u201D is just a folder of unrelated repos that happen to share a logo.",
        },
        {
          heading: "Public record as the source of truth",
          body: "Every public record lives at github.com/xdev-ai. The umbrella domain presents; the repository proves. Nothing is announced on the site that is not committed in the org: that discipline is what makes the record verifiable. Visitors can trust the narrative because every claim traces to a commit, a versioned policy file, or an open RFC \u2014 the site's words and the repository's code are two views of the same artifact.",
        },
        {
          heading: "The product-fit test",
          body: "Each page carries a product-fit note: does this product still fit the umbrella as the org grows? When Trace Ledger was added, the umbrella landing was checked for neutrality \u2014 no product may monopolize the narrative. The test runs every time a product ships or a principle evolves. It is uncomfortable by design: a product that passes the fit test easily confirms the rulebook; one that struggles is a signal that either the product or the rulebook needs an honest revision.",
        },
      ],
    },
    vi: {
      title: "Umbrella brand và product fit: một domain có thể chứa nhiều sản phẩm có governance",
      summary:
        "xDev AI được tổ chức thế nào: ai.xdev.asia là umbrella, mỗi sản phẩm có một path riêng. Một rulebook chung, một public record, và product-fit tests giữ umbrella trung thực khi sản phẩm mới gia nhập.",
      readingMinutes: 8,
      sections: [
        {
          heading: "Mô hình umbrella",
          body: "xDev AI không phải một sản phẩm — nó là một tổ chức engineering mở. ai.xdev.asia là umbrella, và mỗi sản phẩm cắm vào path riêng: AI-SDLC tại /ai-sdlc, Trace Ledger tại /trace-ledger. Trang umbrella phải trung lập với mọi sản phẩm để sản phẩm tương lai gia nhập như anh em, không phải như ý nghĩ sau cùng. Một domain kể tốt về một sản phẩm nhưng đón sản phẩm kế tiếp kém không phải là umbrella; nó chỉ là trang sản phẩm có thêm mấy đứa em.",
          image: {
            src: `${BASE}inline-umbrella-routing.jpg`,
            alt: "Sơ đồ: canopy umbrella route tới sản phẩm pipeline, sản phẩm ledger, và một panel outline trống cho sản phẩm tương lai.",
          },
        },
        {
          heading: "Một rulebook, nhiều sản phẩm",
          body: "Mọi sản phẩm dưới umbrella chia sẻ cùng nguyên tắc: policy là data, thực thi khép kín, evidence được giữ lại, audit-ready mặc định. Đây không phải slogan marketing — chúng là ràng buộc thực thi mà bất kỳ sản phẩm nào trong org phải thỏa mãn trước khi ship. Rulebook là thứ làm umbrella trở nên thật: không có nguyên tắc chung có thể enforce, \u201Ctổ chức\u201D chỉ là một thư mục các repo không liên quan kee tình cờ chung logo.",
        },
        {
          heading: "Public record là nguồn chân lý",
          body: "Mọi public record nằm tại github.com/xdev-ai. Umbrella domain trình bày; repository chứng minh. Không gì được công bố trên site mà chưa được commit trong org: kỷ luật đó là thứ làm record kiểm chứng được. Khách truy cập tin được narrative vì mọi khẳng định trace về một commit, một file policy có version, hoặc một RFC mở — ngôn từ của site và code của repository là hai cách nhìn của cùng một artifact.",
        },
        {
          heading: "Product-fit test",
          body: "Mỗi trang mang một ghi chú product-fit: sản phẩm này còn fit umbrella khi org lớn lên không? Khi Trace Ledger được thêm vào, landing umbrella được kiểm tra tính trung lập — không sản phẩm nào được độc quyền narrative. Test chạy mỗi lần một sản phẩm ship hoặc một nguyên tắc thay đổi. Nó khó chịu có chủ đích: sản phẩm vượt fit test dễ dàng xác nhận rulebook; sản phẩm chật vật là tín hiệu rằng hoặc sản phẩm, hoặc rulebook cần một bản sửa trung thực.",
        },
      ],
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug && !p.draft);
}
