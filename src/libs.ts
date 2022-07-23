import { BoxElement } from "./components/Box";

export class Game {
  private box?: BoxElement;
  private keyboardControl: boolean;
  private isListnerOn: boolean;
  private handleKeyUp: (event: KeyboardEvent) => void;
  onDeleteBox?: (index: number) => void;

  constructor() {
    this.isListnerOn = false;
    this.keyboardControl = true;
    this.handleKeyUp = (event) => {
      if (this.box)
        keyboardEventHandler(event, this.box?.element, () =>
          this.deleteBox(this.box?.index || 0)
        );
    };

    this.addListerns();
  }

  updateBox(newBox: BoxElement) {
    this.box?.deactivate();
    this.box = newBox;

    if (!this.isListnerOn && this.keyboardControl) this.addListerns();
  }

  private addListerns() {
    this.isListnerOn = true;
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private removeListner() {
    this.isListnerOn = false;
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  toggleKeyboardControl() {
    if (this.keyboardControl) {
      this.keyboardControl = false;
      this.removeListner();
    } else {
      this.keyboardControl = true;
      this.addListerns();
    }
  }

  getControlState() {
    return this.keyboardControl;
  }

  deleteBox(index: number) {
    this.removeListner();
    if (this.onDeleteBox) this.onDeleteBox(index);
    this.box = undefined;
  }
}

export const keyboardEventHandler = (
  event: KeyboardEvent,
  box: HTMLDivElement,
  deleteBox: () => void
) => {
  const step = 30;
  const key = event.code;
  let left = Number(box.style.left.replace("px", ""));
  let top = Number(box.style.top.replace("px", ""));

  switch (key) {
    case "KeyA": {
      left -= step;
      break;
    }
    case "KeyD": {
      left += step;
      break;
    }
    case "KeyW": {
      top -= step;
      break;
    }
    case "KeyS": {
      top += step;
      break;
    }
    case "Backspace":
    case "Delete": {
      deleteBox();
      break;
    }
  }

  // updating ui
  box.style.left = left + "px";
  box.style.top = top + "px";
};
