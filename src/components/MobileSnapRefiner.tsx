"use client";

import { useEffect } from "react";

/**
 * MobileSnapRefiner — tinh chỉnh hành vi snap cho thiết bị di động (touch,
 * màn hình nhỏ hơn 1024px), chỉ áp dụng trên trang chủ có `.snap-wrap`.
 *
 * Vấn đề CSS thuần không giải quyết được:
 *  - `scroll-snap-type: y proximity` luôn "dính" gần section dù người dùng
 *    đang đọc dở một section cao hơn màn hình (hero trên iPhone SE cao hơn
 *    viewport vì các stat xếp dọc).
 *  - Không có ngưỡng vận tốc: vuốt nhẹ 1cm cũng kéo trang sang section mới.
 *
 * Giải pháp (JS nhẹ, passive listeners):
 *  1. Khi section hiện tại cao hơn viewport (có nội dung cần cuộn nội bộ),
 *     tạm tắt CSS snap (`scroll-snap-type: none`) — người dùng cuộn tự do
 *     bên trong section.
 *  2. Khi cuộn chạm đầu/cuối của section đó, bật lại snap để nhịp cuộn
 *     tiếp theo nhảy sang section kế tiếp theo đúng intent.
 *  3. Ngưỡng vận tốc tối thiểu (velocity threshold): vuốt chậm ngắn không
 *     trigger nhảy section — browser native snap handling vẫn giữ.
 *
 * Tôn trọng `prefers-reduced-motion` và `pointer: coarse` để chỉ chạy trên
 * thiết bị touch thật; desktop có chuột giữ nguyên snap CSS mandatory.
 */
export function MobileSnapRefiner() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrap = document.querySelector<HTMLElement>(".snap-wrap");
    if (!wrap) return;

    // Chỉ chạy trên thiết bị touch + màn hình nhỏ (mobile).
    const isTouchDevice = () =>
      window.matchMedia("(pointer: coarse)").matches &&
      window.matchMedia("(max-width: 1023px)").matches;
    const isReduced = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isTouchDevice() || isReduced()) return;

    let raf = 0;
    let lastY = wrap.scrollTop;
    let lastT = performance.now();

    // Ngưỡng vận tốc: dưới ngưỡng này, cuộn nhẹ không trigger nhảy section
    // (người dùng đang tinh chỉnh vị trí đọc). Đơn vị: px/ms.
    const VEL_THRESHOLD = 0.35;

    const snapEnabled = () =>
      getComputedStyle(wrap).scrollSnapType.includes("y") &&
      !getComputedStyle(wrap).scrollSnapType.includes("none");

    /** Quyết định bật/tắt snap theo vị trí cuộn hiện tại. */
    const syncSnapState = () => {
      const st = wrap.scrollTop;
      const sh = wrap.scrollHeight;
      const vh = wrap.clientHeight;

      // Section nào cao hơn viewport thì cho phép cuộn nội bộ: tắt snap khi
      // đang ở giữa nội dung section đó (không chạm đầu/cuối của section).
      const sections = wrap.querySelectorAll<HTMLElement>(".snap-section");
      let insideTallSection = false;
      for (const sec of sections) {
        if (sec.scrollHeight <= vh) continue; // section vừa viewport — OK
        const top = sec.offsetTop;
        // Đang ở trong vùng cuộn nội bộ của section (cách 2 đầu > 8px)
        if (st > top + 8 && st < top + sec.scrollHeight - vh - 8) {
          insideTallSection = true;
          break;
        }
      }

      if (insideTallSection && snapEnabled()) {
        wrap.style.scrollSnapType = "none";
      } else if (!insideTallSection && !snapEnabled()) {
        wrap.style.scrollSnapType = ""; // về giá trị CSS gốc
      }

      // Khi đã thoát section cao (chạm đáy/top của nó), cho snap tự dính.
      if (!insideTallSection) wrap.style.scrollSnapType = "";
      // Edge: ở đáy trang cuối cùng — tắt snap để không bị "nảy"
      wrap.style.scrollSnapType =
        sh - st - vh < 4 ? "none" : wrap.style.scrollSnapType || "";
    };

    const onTouchMove = () => {
      const now = performance.now();
      const dy = wrap.scrollTop - lastY;
      const dt = now - lastT;
      lastY = wrap.scrollTop;
      lastT = now;

      // Vuốt chậm (dưới ngưỡng) trong section cao → tắt hẳn snap để đọc thoải mái.
      const vel = Math.abs(dy) / (dt || 1);
      if (vel < VEL_THRESHOLD) {
        const sections = wrap.querySelectorAll<HTMLElement>(".snap-section");
        const st = wrap.scrollTop;
        const vh = wrap.clientHeight;
        const inTall = [...sections].some((sec) => {
          if (sec.scrollHeight <= vh) return false;
          const top = sec.offsetTop;
          return st > top + 8 && st < top + sec.scrollHeight - vh - 8;
        });
        if (inTall) wrap.style.scrollSnapType = "none";
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncSnapState);
    };

    wrap.addEventListener("scroll", onScroll, { passive: true });
    wrap.addEventListener("touchmove", onTouchMove, { passive: true });

    syncSnapState(); // trạng thái ban đầu
    const mq = window.matchMedia("(pointer: coarse), (max-width: 1023px)");
    const onMq = () => {
      if (!isTouchDevice() || isReduced()) return;
      syncSnapState();
    };
    window.addEventListener("resize", onMq);

    return () => {
      wrap.removeEventListener("scroll", onScroll);
      wrap.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onMq);
      cancelAnimationFrame(raf);
      wrap.style.scrollSnapType = ""; // cleanup về CSS gốc
    };
  }, []);

  return null;
}
