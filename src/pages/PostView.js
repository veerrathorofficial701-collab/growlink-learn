import { useParams, Link } from "react-router-dom";
import Banner from "./Banner";
import Ctapage from "../components/Ctapage";
import { usePosts } from "../context/PostsContext";

export default function PostView() {
  const { slug } = useParams();
  const { posts } = usePosts();
  const post = posts.find(p => p.slug === slug);
  const others = posts.filter(p => p.slug !== slug && p.status === "Published");

  if (!post) {
    return (
      <div className="pv-not-found">
        <h2>Post not found</h2>
        <Link to="/blog" className="pv-back-link">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Banner
        title={post.title}
        description={post.excerpt}
        buttonText="Get Started"
        buttonLink="https://app.grolinq.com"
      />

      <section className="pv-section">
        <div className="container">
          <div className="pv-layout">

            <article className="pv-article">
              <div className="pv-meta">
                <span className="pv-cat">{post.category}</span>
                <span className="pv-date">{post.date}</span>
                <span className="pv-author">By {post.author}</span>
              </div>

              {post.featured && (
                <img
                  src={post.featured}
                  alt={post.title}
                  className="pv-featured"
                  onError={e => { e.target.style.display = "none"; }}
                />
              )}

              <div className="pv-content">
                {post.content.trim().split("\n\n").map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>

              <div className="pv-tags">
                {post.tags.split(",").filter(Boolean).map(t => (
                  <span key={t} className="pv-tag">#{t.trim()}</span>
                ))}
              </div>

              <div className="pv-nav-links">
                <Link to="/blog" className="pv-back-link">← Back to Blog</Link>
              </div>
            </article>

            <aside className="pv-sidebar">
              {others.length > 0 && (
                <div className="pv-sidebar-box">
                  <h4>Other Posts</h4>
                  <ul className="pv-other-posts">
                    {others.map(p => (
                      <li key={p.id}>
                        <Link to={`/posts/${p.slug}`}>{p.title}</Link>
                        <span>{p.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pv-sidebar-box">
                <h4>Categories</h4>
                <ul className="pv-cat-list">
                  {["SEO", "Link Building", "Crypto", "Finance", "Tech"].map(c => (
                    <li key={c}><span>{c}</span></li>
                  ))}
                </ul>
              </div>

              <div className="pv-sidebar-cta">
                <h4>Ready to Grow?</h4>
                <p>Start your link building campaign with GROLINQ today.</p>
                <a href="https://app.grolinq.com" className="pv-cta-btn">Get Started</a>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Ctapage />
    </>
  );
}
