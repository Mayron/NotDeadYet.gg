import { css } from "@emotion/react";

interface IYourApplicationProps {
  application: IApplication;
}

const YourApplication: React.FC<IYourApplicationProps> = ({ application }) => (
  <section>
    <header
      css={css`
        text-align: center;
      `}
    >
      <h1>Your Application</h1>
      <p>Here you can view your submitted application and check for updates.</p>
    </header>

    <ul>
      <li>availability: {application.availability}</li>
      <li>partialAvailabilityReason: {application.partialAvailabilityReason}</li>
      <li>characterName: {application.characterName}</li>
      <li>characterClass: {application.characterClass}</li>
      <li>characterMainSpec: {application.characterMainSpec}</li>
      <li>primaryProfession1: {application.primaryProfession1}</li>
      <li>primaryMaxLevel1: {application.primaryMaxLevel1}</li>
      <li>primaryNotMaxedReason1: {application.primaryNotMaxedReason1}</li>
      <li>primaryProfession2: {application.primaryProfession2}</li>
      <li>primaryMaxLevel2: {application.primaryMaxLevel2}</li>
      <li>primaryNotMaxedReason2: {application.primaryNotMaxedReason2}</li>
      <li>canTalk: {application.canTalk}</li>
      <li>cannotTalkReason: {application.cannotTalkReason}</li>
      <li>bringConsumes: {application.bringConsumes}</li>
      <li>cannotBringConsumesReason: {application.cannotBringConsumesReason}</li>
      <li>wowExperience: {application.wowExperience}</li>
      <li>describeSelf: {application.describeSelf}</li>
      <li>discordId: {application.discordId}</li>
      <li>vouch: {application.vouch}</li>
      <li>anythingElse: {application.anythingElse}</li>
    </ul>
  </section>
);

export default YourApplication;
