import { Metadata } from 'next';
import { NewsList } from './NewsList';

export const metadata: Metadata = {
  title: 'Tin Tức Công Nghệ | Tin Mới Nhất 2026',
  description: 'Cập nhật tin tức công nghệ mới nhất: đánh giá sản phẩm, tin tức gaming, AI, smartphone, laptop và xu hướng tech.',
  keywords: ['tin tức công nghệ', 'tech news', 'đánh giá sản phẩm', 'gaming', 'AI', 'smartphone', 'laptop'],
  openGraph: {
    title: 'Tin Tức Công Nghệ | Tin Mới Nhất 2026',
    description: 'Cập nhật tin tức công nghệ mới nhất: đánh giá sản phẩm, tin tức gaming, AI, smartphone, laptop và xu hướng tech.',
    type: 'website',
    locale: 'vi_VN'
  }
};

export default function NewsPage() {
  return <NewsList />;
}
