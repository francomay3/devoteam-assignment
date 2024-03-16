import { initialValues } from "../config";
import getResult from "../getResult";
import { Language } from "../utils/languageConfig";
import { Direction, Position, GridSize } from "../models";

export class Grid extends HTMLElement {
  private gridLinesWidth = 2;
  private arrowLineWidth = 4;
  private gridLinesColor = "#bfc6d4";
  private initialRobotColor = "#325aaf";
  private finalRobotColor = "#ff0000";
  public canvas: HTMLCanvasElement;

  constructor() {
    super();
    this.canvas = document.createElement("canvas");
    this.canvas.width = 1000;
    this.canvas.height = 1000;
    this.canvas.style.width = "100%";
    // this.drawGrid();
    this.appendChild(this.canvas);
    this.drawRobot(
      this.initialRobotColor,
      initialValues.startingPosition,
      initialValues.startingDirection,
      initialValues.gridSize
    );
  }

  connectedCallback() {
    this.id = this.getAttribute("id") || "grid-container";
  }

  clear() {
    const context = this.canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private drawGrid(gridSize: GridSize) {
    const columnWidth = this.canvas.width / gridSize.columns;
    const rowHeight = this.canvas.height / gridSize.rows;
    const context = this.canvas.getContext("2d");

    if (context) {
      context.save();
      context.strokeStyle = this.gridLinesColor;
      context.lineWidth = this.gridLinesWidth;

      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

      context.restore();
    }
  }

  public update({
    startingPosition,
    startingDirection,
    gridSize,
    instructions,
    language,
  }: {
    startingPosition: Position;
    startingDirection: Direction;
    gridSize: GridSize;
    instructions: string;
    language: Language;
  }) {
    this.clear();
    this.drawGrid(gridSize);
    const final = getResult(startingPosition, instructions, language);

    this.drawRobot(
      this.initialRobotColor,
      startingPosition,
      startingDirection,
      gridSize
    );
    this.drawRobot(
      this.finalRobotColor,
      final.position,
      final.direction,
      gridSize
    );
  }

  private drawRobot(
    color: string,
    position: Position,
    direction: Direction,
    gridSize: GridSize
  ) {
    const columnWidth = this.canvas.width / gridSize.columns;
    const rowHeight = this.canvas.height / gridSize.rows;
    const radius = Math.min(columnWidth, rowHeight) / 5;
    const arrowLength = radius * 2;
    const headLength = arrowLength / 3;

    const center = {
      x: position.x * columnWidth + columnWidth / 2,
      y: position.y * rowHeight + rowHeight / 2,
    };
    const context = this.canvas.getContext("2d");

    if (context) {
      context.save();

      context.fillStyle = color;
      context.lineWidth = this.arrowLineWidth;
      context.strokeStyle = color;
      context.lineCap = "round";

      context.beginPath();
      context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
      context.fill();

      context.translate(center.x, center.y);

      switch (direction) {
        case Direction.north:
          context.rotate(0);
          break;
        case Direction.east:
          context.rotate((90 * Math.PI) / 180);
          break;
        case Direction.south:
          context.rotate((180 * Math.PI) / 180);
          break;
        case Direction.west:
          context.rotate((270 * Math.PI) / 180);
          break;
      }

      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(0, -arrowLength);
      context.moveTo(-headLength, -arrowLength + headLength);
      context.lineTo(0, -arrowLength);
      context.moveTo(headLength, -arrowLength + headLength);
      context.lineTo(0, -arrowLength);

      context.stroke();

      context.restore();
    }
  }
}

customElements.define("grid-component", Grid);
