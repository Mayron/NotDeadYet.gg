/* eslint-disable react/jsx-props-no-spreading */
import { marked } from "marked";
import { useSession, signIn } from "next-auth/react";
import Layout from "../components/layout";
import { getApplyInfo } from "../contentful";
import AttendanceForm from "../components/forms/containers/attendance-form";

interface IApplyPageProps {
  applyInfo: string;
}

const ApplyPage: React.FC<IApplyPageProps> = ({ applyInfo }) => {
  const { data: session } = useSession();

  return (
    <Layout title="Apply | Not Dead Yet">
      <section>
        <header>
          <h1>Apply to Join Us</h1>
          {!session?.user && (
            <>
              <p>
                To submit and check the progress of your application you&apos;ll first
                need to sign in.
              </p>
              <button type="button" onClick={() => signIn()}>
                Sign In
              </button>
            </>
          )}
        </header>
        <article dangerouslySetInnerHTML={{ __html: marked.parse(applyInfo) }}></article>

        <AttendanceForm />
      </section>
    </Layout>
  );
};

export default ApplyPage;

export async function getStaticProps() {
  const applyInfo = await getApplyInfo();

  return {
    props: { applyInfo },
  };
}
