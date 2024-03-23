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
import Reference from "./Reference";
import { isAdmin } from "../../utils/admin";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Input = ({ input }) => {
  const { user } = useContext(AuthContext);
  const { register, control } = useFormContext();

  // Edit is allowed only if `editable` prop is true or the user is admin
  const isEditable = input?.editable || isAdmin(user);

  // Show input only if `visible` prop is true or the user is admin
  const visible = input?.visible || isAdmin(user);

  /* Using useMemo to memoise the content, it renders only when any of its dependency change */
  const content = useMemo(() => {
    switch (input.type) {
      case "text":
        return (
          <input
            disabled={!isEditable}
            placeholder={input.label}
            {...register(input.id)}
          />
        );
      case "textarea":
        return (
          <textarea
            disabled={!isEditable}
            placeholder={input.label}
            {...register(input.id)}
            rows={4}
          />
        );
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
                <Select
                  key={field.value}
                  defaultValue={field.value}
                  {...field}
                  disabled={!isEditable}
                >
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
                    disabled={!isEditable}
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
                  disabled={!isEditable}
                />
              )}
            />
          </LocalizationProvider>
        );

      case "file":
        return <FileUpload input={input} {...register(input.id)} />;

      case "reference":
        return <Reference input={input} />;
      default:
        return null;
    }
  }, [register, input, control]);

  return (
    <div
      className={`formInput ${!isEditable && "disabled"} ${
        !visible && "hidden"
      }`}
    >
      <label>
        <b>{input.label}</b>
      </label>
      {content}
    </div>
  );
};

export default Input;
