class CreditCard extends HTMLElement {
  fields = ["cardnumber", "cardname", "cvv", "expiry"];
  formElId = "credit-card-details";
  templateId = "credit-card-form";
  fieldValidation = {
    cardnumber: /[^0-9]/g,
    cardname: /[^A-Za-z ]/g,
    cvv: /[^0-9]/g,
    expiry: /[^0-9]/g,
  };
  fieldMaxLimit = {
    cardnumber: 16,
    cardname: 1000,
    cvv: 3,
    expiry: 5,
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const payload = {};
    this.fields.forEach((field) => {
      payload[field] = e.target.elements[field].value;
    });
    this.showMessage();
    e.target.reset();
  };
  onExpiryChange = (e) => {
    let expirydate = e.target.value;
    let position = 2;
    e.target.value = [
      expirydate.slice(0, position),
      "/",
      expirydate.slice(position),
    ].join("");
  };
  onInputChange = (e, field) => {
    let cardnumber = e.target.value;
    e.target.value = cardnumber
      .replace(this.fieldValidation[field], "")
      .slice(0, this.fieldMaxLimit[field]);
  };
  showMessage = () => {
    const banner = this.querySelector(".banner");
    banner.classList.remove("hide");
    setTimeout(() => banner.classList.add("hide"), 3000);
  };
  connectedCallback() {
    const template = document.getElementById(this.templateId);
    const node = document.importNode(template.content, true);
    this.appendChild(node);
    this.querySelector(`#${this.formElId}`).onsubmit = this.onFormSubmit;
    this.fields.forEach((field) => {
      this.querySelector(`[name='${field}']`).oninput = (e) =>
        this.onInputChange(e, field);
    });
    this.querySelector('[name="expiry"]').onchange = this.onExpiryChange;
  }
}

customElements.define("credit-card", CreditCard);
