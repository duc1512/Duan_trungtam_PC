// Mock Data for Tech News System
// Can be replaced with real CMS later (Sanity, Strapi, etc.)

import { Article, Category, Author, Tag, ArticleSummary } from '../types';

export const authors: Author[] = [
  {
    id: 'author-1',
    name: 'Nguyễn Minh Tuấn',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
    bio: 'Senior Tech Editor với 10 năm kinh nghiệm trong ngành công nghệ. Chuyên gia về AI và gaming hardware.',
    role: 'editor',
    social: {
      twitter: 'https://twitter.com/minhtuan',
      linkedin: 'https://linkedin.com/in/minhtuan'
    }
  },
  {
    id: 'author-2',
    name: 'Lê Thị Hương',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    bio: 'Tech journalist chuyên viết về smartphone, laptop và xu hướng công nghệ mới.',
    role: 'journalist',
    social: {
      twitter: 'https://twitter.com/lehuong'
    }
  },
  {
    id: 'author-3',
    name: 'Trần Văn Phúc',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
    bio: 'Hardware reviewer và PC builder với hơn 5 năm kinh nghiệm.',
    role: 'contributor',
    social: {
      linkedin: 'https://linkedin.com/in/tranphuc'
    }
  },
  {
    id: 'author-4',
    name: 'Phạm Hoàng Anh',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    bio: 'Gaming enthusiast và esports analyst.',
    role: 'contributor'
  }
];

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Tin Công Nghệ',
    slug: 'tin-cong-nghe',
    description: 'Tin tức mới nhất về thế giới công nghệ',
    color: '#6366f1',
    articleCount: 45
  },
  {
    id: 'cat-2',
    name: 'Đánh Giá',
    slug: 'danh-gia',
    description: 'Đánh giá chuyên sâu về sản phẩm công nghệ',
    color: '#e11d48',
    articleCount: 32
  },
  {
    id: 'cat-3',
    name: 'PC Gaming',
    slug: 'pc-gaming',
    description: 'Tin tức và hướng dẫn về PC Gaming',
    color: '#059669',
    articleCount: 28
  },
  {
    id: 'cat-4',
    name: 'Laptop',
    slug: 'laptop',
    description: 'Đánh giá và tin tức về laptop',
    color: '#0891b2',
    articleCount: 24
  },
  {
    id: 'cat-5',
    name: 'Smartphone',
    slug: 'smartphone',
    description: 'Thế giới di động và smartphone',
    color: '#7c3aed',
    articleCount: 19
  },
  {
    id: 'cat-6',
    name: 'AI & Machine Learning',
    slug: 'ai-ml',
    description: 'Trí tuệ nhân tạo và học máy',
    color: '#ea580c',
    articleCount: 15
  }
];

export const tags: Tag[] = [
  { id: 'tag-1', name: 'NVIDIA', slug: 'nvidia' },
  { id: 'tag-2', name: 'Intel', slug: 'intel' },
  { id: 'tag-3', name: 'AMD', slug: 'amd' },
  { id: 'tag-4', name: 'RTX 5090', slug: 'rtx-5090' },
  { id: 'tag-5', name: 'AI', slug: 'ai' },
  { id: 'tag-6', name: 'ChatGPT', slug: 'chatgpt' },
  { id: 'tag-7', name: 'iPhone', slug: 'iphone' },
  { id: 'tag-8', name: 'Samsung', slug: 'samsung' },
  { id: 'tag-9', name: 'Build PC', slug: 'build-pc' },
  { id: 'tag-10', name: 'Gaming', slug: 'gaming' },
  { id: 'tag-11', name: 'SSD', slug: 'ssd' },
  { id: 'tag-12', name: 'CPU', slug: 'cpu' }
];

export const articles: Article[] = [
  {
    id: 'article-1',
    title: 'NVIDIA RTX 5090 Ti: Quái Vật Hiệu Năng Mới Nhất 2026',
    slug: 'nvidia-rtx-5090-ti-quai-vat-hieu-nang-2026',
    excerpt: 'Card đồ họa flagship mới của NVIDIA mang đến hiệu năng vượt trội, đặt nền móng cho gaming 8K và AI tại local.',
    content: `
## NVIDIA RTX 5090 Ti: Bước Nhảy Vọt Về Hiệu Năng

NVIDIA vừa chính thức ra mắt GeForce RTX 5090 Ti, card đồ họa flagship mới nhất dựa trên kiến trúc Blackwell Ultra. Đây được xem là bước nhảy vọt lớn nhất trong lịch sử GPU kể từ thời Pascal.

### Thông Số Kỹ Thuật Ấn Tượng

- **GPU**: GB202 (Blackwell Ultra)
- **CUDA Cores**: 24,576
- **Tensor Cores**: Gen 5 (8th gen)
- **RT Cores**: Gen 4 (4th gen)
- **VRAM**: 32GB GDDR7 @ 28Gbps
- **Bus Width**: 512-bit
- **TDP**: 600W

### Hiệu Năng Gaming

Trong các bài test thực tế, RTX 5090 Ti cho thấy hiệu năng vượt trội:

- **Cyberpunk 2077** (4K Ultra + RT): 145 FPS (vs 95 FPS trên RTX 4090)
- **Alan Wake 2** (4K Path Tracing): 85 FPS
- **Microsoft Flight Simulator**: 120 FPS ở 4K Ultra

### Tính Năng AI Mới

Với 32GB VRAM GDDR7, 5090 Ti trở thành lựa chọn lý tưởng cho:
- LLM inference tại local (Llama 3, Mistral)
- Stable Diffusion XL render nhanh gấp 3x
- Video upscaling với DLSS 4.0

### Giá Bán & Ngày Ra Mắt

- **Giá MSRP**: $1,999 USD (~50 triệu VND)
- **Ngày ra mắt**: 15/04/2026
- **Giá tại Việt Nam**: Dự kiến 55-60 triệu VND

### Kết Luận

RTX 5090 Ti là card đồ họa mạnh nhất từng tồn tại, nhưng mức giá và công suất tiêu thụ khiến nó chỉ phù hợp với đối tượng enthusiast và professional. Với đa số game thủ, RTX 5080 hoặc 5070 Ti có lẽ là lựa chọn hợp lý hơn.
    `,
    author: authors[0],
    category: categories[2],
    tags: [tags[0], tags[3], tags[9]],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&h=675&fit=crop',
      alt: 'NVIDIA RTX 5090 Ti Founders Edition',
      caption: 'NVIDIA RTX 5090 Ti với thiết kế tản nhiệt mới'
    },
    publishedAt: '2026-04-10T08:00:00Z',
    updatedAt: '2026-04-10T15:30:00Z',
    readTime: 8,
    featured: true,
    trending: true,
    viewCount: 15420,
    likeCount: 892,
    seo: {
      metaTitle: 'NVIDIA RTX 5090 Ti: Đánh Giá Chi Tiết & Hiệu Năng 2026',
      metaDescription: 'Card đồ họa NVIDIA RTX 5090 Ti mới nhất 2026. Hiệu năng gaming 8K, AI tại local, giá bán tại Việt Nam.',
      keywords: ['NVIDIA', 'RTX 5090', 'RTX 5090 Ti', 'GPU', 'Gaming', 'Review']
    }
  },
  {
    id: 'article-2',
    title: 'Hướng Dẫn Build PC Gaming 50 Triệu Tối Ưu 2026',
    slug: 'huong-dan-build-pc-gaming-50-trieu-toi-uu-2026',
    excerpt: 'Cấu hình PC gaming mạnh mẽ trong ngân sách 50 triệu, tối ưu linh kiện để chơi mượt các tựa game AAA mới nhất ở 2K/4K.',
    content: `
## Build PC Gaming 50 Triệu: Cân Bằng Hiệu Năng & Giá Thành

Với ngân sách 50 triệu đồng, bạn hoàn toàn có thể xây dựng một bộ PC gaming chơi tốt tất cả game AAA ở 1440p Ultra và 4K High. Dưới đây là cấu hình chi tiết và lý giải từng lựa chọn.

### Cấu Hình Đề Xuất

| Linh Kiện | Model | Giá Tham Khảo |
|-----------|-------|---------------|
| **CPU** | Intel Core i7-14700K | 8.500.000₫ |
| **GPU** | RTX 4070 Ti SUPER | 22.000.000₫ |
| **RAM** | 32GB DDR5-6000 CL30 | 3.200.000₫ |
| **SSD** | 2TB NVMe Gen4 | 2.800.000₫ |
| **Mainboard** | Z790 DDR5 | 5.500.000₫ |
| **PSU** | 850W 80 Plus Gold | 2.500.000₫ |
| **Case** | Mid Tower Airflow | 1.800.000₫ |
| **Tản Nhiệt** | 360mm AIO | 3.200.000₫ |
| **Tổng** | | **~50.000.000₫** |

### Hiệu Năng Thực Tế

**1440p (2K) Gaming:**
- Cyberpunk 2077 (Ray Tracing Ultra): 85-95 FPS
- Alan Wake 2 (Full Path Tracing): 75 FPS
- Call of Duty MW3: 165+ FPS

**4K Gaming:**
- Cyberpunk 2077 (Ultra, No RT): 65-75 FPS
- Red Dead Redemption 2: 85 FPS
- Starfield: 70 FPS

### Lựa Chọn Thay Thế

**Nếu muốn tiết kiệm:**
- CPU i5-14600K (-2 triệu)
- GPU RTX 4070 SUPER (-5 triệu)
- RAM 16GB DDR5 (-1.5 triệu)

**Nếu muốn nâng cấp:**
- CPU i9-14900K (+5 triệu)
- GPU RTX 4080 SUPER (+8 triệu)
- Thêm SSD 2TB (+2.8 triệu)

### Kết Luận

Cấu hình này mang lại hiệu năng tuyệt vời cho gaming 2K/4K mà không phải chi quá nhiều. Bạn có thể stream, edit video và làm việc với AI tại local một cách thoải mái.
    `,
    author: authors[2],
    category: categories[2],
    tags: [tags[8], tags[9], tags[11]],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1587202372775-4abc9295e321?w=1200&h=675&fit=crop',
      alt: 'PC Gaming Build với RGB lighting'
    },
    publishedAt: '2026-04-08T10:00:00Z',
    readTime: 12,
    featured: true,
    trending: false,
    viewCount: 8930,
    likeCount: 567,
    seo: {
      metaTitle: 'Build PC Gaming 50 Triệu: Cấu Hình Tối Ưu 2026',
      metaDescription: 'Hướng dẫn build PC gaming 50 triệu chơi tốt 2K/4K. Cấu hình chi tiết, hiệu năng thực tế, giá linh kiện 2026.',
      keywords: ['Build PC', 'PC Gaming', '50 triệu', 'Cấu hình PC', 'Gaming 2026']
    }
  },
  {
    id: 'article-3',
    title: 'iPhone 17 Pro Max: Có Đáng Nâng Cấp Từ iPhone 15?',
    slug: 'iphone-17-pro-max-danh-gia-co-nen-nang-cap',
    excerpt: 'Đánh giá chi tiết iPhone 17 Pro Max: Camera periscope mới, chip A19 Pro và những cải tiến đáng chú ý khác.',
    content: `
## iPhone 17 Pro Max: Kỷ Nguyên Mới Của iPhone?

Sau nhiều tin đồn, iPhone 17 series cuối cùng đã ra mắt với những nâng cấp đáng kể. Có đáng để nâng cấp từ iPhone 15 Pro Max hay không?

### Những Thay Đổi Chính

**1. Thiết Kế**
- Titan Grade 5 mới, nhẹ hơn 10%
- Màn hình viền siêu mỏng 1mm
- Kích thước tương tự, nhưng mỏng hơn 0.4mm

**2. Camera System**
- 48MP Main (cảm biến lớn hơn 25%)
- 48MP Ultra Wide mới
- Periscope 12MP 6x zoom (lần đầu trên iPhone)
- Hỗ trợ quay video 8K30fps

**3. Hiệu Năng**
- Chip A19 Pro (3nm Gen 2)
- GPU 6-core mới
- Neural Engine nhanh hơn 40%
- RAM 12GB (tăng từ 8GB)

### So Sánh Với iPhone 15 Pro Max

| Tính Năng | iPhone 15 PM | iPhone 17 PM | Khác Biệt |
|-----------|--------------|--------------|-----------|
| Camera Zoom | 5x | 6x | +20% |
| RAM | 8GB | 12GB | +50% |
| Sạc | 27W | 45W | +67% |
| Màn Hình | 120Hz | 120Hz LTPO 2.0 | Tiết kiệm pin |

### Có Nên Nâng Cấp?

**Nâng cấp nếu:**
- Bạn chụp ảnh/zoom nhiều
- Cần RAM lớn hơn cho multitasking
- Muốn sạc nhanh hơn
- Đang dùng iPhone 14 trở xuống

**Không cần nâng cấp nếu:**
- iPhone 15 Pro Max vẫn đáp ứng tốt nhu cầu
- Ngân sách hạn chế
- Không chụp ảnh nhiều

### Giá Bán Tại Việt Nam

- iPhone 17 Pro Max 256GB: 36.990.000₫
- iPhone 17 Pro Max 512GB: 42.990.000₫
- iPhone 17 Pro Max 1TB: 48.990.000₫

### Kết Luận

iPhone 17 Pro Max là bản nâng cấp đáng giá, đặc biệt về camera và hiệu năng. Tuy nhiên, nếu iPhone hiện tại vẫn đáp ứng tốt, bạn có thể chờ iPhone 18 với những đổi mới lớn hơn.
    `,
    author: authors[1],
    category: categories[4],
    tags: [tags[6]],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&h=675&fit=crop',
      alt: 'iPhone 17 Pro Max Titanium Blue'
    },
    publishedAt: '2026-04-05T07:00:00Z',
    readTime: 6,
    featured: false,
    trending: true,
    viewCount: 12350,
    likeCount: 723,
    seo: {
      metaTitle: 'iPhone 17 Pro Max: Có Nên Nâng Cấp Từ iPhone 15?',
      metaDescription: 'Đánh giá iPhone 17 Pro Max 2026. So sánh với iPhone 15, camera periscope, chip A19 Pro, có đáng nâng cấp?',
      keywords: ['iPhone 17', 'iPhone 17 Pro Max', 'Apple', 'Review', 'So sánh']
    }
  },
  {
    id: 'article-4',
    title: 'ChatGPT-5: Bước Đột Phá Trong Trí Tuệ Nhân Tạo',
    slug: 'chatgpt-5-openai-dot-pha-ai-2026',
    excerpt: 'OpenAI chính thức ra mắt ChatGPT-5 với khả năng reasoning và multimodal vượt trội. Đây có phải là bước tiến gần AGI?',
    content: `
## ChatGPT-5: Khi AI Biết "Suy Nghĩ"

OpenAI vừa tung ra ChatGPT-5, phiên bản mới nhất của mô hình ngôn ngữ lớn với những khả năng chưa từng có. Điểm đặc biệt nhất là khả năng "reasoning" - suy luận đa bước.

### Khả Năng Mới Nổi Bật

**1. Advanced Reasoning**
- Có thể giải các bài toán phức tạp vật lý, toán học
- Lập luận logic đa bước
- Tự kiểm tra và sửa lỗi trong quá trình suy nghĩ

**2. Multimodal Nâng Cao**
- Hiểu và tạo video (tối đa 1 phút)
- Phân tích âm thanh chi tiết
- Xử lý đồng thời văn bản, hình ảnh, âm thanh

**3. Memory & Personalization**
- Nhớ cuộc trò chuyện từ nhiều tháng trước
- Học sở thích và phong cách của người dùng
- Tự động đề xuất dựa trên history

### Benchmark Performance

| Test | GPT-4 | GPT-5 | Improvement |
|------|-------|-------|-------------|
| MMLU | 86.4% | 92.1% | +5.7% |
| HumanEval | 67% | 89% | +22% |
| Math (AIME) | 39% | 78% | +39% |
| Code Forces | 392 | 1847 | +371% |

### Ứng Dụng Thực Tế

**Cho Developer:**
- Viết code phức tạp với architecture planning
- Debug lỗi cryptic trong large codebase
- Tạo documentation tự động

**Cho Business:**
- Phân tích dữ liệu và tạo báo cáo chi tiết
- Draft legal documents với reasoning
- Customer support với context awareness

**Cho Education:**
- Tutor cá nhân với adaptive learning
- Giải thích khái niệm phức tạp
- Tạo bài tập tùy chỉnh

### Hạn Chế & Đạo Đức

- Vẫn có thể "hallucinate" dù ít hơn
- Cần cân nhắc về việc thay thế việc làm
- Chi phí API cao hơn đáng kể
- Cần regulations rõ ràng hơn

### Giá Cả & Availability

- **ChatGPT Plus**: $20/tháng (giữ nguyên)
- **ChatGPT Pro**: $200/tháng (mới, unlimited GPT-5)
- **API**: $0.03/1K input tokens, $0.06/1K output

### Kết Luận

ChatGPT-5 đại diện cho một bước nhảy vọt trong AI. Khả năng reasoning và multimodal mở ra vô số ứng dụng mới. Tuy nhiên, câu hỏi về AGI vẫn còn - GPT-5 rất giỏi nhưng vẫn chưa có "consciousness" thực sự.
    `,
    author: authors[0],
    category: categories[5],
    tags: [tags[4], tags[5]],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop',
      alt: 'AI Neural Network Visualization'
    },
    publishedAt: '2026-04-03T09:00:00Z',
    readTime: 10,
    featured: true,
    trending: true,
    viewCount: 21560,
    likeCount: 1456,
    seo: {
      metaTitle: 'ChatGPT-5: Đánh Giá & Trải Nghiệm AI Mới Nhất 2026',
      metaDescription: 'OpenAI ChatGPT-5 ra mắt. Khả năng reasoning, multimodal, hiệu năng benchmark. Có phải bước tiến gần AGI?',
      keywords: ['ChatGPT-5', 'OpenAI', 'AI', 'GPT-5', 'AGI', 'Review']
    }
  },
  {
    id: 'article-5',
    title: 'SSD PCIe Gen 5: Đáng Nâng Cấp Hay Chờ Đợi?',
    slug: 'ssd-pcie-gen-5-danh-gia-co-nen-nang-cap',
    excerpt: 'SSD Gen 5 với tốc độ đọc 14GB/s có thực sự mang lại trải nghiệm khác biệt trong gaming và công việc hàng ngày?',
    content: `
## SSD PCIe Gen 5: Tốc Độ Có Phải Là Tất Cả?

Với tốc độ đọc tuần tự lên đến 14,000 MB/s, SSD Gen 5 nghe có vẻ như một bước ngoặt. Nhưng liệu người dùng thông thường có thực sự cần?

### Thông Số Kỹ Thuật

**Samsung 990 PRO Gen 5:**
- Read: 14,500 MB/s
- Write: 13,000 MB/s
- IOPS Read: 2.4M
- Controller: Pascal (Samsung)
- NAND: V-NAND 236L TLC

**WD Black SN850X Gen 4 (để so sánh):**
- Read: 7,300 MB/s
- Write: 6,600 MB/s
- IOPS Read: 1.2M

### Test Thực Tế

**Windows Boot Time:**
- Gen 4: 12.3 giây
- Gen 5: 11.8 giây
- Khác biệt: 0.5 giây (không đáng kể)

**Game Loading (Cyberpunk 2077):**
- Gen 4: 18.5 giây
- Gen 5: 16.2 giây
- Khác biệt: 2.3 giây (nhận ra được)

**File Copy (100GB):**
- Gen 4: 2 phút 45 giây
- Gen 5: 1 phút 28 giây
- Khác biệt: Rõ rệt với file lớn

**Video Editing (Premiere Pro timeline scrubbing):**
- Gen 4: Occasional stutter với 4K footage
- Gen 5: Mượt hoàn toàn

### Có Nên Nâng Cấp?

**NÊN nâng cấp nếu:**
- Làm video editing 4K/8K
- Làm việc với large datasets
- Machine Learning / AI training
- Cần copy file lớn thường xuyên

**KHÔNG CẦN nâng cấp nếu:**
- Chỉ gaming và duyệt web
- Ngân sách hạn chế
- Đã có Gen 4 tốt

### Vấn Đề Nhiệt Độ

SSD Gen 5 chạy rất nóng:
- Không tản nhiệt: 85-95°C
- Với heatsink cơ bản: 65-75°C
- Với active cooling: 50-60°C

→ **BẮT BUỘC** phải có tản nhiệt tốt

### Giá Cả

- Samsung 990 PRO 2TB Gen 5: 5.500.000₫
- WD Black SN850X 2TB Gen 4: 3.200.000₫
- Premium: 2.300.000₫ (~70% đắt hơn)

### Mainboard Support

Cần mainboard có slot PCIe 5.0 x4 M.2:
- Intel Z890, B860
- AMD X870E, B850

### Kết Luận

SSD Gen 5 là công nghệ tuyệt vời nhưng chưa cần thiết cho đa số người dùng. Chỉ nên nâng cấp nếu bạn là professional user hoặc enthusiast với ngân sách thoải mái.
    `,
    author: authors[2],
    category: categories[1],
    tags: [tags[10]],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=1200&h=675&fit=crop',
      alt: 'NVMe SSD M.2 Drive'
    },
    publishedAt: '2026-04-01T14:00:00Z',
    readTime: 7,
    featured: false,
    trending: false,
    viewCount: 6780,
    likeCount: 342,
    seo: {
      metaTitle: 'SSD PCIe Gen 5: Có Nên Nâng Cấp Từ Gen 4?',
      metaDescription: 'Đánh giá SSD PCIe Gen 5 2026. Tốc độ 14GB/s, có thực sự khác biệt trong gaming? So sánh với Gen 4.',
      keywords: ['SSD Gen 5', 'PCIe 5.0', 'NVMe', 'Samsung 990 PRO', 'Review']
    }
  },
  {
    id: 'article-6',
    title: 'Intel Core Ultra Series 3: Trải Nghiệm AI PC Đầu Tiên',
    slug: 'intel-core-ultra-series-3-danh-gia-ai-pc',
    excerpt: 'Intel ra mắt dòng CPU mới với NPU tích hợp, hứa hẹn mang AI đến PC phổ thông. Trải nghiệm thực tế ra sao?',
    content: `
## Intel Core Ultra Series 3: AI Cho Mọi Nhà

Intel vừa ra mắt Core Ultra Series 3, dòng CPU tầm trung đầu tiên có NPU (Neural Processing Unit) tích hợp. Đây là bước đi quan trọng đưa AI đến với đại chúng.

### Dòng Sản Phẩm

**Core Ultra 7 265K:**
- 8P + 12E cores (20T)
- NPU: 13 TOPS
- Base/Max: 3.9/5.5 GHz
- TDP: 65W/125W
- Giá: $419

**Core Ultra 5 245K:**
- 6P + 8E cores (14T)
- NPU: 10 TOPS
- Base/Max: 3.6/5.2 GHz
- TDP: 65W/125W
- Giá: $309

### NPU Là Gì?

Neural Processing Unit - chip chuyên dụng cho AI tasks:
- Image recognition
- Voice processing
- Background blur (video call)
- Local LLM inference
- Windows Studio Effects

### Hiệu Năng AI

| Task | CPU Only | NPU | GPU | NPU Advantage |
|------|----------|-----|-----|---------------|
| Background Blur | 15% CPU | 2% CPU | 8% GPU | Hiệu quả năng lượng |
| Voice Isolation | 12% CPU | 1% CPU | - | Tiết kiệm pin |
| Image Gen (Stable Diffusion) | 45s | 25s | 8s | Balance speed/power |
| Local LLM (7B) | 8 tok/s | 15 tok/s | 35 tok/s | Chạy song song |

### Hiệu Năng Gaming

So với i7-14700K:
- Cyberpunk 2077: -3% (không đáng kể)
- CS2: -5%
- Starfield: -2%

→ Gaming vẫn phụ thuộc GPU chủ yếu

### Điểm Mạnh

**1. AI Features Sẵn Có**
- Windows Copilot tăng tốc
- Real-time translation trong Teams
- Auto framing trong video call
- Eye contact correction

**2. Hiệu Quả Năng Lượng**
- Laptop: +2-3 giờ pin với AI tasks
- Desktop: Tiết kiệm điện cho background tasks

**3. Tương Lai Proof**
- Nhiều ứng dụng sẽ tận dụng NPU
- Windows 12 sẽ optimize cho NPU

### Điểm Yếu

**1. Gaming Performance**
- Không cải thiện so với thế hệ trước
- Thậm chí chậm hơn một chút

**2. Giá Thành**
- Đắt hơn ~$50 so với tương đương không NPU
- Mainboard mới (Z890) cần thiết

**3. Software Support**
- Nhiều app chưa tận dụng NPU
- Cần thời gian để ecosystem phát triển

### Có Nên Mua?

**NÊN mua nếu:**
- Dùng laptop và cần pin tốt
- Hay video call với AI effects
- Muốn chuẩn bị cho tương lai AI
- Không chỉ chơi game

**KHÔNG cần nếu:**
- Chỉ chơi game (giữ 14700K)
- Dùng desktop với GPU mạnh
- Ngân sách hạn chế

### Giá Tại Việt Nam

- Core Ultra 7 265K: 11.500.000₫
- Core Ultra 5 245K: 8.500.000₫
- Z890 mainboard: 6-12 triệu₫

### Kết Luận

Core Ultra Series 3 là bước đi đúng hướng của Intel. NPU sẽ trở thành tiêu chuẩn trong tương lai gần. Tuy nhiên, hiện tại chỉ phù hợp nếu bạn thực sự cần AI features hoặc muốn future-proof.
    `,
    author: authors[0],
    category: categories[1],
    tags: [tags[1], tags[11]],
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=1200&h=675&fit=crop',
      alt: 'Intel Processor Chip Closeup'
    },
    publishedAt: '2026-03-28T11:00:00Z',
    readTime: 9,
    featured: false,
    trending: true,
    viewCount: 9870,
    likeCount: 534,
    seo: {
      metaTitle: 'Intel Core Ultra Series 3: AI PC Đầu Tiên',
      metaDescription: 'Đánh giá Intel Core Ultra Series 3. NPU tích hợp, AI features, hiệu năng gaming. Có nên mua?',
      keywords: ['Intel', 'Core Ultra', 'Series 3', 'NPU', 'AI PC', 'Review']
    }
  }
];

// Helper functions
export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return articles.filter(article => article.category.slug === categorySlug);
}

export function getArticlesByTag(tagSlug: string): Article[] {
  return articles.filter(article => 
    article.tags.some(tag => tag.slug === tagSlug)
  );
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(article => article.featured);
}

export function getTrendingArticles(): Article[] {
  return articles.filter(article => article.trending);
}

export function getLatestArticles(limit: number = 10): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedArticles(currentArticle: Article, limit: number = 3): Article[] {
  return articles
    .filter(article => 
      article.id !== currentArticle.id && (
        article.category.id === currentArticle.category.id ||
        article.tags.some(tag => 
          currentArticle.tags.some(currentTag => currentTag.id === tag.id)
        )
      )
    )
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return articles.filter(article =>
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.name.toLowerCase().includes(lowercaseQuery))
  );
}

export function getPopularTags(limit: number = 10): Tag[] {
  const tagCounts = new Map<string, number>();
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagCounts.set(tag.id, (tagCounts.get(tag.id) || 0) + 1);
    });
  });
  
  return tags
    .map(tag => ({ ...tag, count: tagCounts.get(tag.id) || 0 }))
    .sort((a, b) => (b.count as number) - (a.count as number))
    .slice(0, limit) as Tag[];
}

export function toArticleSummary(article: Article): ArticleSummary {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    author: article.author,
    category: article.category,
    featuredImage: article.featuredImage,
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    viewCount: article.viewCount,
    featured: article.featured
  };
}
