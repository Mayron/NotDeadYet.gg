import { marked } from "marked";
import Layout from "../components/layout";
import WhitePanel from "../components/white-panel";
import { getAllRules } from "../contentful";

interface IRulesPageProps {
  rules: Rule[];
}

const RulesPage: React.FC<IRulesPageProps> = ({ rules }) => (
  <Layout title="Rules | Not Dead Yet">
    <section>
      <header>
        <h1>Rules</h1>
      </header>

      <article>
        {rules.map((rule) => (
          <WhitePanel key={rule.title}>
            <h2>{rule.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: marked.parse(rule.content) }}></p>
          </WhitePanel>
        ))}
      </article>
    </section>
  </Layout>
);

export default RulesPage;

export async function getStaticProps() {
  const rules = await getAllRules();

  return {
    props: { rules },
  };
}
