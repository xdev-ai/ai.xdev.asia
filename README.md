# xDev AI — Umbrella Portal

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fai.xdev.asia&label=ai.xdev.asia)](https://ai.xdev.asia)
[![Organization](https://img.shields.io/badge/Org-xDev%20AI-123450)](https://github.com/xdev-ai)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

xDev AI là tổ chức engineering mở xây dựng các hệ thống biến AI-assisted software delivery thành record có thể kiểm chứng. Repo này chứa mã nguồn của cổng thông tin tổng thể (umbrella portal) tại [ai.xdev.asia](https://ai.xdev.asia).

## Kiến trúc thương hiệu

Chúng tôi vận hành theo mô hình **Umbrella Brand**:
- **xDev AI** (`ai.xdev.asia`): Thương hiệu tổng thể, giữ các nguyên tắc chung về governance và evidence.
- **AI-SDLC** (`ai.xdev.asia/ai-sdlc`): Sản phẩm đầu tiên — governance layer cho AI delivery.
- **Trace Ledger** (`ai.xdev.asia/trace-ledger`): Sản phẩm concept — sổ cái evidence hợp nhất.

## Cấu trúc dự án

Dự án được xây dựng với Vite, React và Tailwind CSS, tuân thủ ngôn ngữ thiết kế **Governance Blueprint**:

```text
client/
├── public/brand/      # Logo, favicon và các tài sản thương hiệu xDev AI
├── src/
│   ├── pages/
│   │   ├── Umbrella.tsx      # Trang chủ tổng thể (/)
│   │   ├── AiSdlc.tsx        # Trang chi tiết sản phẩm AI-SDLC (/ai-sdlc)
│   │   └── TraceLedger.tsx   # Trang concept Trace Ledger (/trace-ledger)
│   └── components/
│       └── ShieldTraceMark.tsx # Biểu tượng Shield-and-Trace cốt lõi
```

## Bắt đầu nhanh

1. Clone repository:
   ```bash
   git clone https://github.com/xdev-ai/ai.xdev.asia.git
   cd ai.xdev.asia
   ```

2. Cài đặt dependencies và chạy dev server:
   ```bash
   pnpm install
   pnpm dev
   ```

3. Build sản phẩm:
   ```bash
   pnpm build
   ```

## Đóng góp

Chúng tôi hoan nghênh mọi đóng góp. Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết về quy trình làm việc và tiêu chuẩn mã nguồn của chúng tôi.

---

© 2026 xDev AI. Open engineering for a governed AI future.
