import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StatusLabels } from "../data";
import colors from "../styles/colors";
import CharacterDetails from "./character-details";
import CommentsList from "./comments-list";
import WhitePanel from "./white-panel";

const StyledQuestion = styled.div`
  p:first-of-type {
    margin-bottom: 6px;
    color: ${colors.text.secondary};
    font-style: italic;
  }

  &:not(:last-of-type) {
    padding-bottom: 20px;
  }
`;

interface IApplicationOverviewProps {
  application: IApplication;
}

const ApplicationOverview: React.FC<IApplicationOverviewProps> = ({ application }) => (
  <>
    <WhitePanel>
      <dl
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <li>
          <dt>Discord ID</dt>
          <dd>{application.discordId}</dd>
        </li>

        <li
          css={css`
            text-align: right;
          `}
        >
          <dt>Status</dt>
          <dd>{StatusLabels[application.status]}</dd>
        </li>
      </dl>
      {application.characters.map((c, i) => (
        <CharacterDetails key={c.name} character={c} index={i} />
      ))}

      <h4
        css={css`
          margin-top: 30px;
        `}
      >
        Questions &amp; Answers
      </h4>

      <StyledQuestion>
        <p>
          Are you able to consistently raid 3 times per week for progression, and 2 times
          per a week for farm content between 19:30-23:00 (server time)?
        </p>
        <p>
          {application.availability === "full"
            ? "Yes, I can consistently show high attendance for the above raid times."
            : application.partialAvailabilityReason || "No reason given"}
        </p>
      </StyledQuestion>

      {(application.describeSelf || application.wowExperience) && (
        <>
          <StyledQuestion>
            <p>
              Are you able to use a microphone on discord and are happy to talk when
              needed?
            </p>
            <p>
              {application.canTalk === "yes"
                ? "Yes"
                : application.cannotTalkReason || "No reason given"}
            </p>
          </StyledQuestion>

          <StyledQuestion>
            <p>
              Are you able to bring enough consumables (e.g., food, elixirs/flasks, weapon
              enchants, etc...) for all boss attempts for each raid night per week? This
              includes both progression and farm raid nights.
            </p>
            <p>
              {application.bringConsumes === "yes"
                ? "Yes"
                : application.cannotBringConsumesReason || "No reason given"}
            </p>
          </StyledQuestion>

          <StyledQuestion>
            <p>Please provide a short summary of your previous WoW raiding experience:</p>
            <p>{application.wowExperience || "Not answered"}</p>
          </StyledQuestion>

          <StyledQuestion>
            <p>
              Briefly describe your approach/philosophy towards raiding within a guild:
            </p>
            <p>{application.describeSelf || "Not answered"}</p>
          </StyledQuestion>

          <StyledQuestion>
            <p>(Optional) Do you know anyone in the guild that could vouch for you?</p>
            <p>{application.vouch || "No"}</p>
          </StyledQuestion>

          <StyledQuestion>
            <p>
              (Optional) Is there something we should know? Travelling, demanding family
              or career that could get in the way of raiding etc.
            </p>
            <p>{application.anythingElse || "No"}</p>
          </StyledQuestion>
        </>
      )}
    </WhitePanel>
    <CommentsList postId={application.userId} />
  </>
);

export default ApplicationOverview;
