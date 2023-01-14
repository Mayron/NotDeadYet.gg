import { css } from "@emotion/react";
import { marked } from "marked";
import Layout from "../components/layout";
import WhitePanel from "../components/white-panel";
import { getAllRules } from "../contentful";
import { contentfulStyles } from "../styles/fonts";

interface IRulesPageProps {
  rules: Rule[];
}

const RulesPage: React.FC<IRulesPageProps> = ({ rules }) => (
  <Layout title="Rules | Not Dead Yet">
    <section
      css={css`
        padding-top: 30px;
      `}
    >
      <header
        css={css`
          text-align: center;
          margin-bottom: 20px;
          h1 {
            margin-bottom: 0;
          }

          p {
            font-size: 1.125rem;
          }
        `}
      >
        <h1>Guild Rules</h1>
        <p>Members should read and follow our guild rules before raiding with us.</p>
      </header>

      <article css={contentfulStyles}>
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
