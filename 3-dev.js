// Get elements
const entryType = document.getElementById("entry1");
const nameInput = document.querySelector("input[type='text']");
const amountInput = document.querySelector("input[type='number']");
const addBtn = document.querySelector("button");
const historyTable = document.getElementById("history");

// Balance and summary
const balanceEl = document.querySelector("#expense h2"); 
const incomeEl = document.querySelector("#expense > div:last-child div:first-child p");
const expenseEl = document.querySelector("#expense > div:last-child div:last-child p");

// Transactions array
let transactions = [];

// Add new transaction
addBtn.addEventListener("click", () => {
  const type = entryType.value;
  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter valid name and amount!");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    type,
    amount
  };

  transactions.push(transaction);
  updateUI();

  // Clear inputs
  nameInput.value = "";
  amountInput.value = "";
});

// Update UI
function updateUI() {
  // Clear history table
  historyTable.innerHTML = "";

  // Variables for totals
  let income = 0, expense = 0;

  // Loop over transactions
  transactions.forEach((t, index) => {
    // Update totals
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }

    // Create table row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${t.name}</td>
      <td>${t.type}</td>
      <td>₹${t.amount}</td>
      <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button></td>
    `;
    historyTable.appendChild(row);
  });

  // Update balance, income, expense
  const balance = income - expense;
  balanceEl.textContent = `Balance: ₹${balance}`;
  incomeEl.textContent = `+₹${income}`;
  expenseEl.textContent = `-₹${expense}`;
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}
