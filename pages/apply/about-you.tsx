/* eslint-disable react/jsx-props-no-spreading */
import { css } from "@emotion/react";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import { authOptions } from "../api/auth/[...nextauth]";
import BackgroundPattern from "../../components/background-pattern";
import AboutYouForm from "../../components/forms/containers/about-you-form";
import ApplicationStepper from "../../components/application-stepper";

interface IAboutYouPageProps {
  username: string;
}

const AboutYouPage: React.FC<IAboutYouPageProps> = ({ username }) => (
  <Layout title="Apply | Not Dead Yet" username={username}>
    <BackgroundPattern />
    <section>
      <header
        css={css`
          margin-bottom: 50px;

          p {
            font-size: 1.125rem;
            text-align: center;
            padding-bottom: 30px;
          }
        `}
      >
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Tell Us About Yourself
        </h1>

        <p>
          This section consists of the main application questions for potential new
          recruits. They allow us to better assess your play style, attitude towards
          raiding within a guild, and your raid experience to see if you would be a good
          fit for our core raid team.
        </p>

        <ApplicationStepper activeStep={2} />
      </header>

      <AboutYouForm username={username} />
    </section>
  </Layout>
);

export default AboutYouPage;

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
