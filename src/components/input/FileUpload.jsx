import Button from "@mui/material/Button";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { styled } from "@mui/material/styles";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useState } from "react";

export function FileUpload({ input, onChange }) {
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
        onChange(downloadURL);
      })
      .catch((error) => {
        setUploadStatus("Error!");
        console.log(`Failed to upload file, please try again later ${error}`);
      })
      .finally(() => {
        setUploadStatus("Uploaded!");
      });
  }
  /*const uploadFile = () => {
  const storage = getStorage();
  const storageRef = ref (storage, 'images/'+ file.name);
  uploadBytes(storageRef, file).then((snapshot)=>{
    console.log('Upload completed! ');
  });
  getDownloadURL(storageRef.snapshot.ref).then((downloadURL=>{
    console.log('URL: ', downloadURL);
  }));  
  }*/
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

  return (
    <div>
      <label htmlFor={input.id}>
        <Button
          className="buttonStyle"
          component="label"
          variant="contained"
          startIcon={<DriveFolderUploadOutlinedIcon />}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            id={input.id}
            onChange={handleUploadFile}
          />
        </Button>
      </label>
      <div className="uploadStatus">
        {uploadStatus !== "Idle" ? <p>{uploadStatus}</p> : null}
      </div>
    </div>
  );
}

export default FileUpload;
