# Cấu hình Google Search Console cho ai.xdev.asia — Hướng dẫn từng bước

Hướng dẫn này đưa website `https://ai.xdev.asia` (hosting trên GitHub Pages, custom domain) vào Google Search Console (GSC), xác minh quyền sở hữu domain, và submit sitemap với toàn bộ URL bài viết để Google bắt đầu index. Toàn bộ quá trình mất khoảng **15–20 phút** và chỉ cần quyền quản trị domain (DNS) hoặc quyền edit repo GitHub.

**Tác giả:** Manus AI — **Ngày:** 16/08/2026 — **Cập nhật cho:** xdev-ai/ai.xdev.asia (commit `7704b97`, 27 URL trong sitemap)

---

## Tổng quan: vì sao bước này quyết định

Từ trước đến nay toàn bộ nội dung SEO của website (15 bài blog, 2 trang pháp lý, RSS feed, schema JSON-LD) đều đã sẵn sàng — nhưng Google **chưa biết website tồn tại** vì chưa có tài khoản GSC nào khai báo. GSC là kênh duy nhất để: (1) khai báo sitemap cho Googlebot, (2) nhận báo cáo phủ sóng (Coverage) biết URL nào đã/có đang được index, (3) xem từ khóa nào đang mang traffic và vị trí xếp hạng, (4) nhận cảnh báo lỗi schema hoặc lỗi crawl trước khi chúng gây thiệt hại.

Có hai cách xác minh quyền sở hữu. Bảng dưới so sánh ngắn gọn để bạn chọn nhanh:

| Phương án | Quyền cần có | Độ bền | Khuyến nghị |
|---|---|---|---|
| **A. DNS TXT record** | Quyền quản lý DNS của `xdev.asia` (Cloudflare, Hostinger, iNET...) | Vĩnh viễn — không phụ thuộc repo, áp cho toàn bộ `*.xdev.asia` | **Nên dùng** nếu bạn quản lý DNS chính |
| **B. HTML file trong repo** | Quyền push vào repo `xdev-ai/ai.xdev.asia` | Kéo dài chừng nào file còn tồn tại trong repo — đủ ổn định vì deploy GitHub Pages phục vụ file này vĩnh viễn | Nên dùng nếu quyền DNS thuộc bên khác (công ty hosting) |

Phương án B phù hợp nhất với setup hiện tại vì bạn đã có quyền repo — hướng dẫn chính bên dưới dùng **B làm mặc định**, kèm **A** nếu bạn thích vĩnh viễn.

---

## Phần 1 — Đăng ký Google Search Console

**Bước 1.** Mở [https://search.google.com/search-console](https://search.google.com/search-console/welcome) và đăng nhập bằng tài khoản Google bạn muốn dùng (khuyến nghị dùng tài khoản `duy@xdev.asia` nếu đã tạo Google Workspace, hoặc tài khoản Gmail cá nhân cũng được — quyền quản trị hoàn toàn thuộc về bạn).

**Bước 2.** Ở hộp thoại "Add property", chọn **URL prefix** (dòng dưới), **không** chọn "Domain" (phương án Domain property chỉ xác minh được bằng DNS TXT ở Phần 3). Điền chính xác:

```
https://ai.xdev.asia
```

Lưu ý hai chi tiết nhỏ nhưng dễ sai: phải có `https://` và không có dấu slash `/` ở cuối. Nhấn **Continue**.

**Bước 3.** GSC hiện danh sách phương án xác minh. Chọn thẻ **HTML file** → nhấn liên kết tải file, bạn nhận được file tên dạng `googleXXXXXXXX.html` (chuỗi 16 ký tự là mã xác minh duy nhất của bạn, ví dụ `googleabc123def456.html`). Giữ tab này mở.

**Bước 4.** Chép file đó vào repo dưới tên chính xác Google cấp (giữ nguyên tên, ví dụ `googleXXXXXXXX.html`), đặt trong thư mục `client/public/` của repo. GitHub Pages sẽ phục vụ file ở `https://ai.xdev.asia/googleXXXXXXXX.html` ngay sau lần deploy kế tiếp.

**Bước 5.** Commit và push. Mở terminal, chạy:

```bash
cd ai.xdev.asia
mv ~/Downloads/googleXXXXXXXX.html client/public/
git add client/public/googleXXXXXXXX.html
git commit -m "chore: add GSC verification file"
git push origin main
```

Chờ workflow `Deploy to GitHub Pages` hoàn tất (~1 phút). Kiểm tra file đã live:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://ai.xdev.asia/googleXXXXXXXX.html
```

Phải trả về `200` với nội dung chứa mã xác minh.

**Bước 6.** Quay lại tab GSC, nhấn **Verify**. Nếu thành công, màn hình hiện "Ownership verified" kèm biểu tượng xanh — xong.

---

## Phần 2 — Submit sitemap 27 URL

Website hiện có sitemap hoàn chỉnh với 27 URL (3 landing + 15 bài blog EN/VI + 2 trang pháp lý + /docs), đã được khai báo trong `robots.txt` (`Sitemap: https://ai.xdev.asia/sitemap.xml`), và mỗi URL blog kèm schema JSON-LD `Article` + `FAQPage`.

**Bước 1.** Trong GSC, mở **Sitemaps** (menu trái, mục Indexing).

**Bước 2.** Ở ô "Add a new sitemap", điền phần đuôi path:

```
sitemap.xml
```

Nhấn **Submit**. Trạng thái ban đầu là "Pending" — bình thường, Googlebot sẽ fetch trong vài giờ. Sau 24–48h, mục "Discovered URLs" trong sitemap report sẽ đếm số URL Google đã tìm thấy (mục tiêu: 27).

**Bước 3. (Khuyến nghị — buộc Googlecrawl nhanh hơn)** Mở **URL Inspection** (ô tìm kiếm trên cùng), dán `https://ai.xdev.asia/blog` → Enter. Nhấn **Request indexing**. Lặp lại với 2–3 URL pillar quan trọng nhất (ví dụ `/blog/what-is-ai-sdlc`, `/blog/ai-sdlc-la-gi`). Mỗi URL được Request indexing đưa vào hàng đợi crawl ưu tiên — không bắt buộc nhưng rút ngắn thời gian từ "submit" đến "index" từ vài ngày xuống vài giờ.

**Bước 4.** Sau 1 tuần, vào **Pages** (mục Indexing) xem báo cáo: màu xanh lá = indexed, màu xám nhạt = crawled - currently not indexed (bình thường cho trang SPA trong giai đoạn đầu). Tỷ lệ indexed sau 2–4 tuần với content 15 bài chất lượng thường đạt >90%.

---

## Phần 3 — Phương án thay thế: DNS TXT record (vĩnh viễn)

Nếu bạn muốn xác minh một lần cho toàn bộ `xdev.asia` (để sau này thêm `ai-sdlc.xdev.asia` hay subdomain khác không phải xác minh lại):

**Bước 1.** Ở GSC property màn hình chọn "Domain" thay vì "URL prefix", điền:

```
xdev.asia
```

**Bước 2.** Google cấp một TXT record dạng:

```
google-site-verification=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Bước 3.** Mở panel DNS của `xdev.asia` (Cloudflare/iNET/Hostinger — nơi bạn đã cấu hình CNAME trỏ ai.xdev.asia về GitHub Pages), thêm record mới: Type `TXT`, Name/Host `@` (hoặc để trống tùy panel), Value = chuỗi trên.

**Bước 4.** Chờ 5–30 phút (TTL), quay lại GSC nhấn **Verify**. Thành công thì property "Domain" sẽ xác minh vĩnh viễn — không cần file trong repo, không phụ thuộc GitHub.

**Lưu ý khi đã có cả hai:** một website chỉ cần một phương án xác minh hoạt động. Nếu đã dùng DNS TXT rồi thì không cần file HTML trong repo.

---

## Phần 4 — Những việc nên làm ngay sau khi xác minh

GSC cung cấp nhiều báo cáo; bốn mục có giá trị nhất cho website này:

| Báo cáo | Đường dẫn | Dùng để làm gì |
|---|---|---|
| **Pages** | Indexing → Pages | Theo dõi URL nào đã được index, phát hiện lỗi 404/redirect |
| **Search results** | Performance → Search results | Xem query nào mang click, CTR, vị trí trung bình — dữ liệu để quyết định bài viết tiếp theo |
| **Enhancements** | Experience → Page experience | Theo dõi lỗi schema (FAQ, Article) — website đang dùng JSON-LD Article + FAQPage nên mục này quan trọng |
| **URL Inspection** | Ô tìm kiếm trên cùng | Debug một URL cụ thể: Google thấy gì, có index không |

Hai lưu ý bổ sung: (1) website là SPA trên GitHub Pages — Googlebot hiện render JavaScript tốt, nhưng crawl lần đầu có thể chậm hơn site tĩnh; báo cáo Pages sau vài tuần sẽ ổn định; (2) nếu sau này thấy URL blog hiển thị "Crawled - currently not indexed", nguyên nhân phổ biến nhất là nội dung chỉ tồn tại sau khi JS chạy — giải pháp hiện tại đã tốt (sitemap + schema + interlinking), chỉ cần chờ.

---

## Phần 5 — Checklist nhanh

| # | Việc | Xong? |
|---|---|---|
| 1 | Tài khoản GSC đăng nhập | ☐ |
| 2 | Thêm property `https://ai.xdev.asia` (URL prefix) | ☐ |
| 3 | Tải file `googleXXXXXXXX.html` từ GSC | ☐ |
| 4 | Chép vào `client/public/`, commit, push, chờ deploy | ☐ |
| 5 | `curl` trả về 200 → nhấn **Verify** trong GSC | ☐ |
| 6 | Submit `sitemap.xml` trong mục Sitemaps | ☐ |
| 7 | Request indexing cho `/blog` + 2–3 bài pillar | ☐ |
| 8 | (Tùy chọn) DNS TXT record cho property Domain `xdev.asia` | ☐ |
| 9 | Sau 1 tuần: kiểm tra Pages report, CTR, schema errors | ☐ |

---

## Tài liệu liên quan trong repo

| File | Nội dung |
|---|---|
| `SETUP_FIREBASE_PLAUSIBLE.md` | Cấu hình Firebase (newsletter) + Plausible (analytics) |
| `client/public/sitemap.xml` | Sitemap hiện tại — 27 URL, tự cập nhật khi có bài mới |
| `client/public/robots.txt` | Khai báo sitemap + allow all |
| `client/index.html` | JSON-LD Organization + WebSite schema |
