import { css } from "@emotion/react";
import AdminNav from "../../components/admin/admin-nav";
import ApplicantsTable from "../../components/applicants-table";
import Layout from "../../components/layout";
import WhitePanel from "../../components/white-panel";
import { Status } from "../../data";
import { getAllApplicationsByStatus } from "../../firebase";

interface IAdminPageProps {
  applications: IApplication[];
}

const AdminDeclinedPage: React.FC<IAdminPageProps> = ({ applications }) => (
  <Layout title="Admin | Not Dead Yet">
    <section style={{ maxWidth: 1200 }}>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Declined Applicants
        </h1>
      </header>
      <AdminNav />
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

export default AdminDeclinedPage;

export async function getStaticProps() {
  const applications = await getAllApplicationsByStatus(Status.Declined);

  return {
    props: { applications },
    revalidate: 120,
  };
}
