import SingleBlog from '@/components/SingleBlog/SingleBlog';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Helper function to extract text from HTML
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, '');
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Check if environment variables are available
    if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
      console.warn(
        'NEXT_PUBLIC_WORDPRESS_API_URL not found, using fallback metadata'
      );
      return {
        title: 'Blog Post - BootPrices',
        description: 'Read the latest boot reviews and guides on BootPrices.',
      };
    }

    // Fetch the blog post data
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?slug=${slug}&_embed&_fields=id,title,excerpt,slug,date,meta,rankmath_head,_embedded`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch blog post: ${response.status} ${response.statusText}`
      );
      return {
        title: `${slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())} - BootPrices`,
        description: 'Read the latest boot reviews and guides on BootPrices.',
      };
    }

    const posts = await response.json();
    const post = posts[0];

    if (!post) {
      console.warn(`No post found for slug: ${slug}`);
      return {
        title: `${slug
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())} - BootPrices`,
        description: 'Blog post not found.',
      };
    }

    // Generate metadata from Rank Math or fallback to post data
    const title = post.meta?.rank_math_title || stripHtml(post.title.rendered);
    const description =
      post.meta?.rank_math_description ||
      stripHtml(post.excerpt.rendered).slice(0, 160);
    const canonical =
      post.meta?.rank_math_canonical_url ||
      `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
    const ogImage =
      post.meta?.rank_math_facebook_image ||
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    return {
      title: `${title} - BootPrices`,
      description,
      openGraph: {
        type: 'article',
        title: post.meta?.rank_math_facebook_title || title,
        description: post.meta?.rank_math_facebook_description || description,
        url: canonical,
        siteName: 'BootPrices',
        images: ogImage
          ? [
              {
                url: ogImage,
                width:
                  post._embedded?.['wp:featuredmedia']?.[0]?.media_details
                    ?.width || 1200,
                height:
                  post._embedded?.['wp:featuredmedia']?.[0]?.media_details
                    ?.height || 630,
                alt: stripHtml(post.title.rendered),
              },
            ]
          : [],
        locale: 'en_US',
        publishedTime: new Date(post.date).toISOString(),
        authors: ['BootPrices'],
      },
      twitter: {
        card: post.meta?.rank_math_twitter_card_type || 'summary_large_image',
        title: post.meta?.rank_math_twitter_title || title,
        description: post.meta?.rank_math_twitter_description || description,
        images:
          post.meta?.rank_math_twitter_image || ogImage
            ? [post.meta?.rank_math_twitter_image || ogImage]
            : undefined,
        site: '@BootPrices',
        creator: '@BootPrices',
      },
      robots: {
        index: !post.meta?.rank_math_robots?.includes('noindex'),
        follow: !post.meta?.rank_math_robots?.includes('nofollow'),
      },
      keywords: post.meta?.rank_math_focus_keyword,
      authors: [{ name: 'BootPrices' }],
      alternates: {
        canonical,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for slug:', slug, error);

    // Return fallback metadata with a human-readable title from slug
    const fallbackTitle = slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    return {
      title: `${fallbackTitle} - BootPrices`,
      description: 'Read the latest boot reviews and guides on BootPrices.',
      openGraph: {
        title: fallbackTitle,
        description: 'Read the latest boot reviews and guides on BootPrices.',
        url: `${
          process.env.NEXT_PUBLIC_SITE_URL || 'https://bootprices.com'
        }/blog/${slug}`,
        siteName: 'BootPrices',
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@BootPrices',
        creator: '@BootPrices',
      },
    };
  }
}

export default function page() {
  return (
    <div>
      <SingleBlog />
    </div>
  );
}
