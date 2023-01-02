/* eslint-disable react/jsx-props-no-spreading */
import { marked } from "marked";
import { signIn } from "next-auth/react";
import { css } from "@emotion/react";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import { getApplyInfo } from "../../contentful";
import RequirementsForm from "../../components/forms/containers/requirements-form";
import BattleNetSignInPanel from "../../components/panel";
import BattleNet from "../../svgs/battle-net.svg";
import { authOptions } from "../api/auth/[...nextauth]";
import BackgroundPattern from "../../components/background-pattern";
import WhitePanel from "../../components/white-panel";
import ApplicationStepper from "../../components/application-stepper";
import { getDocument } from "../../firebase";
import YourApplication from "../../components/forms/containers/your-application";
import { Collections } from "../../data";
import media from "../../styles/media-queries";

interface INotSubmitted {
  loggedIn: boolean;
  applyInfo: string;
}

const NotSubmitted: React.FC<INotSubmitted> = ({ loggedIn, applyInfo }) => (
  <section>
    <header>
      <h1
        css={css`
          font-size: 4rem;
          margin-bottom: 50px;

          ${media.down("sm")`
            font-size: 2.4rem;
            margin-bottom: 1rem;
          `};
        `}
      >
        Apply to Not Dead Yet
      </h1>

      {loggedIn && <ApplicationStepper activeStep={0} />}
    </header>
    <WhitePanel>
      <article dangerouslySetInnerHTML={{ __html: marked.parse(applyInfo) }}></article>
    </WhitePanel>

    <hr />

    {loggedIn ? (
      <RequirementsForm />
    ) : (
      <BattleNetSignInPanel>
        <p>
          To submit and check the progress of your application you&apos;ll first need to
          sign in with your Battle.net account.
        </p>
        <button type="button" onClick={() => signIn("battlenet")}>
          <BattleNet />
          <span>Sign In with Battle.net</span>
        </button>
      </BattleNetSignInPanel>
    )}
  </section>
);

interface IApplyPageProps {
  application?: IApplication;
  applyInfo: string;
  loggedIn: boolean;
}

const ApplyPage: React.FC<IApplyPageProps> = ({ applyInfo, loggedIn, application }) => (
  <Layout title="Apply | Not Dead Yet">
    <BackgroundPattern />

    {application ? (
      <YourApplication application={application} />
    ) : (
      <NotSubmitted applyInfo={applyInfo} loggedIn={loggedIn} />
    )}
  </Layout>
);

export default ApplyPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  let application: IApplication | undefined;
  let applyInfo: string | null = null;

  if (session?.user) {
    const userId = session.user.userId || null;

    if (session.user.member) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    if (userId) {
      application = await getDocument<IApplication>(userId, Collections.Applications);
    }
  }

  if (!application) {
    applyInfo = await getApplyInfo();
  }

  return {
    props: { applyInfo, loggedIn: session?.user?.userId !== undefined, application },
  };
}
