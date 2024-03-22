import {
  deleteDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

export async function deleteEntryFromDb(collectionName, id, onSuccess) {
  try {
    await deleteDoc(doc(db, collectionName, id));
    onSuccess();
  } catch (error) {
    console.log(error);
  }
}

export async function duplicateEntry(collectionName, data, onSuccess) {
  try {
    await addDoc(collection(db, collectionName), data);
    onSuccess();
  } catch (error) {
    console.log(error);
  }
}

export async function updateEntry(collectionName, id, data, onSuccess) {
  const finalData = sanitizeData(data);

  try {
    await updateDoc(doc(db, collectionName, id), finalData);
    onSuccess?.();
  } catch {
    toast.error("Something went wrong");
  }
}

function sanitizeData(data) {
  const finalData = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "undefined") continue;

    finalData[key] = value;
  }

  return finalData;
}
