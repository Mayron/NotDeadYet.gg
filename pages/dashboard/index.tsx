import styled from "@emotion/styled";
import { unstable_getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next/types";
import {
  DashboardContentPanel,
  DashboardContainer,
  DashboardHeader,
  DashboardMainSection,
} from "../../components/dashboard";
import DashboardSideNavMenu from "../../components/dashboard-side-nav-menu";
import Layout from "../../components/layout";
import PostThumbnail from "../../components/post-thumbnail";
import { getContentfulPosts } from "../../contentful";
import { authOptions } from "../api/auth/[...nextauth]";

interface IDashboardPageProps {
  posts: ContentfulPost[];
}

const DashboardPage: React.FC<IDashboardPageProps> = ({ posts }) => (
  <Layout title="Dashboard | Not Dead Yet">
    <DashboardMainSection>
      <DashboardHeader />
      <DashboardContainer>
        <DashboardSideNavMenu />
        <DashboardContentPanel>
          {posts.map((p) => (
            <PostThumbnail
              key={p.title}
              author={p.author}
              excerpt={p.excerpt}
              title={p.title}
              publishedAt={p.sys.publishedAt}
              path={`/dashboard/posts/${p.sys.id}`}
            />
          ))}
        </DashboardContentPanel>
      </DashboardContainer>
    </DashboardMainSection>
  </Layout>
);

export default DashboardPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session?.user) {
    const { member } = session.user;

    if (member) {
      const posts = await getContentfulPosts(false);

      return {
        props: { posts },
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
