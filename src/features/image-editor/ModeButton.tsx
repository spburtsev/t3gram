import { type HeroIcon } from "~/utils/client";
import { type EditorMode } from "./modes";
import { useCallback } from "react";
import { classNames } from "~/utils/client";

export default function ModeButton(props: {
  icon: HeroIcon;
  tooltip: string;
  isActive: boolean;
  mode: EditorMode;
  onClick: (mode: EditorMode) => void;
}) {
  const handleClick = useCallback(() => {
    props.onClick(props.mode);
  }, [props]);

  return (
    <div
      className="tooltip tooltip-bottom"
      data-tip={props.tooltip}
    >
      <button
        type="button"
        id={`mode-button-${props.mode}`}
        className={classNames(
          "btn-accent btn-square btn",
          props.isActive ? "btn-active" : "btn-outline"
        )}
        onClick={handleClick}
      >
        <props.icon className="h-6 w-6" />
      </button>
    </div>
  );
}
