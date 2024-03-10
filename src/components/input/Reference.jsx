import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function Reference({ input }) {
  const { collectionName, labelKey } = input;
  const [options, setOptions] = useState([]);

  const { control } = useFormContext();

  useEffect(async () => {
    const { docs } = await getDocs(collection(db, collectionName));

    setOptions(
      docs.map((doc) => {
        const docData = doc.data();
        //console.log(docData);

        if (!docData[labelKey]) {
          throw new Error(
            `value for label key ${labelKey} not found in data ${docData}`
          );
        }

        return { id: doc.id, label: docData[labelKey] };
      })
    );
  }, [getDocs, collection, collectionName, labelKey]);

  return (
    <FormControl variant="filled" sx={{ padding: "0rem", m: 0, minWidth: 150 }}>
      <Controller
        name={input.id}
        control={control}
        render={({ field }) => (
          <Select key={field.value} defaultValue={field.value} {...field}>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
            <MenuItem value="">N/A</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
}
