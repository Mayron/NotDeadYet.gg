import { css } from "@emotion/react";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import BackgroundPattern from "../../../components/background-pattern";
import GoBackButton from "../../../components/go-back-button";
import Layout from "../../../components/layout";
import WhitePanel from "../../../components/white-panel";
import { retrieveApplication } from "../../../firebase";
import { authOptions } from "../../api/auth/[...nextauth]";

interface IAdminApplicantPageProps {
  application: IApplication;
}

const AdminApplicantPage: React.FC<IAdminApplicantPageProps> = ({ application }) => (
  <Layout title="Admin | Not Dead Yet">
    <BackgroundPattern />
    <section style={{ maxWidth: 1200 }}>
      <header>
        <h1
          css={css`
            font-size: 2rem;
          `}
        >
          Application for {application.characterName || application.characters[0].name}
        </h1>
      </header>

      <WhitePanel>{JSON.stringify(application)}</WhitePanel>
      <GoBackButton to="/admin" text="Go Back" />
    </section>
  </Layout>
);

export default AdminApplicantPage;

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

  if (!context.query.userId) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  const userIdQuery = context.query.userId[0];
  const userId = decodeURIComponent(userIdQuery);
  const application = await retrieveApplication(userId);

  return {
    props: { application },
  };
}
