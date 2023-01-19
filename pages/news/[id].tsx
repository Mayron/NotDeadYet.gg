import { css } from "@emotion/react";
import { GetStaticPropsContext } from "next";
import Layout from "../../components/layout";
import PostThumbnail from "../../components/post-thumbnail";
import { getContentfulPost, getContentfulPosts } from "../../contentful";
import media from "../../styles/media-queries";

interface INewsPostPageProps {
  post: ContentfulPost;
}

const NewsPostPage: React.FC<INewsPostPageProps> = ({ post }) => (
  <Layout title="News | Not Dead Yet">
    <section
      css={css`
        ${media.down("sm")`
          padding: 0;
        `};
      `}
    >
      <PostThumbnail
        key={post.title}
        author={post.author}
        body={post.body}
        publishedAt={post.sys.publishedAt}
        title={post.title}
        path="/news"
      />
    </section>
  </Layout>
);

export default NewsPostPage;

// Generates `/posts/1` and `/posts/2`
export async function getStaticPaths() {
  const posts = await getContentfulPosts(true);
  const paths = posts.map((c) => ({ params: { id: c.sys.id } }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const postId = context.params?.id as string;
  const post = await getContentfulPost(postId);

  return {
    props: { post },
  };
}
