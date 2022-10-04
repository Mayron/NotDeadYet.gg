import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import ApplicationOverview from "../../../components/application-overview";
import BackgroundPattern from "../../../components/background-pattern";
import GoBackButton from "../../../components/go-back-button";
import Layout from "../../../components/layout";
import { retrieveApplication } from "../../../firebase";
import { authOptions } from "../../api/auth/[...nextauth]";

interface IAdminApplicantPageProps {
  application: IApplication;
}

const AdminApplicantPage: React.FC<IAdminApplicantPageProps> = ({ application }) => {
  const characterName = application.characterName || application.characters[0].name;

  const downloadJson = () => {
    const json = JSON.stringify(application);
    const blob = new Blob([json], { type: "json" });

    const a = document.createElement("a");
    a.download = `${characterName}-application.json`;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const sendGuildInvite = async () => {
    await fetch(`/api/applicant/invite`, {
      method: "POST",
      body: JSON.stringify({
        userId: application.userId,
      }),
    }).then(() => window.location.reload());
  };

  return (
    <Layout title="Admin | Not Dead Yet">
      <BackgroundPattern />
      <section>
        <header>
          <h1
            css={css`
              font-size: 2rem;
            `}
          >
            Application for {characterName}
          </h1>
        </header>

        <ApplicationOverview application={application} />
        <footer
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <GoBackButton to="/admin" text="Go Back" />
          <div>
            {!application.status && (
              <Button
                size="large"
                style={{ marginRight: 20 }}
                variant="contained"
                onClick={sendGuildInvite}
              >
                Send Guild Invite
              </Button>
            )}

            <Button size="large" variant="outlined" onClick={downloadJson}>
              Download as JSON
            </Button>
          </div>
        </footer>
      </section>
    </Layout>
  );
};

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
