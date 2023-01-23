import { createContext } from "react";
import { createStore } from "zustand";
import { generateCharacters } from "./generateCharacter";

interface GameState {
  winner: "party" | "enemy" | null;
  party: Character[];
  enemy: Character[];
  turnOrder: Character[];
  determineTurnOrder: () => void;
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
  determineTurnOrder: () => {
    const { party, enemy } = get();

    const newTurnOrder = [...party, ...enemy];

    newTurnOrder.sort((a, b) =>
      a.currentStats.spd > b.currentStats.spd ? 1 : -1
    );

    set({ turnOrder: newTurnOrder });
  },
  currentTurn: 0,
  nextTurn: () => {
    const { currentTurn, turnOrder } = get();
    const newTurn = currentTurn + 1;
    set({ currentTurn: newTurn < turnOrder.length ? newTurn : 0 });
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
    const { queuedAction, nextTurn, checkWinCondition, winner } = get();
    if (!queuedAction) return alert("No action queued!");

    const { target, skill } = queuedAction;
    if (!target) return alert("No target queued!");

    target.currentStats.hp = target.currentStats.hp - skill.damage;

    checkWinCondition();
    if (!winner) nextTurn();
  },
  checkWinCondition: () => {
    // check win condition
  },
}));

export const StoreContext = createContext(GameStore);
