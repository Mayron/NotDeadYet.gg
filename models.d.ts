declare type WoWClass =
  | "Death Knight"
  | "Druid"
  | "Hunter"
  | "Mage"
  | "Paladin"
  | "Priest"
  | "Rogue"
  | "Shaman"
  | "Warlock"
  | "Warrior";

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

declare interface IProfessionInfo {
  name: string;
  maxLevel: "yes" | "no" | "";
  notMaxedReason: string;
}

declare interface ICharacterInfo {
  name: string;
  class: WoWClass | "";
  mainSpec: string;
  offSpec: string;
  professions: IProfessionInfo[];
}

declare interface ICharacterInfoFormInput {
  characters: ICharacterInfo[];
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
