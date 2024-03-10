import { deleteDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

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
