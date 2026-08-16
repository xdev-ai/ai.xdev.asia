/* Legal pages: Privacy Policy (/privacy) and Terms of Use (/terms) — bilingual (EN/VI). */
import { Link } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, FileText } from "lucide-react";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ShieldTraceMark } from "@/components/ShieldTraceMark";
import { useLang } from "@/i18n/LanguageContext";

type LegalCopy = {
  title: string;
  updated: string;
  sections: readonly { heading: string; body: React.ReactNode }[];
  contactLine: string;
};

const legalCopy: Record<"en" | "vi", Record<"privacy" | "terms", LegalCopy>> = {
  en: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated: August 16, 2026",
      contactLine: "Questions about this policy can be sent to duy@xdev.asia.",
      sections: [
        {
          heading: "1. Who we are",
          body: (
            <>
              <strong>xDev AI</strong> is an open engineering organization. Its public website (
              <code className="font-mono">ai.xdev.asia</code>) hosts the umbrella brand pages, product sheets (AI-SDLC,
              Trace Ledger), technical documentation, policy registry, and an engineering blog.
            </>
          ),
        },
        {
          heading: "2. Data we do not collect",
          body: (
            <>
              This website is <strong>static</strong>: it does not run a server, does not create user accounts, and does
              not store sessions. By default, we do not collect personal data. Analytics is limited to a
              privacy-friendly, cookie-less provider (Plausible Analytics), which records only anonymous aggregate
              signals (page views, device type, country) with IP addresses truncated and anonymized — see Section 4.
            </>
          ),
        },
        {
          heading: "3. What happens locally on your device",
          body: (
            <>
              The website stores two small values in your browser's <code className="font-mono">localStorage</code>:
              your preferred language (EN/VI) and, if you open a deep link on a static host, the path used to restore
              the page after redirect. Nothing is transmitted back to us by this storage. You can clear it at any time
              in your browser settings.
            </>
          ),
        },
        {
          heading: "4. Analytics",
          body: (
            <>
              If enabled by the site administrator, this site uses <strong>Plausible Analytics</strong>, a
              cookie-less, privacy-first analytics service. Plausible does not set cookies, does not use persistent
              identifiers, and anonymizes IP addresses. No personal data is shared with advertisers or third parties.
              No analytics runs at all while the service is not configured.
            </>
          ),
        },
        {
          heading: "5. Newsletter (optional, future)",
          body: (
            <>
              If a newsletter signup is added later, the email address you provide will be stored in a cloud database
              (Firebase Firestore) solely for sending updates. You will be able to unsubscribe at any time, and the
              address can be deleted on request. This section will be updated at that point.
            </>
          ),
        },
        {
          heading: "6. External services",
          body: (
            <>
              The site links to external services, including GitHub (<code className="font-mono">github.com/xdev-ai</code>)
              and Google Fonts. Their own privacy policies apply once you leave this site. Font files are served by
              Google Fonts API; no other third-party embeds are used.
            </>
          ),
        },
        {
          heading: "7. Contact",
          body: <>The public contact address of the organization is duy@xdev.asia.</>,
        },
      ],
    },
    terms: {
      title: "Terms of Use",
      updated: "Last updated: August 16, 2026",
      contactLine: "Questions about these terms can be sent to duy@xdev.asia.",
      sections: [
        {
          heading: "1. Acceptance",
          body: (
            <>
              By accessing <code className="font-mono">ai.xdev.asia</code> you agree to these terms. If you do not
              agree, please do not use the site.
            </>
          ),
        },
        {
          heading: "2. Content and license",
          body: (
            <>
              All articles, documentation, policy texts and diagrams on this site are published as an{" "}
              <strong>open record</strong> of xDev AI's engineering practice. Blog content and technical documents may
              be shared and referenced with attribution. Brand assets (logo, shield-and-trace mark) remain property of
              xDev AI and may not be used to imply endorsement without written consent.
            </>
          ),
        },
        {
          heading: "3. Product pages",
          body: (
            <>
              The AI-SDLC and Trace Ledger pages describe products and concepts of xDev AI. Product details, rule packs
              and policy registry content are governed by the public repositories in the xdev-ai GitHub organization.
              In case of conflict, the repository content is authoritative.
            </>
          ),
        },
        {
          heading: "4. No warranty",
          body: (
            <>
              Content is provided <em>as is</em>, for informational purposes. xDev AI makes no warranty of any kind
              regarding accuracy, completeness or fitness for a particular purpose, and accepts no liability for
              damages arising from the use of this site or its content.
            </>
          ),
        },
        {
          heading: "5. Acceptable use",
          body: (
            <>
              You may not use this site to distribute malware, perform automated scraping that harms availability, or
              infringe the rights of others. The site is served on a free tier; reasonable use keeps it free for
              everyone.
            </>
          ),
        },
        {
          heading: "6. Changes",
          body: <>These terms may be updated at any time. The version date above always reflects the current text.</>,
        },
        {
          heading: "7. Contact",
          body: <>The public contact address of the organization is duy@xdev.asia.</>,
        },
      ],
    },
  },
  vi: {
    privacy: {
      title: "Chính sách Riêng tư",
      updated: "Cập nhật lần cuối: 16 tháng 8, 2026",
      contactLine: "Câu hỏi về chính sách này có thể gửi tới duy@xdev.asia.",
      sections: [
        {
          heading: "1. Chúng tôi là ai",
          body: (
            <>
              <strong>xDev AI</strong> là tổ chức engineering mở. Website công khai (
              <code className="font-mono">ai.xdev.asia</code>) lưu trữ trang umbrella brand, trang sản phẩm (AI-SDLC,
              Trace Ledger), tài liệu kỹ thuật, policy registry và blog engineering.
            </>
          ),
        },
        {
          heading: "2. Dữ liệu chúng tôi KHÔNG thu thập",
          body: (
            <>
              Website này là <strong>static</strong>: không có server, không tạo tài khoản người dùng, không lưu
              session. Theo mặc định, chúng tôi không thu thập dữ liệu cá nhân. Analytics chỉ giới hạn ở một nhà cung
              cấp tôn trọng quyền riêng tư, không cookie (Plausible Analytics), chỉ ghi nhận tín hiệu tổng hợp ẩn danh
              (lượt xem trang, loại thiết bị, quốc gia) với IP bị cắt ngắn và ẩn danh — xem Mục 4.
            </>
          ),
        },
        {
          heading: "3. Những gì lưu cục bộ trên thiết bị của bạn",
          body: (
            <>
              Website lưu hai giá trị nhỏ trong <code className="font-mono">localStorage</code> của trình duyệt: ngôn
              ngữ ưu tiên (EN/VI) và, nếu bạn mở deep link trên host static, đường dẫn dùng để khôi phục trang sau khi
              redirect. Không có gì từ bộ nhớ này được truyền về phía chúng tôi. Bạn có thể xóa bất kỳ lúc nào trong
              cài đặt trình duyệt.
            </>
          ),
        },
        {
          heading: "4. Analytics",
          body: (
            <>
              Nếu được quản trị viên bật, site dùng <strong>Plausible Analytics</strong> — dịch vụ analytics cookie-less,
              privacy-first. Plausible không đặt cookie, không dùng persistent identifier, và ẩn danh địa chỉ IP. Không
              có dữ liệu cá nhân nào được chia sẻ với quảng cáo hay bên thứ ba. Khi dịch vụ chưa cấu hình thì không có
              analytics nào chạy.
            </>
          ),
        },
        {
          heading: "5. Newsletter (tuỳ chọn, tương lai)",
          body: (
            <>
              Nếu sau này có newsletter signup, email bạn cung cấp sẽ được lưu trong cloud database (Firebase
              Firestore) chỉ để gửi bản tin. Bạn có thể unsubscribe bất kỳ lúc nào và yêu cầu xóa địa chỉ. Mục này sẽ
              được cập nhật khi đó.
            </>
          ),
        },
        {
          heading: "6. Dịch vụ bên ngoài",
          body: (
            <>
              Site có liên kết tới các dịch vụ bên ngoài, gồm GitHub (
              <code className="font-mono">github.com/xdev-ai</code>) và Google Fonts. Khi rời khỏi site, chính sách
              riêng tư của họ sẽ áp dụng. File font được serve bởi Google Fonts API; không có embed bên thứ ba nào
              khác.
            </>
          ),
        },
        {
          heading: "7. Liên hệ",
          body: <>Địa chỉ liên hệ công khai của tổ chức là duy@xdev.asia.</>,
        },
      ],
    },
    terms: {
      title: "Điều khoản Sử dụng",
      updated: "Cập nhật lần cuối: 16 tháng 8, 2026",
      contactLine: "Câu hỏi về điều khoản này có thể gửi tới duy@xdev.asia.",
      sections: [
        {
          heading: "1. Chấp nhận",
          body: (
            <>
              Khi truy cập <code className="font-mono">ai.xdev.asia</code>, bạn đồng ý với các điều khoản này. Nếu không
              đồng ý, vui lòng không sử dụng site.
            </>
          ),
        },
        {
          heading: "2. Nội dung và giấy phép",
          body: (
            <>
              Tất cả bài viết, tài liệu, văn bản policy và sơ đồ trên site được công bố như{" "}
              <strong>open record</strong> của thực hành engineering xDev AI. Nội dung blog và tài liệu kỹ thuật được
              phép chia sẻ và trích dẫn kèm ghi nhận nguồn. Brand assets (logo, shield-and-trace mark) là tài sản của
              xDev AI và không được dùng để ngụ ý endorse nếu không có đồng ý bằng văn bản.
            </>
          ),
        },
        {
          heading: "3. Trang sản phẩm",
          body: (
            <>
              Trang AI-SDLC và Trace Ledger mô tả sản phẩm và khái niệm của xDev AI. Chi tiết sản phẩm, rule packs và
              nội dung policy registry được quản lý bởi các repository công khai trong GitHub org xdev-ai. Trong trường
              hợp xung đột, nội dung repository là authoritative.
            </>
          ),
        },
        {
          heading: "4. Không bảo hành",
          body: (
            <>
              Nội dung được cung cấp <em>nguyên trạng</em>, chỉ nhằm mục đích thông tin. xDev AI không bảo hành bất kỳ
              điều gì về tính chính xác, đầy đủ hay sự phù hợp cho mục đích cụ thể, và không chịu trách nhiệm về thiệt
              hại phát sinh từ việc sử dụng site hay nội dung của nó.
            </>
          ),
        },
        {
          heading: "5. Sử dụng chấp nhận được",
          body: (
            <>
              Bạn không được dùng site này để phát tán malware, scraping tự động gây hại tính sẵn sàng, hoặc xâm phạm
              quyền của người khác. Site chạy trên free tier; sử dụng hợp lý giữ nó miễn phí cho mọi người.
            </>
          ),
        },
        {
          heading: "6. Thay đổi",
          body: <>Các điều khoản có thể được cập nhật bất kỳ lúc nào. Ngày phiên bản ở trên luôn phản ánh văn bản hiện hành.</>,
        },
        {
          heading: "7. Liên hệ",
          body: <>Địa chỉ liên hệ công khai của tổ chức là duy@xdev.asia.</>,
        },
      ],
    },
  },
};

export default function Legal({ page }: { page: "privacy" | "terms" }) {
  const { t, locale } = useLang();
  const copy = legalCopy[locale][page];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, locale]);
  return (
    <div className="min-h-screen bg-[#eef4f2] text-[#152540]">
      {/* ============ TOPBAR ============ */}
      <header className="sticky top-0 z-40 border-b border-[rgba(111,203,220,.23)] bg-[#102440] text-[#eaf3f4]">
        <div className="mx-auto flex h-14 items-center justify-between px-4 md:h-16 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <ShieldTraceMark className="size-9 text-cyan-300" />
            <span className="leading-tight">
              <strong className="block text-[15px] tracking-tight">xDev AI</strong>
              <em className="block text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">Engineering notes</em>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              className="hidden items-center gap-1.5 rounded border border-cyan-400/30 px-3 py-1.5 text-[13px] text-cyan-100 hover:bg-[#143553] md:inline-flex"
            >
              {t.blog.navBlog}
            </Link>
            <Link
              href="/ai-sdlc"
              className="hidden items-center gap-1.5 rounded border border-cyan-400/30 px-3 py-1.5 text-[13px] text-cyan-100 hover:bg-[#143553] md:inline-flex"
            >
              {t.nav.aiSdlc}
            </Link>
            <LanguageSwitch />
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="bg-[#102440] text-[#eaf3f4]">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6 md:py-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/80">{t.legal.navLabel}</p>
          <h1 className="mt-4 text-[clamp(1.7rem,5vw,2.6rem)] font-semibold leading-[1.15] tracking-tight">{copy.title}</h1>
          <p className="mx-auto mt-4 font-mono text-[12px] text-[#b9c9d7]">{copy.updated}</p>
        </div>
      </section>

      {/* ============ CONTENT ============ */}
      <main className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] text-[#5a8090] hover:text-[#152540]">
          <ArrowLeft size={14} /> {t.blog.backToBlog}
        </Link>
        <div className="space-y-9">
          {copy.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-[17px] font-semibold tracking-tight text-[#152540]">{s.heading}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#37536a]">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-10 border-t border-[#c9d8d2] pt-6 text-[13px] text-[#4a6470]">{copy.contactLine}</p>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#c9d8d2] bg-[#e6efec]">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-[12px] text-[#4a6470] md:flex-row md:text-left">
          <span className="font-mono tracking-[0.18em]">AI.XDEV.ASIA / ENGINEERING NOTES</span>
          <span>OPEN ENGINEERING ORGANIZATION — 2026</span>
        </div>
      </footer>
    </div>
  );
}
