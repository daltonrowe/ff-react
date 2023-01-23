type CharacterType = "party" | "enemy";

type Character = {
  id: string;
  name: string;
  maxStats: CharacterStats;
  currentStats: CharacterStats;
  skills: CharacterSkills[];
};

type CharacterStats = {
  hp: number;
  mp: number;
  str: number;
  def: number;
  spd: number;
};

type CharacterSkill = {
  id: string;
  name: string;
  damage: number;
  mp: number;
};
