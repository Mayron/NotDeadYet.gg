import { css } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import ApplicantsTable from "../../components/applicants-table";
import BackgroundPattern from "../../components/background-pattern";
import Layout from "../../components/layout";
import Route from "../../components/route";
import WhitePanel from "../../components/white-panel";
import { Status } from "../../data";
import { retrieveApplicantsByStatus } from "../../firebase";
import { authOptions } from "../api/auth/[...nextauth]";

interface IAdminPageProps {
  applications: IApplication[];
  status: string;
}

const AdminPage: React.FC<IAdminPageProps> = ({ applications, status }) => (
  <Layout title="Admin | Not Dead Yet">
    <BackgroundPattern />
    <section style={{ maxWidth: 1200 }}>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          {status}s
        </h1>
      </header>

      <ul
        css={css`
          list-style: none;
          display: flex;
          margin-left: 0;
          margin-bottom: 10px;
          justify-content: space-between;
          margin-top: 40px;
        `}
      >
        <li>
          <Route text="New Applicants" to="/admin" />
        </li>
        <li>
          <Route text="Unconfirmed Member" to="/admin?s=unconfirmed" />
        </li>
        <li>
          <Route text="Pending Invites" to="/admin?s=pending" />
        </li>
        <li>
          <Route text="Guild Members" to="/admin?s=members" />
        </li>
      </ul>
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

  let status = context.query.s as string;

  if (status === "unconfirmed") {
    status = Status.UnconfirmedMember;
  } else if (status === "pending") {
    status = Status.PendingInvite;
  } else if (status === "members") {
    status = Status.GuildMember;
  } else {
    status = Status.NewApplicant;
  }

  const applications = await retrieveApplicantsByStatus(status);

  return {
    props: { applications, status },
  };
}
