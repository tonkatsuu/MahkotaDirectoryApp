import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ReferencePreview({ id, collectionName, labelKey }) {
  const [item, setItem] = useState(undefined);

  useEffect(async () => {
    if (id) {
      try {
        const dbDoc = await getDoc(doc(db, collectionName, id));
        if (dbDoc.exists()) {
          const data = dbDoc.data();
          setItem(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return <div>{item ? item[labelKey] : "N/A"}</div>;
}
