import React from "react";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config/config/firebase";
import { collection } from "firebase/firestore";
import useGetUserData from "./useGetUserData";

const useAddTranscation = () => {
  const addTransactionRef = collection(db, "transcation");
  const { userID, name } = useGetUserData();
  const addTransaction = async ({
    description,
    transactionType,
    transactionAmount,
  }) => {
    if (userID) {
      try {
        await addDoc(addTransactionRef, {
          userID,
          name,
          description,
          transactionType,
          transactionAmount,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Dei ennamo thappu paniruka!");
    }
  };
  return { addTransaction };
};

export default useAddTranscation;
