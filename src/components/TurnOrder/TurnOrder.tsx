import { GameStore } from "@/store/game";
import { useStore } from "zustand";

import "./TurnOrder.css";

export function TurnOrder() {
  const { turnOrder, currentTurn } = useStore(GameStore);

  return (
    <div className="TurnOrder">
      {turnOrder.map((character, index) => {
        const active = currentTurn === index;
        return (
          <div
            className="TurnOrder__item"
            key={character.id}
            style={{ backgroundColor: active ? "lightyellow" : "transparent" }}
          >
            {character.name}
          </div>
        );
      })}
    </div>
  );
}
