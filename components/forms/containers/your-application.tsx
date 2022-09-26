import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import vars from "../../../styles/vars";
import WhitePanel from "../../white-panel";

interface IYourApplicationProps {
  application: IApplication;
}

const StyledLabel = styled.span`
  font-weight: ${vars.font.standard.weights.bold};
  padding-right: 6px;
`;

const StyledQuestion = styled.div`
  p {
    margin-bottom: 10px;
  }

  margin-bottom: 20px;
`;

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
        <p>Here you can view your submitted application and check for updates.</p>
      </header>

      <WhitePanel>
        <header>
          <h2>Requirements</h2>
        </header>
        <div>
          <StyledQuestion>
            <p>
              <StyledLabel>Question:</StyledLabel> Are you able to consistently raid 3
              times per week for progression, and 2 times per a week for farm content
              between 19:30-23:00 (server time)?
            </p>
            <p>
              <StyledLabel>Answer:</StyledLabel>
              {application.availability === "full"
                ? "Yes"
                : application.partialAvailabilityReason}
            </p>
          </StyledQuestion>
        </div>
      </WhitePanel>

      <WhitePanel>
        <header>
          <h2>Character Information</h2>
        </header>
        <div>
          <div>characterName: {application.characterName}</div>
          <div>characterClass: {application.characterClass}</div>
          <div>characterMainSpec: {application.characterMainSpec}</div>
          <div>primaryProfession1: {application.primaryProfession1}</div>
          <div>primaryMaxLevel1: {application.primaryMaxLevel1}</div>
          <div>primaryNotMaxedReason1: {application.primaryNotMaxedReason1}</div>
          <div>primaryProfession2: {application.primaryProfession2}</div>
          <div>primaryMaxLevel2: {application.primaryMaxLevel2}</div>
          <div>primaryNotMaxedReason2: {application.primaryNotMaxedReason2}</div>
        </div>
      </WhitePanel>
      <WhitePanel>
        <header>
          <h2>About You</h2>
        </header>
        <div>
          <div>canTalk: {application.canTalk}</div>
          <div>cannotTalkReason: {application.cannotTalkReason}</div>
          <div>bringConsumes: {application.bringConsumes}</div>
          <div>cannotBringConsumesReason: {application.cannotBringConsumesReason}</div>
          <div>wowExperience: {application.wowExperience}</div>
          <div>describeSelf: {application.describeSelf}</div>
          <div>discordId: {application.discordId}</div>
          <div>vouch: {application.vouch}</div>
          <div>anythingElse: {application.anythingElse}</div>
        </div>
      </WhitePanel>
    </section>
  );
};

export default YourApplication;
