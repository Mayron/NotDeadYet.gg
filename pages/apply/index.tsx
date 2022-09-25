/* eslint-disable react/jsx-props-no-spreading */
import { marked } from "marked";
import { signIn } from "next-auth/react";
import { css } from "@emotion/react";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";
import Layout from "../../components/layout";
import { getApplyInfo } from "../../contentful";
import AttendanceForm from "../../components/forms/containers/attendance-form";
import Panel from "../../components/panel";
import BattleNet from "../../svgs/battle-net.svg";
import { authOptions } from "../api/auth/[...nextauth]";
import BackgroundPattern from "../../components/background-pattern";
import WhitePanel from "../../components/white-panel";
import ApplicationStepper from "../../components/application-stepper";

interface IApplyPageProps {
  applyInfo: string;
  username?: string;
}

const ApplyPage: React.FC<IApplyPageProps> = ({ applyInfo, username }) => (
  <Layout title="Apply | Not Dead Yet" username={username}>
    <BackgroundPattern />
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
        <AttendanceForm />
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
  </Layout>
);

export default ApplyPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const applyInfo = await getApplyInfo();
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const username = session?.user?.name || null;

  return {
    props: { applyInfo, username },
  };
}
