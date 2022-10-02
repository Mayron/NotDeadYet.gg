import { css } from "@emotion/react";
import { useEffect } from "react";

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
        <h1>Thank You!</h1>
        <p>Your application has been submitted successfully. We will be in touch soon!</p>
      </header>
    </section>
  );
};

export default YourApplication;
