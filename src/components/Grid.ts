import { initialValues } from "../utils/config";
import getResult from "../utils/getResult";
import { Language } from "../utils/languageConfig";
import { Direction, Position, GridSize } from "../models";
import originsvg from "../origin.svg";

export class Grid extends HTMLElement {
  private gridLinesWidth = 2;
  private arrowLineWidth = 4;
  private gridLinesColor = "#bfc6d4";
  private initialRobotColor = "#a6aebb";
  private finalRobotColor = "#5a7cc0";
  private pathColor = "#758fbd";
  public canvas: HTMLCanvasElement;

  constructor() {
    super();
    this.innerHTML = /*html*/ `
    <div class="grid-wrapper">
    <img src="${originsvg}" alt="origin" class="grid-origin" />
    <canvas width="1000" height="1000" style="width: 100%"></canvas>
    </div>
    `;

    this.canvas = this.querySelector("canvas")!;

    this.drawRobot(
      this.initialRobotColor,
      initialValues.startingPosition,
      initialValues.startingDirection,
      initialValues.gridSize
    );
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

    const result = getResult(startingPosition, instructions, language);

    if (!result) {
      this.drawRobot(
        this.initialRobotColor,
        startingPosition,
        startingDirection,
        gridSize
      );
      return;
    }

    this.drawPath(result.path, gridSize);

    this.drawRobot(
      this.initialRobotColor,
      startingPosition,
      startingDirection,
      gridSize
    );

    this.drawRobot(
      this.finalRobotColor,
      result.position,
      result.direction,
      gridSize
    );
  }

  private drawPath(path: Position[], gridSize: GridSize) {
    if (path.length < 2) {
      return;
    }

    const columnWidth = this.canvas.width / gridSize.columns;
    const rowHeight = this.canvas.height / gridSize.rows;
    const context = this.canvas.getContext("2d")!;

    context.save();
    context.strokeStyle = this.pathColor;
    context.lineWidth = this.arrowLineWidth;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 5;
    context.shadowColor = this.pathColor;
    context.setLineDash([5, 15]);

    context.beginPath();
    context.moveTo(
      path[0].x * columnWidth + columnWidth / 2,
      path[0].y * rowHeight + rowHeight / 2
    );
    path.forEach((step) => {
      context.lineTo(
        step.x * columnWidth + columnWidth / 2,
        step.y * rowHeight + rowHeight / 2
      );
    });
    context.stroke();

    context.restore();
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
    const context = this.canvas.getContext("2d")!;

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

customElements.define("grid-component", Grid);
