import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import {
  DashboardContentPanel,
  DashboardHeader,
  DashboardContainer,
  DashboardMainSection,
} from "../../../components/dashboard";
import DashboardSideNavMenu from "../../../components/dashboard-side-nav-menu";
import Layout from "../../../components/layout";
import PostThumbnail from "../../../components/post-thumbnail";
import { getContentfulPost } from "../../../contentful";
import { authOptions } from "../../api/auth/[...nextauth]";

interface IDashboardPostPageProps {
  post: ContentfulPost;
}

const DashboardPostPage: React.FC<IDashboardPostPageProps> = ({ post }) => (
  <Layout title={`${post.title} | Not Dead Yet`}>
    <DashboardMainSection>
      <DashboardHeader />
      <DashboardContainer>
        <DashboardSideNavMenu />
        <DashboardContentPanel full>
          <PostThumbnail
            key={post.title}
            author={post.author}
            body={post.body}
            title={post.title}
            publishedAt={post.sys.publishedAt}
            path="/dashboard"
          />
        </DashboardContentPanel>
      </DashboardContainer>
    </DashboardMainSection>
  </Layout>
);

export default DashboardPostPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const postId = context.query.id;

  if (session?.user && postId) {
    const { member } = session.user;

    if (member) {
      const post = await getContentfulPost(postId as string);

      return {
        props: { post },
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
