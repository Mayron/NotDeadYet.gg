import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import ApplicationOverview from "../../../components/application-overview";
import BackgroundPattern from "../../../components/background-pattern";
import GoBackButton from "../../../components/go-back-button";
import Layout from "../../../components/layout";
import { Status } from "../../../data";
import { retrieveApplication } from "../../../firebase";
import media from "../../../styles/media-queries";

interface IAdminApplicantPageProps {
  application: IApplication;
}

const AdminApplicantPage: React.FC<IAdminApplicantPageProps> = ({ application }) => {
  const characterName = application.characters[0].name;

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

  const declineApplicant = async () => {
    await fetch(`/api/applicant/decline`, {
      method: "POST",
      body: JSON.stringify({
        userId: application.userId,
      }),
    }).then(() => window.location.reload());
  };

  const acceptAndSendInvite = async () => {
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
            flex-direction: column;
            align-items: center;
          `}
        >
          <div
            css={css`
              margin-bottom: 60px;
              display: flex;
              justify-content: space-between;
              width: 100%;

              button {
                min-width: 180px;
              }

              ${media.down(`sm`)`    
                margin-bottom: 30px;    
                display: flex;                
                align-items: center;
                width: 100%;
                flex-direction: column-reverse;

                button {
                  margin-right: 0;
                  height: 50px;
                  margin-bottom: 20px;
                  width: 360px;
                  min-width: 360px;
                }
              `};
            `}
          >
            {application.status < Status.Declined && (
              <Button
                size="large"
                color="error"
                variant="contained"
                onClick={declineApplicant}
              >
                Decline
              </Button>
            )}

            <Button size="large" variant="outlined" onClick={downloadJson}>
              Download as JSON
            </Button>

            {application.status < Status.Declined && (
              <Button
                size="large"
                color="success"
                variant="contained"
                onClick={acceptAndSendInvite}
              >
                Accept & Send Invite
              </Button>
            )}
          </div>
          <GoBackButton text="Back to Admin Dashboard" to="/admin" />
        </footer>
      </section>
    </Layout>
  );
};

export default AdminApplicantPage;

// TODO: Change to getStaticPaths
export async function getServerSideProps(context: GetServerSidePropsContext) {
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
