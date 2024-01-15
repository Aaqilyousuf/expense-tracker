import React, { useState } from "react";
import useAddTranscation from "../hooks/useAddTranscation";
import useGetTransaction from "../hooks/useGetTransaction";
import "./style.css";
import useGetUserData from "../hooks/useGetUserData";
import { auth } from "../config/config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
  const { addTransaction } = useAddTranscation();
  const { transactions, transactionTotal } = useGetTransaction();
  const { name, userID } = useGetUserData();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const navigate = useNavigate();
  const { balance, income, expense } = transactionTotal;
  const onSubmit = () => {
    addTransaction({
      description,
      transactionType,
      transactionAmount,
    });
    setDescription("");
    setTransactionAmount("");
  };
  const signUserOut = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your balance</h3>
            {balance >= 0 ? <h2>${balance}</h2> : <h2>-${balance * -1}</h2>}
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expense}</p>
            </div>
          </div>
          <form
            className="add-transaction"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expenses</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <button type="submit" onClick={onSubmit}>
              Add Transcation
            </button>
          </form>
        </div>
        <div className="profile">
          <button className="sign-out-button" onClick={signUserOut}>
            Sign out
          </button>
        </div>
      </div>
      <div className="transactions">
        <h1>Transcation</h1>
        <ul style={{ listStyle: "none" }}>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li key={transaction.id}>
                <h4>{description}</h4>
                <p>
                  $ {transactionAmount} |
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ExpenseTracker;
