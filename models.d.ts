declare interface IFormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

interface IRequirementsFormInput {
  expectations: boolean;
  availability: "full" | "partial" | "";
  partialAvailabilityReason: string;
}

declare interface ICharacterInfoFormInput {
  characterName: string;
  characterClass: string;
  characterMainSpec: string;

  primaryProfession1: string;
  primaryMaxLevel1: "yes" | "no" | "";
  primaryNotMaxedReason1: string;

  primaryProfession2: string;
  primaryMaxLevel2: "yes" | "no" | "";
  primaryNotMaxedReason2: string;
}

declare interface IAboutYouFormInput {
  canTalk: "yes" | "no" | "";
  cannotTalkReason: string;

  bringConsumes: "yes" | "no" | "";
  cannotBringConsumesReason: string;

  wowExperience: string;
  describeSelf: string;

  discordId: string;
  vouch: string;
  anythingElse: string;
}

declare interface IApplication
  extends IRequirementsFormInput,
    ICharacterInfoFormInput,
    IAboutYouFormInput {}
