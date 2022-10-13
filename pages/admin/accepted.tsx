import { css } from "@emotion/react";
import AdminNav from "../../components/admin/admin-nav";
import ApplicantsTable from "../../components/applicants-table";
import BackgroundPattern from "../../components/background-pattern";
import Layout from "../../components/layout";
import WhitePanel from "../../components/white-panel";
import { Status } from "../../data";
import { retrieveApplicantsByStatus } from "../../firebase";

interface IAdminPageProps {
  applications: IApplication[];
}

const AdminAcceptedPage: React.FC<IAdminPageProps> = ({ applications }) => (
  <Layout title="Admin | Not Dead Yet">
    <BackgroundPattern />
    <section style={{ maxWidth: 1200 }}>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Accepted Applicants
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

export default AdminAcceptedPage;

export async function getStaticProps() {
  const pending = await retrieveApplicantsByStatus(Status.PendingInvite);
  const members = await retrieveApplicantsByStatus(Status.GuildMember);

  return {
    props: { applications: [...pending, ...members] },
    revalidate: 60 * 5,
  };
}
