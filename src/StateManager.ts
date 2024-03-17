import { initialValues } from "./utils/config";
import { Position } from "./models";
import { Language } from "./utils/config";

// I usually use this pattern to manage state in my vanilla js projects
class State<T> {
  public current: T;
  private subscribers: ((state: T) => void)[] = [];

  constructor(initial: T) {
    this.current = initial;
  }

  public set(next: T): void {
    this.current = next;
    this.subscribers.forEach((cb) => cb(this.current));
  }

  public subscribe(cb: (state: T) => void): void {
    this.subscribers.push(cb);
  }

  public unsubscribe(cb: (state: T) => void): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== cb);
  }
}

export const startingPosition = new State<Position>(
  initialValues.startingPosition
);
export const instructions = new State<string>(initialValues.instructions);
export const language = new State<Language>(initialValues.language);
export const gridSize = new State(initialValues.gridSize);
