import React from "react";
import { useMemo } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FileUpload from "./FileUpload";
import Checkbox from "@mui/material/Checkbox";
import { useFormContext, Controller } from "react-hook-form";
import dayjs from "dayjs";

const Input = ({ input }) => {
  const { register, control } = useFormContext();

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
            <Controller
              name={input.id}
              control={control}
              render={({ field }) => (
                <Select key={field.value} defaultValue={field.value} {...field}>
                  {input.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        );
      }
      case "checkbox":
        return (
          <FormControlLabel
            for={input.id}
            control={
              <Controller
                name={input.id}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    key={field.value}
                    sx={{ m: 1 }}
                    {...field}
                    checked={field.value}
                  />
                )}
              />
            }
          />
        );
      case "date":
        return (
          <LocalizationProvider name={input.id} dateAdapter={AdapterDayjs}>
            <Controller
              name={input.id}
              control={control}
              render={({ field }) => (
                <DatePicker
                  key={field.value}
                  name={input.id}
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(date) => {
                    field.onChange(dayjs(date).format("MM/DD/YYYY"));
                  }}
                />
              )}
            />
          </LocalizationProvider>
        );

      case "file":
        return <FileUpload input={input} {...register(input.id)} />;
      default:
        return null;
    }
  }, [register, input, control]);

  return (
    <div className="formInput">
      <label>{input.label}</label>
      {content}
    </div>
  );
};

export default Input;
