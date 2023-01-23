import { CharacterInfo } from "../CharacterInfo/CharacterInfo";

import "./CharacterList.css";

interface CharacterListProps {
  items: Character[];
  teamName: string;
}

export function CharacterList(props: CharacterListProps) {
  const { items, teamName } = props;

  return (
    <div className="CharacterList">
      <div className="CharacterList__name">{teamName}</div>
      <div className="CharacterList__characters">
        {items.map((character) => (
          <CharacterInfo key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
