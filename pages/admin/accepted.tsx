import { css } from "@emotion/react";
import AdminNav from "../../components/admin/admin-nav";
import ApplicantsTable from "../../components/applicants-table";
import Layout from "../../components/layout";
import WhitePanel from "../../components/white-panel";
import { Collections, Status } from "../../data";
import { getAllApplicationsByStatus, getDocumentField } from "../../firebase";

interface IAdminPageProps {
  applications: IApplication[];
}

const AdminAcceptedPage: React.FC<IAdminPageProps> = ({ applications }) => (
  <Layout title="Admin | Not Dead Yet">
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

export default AdminAcceptedPage;

export async function getStaticProps() {
  const pending = await getAllApplicationsByStatus(Status.PendingInvite);
  const members = await getAllApplicationsByStatus(Status.GuildMember);
  const applications = [...pending, ...members];

  for (let i = 0; i < applications.length; i++) {
    const applicant = applications[i];

    // eslint-disable-next-line no-await-in-loop
    const userLoot = await getDocumentField<number[]>(
      applicant.userId,
      Collections.Users,
      "loot",
    );

    applicant.loot = userLoot || null;
  }

  return {
    props: { applications },
    revalidate: 120,
  };
}
