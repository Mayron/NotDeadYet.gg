import { css } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import AdminNav from "../../components/admin/admin-nav";
import ApplicantsTable from "../../components/applicants-table";
import BackgroundPattern from "../../components/background-pattern";
import Layout from "../../components/layout";
import WhitePanel from "../../components/white-panel";
import { Status } from "../../data";
import { retrieveApplicantsByStatus } from "../../firebase";
import { authOptions } from "../api/auth/[...nextauth]";

interface IAdminPageProps {
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
          Guild Members
        </h1>
      </header>
      <AdminNav />
      <WhitePanel
        css={css`
          padding: 0;
        `}
      >
        <ApplicantsTable data={applications} hiddenColumns={["age"]} />
      </WhitePanel>
    </section>
  </Layout>
);

export default AdminPage;

export async function getStaticProps() {
  const applications = await retrieveApplicantsByStatus(Status.GuildMember);

  return {
    props: { applications },
    revalidate: 60 * 5,
  };
}
