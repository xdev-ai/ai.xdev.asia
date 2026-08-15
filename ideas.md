# Hướng thiết kế — AI-SDLC Spec Kit Docs

## Ba hướng khám phá

### 1. Governance Blueprint
**Very Brief Intro:** Một technical brief đậm chất bản vẽ kỹ thuật, dùng dark ink, giấy ivory và các đường trace cyan. Cảm giác là một hệ thống governance được kiểm chứng thay vì một landing page công nghệ hào nhoáng.
**Probability:** 0.07

### 2. Evidence Ledger
**Very Brief Intro:** Lấy cảm hứng từ hồ sơ kiểm toán và sổ cái kỹ thuật: typography serif, metadata dày, dấu xác nhận amber. Trọng tâm là bằng chứng, version và sự truy xuất.
**Probability:** 0.04

### 3. Quiet Systems Manual
**Very Brief Intro:** Một manual gọn, sáng, gần với sách hướng dẫn hệ thống công nghiệp. Layout giàu khoảng trống, kết cấu giấy mờ và phân cấp chữ rõ ràng.
**Probability:** 0.09

---

## Hướng được chọn: Governance Blueprint

### Design Movement
**Swiss technical editorial** kết hợp với ngôn ngữ trực quan của **blueprint engineering**: khắt khe, có hệ thống và luôn ưu tiên khả năng đọc.

### Core Principles
1. **Evidence before decoration:** mọi màu nhấn và linework phải diễn đạt trạng thái, trace hoặc hierarchy.
2. **Asymmetric document rail:** nội dung không nằm trong một hero căn giữa; nó được tổ chức như một technical file với rail điều hướng cố định và section marker.
3. **Hard precision, warm material:** lưới kỹ thuật và khung vuông sắc nét đi cùng nền giấy ivory có texture để tránh cảm giác dashboard vô hồn.
4. **Calm hierarchy:** typography, khoảng trắng và metadata dẫn đường thay vì animation hoặc gradient phô trương.

### Color Philosophy
Navy ink là nền của authority và deterministic enforcement. Ivory là bề mặt của bản thiết kế có thể review. Cyan là trace signal — dùng cho liên kết, scan, focus và luồng chạy; amber là dấu verification hiếm, chỉ dành cho bằng chứng hoặc trạng thái đã kiểm.

### Layout Paradigm
Một **document spine**: trên desktop, rail bên trái giữ brand, section navigator và status; main canvas lệch sang phải như một sheet kỹ thuật. Hero dùng mảng hình có trọng lượng bên phải, văn bản khóa vào mép trái. Các section có số thứ tự, line continuation và các card có cách xếp tầng thay vì grid card đồng đều.

### Signature Elements
1. **Trace lines:** line cyan hairline nối metadata với content hoặc node trạng thái.
2. **Index markers:** number tag dạng `01 — CONTRACT` xuất hiện ở mỗi section.
3. **Verification dot:** chấm amber nhỏ báo điểm kiểm chứng, chỉ dùng có chủ ý.

### Interaction Philosophy
Điều hướng cảm giác như tra cứu một hồ sơ kỹ thuật: nav scroll đến một phần rõ ràng, active item thay đổi nhẹ; code samples có copy action; user không bị dừng lại bởi modal hay animation trang trí.

### Animation
Chỉ animate opacity/transform. Hero chart và section cards vào bằng stagger nhẹ 40–60ms; hover trace kéo từ trái sang phải trong 180ms. Scroll navigation, click copy, và keyboard focus phải tức thì. Tôn trọng `prefers-reduced-motion`.

### Typography System
**Space Grotesk** cho display và headings — cấu trúc, lập luận, độ căng vừa đủ. **IBM Plex Mono** cho metadata, code và labels — tạo lập luận kỹ thuật. Body dùng Space Grotesk với size 16px / line-height 1.65 để duy trì độ đọc trên nền ivory. Headline không vượt quá 3 weight.

### Brand Essence
**AI-SDLC Spec Kit là lớp luật có version giúp đội ngũ biến AI-assisted delivery thành bằng chứng có thể truy vết và kiểm chứng.**

Tính cách thương hiệu: **precise, accountable, composed**.

### Brand Voice
Headline và CTA nói bằng câu ngắn, kỹ thuật, có tính khẳng định; microcopy nêu đúng hệ quả thay vì hứa hẹn chung chung.

Ví dụ: “Luật thay đổi được. Enforcement thì không mơ hồ.”

Ví dụ: “Từ requirement đến evidence — mỗi liên kết đều có lý do.”

### Wordmark & Logo
Logo mark là **shield-and-trace**: ba đường trace cấu trúc thành một biểu tượng shield, với một điểm amber làm verification witness. Wordmark dùng Space Grotesk tracking hơi nén, không phải font mặc định.

### Signature Brand Color
**Trace Cyan — `#29D3E8`**: màu của đường liên kết được xác nhận, rất hiếm khi dùng làm fill lớn.

## Style Decisions

1. Desktop rail là **document spine** bắt buộc: luôn mang shield-and-trace mark, compressed wordmark, file/status metadata và section index có trạng thái active.
2. **Trace Cyan** chỉ báo liên kết, active navigation, technical noun, key numeral hoặc verified state; display typography dùng navy là chính.
3. Hero và technical imagery ưu tiên **validation path, rule ledger, dependency graph, versioned file và shield-trace schematic** thay cho hình minh họa AI/network chung chung.
4. Section marker, metadata band và verification dot phải tạo cảm giác một technical record liên tục giữa các section, không phải các block marketing rời rạc.
