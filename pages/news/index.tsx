import Layout from "../../components/layout";
import PostThumbnail from "../../components/post-thumbnail";
import { getContentfulPosts } from "../../contentful";

interface INewsPageProps {
  posts: ContentfulPost[];
}

const NewsPage: React.FC<INewsPageProps> = ({ posts }) => (
  <Layout title="News | Not Dead Yet">
    <section>
      <header>
        <h1>Guild News and Updates</h1>
      </header>

      {posts.length === 0 ? (
        <p>Coming Soon!</p>
      ) : (
        posts.map((n) => (
          <PostThumbnail
            key={n.title}
            author={n.author}
            excerpt={n.excerpt}
            publishedAt={n.sys.publishedAt}
            path={`/news/${n.sys.id}`}
            title={n.title}
          />
        ))
      )}
    </section>
  </Layout>
);

export default NewsPage;

export async function getStaticProps() {
  const posts = await getContentfulPosts(true);
  return {
    props: { posts },
  };
}
