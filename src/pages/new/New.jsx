import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Input from "../../components/input/input";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title, collectionName }) => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState({});
  //console.log(uploadedFiles);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formData = {};
    inputs.forEach((input) => {
      formData[input.id] = form.get(input.id);
    });
    //console.log(formData);
    const docRef = await addDoc(collection(db, collectionName), {
      ...formData,
      ...uploadedFiles,
    });
    navigate(-1);
    toast.success("Entity created successfully!");
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <Input input={input} setUploadedFiles={setUploadedFiles} />
              ))}
              <br />
              <button type="submit" className="buttonStyle">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
