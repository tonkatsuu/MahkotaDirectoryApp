import React from "react";
import { useMemo } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUpload from "./FileUpload";
import Checkbox from "@mui/material/Checkbox";
import { useFormContext } from "react-hook-form";

const Input = ({ input }) => {
  const { register } = useFormContext();

  /* Using useMemo to memoise the content, it renders only when any of its dependency change */
  const content = useMemo(() => {
    switch (input.type) {
      case "text":
        return <input placeholder={input.label} {...register(input.id)} />;
      case "select": {
        return (
          <FormControl
            variant="filled"
            sx={{ padding: "0rem", m: 0, minWidth: 150 }}
          >
            <Select {...register(input.id)}>
              {input.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      }
      case "checkbox":
        return (
          <FormControlLabel
            for={input.id}
            control={<Checkbox {...register(input.id)} sx={{ m: 1 }} />}
          />
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker {...register(input.id)} />
            </DemoContainer>
          </LocalizationProvider>
        );

      case "file":
        return <FileUpload input={input} {...register(input.id)} />;
      default:
        return null;
    }
  }, []);

  return (
    <div className="formInput" key={input.id}>
      <label>{input.label}</label>
      {content}
    </div>
  );
};

export default Input;
