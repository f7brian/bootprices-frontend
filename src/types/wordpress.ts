export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  _links: {
    "wp:featuredmedia"?: {
      embeddable: boolean;
      href: string;
    }[];
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
      alt_text?: string;
      media_details?: {
        width: number;
        height: number;
        sizes?: {
          medium?: {
            source_url: string;
            width: number;
            height: number;
          };
          large?: {
            source_url: string;
            width: number;
            height: number;
          };
        };
      };
    }[];
  };
  // Rank Math SEO fields
  meta?: {
    rank_math_title?: string;
    rank_math_description?: string;
    rank_math_focus_keyword?: string;
    rank_math_robots?: string[];
    rank_math_canonical_url?: string;
    rank_math_facebook_title?: string;
    rank_math_facebook_description?: string;
    rank_math_facebook_image?: string;
    rank_math_twitter_title?: string;
    rank_math_twitter_description?: string;
    rank_math_twitter_image?: string;
    rank_math_twitter_card_type?: string;
    rank_math_schema?: object;
  };
  // Alternative: Rank Math might also provide consolidated head data
  rankmath_head?: string;
}

export interface SEOData {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    type: string;
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
    locale: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string | undefined;
  };
  additionalMetaTags: {
    name: string;
    content: string;
  }[];
}
