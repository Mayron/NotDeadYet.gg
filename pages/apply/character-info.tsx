/* eslint-disable react/jsx-props-no-spreading */
import { css } from "@emotion/react";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import { authOptions } from "../api/auth/[...nextauth]";
import BackgroundPattern from "../../components/background-pattern";
import CharacterInfoForm from "../../components/forms/containers/character-info-form";

interface IApplyCharacterInfoProps {
  username: string;
}

const ApplyPage: React.FC<IApplyCharacterInfoProps> = ({ username }) => (
  <Layout title="Apply | Not Dead Yet" username={username}>
    <BackgroundPattern />
    <section>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Character Information
        </h1>
        <p
          css={css`
            margin-bottom: 60px;
            font-size: 1.125rem;
            text-align: center;
          `}
        >
          Please provide the following basic character details for the character you are
          applying with.
        </p>
      </header>

      <CharacterInfoForm />
    </section>
  </Layout>
);

export default ApplyPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const username = session?.user?.name || null;

  if (!username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { username },
  };
}
