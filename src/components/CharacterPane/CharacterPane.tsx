import { GameStore } from "@/store/game";
import { useStore } from "zustand";
import { CharacterList } from "@/components/CharacterList/CharacterList";
import "./CharacterPane.css";
import { TurnOrder } from "../TurnOrder/TurnOrder";

export function CharacterPane() {
  const { party, enemy } = useStore(GameStore);

  return (
    <div className="CharacterPane">
      <div className="CharacterPane__turns">
        <TurnOrder />
      </div>
      <div className="CharacterPane__teams">
        <CharacterList teamName="Enemies" items={enemy} />
        <CharacterList teamName="Party" items={party} />
      </div>
    </div>
  );
}
