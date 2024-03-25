import Button from "@mui/material/Button";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/material/styles";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useController } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export function FileUpload({ input, disabled, ...inputFieldProps }) {
  const { field } = useController({ name: input.id });

  const tooltipID = input.id;
  console.log(tooltipID);

  const [uploadStatus, setUploadStatus] = useState("Idle");
  function handleUploadFile(e) {
    const file = e.target.files[0];

    setUploadStatus("Uploading!");
    const storage = getStorage();
    const storageRef = ref(storage, `public/${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setUploadStatus("Uploaded!");
        // You will get the download url here

        field.onChange(downloadURL);
      })
      .catch((error) => {
        setUploadStatus("Error!");
        console.log(`Failed to upload file, please try again later ${error}`);
      })
      .finally(() => {
        setUploadStatus("Uploaded!");
      });
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  let tooltipText = "";
  if (tooltipID === "logo_image") {
    tooltipText = "Logo Image";
  } else if (tooltipID === "shop_image") {
    tooltipText = "Shop Image";
  } else if (tooltipID === "media") {
    tooltipText = "Media";
  }

  return (
    <div className={disabled && "disabled"}>
      {field.value ? (
        <div className="image_box">
          <img src={field.value} alt={input.label} className="edit_image" />
        </div>
      ) : (
        <EmptyImage tooltipID={tooltipID} />
      )}
      <label htmlFor={input.id}>
        <Button
          className="buttonStyle"
          component="label"
          variant="contained"
          startIcon={<DriveFolderUploadOutlinedIcon />}
          disabled={disabled}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            disabled={disabled}
            {...inputFieldProps}
            onChange={handleUploadFile}
          />
        </Button>
        {field.value && (
          <Button
            className="buttonStyle"
            component="label"
            variant="contained"
            startIcon={<RemoveIcon />}
            onClick={() => {
              field.onChange(null);
            }}
          >
            Remove
          </Button>
        )}
      </label>

      <div className="uploadStatus">
        {uploadStatus !== "Idle" ? <p>{uploadStatus}</p> : null}
      </div>
    </div>
  );
}

export default FileUpload;

function EmptyImage({ tooltipID }) {
  let tooltipText = "";
  if (tooltipID === "logo_image") {
    tooltipText = "Image resolution should be: 180x100px";
  } else if (tooltipID === "shop_image") {
    tooltipText = "Image resolution should be: 600x250px";
  } else if (tooltipID === "media") {
    tooltipText = "Image resolution should be: 1080x1080px";
  }
  console.log(tooltipText);
  return (
    <div className="image_box">
      <p>No image uploaded.</p>
      <Tooltip title={tooltipText} className="tooltip">
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
