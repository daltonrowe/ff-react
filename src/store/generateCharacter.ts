import { nanoid } from "nanoid";
import { randomInRange } from "@/util/randomInRange";

export const defaultSkills: CharacterSkill[] = [
  {
    id: "basic-attack",
    name: "Attack",
    damage: 50,
    mp: 0,
  },
];

export const generateName = (type: CharacterType): string => {
  const enemyNames = [
    "Dire Wolf",
    "Malboro",
    "Tonberry",
    "Kobold",
    "Gelatinous Cube",
    "Beholder",
    "Snake",
    "Starman",
  ];

  const partyNames = [
    "Jack",
    "Terra",
    "Bill",
    "Lisa",
    "Nathan",
    "Felicia",
    "Jan",
    "Jess",
  ];

  switch (type) {
    case "party":
      return partyNames[randomInRange(0, partyNames.length)];

    case "enemy":
      return enemyNames[randomInRange(0, enemyNames.length)];
  }
};

export const generateCharacterStats = (): CharacterStats => {
  const newStats: CharacterStats = {
    hp: randomInRange(200, 999),
    mp: randomInRange(20, 200),
    str: randomInRange(1, 99),
    def: randomInRange(1, 99),
    spd: randomInRange(1, 99),
  };

  return newStats;
};

export const generateCharacter = (type: CharacterType): Character => {
  const newCharacterStats = generateCharacterStats();

  const newCharacter: Character = {
    id: nanoid(),
    name: generateName(type),
    maxStats: { ...newCharacterStats },
    currentStats: { ...newCharacterStats },
    skills: defaultSkills,
  };

  return newCharacter;
};

export const generateCharacters = (
  type: CharacterType,
  number: number
): Character[] => {
  const newCharacters = [];

  for (let i = 0; i < number; i++) {
    newCharacters.push(generateCharacter(type));
  }

  return newCharacters;
};
