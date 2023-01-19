import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import DashboardLayout from "../../../components/dashboard-layout";
import Layout from "../../../components/layout";
import PostThumbnail from "../../../components/post-thumbnail";
import { getContentfulPost } from "../../../contentful";
import { authOptions } from "../../api/auth/[...nextauth]";

interface IDashboardPostPageProps {
  post: ContentfulPost;
}

const DashboardPostPage: React.FC<IDashboardPostPageProps> = ({ post }) => (
  <Layout title={`${post.title} | Not Dead Yet`}>
    <DashboardLayout id="Post" contentPadding={false}>
      <PostThumbnail
        key={post.title}
        author={post.author}
        body={post.body}
        title={post.title}
        publishedAt={post.sys.publishedAt}
        path="/dashboard"
      />
    </DashboardLayout>
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
