import { Link } from "react-router-dom";
import Banner from "./Banner";
import Ctapage from "../components/Ctapage";
import { usePosts } from "../context/PostsContext";

export default function Blog() {
  const { posts } = usePosts();
  const published = posts.filter(p => p.status === "Published");

  return (
    <>
      <Banner
        title="Blog"
        description="Insights, guides and strategies to grow your digital presence."
        buttonText="Get Started"
        buttonLink="https://app.grolinq.com"
      />

      <section className="blog-section">
        <div className="container">
          {published.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "60px 0" }}>
              No posts published yet.
            </p>
          ) : (
            <div className="blog-grid">
              {published.map(post => (
                <div key={post.id} className="blog-card">
                  <Link to={`/posts/${post.slug}`}>
                    <div className="blog-card-img">
                      {post.featured ? (
                        <img
                          src={post.featured}
                          alt={post.title}
                          onError={e => { e.target.src = "/img/logo/aboutus-img.png"; }}
                        />
                      ) : (
                        <div className="blog-card-img-placeholder">📷</div>
                      )}
                      <span className="blog-card-cat">{post.category}</span>
                    </div>
                  </Link>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{post.date}</span>
                      <span>By {post.author}</span>
                    </div>
                    <h3>
                      <Link to={`/posts/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p>{post.excerpt}</p>
                    <Link to={`/posts/${post.slug}`} className="blog-read-more">
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Ctapage />
    </>
  );
}
