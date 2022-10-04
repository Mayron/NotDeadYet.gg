import { css } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import ApplicantsTable from "../../components/applicants-table";
import BackgroundPattern from "../../components/background-pattern";
import Layout from "../../components/layout";
import WhitePanel from "../../components/white-panel";
import { retrieveAllApplications } from "../../firebase";
import { authOptions } from "../api/auth/[...nextauth]";

interface IAdminPageProps {
  username: string;
  applications: IApplication[];
}

const AdminPage: React.FC<IAdminPageProps> = ({ applications }) => (
  <Layout title="Admin | Not Dead Yet">
    <BackgroundPattern />
    <section style={{ maxWidth: 1200 }}>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Applications &amp; Registrations
        </h1>
      </header>

      <WhitePanel
        css={css`
          padding: 0;
        `}
      >
        <ApplicantsTable data={applications} />
      </WhitePanel>
    </section>
  </Layout>
);

export default AdminPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const user = session?.user || null;

  if (!user?.admin) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const applications = await retrieveAllApplications();

  return {
    props: { applications },
  };
}
