import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Không tìm thấy bài viết
      </h2>
      <p className="text-gray-600 mb-8">
        Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        href="/news"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Xem tất cả bài viết
      </Link>
    </div>
  );
}
