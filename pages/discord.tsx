import Layout from "../components/layout";

const DiscordRedirectPage: React.FC = () => (
  <Layout title="Discord | Not Dead Yet">
    <section>
      <header>
        <h1>Redirecting to Discord...</h1>
      </header>
    </section>
  </Layout>
);

export default DiscordRedirectPage;

export function getServerSideProps() {
  return {
    redirect: {
      destination: process.env.NEXT_PUBLIC_DISCORD_URL,
      permanent: true,
    },
  };
}
