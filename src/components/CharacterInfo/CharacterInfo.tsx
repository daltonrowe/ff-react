import { GameStore } from "@/store/game";
import { useStore } from "zustand";
import { PercBar } from "../PercBar/PercBar";
import "./CharacterInfo.css";

interface CharacterInfoProps {
  character: Character;
}

export function CharacterInfo(props: CharacterInfoProps) {
  const { character } = props;
  const { turnOrder, currentTurn, queuedAction, setQueuedTarget } =
    useStore(GameStore);

  const active =
    turnOrder[currentTurn] && turnOrder[currentTurn].id === character.id;

  const selectable = !active && queuedAction && queuedAction.target === null;
  const className = `CharacterInfo ${active ? "CharacterInfo--active" : ""} ${
    selectable ? "CharacterInfo--selecting" : ""
  }`;

  const handleSelect = () => {
    if (!selectable) return;
    setQueuedTarget(character);
  };

  return (
    <div
      className={className}
      onClick={handleSelect}
      style={{ cursor: selectable ? "pointer" : "auto" }}
    >
      <div className="CharacterInfo__row">{character.name}</div>

      <div className="CharacterInfo__row">
        <PercBar
          current={character.currentStats.hp}
          max={character.maxStats.hp}
          modifier="hp"
        />
        <PercBar
          current={character.currentStats.mp}
          max={character.maxStats.mp}
          modifier="mp"
        />
      </div>
    </div>
  );
}
