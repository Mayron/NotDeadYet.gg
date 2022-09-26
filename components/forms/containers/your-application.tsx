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

        <StyledQuestion>
          <p>
            Are you able to consistently raid 3 times per week for progression, and 2
            times per a week for farm content between 19:30-23:00 (server time)?
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.availability === "full"
              ? "Yes"
              : application.partialAvailabilityReason}
          </p>
        </StyledQuestion>
      </WhitePanel>

      <WhitePanel>
        <header>
          <h2>Character Information</h2>
        </header>

        <StyledQuestion>
          <StyledLabel>Character Name:</StyledLabel> {application.characterName}
        </StyledQuestion>

        <StyledQuestion>
          <StyledLabel>Class:</StyledLabel> {application.characterClass}
        </StyledQuestion>

        <StyledQuestion>
          <StyledLabel>Main Spec:</StyledLabel> {application.characterMainSpec}
        </StyledQuestion>

        <h3>Professions</h3>

        <StyledQuestion>
          <StyledLabel>Primary Profession #1:</StyledLabel>{" "}
          {application.primaryProfession1}
        </StyledQuestion>

        <StyledQuestion>
          <p>
            Is the skill level of this profession maxed out for the current expansion? If
            not, why?
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.primaryMaxLevel1 === "yes"
              ? "Yes"
              : application.primaryNotMaxedReason1}
          </p>
        </StyledQuestion>

        <StyledQuestion>
          <StyledLabel>Primary Profession #2:</StyledLabel>{" "}
          {application.primaryProfession2}
        </StyledQuestion>

        <StyledQuestion>
          <p>
            Is the skill level of this profession maxed out for the current expansion? If
            not, why?
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.primaryMaxLevel2 === "yes"
              ? "Yes"
              : application.primaryNotMaxedReason2}
          </p>
        </StyledQuestion>
      </WhitePanel>
      <WhitePanel>
        <header>
          <h2>About You</h2>
        </header>

        <StyledQuestion>
          <p>
            Are you able to use a microphone on discord and are happy to talk when needed?
            If not, why?
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.canTalk === "yes" ? "Yes" : application.cannotTalkReason}
          </p>
        </StyledQuestion>

        <StyledQuestion>
          <p>
            Are you able to enough bring consumables (e.g., food, elixirs/flasks, weapon
            enchants, etc...) for all boss attempts for each raid night per week? This
            includes both progression and farm raid nights. If not, why?
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.bringConsumes === "yes"
              ? "Yes"
              : application.cannotBringConsumesReason}
          </p>
        </StyledQuestion>

        <StyledQuestion>
          <p>
            Please provide a short summary of your previous WoW experience, focusing
            mainly on your raiding experience and achievements.
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.wowExperience}
          </p>
        </StyledQuestion>

        <StyledQuestion>
          <p>
            Briefly describe your approach/philosophy to raiding (e.g., are you
            competitive, casual but effective, do you study boss tactics or world of
            logs?).
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.describeSelf}
          </p>
        </StyledQuestion>

        <StyledQuestion>
          <StyledLabel>Discord ID:</StyledLabel> {application.discordId}
        </StyledQuestion>

        <StyledQuestion>
          <p>(Optional) Do you know anyone in the guild that could vouch for you?</p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.vouch}
          </p>
        </StyledQuestion>

        <StyledQuestion>
          <p>
            (Optional) Is there something we should know? Travelling, demanding family or
            career that could get in the way of raiding etc.
          </p>
          <p>
            <StyledLabel>Answer:</StyledLabel>
            {application.anythingElse}
          </p>
        </StyledQuestion>
      </WhitePanel>
    </section>
  );
};

export default YourApplication;
