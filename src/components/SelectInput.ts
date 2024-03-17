class SelectInput extends HTMLElement {
  private label: string = "";
  private options: string[] = [];
  private initialValue: string = "";

  constructor() {
    super();
    this.id = this.getAttribute("id") || "";
    this.label = this.getAttribute("label") || "";
    this.options =
      this.getAttribute("options")
        ?.split(",")
        .map((option) => option.trim()) || [];
    this.initialValue = this.getAttribute("initial-value") || "";

    if (!this.id) {
      throw new Error("SelectInput must have an id attribute");
    }

    if (this.options.length === 0) {
      throw new Error(
        "SelectInput must have an options attribute (comma separated values)"
      );
    }

    const optionsHTML = this.options
      .map((option) => /*html*/ `<option value="${option}">${option}</option>`)
      .join("");

    this.innerHTML = /*html*/ `
      <div class="inline">
        <label for="${this.id}-select">${this.label}</label>
        <select id="${this.id}-select" value="${this.initialValue}">
          ${optionsHTML}
        </select>
      </div>
    `;
  }

  public onChange(cb: (value: string) => void) {
    const select = this.querySelector("select");
    if (select) {
      select.onchange = () => {
        cb(select.value);
      };
    }
  }
}

customElements.define("select-input", SelectInput);
