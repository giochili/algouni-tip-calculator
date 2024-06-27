const bill = document.querySelector(".input-bill");

let insertedBill;
bill.addEventListener("input", () => {
  insertedBill = bill.value;
  console.log(insertedBill);
});
