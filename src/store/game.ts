import { createContext } from "react";
import { createStore } from "zustand";
import { generateCharacters } from "./generateCharacter";

interface GameState {
  winner: "party" | "enemy" | null;
  party: Character[];
  enemy: Character[];
  turnOrder: Character[];
  updateTurnOrder: () => void;
  currentTurn: number;
  nextTurn: () => void;
  getCurrentCharacter: () => Character;
  queuedAction: {
    source: Character;
    skill: CharacterSkill;
    target: Character | null;
  } | null;
  setQueuedAction: (character: Character, skill: CharacterSkill) => void;
  setQueuedTarget: (target: Character) => void;
  executeAction: () => void;
  checkWinCondition: () => void;
}

export const GameStore = createStore<GameState>()((set, get) => ({
  winner: null,
  party: [...generateCharacters("party", 4)],
  enemy: [...generateCharacters("enemy", 4)],
  turnOrder: [],
  updateTurnOrder: () => {
    const { party, enemy } = get();

    const newTurnOrder = [...party, ...enemy];

    newTurnOrder.sort((a, b) =>
      a.currentStats.spd > b.currentStats.spd ? 1 : -1
    );

    set({ turnOrder: newTurnOrder });
  },
  currentTurn: 0,
  nextTurn: () => {
    const { currentTurn, turnOrder, updateTurnOrder } = get();

    const findNextAlive = (): number => {
      let nextAliveIndex = 0;

      for (let i = currentTurn + 1; i < turnOrder.length; ) {
        const next = turnOrder[i];

        if (next.currentStats.hp <= 0) {
          i++;
        } else {
          nextAliveIndex = turnOrder.findIndex(
            (character) => character.id === next.id
          );
          break;
        }

        if (i > turnOrder.length) i = 0;
      }

      return nextAliveIndex;
    };

    const newTurn = findNextAlive();
    set({ currentTurn: newTurn });
  },
  getCurrentCharacter: (): Character => {
    const { currentTurn, turnOrder } = get();
    return turnOrder[currentTurn];
  },
  queuedAction: null,
  setQueuedAction: (character, skill) => {
    set({
      queuedAction: {
        source: character,
        skill,
        target: null,
      },
    });
  },
  setQueuedTarget: (target) => {
    const { queuedAction, executeAction } = get();
    if (!queuedAction) return alert("No action queued!");

    set({ queuedAction: { ...queuedAction, target } });
    executeAction();
  },
  executeAction: () => {
    const { queuedAction, nextTurn, checkWinCondition, turnOrder, winner } =
      get();
    if (!queuedAction) return alert("No action queued!");

    const { target, skill } = queuedAction;
    if (!target) return alert("No target queued!");

    target.currentStats.hp = Math.max(0, target.currentStats.hp - skill.damage);

    checkWinCondition();

    set({ queuedAction: null });
    if (!winner) nextTurn();
  },
  checkWinCondition: () => {
    const { party, enemy } = get();

    let partyHp = 0;
    party.map((character) => {
      partyHp += character.currentStats.hp;
    });

    let enemyHp = 0;
    enemy.map((character) => {
      enemyHp += character.currentStats.hp;
    });

    if (partyHp <= 0) set({ winner: "enemy" });
    if (enemyHp <= 0) set({ winner: "party" });
  },
}));

export const StoreContext = createContext(GameStore);
