declare interface IFormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

declare interface ICharacterInfoFormInput {
  characterName: string;
  characterClass: string;
  characterMainSpec: string;

  primaryProfession1: string;
  primaryMaxLevel1: string;
  primaryNotMaxedReason1: string;

  primaryProfession2: string;
  primaryMaxLevel2: string;
  primaryNotMaxedReason2: string;
}

declare interface IAboutYouFormInput {
  canTalk: string;
  cannotTalkReason: string;

  bringConsumes: string;
  cannotBringConsumesReason: string;

  wowExperience: string;
  describeSelf: string;

  discordId: string;
  vouch: string;
  anythingElse: string;
}

declare interface IApplication {
  expectations: boolean;
  availability: "full" | "partial" | "";
  partialAvailabilityReason: string;

  characterName: "";
  characterClass: "";
  characterMainSpec: "";

  primaryProfession1: "";
  primaryMaxLevel1: "";
  primaryNotMaxedReason1: "";

  primaryProfession2: "";
  primaryMaxLevel2: "";
  primaryNotMaxedReason2: "";

  canTalk: "";
  cannotTalkReason: "";

  bringConsumes: "";
  cannotBringConsumesReason: "";

  wowExperience: "";
  describeSelf: "";

  discordId: "";
  vouch: "";
  anythingElse: "";
}
