import { marked } from "marked";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import DashboardLayout from "../../components/dashboard-layout";
import Layout from "../../components/layout";
import { getResourcesContent } from "../../contentful";
import { contentfulStyles } from "../../styles/fonts";
import media from "../../styles/media-queries";
import { authOptions } from "../api/auth/[...nextauth]";

interface IDashboardResourcesPageProps {
  content: string;
}

const DashboardResourcesPage: React.FC<IDashboardResourcesPageProps> = ({ content }) => (
  <Layout title="Resources - Dashboard | Not Dead Yet">
    <DashboardLayout header="Guild Resources" id="Resources">
      <article
        css={[contentfulStyles]}
        style={{ padding: 0 }}
        dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
      ></article>
    </DashboardLayout>
  </Layout>
);

export default DashboardResourcesPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session?.user) {
    const { member } = session.user;

    if (member) {
      const content = await getResourcesContent();

      return {
        props: { content },
      };
    }
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
