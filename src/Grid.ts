import { Direction, GridState } from "./models";

class Grid {
  private state: GridState;
  public canvas: HTMLCanvasElement;
  public container: HTMLDivElement;
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "grid-container";
    this.state = {
      position: { x: 0, y: 0 },
      direction: Direction.north,
      gridSize: { columns: 10, rows: 10 },
    };
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.canvas.style.width = "100%";
    this.drawGrid();
    this.container.appendChild(this.canvas);
  }

  update(state: GridState) {
    this.state = state;
    this.drawGrid();
  }

  private drawGrid() {
    const columnWidth = this.canvas.width / this.state.gridSize.columns;
    const rowHeight = this.canvas.height / this.state.gridSize.rows;
    const context = this.canvas.getContext("2d");

    if (context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      context.strokeStyle = "black";
      for (let x = 0; x <= this.canvas.width; x += columnWidth) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, this.canvas.height);
        context.stroke();
      }
      for (let y = 0; y <= this.canvas.height; y += rowHeight) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(this.canvas.width, y);
        context.stroke();
      }
    }
  }
}

export default Grid;
