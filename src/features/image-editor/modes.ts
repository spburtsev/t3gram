import AdjustmentsHorizontalIcon from "@heroicons/react/24/outline/AdjustmentsHorizontalIcon";
import ArrowsPointingOutIcon from "@heroicons/react/24/outline/ArrowsPointingOutIcon";
import SwatchIcon from "@heroicons/react/24/outline/SwatchIcon";

export enum EditorMode {
  View,
  Crop,
  Filter,
  Adjust,
}

export const editorModeButtons = [
  { mode: EditorMode.Crop, tooltip: "Crop", icon: ArrowsPointingOutIcon },
  { mode: EditorMode.Filter, tooltip: "Filter", icon: SwatchIcon },
  {
    mode: EditorMode.Adjust,
    tooltip: "Adjust",
    icon: AdjustmentsHorizontalIcon,
  },
];
