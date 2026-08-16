"use client";

/* Optional newsletter signup — works fully offline/local today.
   When a Firebase project is configured (VITE_FIREBASE_API_KEY), emails are written to Firestore.
   No local DB needed: GitHub Pages is static-only; Firestore replaces it. */
import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { subscribeNewsletter, isFirebaseConfigured } from "@/lib/firebase";

export default function NewsletterForm() {
  const { locale } = useLang();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const vi = locale === "vi";
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <aside className="mt-12 border border-[#b5c6c9] bg-white p-6 md:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5a8090]">
        {vi ? "BẢN TIN" : "NEWSLETTER"}
      </p>
      <h3 className="mt-3 text-[18px] font-semibold tracking-tight text-[#152540]">
        {vi ? "Nhận ghi chú engineering mới nhất" : "Get the latest engineering notes"}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#37536a]">
        {vi
          ? "Chúng tôi sẽ thông báo qua email khi có bài viết mới về governed AI delivery. Không spam, unsubscribe bất kỳ lúc nào."
          : "We'll email you when new posts about governed AI delivery ship. No spam, unsubscribe anytime."}
      </p>
      {status === "done" ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded border border-emerald-300/60 bg-emerald-50 px-4 py-2 text-[13px] text-emerald-700">
          <CheckCircle2 size={15} />
          {vi ? "Đã ghi nhận. Cảm ơn bạn!" : "Noted. Thank you!"}
        </p>
      ) : (
        <form
          className="mt-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!valid || status === "busy") return;
            setStatus("busy");
            const result = await subscribeNewsletter(email.trim());
            setStatus(result.ok ? "done" : "error");
          }}
        >
          <label className="sr-only">{vi ? "Email của bạn" : "Your email"}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={vi ? "you@example.com" : "you@example.com"}
            className="w-full flex-1 rounded border border-[#b5c6c9] bg-[#f6fafa] px-3 py-2 text-[14px] text-[#152540] placeholder:text-[#8da4af] focus:border-cyan-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!valid || status === "busy"}
            className="inline-flex items-center justify-center gap-2 rounded bg-[#102440] px-4 py-2 text-[13px] font-medium text-cyan-100 transition hover:bg-[#143553] disabled:opacity-50"
          >
            <Mail size={14} />
            {status === "busy" ? (vi ? "Đang gửi..." : "Sending...") : vi ? "Đăng ký" : "Subscribe"}
          </button>
        </form>
      )}
      <p className="mt-3 text-[11px] text-[#8da4af]">
        {vi
          ? isFirebaseConfigured()
            ? "Email được lưu an toàn trong Firestore (Firebase). Bạn có thể yêu cầu xóa bất kỳ lúc nào."
            : "Chưa cấu hình database: email được lưu cục bộ trong trình duyệt của bạn cho đến khi backend (Firebase Firestore) được bật — không gì được truyền đi."
          : isFirebaseConfigured()
            ? "Email is stored securely in Firestore (Firebase). You can request deletion anytime."
            : "No database configured yet: your email is stored locally in your browser until the backend (Firebase Firestore) is enabled — nothing is transmitted."}
      </p>
    </aside>
  );
}
