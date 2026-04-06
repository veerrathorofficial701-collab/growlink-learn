import { createContext, useContext, useState } from "react";

const INITIAL_POSTS = [
  {
    id: 1,
    slug: "10-seo-trends-for-2025",
    title: "10 SEO Trends for 2025",
    status: "Published",
    category: "SEO",
    tags: "seo,trends",
    date: "2025-01-09",
    author: "Admin",
    excerpt: "Discover the top SEO trends shaping digital marketing in 2025.",
    featured: "/img/logo/services-img.png",
    content: `SEO is evolving rapidly. Here are the top 10 trends you need to know for 2025.

1. AI-Powered Search Results — Google's Search Generative Experience (SGE) is reshaping how results are displayed. Optimise for featured snippets and structured data.

2. E-E-A-T Signals — Experience, Expertise, Authoritativeness, and Trustworthiness are now core ranking factors. Build author profiles and cite credible sources.

3. Core Web Vitals — Page speed, interactivity, and visual stability remain critical. Aim for LCP under 2.5s and CLS below 0.1.

4. Voice Search Optimisation — With smart speakers growing, optimise for conversational, long-tail queries and FAQ-style content.

5. Video SEO — YouTube and short-form video content rank in Google SERPs. Add transcripts, timestamps, and keyword-rich descriptions.

6. Zero-Click Searches — Over 50% of searches end without a click. Target position zero with concise, direct answers.

7. Local SEO — Google Business Profile optimisation, local citations, and reviews drive local pack rankings.

8. Link Building Quality Over Quantity — High-authority, niche-relevant backlinks outperform mass link schemes.

9. Mobile-First Indexing — Google indexes the mobile version of your site first. Ensure full mobile parity.

10. Semantic SEO — Topic clusters and entity-based content help Google understand your site's authority on a subject.`,
  },
  {
    id: 2,
    slug: "how-backlinks-drive-authority",
    title: "How Backlinks Drive Authority",
    status: "Published",
    category: "Link Building",
    tags: "backlinks,authority",
    date: "2025-01-11",
    author: "Admin",
    excerpt: "Learn how quality backlinks can dramatically boost your domain authority.",
    featured: "/img/logo/solution-img2.png",
    content: `Backlinks remain one of the most powerful ranking factors in SEO. A backlink is a link from one website to another, and search engines treat them as votes of confidence.

Why Backlinks Matter:
— Domain Authority (DA) increases with high-quality inbound links
— Referral traffic from authoritative sites brings qualified visitors
— Faster indexing as crawlers follow links to discover new content

Types of Backlinks:
— Editorial links: Earned naturally through great content
— Guest post links: Placed within contributed articles
— Niche edits: Links inserted into existing published content
— PR links: Earned through press releases and media coverage

How GROLINQ Helps:
Our marketplace connects you with 80,000+ publishers across every niche. We handle outreach, content creation, and placement — delivering live, high-DA backlinks that move the needle on your rankings.`,
  },
  {
    id: 3,
    slug: "crypto-seo-a-complete-guide",
    title: "Crypto SEO: A Complete Guide",
    status: "Published",
    category: "Crypto",
    tags: "crypto,seo",
    date: "2025-01-13",
    author: "Admin",
    excerpt: "A comprehensive guide to SEO strategies for crypto projects.",
    featured: "/img/logo/solution-img3.png",
    content: `The crypto space is one of the most competitive niches online. Here's how to stand out with SEO.

Keyword Strategy:
Target a mix of high-volume terms (Bitcoin, DeFi, NFT) and long-tail queries (best DeFi yield farming strategies 2025). Use tools like Ahrefs and SEMrush to find gaps.

Content Marketing:
Publish in-depth guides, market analysis, and educational content. Google rewards expertise in YMYL (Your Money Your Life) niches — crypto qualifies.

Link Building for Crypto:
Many mainstream publishers restrict crypto content. GROLINQ specialises in crypto-friendly publishers including CoinDesk, Decrypt, and niche blockchain blogs.

Technical SEO:
— Fast load times are critical for crypto traders who need real-time data
— Schema markup for prices, events, and FAQs
— Secure HTTPS and clean site architecture

Compliance & Trust:
Display regulatory disclaimers, team credentials, and audit reports. Trust signals are essential for crypto SEO success.`,
  },
];

const PostsContext = createContext(null);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);

  function savePost(data) {
    setPosts(prev => {
      const exists = prev.find(p => p.id === data.id);
      if (exists) return prev.map(p => p.id === data.id ? { ...data } : p);
      const slug = data.slug ||
        data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return [...prev, { ...data, id: Date.now(), slug }];
    });
  }

  function deletePost(id) {
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <PostsContext.Provider value={{ posts, savePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  return useContext(PostsContext);
}
