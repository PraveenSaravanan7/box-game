import { BoxElement } from "./components/Box";

export class Game {
  private box?: BoxElement;
  private keyboardControl: boolean;
  private handleKeyUp: (event: KeyboardEvent) => void;

  constructor() {
    this.keyboardControl = true;
    this.handleKeyUp = (event) => {
      if (this.box?.element)
        updateBoxWithNewPositions(event, this.box?.element);
    };

    this.addListerns();
  }

  updateBox(newBox: BoxElement) {
    this.box?.deactivate();
    this.box = newBox;
  }

  private addListerns() {
    document.addEventListener("keyup", this.handleKeyUp);
  }

  private removeListner() {
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
}

export const updateBoxWithNewPositions = (
  event: KeyboardEvent,
  box: HTMLDivElement
) => {
  // calculating next
  const step = 20;
  const key = event.code.replace("Key", "");
  let left = Number(box.style.left.replace("px", ""));
  let top = Number(box.style.top.replace("px", ""));

  switch (key) {
    case "A": {
      left -= step;
      break;
    }
    case "D": {
      left += step;
      break;
    }
    case "W": {
      top -= step;
      break;
    }
    case "S": {
      top += step;
      break;
    }
  }

  // updating ui
  box.style.left = left + "px";
  box.style.top = top + "px";
};
