import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import ApplicationOverview from "../../../components/application-overview";
import { DashboardHeader } from "../../../components/dashboard-layout";
import GoBackButton from "../../../components/go-back-button";
import Layout from "../../../components/layout";
import { Collections, Status } from "../../../data";
import { getDocument } from "../../../firebase";
import colors from "../../../styles/colors";
import media from "../../../styles/media-queries";

interface IAdminApplicantPageProps {
  application: IApplication;
}

const AdminApplicantPage: React.FC<IAdminApplicantPageProps> = ({ application }) => {
  const characterName = application.characters[0].name;
  const router = useRouter();

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

  const acceptAndInvite = async () => {
    await fetch(`/api/applicant/invite`, {
      method: "POST",
      body: JSON.stringify({
        userId: application.userId,
      }),
    }).then(() => window.location.reload());
  };

  const deleteApplication = async () => {
    const confirmMessage =
      "This will permanently remove the user's application and they will need to re-apply. Are you sure you want to do this?";
    if (
      // eslint-disable-next-line no-alert
      window.confirm(confirmMessage)
    ) {
      await fetch(`/api/applicant/remove`, {
        method: "POST",
        body: JSON.stringify({
          userId: application.userId,
        }),
      }).then(() => router.push("/admin"));
    }
  };

  return (
    <Layout title="Admin | Not Dead Yet">
      <section>
        <DashboardHeader title={`Application for ${characterName}`} />
        <ApplicationOverview application={application} />

        <footer
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            border-radius: 2px;
            margin-top: 60px;
            border: 1px solid ${colors.grey.border};
            background-color: ${colors.grey.background.medium};
          `}
        >
          <div
            css={css`
              margin-bottom: 40px;
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
                onClick={acceptAndInvite}
              >
                Accept &amp; Invite to Guild
              </Button>
            )}
            {application.status === Status.Declined && (
              <Button
                size="large"
                color="error"
                variant="contained"
                onClick={deleteApplication}
              >
                Delete Application
              </Button>
            )}
            {application.status > Status.Declined && (
              <Button
                size="large"
                color="error"
                variant="contained"
                onClick={deleteApplication}
              >
                Remove from Guild
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
  const application = await getDocument<IApplication>(userId, Collections.Applications);

  return {
    props: { application },
  };
}
