import { css } from "@emotion/react";
import { useEffect } from "react";
import ApplicationOverview from "../../application-overview";

interface IYourApplicationProps {
  application: IApplication;
}

const YourApplication: React.FC<IYourApplicationProps> = ({ application }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("application");
    }
  }, []);

  return (
    <section>
      <header
        css={css`
          text-align: center;
          margin-bottom: 40px;
        `}
      >
        <h1>Your Application</h1>
        <p>
          Your application has been submitted successfully and is being reviewed. We will
          be in touch soon!
        </p>
      </header>

      <ApplicationOverview application={application} />
    </section>
  );
};

export default YourApplication;
