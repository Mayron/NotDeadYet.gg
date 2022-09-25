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
