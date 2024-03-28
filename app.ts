#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = Math.floor(Math.random() * 100000 + 1); //generate random balance.
// Display welcome message
console.log(
  chalk.bold.overline.underline("\n\t\t|🎉 Welcome to the ATM 🎉|\n\t\t")
);
console.log(
  chalk.bold.italic.bgBlue("\n\t.........Please insert your card..........\n\t")
);
// Prompt user to enter PIN
let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    message: chalk.bold.italic("Please enter your PIN: "),
    type: "number",
    transformer: (input) => {
      return chalk.italic.cyan.bold(input);
    },
  },
]);
let mypin = pinAnswer.pin;
if (!isNaN(mypin)) {
  // Verify PIN
  console.log(
    chalk.italic.bold("Your PIN code has been successfully verified.✅\n")
  );
  // Prompt user to select an option
  let optionAns = await inquirer.prompt([
    {
      name: "option",
      message: chalk.italic.bold(
        "Please indicate your preference by selecting an option.\n"
      ),
      type: "list",
      choices: [
        "Check Balance",
        "Withdraw",
        "Fast Cash",
        "Change Pin",
        "Add Funds",
        "Funds Transfer",
        "Exit",
      ],
    },
  ]);

  // Withdraw
  if (optionAns.option === "Withdraw") {
    let amountAns = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message: chalk.bold.italic(
          "Please specify the amount you wish to withdraw: "
        ),
        transformer: (input) => {
          return chalk.italic.cyan.bold(input);
        },
      },
    ]);

    if (amountAns.amount > myBalance) {
      // Insufficient balance for withdrawal
      console.log(
        chalk.bold.italic(
          "Your account balance is insufficient for this transaction"
        ) + chalk.red.bold("!")
      );
    }
    //= , -= , +=  ==> assignment operator.
    else {
      myBalance -= amountAns.amount;
      // Update balance after withdrawal
      console.log(
        chalk.bold.italic(`Here is your remaining balance💰 : `) +
          chalk.cyan.bold.italic(`${myBalance}\n`)
      );
    }
    // Check balance
  } else if (optionAns.option === "Check Balance")
    // Display current balance
    console.log(
      chalk.bold.italic(`Your current balance is:`) +
        chalk.cyan.bold.italic(`${myBalance}\n`)
    );
  // Fast Cash
  if (optionAns.option === "Fast Cash") {
    let fastoption = await inquirer.prompt([
      {
        name: "balanceoption",
        message: chalk.bold.italic("Select withdrawal amount:"),
        type: "list",
        choices: [
          chalk.cyan.bold("1000"),
          chalk.cyan.bold("3000"),
          chalk.cyan.bold("5000"),
          chalk.cyan.bold("10000"),
        ],
      },
    ]);
    console.log(
      chalk.bold.italic(`Here is your remaining balance💰: `) +
        chalk.bold.cyan.italic(` ${myBalance}\n`)
    );
  }
  // Change Pin
  if (optionAns.option === "Change Pin") {
    let changePin = await inquirer.prompt([
      {
        name: "newpin",
        message: chalk.bold.italic("Please enter your new PIN:"),
        type: "number",
        transformer: (input) => {
          return chalk.italic.cyan.bold(input);
        },
      },
    ]);

    pinAnswer = changePin.newpin;
    console.log(
      chalk.bold.italic(`Your new PIN is: `) +
        chalk.bold.cyan.italic(`${pinAnswer}\n`)
    );
  }
  // Add Funds
  if (optionAns.option === "Add Funds") {
    let fundsToAdd = await inquirer.prompt([
      {
        name: "amount",
        type: "number",
        message: chalk.bold.italic(
          "Please specify the amount you wish to add to your balance: "
        ),
        transformer: (input) => {
          return chalk.italic.cyan.bold(input);
        },
      },
    ]);

    myBalance += fundsToAdd.amount;
    // Update balance after adding funds
    console.log(
      chalk.bold.italic(`Funds added successfully. Your new balance is: `) +
        chalk.cyan.bold.italic(`${myBalance}\n`)
    );
  }
  // Funds Transfer
  if (optionAns.option === "Funds Transfer") {
    let fundsToSend = await inquirer.prompt([
      {
        name: "recipientAccount",
        message: chalk.bold.italic(
          "Please enter the recipient's account number: "
        ),
        type: "number",
        transformer: (input) => {
          return chalk.italic.cyan.bold(input);
        },
      },
      {
        name: "amount",
        type: "number",
        message: chalk.bold.italic(
          "Please specify the amount you wish to send: "
        ),
        transformer: (input) => {
          return chalk.italic.cyan.bold(input);
        },
      },
    ]);

    // Deduct sent amount from sender's balance
    if (fundsToSend.amount > myBalance) {
      console.log(
        chalk.bold.italic(
          "Your account balance is insufficient for this transaction"
        ) + chalk.red.bold("!")
      );
    } else {
      myBalance -= fundsToSend.amount;
      console.log(
        chalk.bold.italic(
          `Funds sent successfully. Your remaining balance is: `
        ) + chalk.cyan.bold.italic(`${myBalance}\n`)
      );
    }
  }
  // Exit
  if (optionAns.option === "Exit") {
    console.log(
      chalk.bold.yellow.italic("Thank you for using the ATM. Goodbye!\n")
    );
  }
}
// Incorrect PIN
else {
  console.log(chalk.red.bold.italic("Your PIN is incorrect.\n"));
}
