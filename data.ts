export const professions: string[] = [
  "None",
  "Alchemy",
  "Blacksmithing",
  "Enchanting",
  "Engineering",
  "Herbalism",
  "Inscription",
  "Jewelcrafting",
  "Leatherworking",
  "Mining",
  "Skinning",
  "Tailoring",
];

export const characterClasses: string[] = [
  "Death Knight",
  "Druid",
  "Hunter",
  "Mage",
  "Paladin",
  "Priest",
  "Rogue",
  "Shaman",
  "Warlock",
  "Warrior",
];

export const specializations = new Map<WoWClass, string[]>();
specializations.set("Death Knight", ["Blood", "Unholy", "Frost"]);
specializations.set("Druid", ["Balance", "Feral Combat", "Restoration"]);
specializations.set("Hunter", ["Beast Mastery", "Marksmanship", "Survival"]);
specializations.set("Mage", ["Arcane", "Fire", "Frost"]);
specializations.set("Paladin", ["Retribution", "Protection", "Holy"]);
specializations.set("Priest", ["Discipline", "Holy", "Shadow"]);
specializations.set("Rogue", ["Assassination", "Combat", "Subtlety"]);
specializations.set("Shaman", ["Elemental", "Enhancement", "Restoration"]);
specializations.set("Warlock", ["Affliction", "Demonology", "Destruction"]);
specializations.set("Warrior", ["Arms", "Fury", "Protection"]);

export const Status = {
  NewApplicant: 0,
  UnconfirmedMember: 1,
  Declined: 2,
  PendingInvite: 3,
  GuildMember: 4,
};

export const StatusLabels = [
  "New Applicant",
  "Unconfirmed Guild Member",
  "Declined",
  "Pending Guild Invite",
  "Guild Member",
];

export const Collections = {
  Users: "users",
  Applications: "applications",
  Comments: "comments",
};
