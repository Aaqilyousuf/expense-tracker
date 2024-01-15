import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/config/firebase";
import useGetUserData from "./useGetUserData";

const useGetTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expense: 0.0,
  });
  const transactionCollection = collection(db, "transcation");
  const { userID } = useGetUserData();

  const getTransaction = async () => {
    let unsub;
    let totalIcome = 0;
    let totalExpense = 0;
    console.log(userID);
    try {
      const queryTransaction = query(
        transactionCollection,
        where("userID", "==", userID),
        orderBy("createdAt")
      );
      unsub = onSnapshot(queryTransaction, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpense += Number(data.transactionAmount);
          } else {
            totalIcome += Number(data.transactionAmount);
          }
          console.log(totalExpense, totalIcome);
        });

        setTransactions(docs);
        let balance = totalIcome - totalExpense;
        setTransactionTotal({
          balance,
          expense: totalExpense,
          income: totalIcome,
        });
      });
    } catch (err) {
      console.error(err);
    }
    return () => {
      unsub(); //CleanUp
    };
  };
  useEffect(() => {
    getTransaction();
  }, []);
  return { transactions, transactionTotal };
};

export default useGetTransaction;
