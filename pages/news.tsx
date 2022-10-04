import BackgroundPattern from "../components/background-pattern";
import Layout from "../components/layout";

const NewsPage: React.FC = () => (
  <Layout title="News | Not Dead Yet">
    <BackgroundPattern />
    <section>
      <header>
        <h1>News</h1>
      </header>

      <article>Coming Soon...</article>
    </section>
  </Layout>
);

export default NewsPage;
