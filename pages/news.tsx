import BackgroundPattern from "../components/background-pattern";
import Layout from "../components/layout";
import NewsArticlePreview from "../components/news/news-article-preview";
import { getAllNews } from "../contentful";

interface INewsPageProps {
  news: NewsArticle[];
}

const NewsPage: React.FC<INewsPageProps> = ({ news }) => (
  <Layout title="News | Not Dead Yet">
    <BackgroundPattern />
    <section>
      <header>
        <h1>News</h1>
      </header>

      {news.length === 0 ? (
        <p>Coming Soon!</p>
      ) : (
        news.map((n) => <NewsArticlePreview key={n.title} data={n} />)
      )}
    </section>
  </Layout>
);

export default NewsPage;

export async function getStaticProps() {
  let news: NewsArticle[] = [];

  if (process.env.NODE_ENV === "development") {
    news = await getAllNews();
  }

  return {
    props: { news },
  };
}
