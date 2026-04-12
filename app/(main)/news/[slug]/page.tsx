import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NewsApi } from '../../../news/services/api';
import { ArticleDetail } from './ArticleDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await NewsApi.getArticle(slug);
  
  if (!article) {
    return {
      title: 'Không tìm thấy bài viết'
    };
  }
  
  return {
    title: article.seo.metaTitle || article.title,
    description: article.seo.metaDescription || article.excerpt,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags.map(t => t.name),
      images: [
        {
          url: article.featuredImage.url,
          alt: article.featuredImage.alt,
          width: 1200,
          height: 675
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage.url]
    }
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await NewsApi.getArticle(slug);
  
  if (!article) {
    notFound();
  }
  
  // Increment view count
  await NewsApi.incrementViewCount(slug);
  
  return <ArticleDetail article={article} />;
}
