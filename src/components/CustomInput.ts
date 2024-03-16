class CustomInput extends HTMLElement {
  public input!: HTMLInputElement;
  private changeCallbacks: ((value: number | string) => void)[] = [];
  private isValid: boolean = true;
  private errorMessage: string = "";

  connectedCallback() {
    const initialValue = this.getAttribute("initial-value");
    const id = this.getAttribute("id");
    const label = this.getAttribute("label");
    const type = this.getAttribute("type") || "text";
    const min = this.getAttribute("min");
    const minNumber = type === "number" && min ? `min="${min}"` : undefined;

    // add style so that when the input is invalid, the label and input are red and the span is visible
    this.style.display = "flex";
    this.style.flexDirection = "column";
    this.style.gap = "0.5rem";

    if (!id) {
      throw new Error("CustomInput must have an id attribute");
    }

    this.innerHTML = /*html*/ `
    <div class="inline">
      <label for="${id}-input">${label}</label>
      <div class="stack input">
        <input type="${type}" id="${id}-input" value="${initialValue}" autocomplete="off" ${minNumber} />
        <span class="error valid"></span>
      </div>
    </div>
  `;

    this.input = this.querySelector("input") as HTMLInputElement;
    this.input.oninput = () => this.validate();
  }

  public onChange(cb: (value: any) => void) {
    this.changeCallbacks.push(cb);
  }

  public validators(...validators: ((value: any) => string | undefined)[]) {
    this.changeCallbacks.push((value) => {
      const errors = validators
        .map((validator) => validator(value))
        .filter(Boolean);
      if (errors.length > 0) {
        this.errorMessage = errors[0] as string;
        this.setIsValid(false);
      } else {
        this.setIsValid(true);
      }
    });
  }

  private setIsValid(isValid: boolean) {
    if (this.isValid === isValid) {
      return;
    }
    this.isValid = isValid;
    const errorMessageSpan = this.querySelector(".error")!;
    if (isValid) {
      errorMessageSpan.classList.remove("active");
    } else {
      errorMessageSpan.textContent = this.errorMessage;
      errorMessageSpan.classList.add("active");
    }
  }

  public validate() {
    const value = this.input.value;
    this.changeCallbacks.forEach((cb) => {
      if (this.input.type === "number") {
        cb(parseInt(value));
      } else {
        cb(value);
      }
    });
  }
}
customElements.define("custom-input", CustomInput);