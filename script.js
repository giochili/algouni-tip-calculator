const billValue = document.querySelector(".input-bill");
const tipBtn = Array.from(document.getElementsByClassName("btn-tip"));
const manualPercent = document.querySelector(".percentage-input");
const peopleNum = document.querySelector(".people-input");
const resetBtn = document.querySelector(".reset-btn");
const tipContent = document.querySelector(".actual-tip");
const totalContent = document.querySelector(".actual-total");
const visitorContainer = document.querySelector(".people-amount-container");
const warning = document.querySelector(".warning-para");
const billContainer = document.querySelector(".input-container");

let buttonPercentage;
let bill;
let visitor;
let customPer;

let previousButton = null;

tipBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (previousButton) {
      previousButton.style.backgroundColor = "";
      previousButton.style.color = "";
    }
    previousButton = event.target;
    buttonPercentage = parseInt(event.target.textContent);
    event.target.style.backgroundColor = "#9fe8df";
    event.target.style.color = "#00474b";
    manualPercent.value = "";
    manualPercent.style.border = "none";
    customPer = 0;
    calculate();
  });
});
manualPercent.addEventListener("input", (event) => {
  customPer = parseInt(event.target.value).toFixed(0);
  if (customPer && customPer > 0) {
    manualPercent.style.border = "solid 2px #26c2ae";
  } else {
    manualPercent.style.border = "none";
  }
  tipBtn.forEach((button) => {
    button.style.backgroundColor = "#00474b";
    button.style.color = "#fff";
  });
  calculate();
});
billValue.addEventListener("input", (event) => {
  bill = parseInt(event.target.value);

  if (bill && bill > 0) {
    billContainer.style.border = "solid 2px #26c2ae";
  } else {
    billContainer.style.border = "none";
  }
  calculate();
});
peopleNum.addEventListener("input", (event) => {
  visitor = parseInt(event.target.value);
  calculate();
});
function calculate() {
  let tipPerPerson;
  let totalPerPerson;
  visitorChecker();
  if (visitor <= 0) {
    tipPerPerson = 0;
    totalPerPerson;
  } else {
    if (isNaN(customPer) || customPer === 0) {
      //   manualPercent.style.border = "none";
      tipPerPerson = ((bill * buttonPercentage) / 100 / visitor).toFixed(2);
      totalPerPerson = (parseFloat(tipPerPerson) + bill / visitor).toFixed(2);

      if (!isNaN(tipPerPerson) && !isNaN(totalPerPerson)) {
        tipContent.textContent = `$ ${tipPerPerson}`;
        totalContent.textContent = `$ ${totalPerPerson}`;
      }
    } else {
      let tipPerPerson = ((bill * customPer) / 100 / visitor).toFixed(2);
      let totalPerPerson = (parseFloat(tipPerPerson) + bill / visitor).toFixed(
        2
      );

      if (!isNaN(tipPerPerson) && !isNaN(totalPerPerson)) {
        tipContent.textContent = `$ ${tipPerPerson}`;
        totalContent.textContent = `$ ${totalPerPerson}`;
      }
    }
  }
}
resetBtn.addEventListener("click", () => {
  tipContent.textContent = `$ 0`;
  totalContent.textContent = `$ 0`;
  manualPercent.value = `0`;
  visitor = 0;
  bill = 0;
  buttonPercentage = 0;
  peopleNum.value = 0;
  billValue.value = 0;
  manualPercent.style.border = "none";
  billContainer.style.border = "none";
});
function visitorChecker() {
  if (visitor <= 0) {
    visitorContainer.style.border = "solid 2px #e17052";
    warning.style.display = "block";
  } else {
    visitorContainer.style.border = "none";
    warning.style.display = "none";
  }
}
