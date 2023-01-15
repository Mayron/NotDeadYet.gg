import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { marked } from "marked";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import {
  DashboardContentPanel,
  DashboardHeader,
  DashboardContainer,
  DashboardMainSection,
} from "../../components/dashboard";
import DashboardSideNavMenu from "../../components/dashboard-side-nav-menu";
import Layout from "../../components/layout";
import { getResourcesContent } from "../../contentful";
import { contentfulStyles } from "../../styles/fonts";
import media from "../../styles/media-queries";
import { authOptions } from "../api/auth/[...nextauth]";

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
            css={[contentfulStyles, media.up("sm")`padding: 10px 30px;`]}
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
