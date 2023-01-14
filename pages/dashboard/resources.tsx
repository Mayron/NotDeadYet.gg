import styled from "@emotion/styled";
import { marked } from "marked";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import {
  DashboardContentPanel,
  DashboardHeader,
  DashboardContainer,
} from "../../components/dashboard";
import DashboardSideNavMenu from "../../components/dashboard-side-nav-menu";
import Layout from "../../components/layout";
import { getResourcesContent } from "../../contentful";
import { contentfulStyles } from "../../styles/fonts";
import { authOptions } from "../api/auth/[...nextauth]";

const DashboardMainSection = styled.section`
  max-width: 1140px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

interface IDashboardResourcesPageProps {
  content: string;
}

const DashboardResourcesPage: React.FC<IDashboardResourcesPageProps> = ({ content }) => (
  <Layout title="Dashboard | Not Dead Yet">
    <DashboardMainSection>
      <DashboardHeader />
      <DashboardContainer>
        <DashboardSideNavMenu />
        <DashboardContentPanel>
          <article
            css={contentfulStyles}
            dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
          ></article>
        </DashboardContentPanel>
      </DashboardContainer>
    </DashboardMainSection>
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
