import { CharacterPane } from "@/components/CharacterPane/CharacterPane";
import { GameStore } from "@/store/game";
import { useEffect } from "react";
import { useStore } from "zustand";
import { SkillSelect } from "../SkillSelect/SkillSelect";

function App() {
  return (
    <div className="App">
      <CharacterPane />
      <SkillSelect />
    </div>
  );
}

export default App;
