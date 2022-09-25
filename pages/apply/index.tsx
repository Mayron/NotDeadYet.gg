/* eslint-disable react/jsx-props-no-spreading */
import { marked } from "marked";
import { signIn } from "next-auth/react";
import { css } from "@emotion/react";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import { getApplyInfo } from "../../contentful";
import RequirementsForm from "../../components/forms/containers/requirements-form";
import Panel from "../../components/panel";
import BattleNet from "../../svgs/battle-net.svg";
import { authOptions } from "../api/auth/[...nextauth]";
import BackgroundPattern from "../../components/background-pattern";
import WhitePanel from "../../components/white-panel";
import ApplicationStepper from "../../components/application-stepper";
import { retrieveApplication } from "../../firebase";
import YourApplication from "../../components/forms/containers/your-application";

interface INotSubmitted {
  applyInfo: string;
  username?: string;
}

const NotSubmitted: React.FC<INotSubmitted> = ({ username, applyInfo }) => (
  <section>
    <header>
      <h1
        css={css`
          font-size: 4rem;
          margin-bottom: 50px;
        `}
      >
        Apply to Not Dead Yet
      </h1>

      {username && <ApplicationStepper activeStep={0} />}
    </header>
    <WhitePanel>
      <article dangerouslySetInnerHTML={{ __html: marked.parse(applyInfo) }}></article>
    </WhitePanel>

    <hr />

    {username ? (
      <RequirementsForm />
    ) : (
      <Panel>
        <p>
          To submit and check the progress of your application you&apos;ll first need to
          sign in with your Battle.net account.
        </p>
        <button type="button" onClick={() => signIn("battlenet")}>
          <BattleNet />
          <span>Sign In with Battle.net</span>
        </button>
      </Panel>
    )}
  </section>
);

interface IApplyPageProps {
  application?: IApplication;
  applyInfo: string;
  username?: string;
}

const ApplyPage: React.FC<IApplyPageProps> = ({ applyInfo, username, application }) => (
  <Layout title="Apply | Not Dead Yet" username={username}>
    <BackgroundPattern />

    {application ? (
      <YourApplication application={application} />
    ) : (
      <NotSubmitted applyInfo={applyInfo} username={username} />
    )}
  </Layout>
);

export default ApplyPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const username = session?.user?.name || null;

  let application: IApplication | null = null;
  let applyInfo: string | null = null;

  console.log("loading apply page");

  if (username) {
    application = (await retrieveApplication(username)) || null;
    console.log("hello");
  }

  if (!application) {
    applyInfo = await getApplyInfo();
  }

  return {
    props: { applyInfo, username, application },
  };
}
