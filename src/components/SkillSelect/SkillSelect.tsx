import { GameStore } from "@/store/game";
import { useStore } from "zustand";
import "./SkillSelect.css";

export function SkillSelect() {
  const { getCurrentCharacter, setQueuedAction } = useStore(GameStore);

  const currentCharacter = getCurrentCharacter();

  const handleSelectSkill = (skill: CharacterSkill) => {
    setQueuedAction(currentCharacter, skill);
  };

  return (
    <div className="SkillSelect">
      <div className="SkillSelect__name">{currentCharacter.name}</div>

      {currentCharacter.skills.map((skill) => (
        <div
          className="SkillSelect__skill"
          key={skill.id}
          onClick={() => {
            handleSelectSkill(skill);
          }}
        >
          {skill.name}
        </div>
      ))}
    </div>
  );
}
