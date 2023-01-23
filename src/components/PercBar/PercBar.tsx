import "./PercBar.css";

interface PercBarProps {
  current: number;
  max: number;
  modifier?: string;
}

export function PercBar(props: PercBarProps) {
  const { current, max, modifier } = props;

  const perc = current / max;
  const PercBarClass = `PercBar ${modifier ? `PercBar--${modifier}` : ""}`;

  return (
    <div className={PercBarClass}>
      <div
        className="PercBar__filled"
        style={{ width: `${perc * 100}%` }}
      ></div>
    </div>
  );
}
