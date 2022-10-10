import { css } from "@emotion/react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import ApplicationOverview from "../../application-overview";
import Comments from "../../comments";

interface IYourApplicationProps {
  application: IApplication;
}

const YourApplication: React.FC<IYourApplicationProps> = ({ application }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("application");
    }
  }, []);

  const acceptGuildInvite = async () => {
    await fetch(`/api/applicant/accept`, {
      method: "POST",
      body: JSON.stringify({
        userId: application.userId,
      }),
    }).then(() => window.location.reload());
  };

  return (
    <section>
      <header
        css={css`
          text-align: center;
          margin-bottom: 40px;
        `}
      >
        <h1>Your Application</h1>

        {application.status === "Pending Invite" && (
          <>
            <p>
              Congratulations, Your application has been accepted!
              <br />
              Please click the button below to accept your invitation:
            </p>
            <Button
              size="large"
              style={{ marginTop: 30 }}
              variant="contained"
              onClick={acceptGuildInvite}
            >
              Accept Guild Invite
            </Button>
          </>
        )}
        {!application.status && (
          <p>
            Your application has been submitted successfully and is being reviewed. We
            will be in touch soon!
          </p>
        )}
      </header>

      <ApplicationOverview application={application} />
      {process.env.NODE_ENV === "development" && <Comments />}
    </section>
  );
};

export default YourApplication;
