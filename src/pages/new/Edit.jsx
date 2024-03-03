import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Input from "../../components/input/input";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Edit = ({ inputs, title, collectionName }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [dbData, setDbData] = useState({});

  //console.log(params);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbDocument = await getDoc(doc(db, collectionName, params.id));
        if (dbDocument.exists()) {
          const data = dbDocument.data();
          setDbData(data);
          inputs.forEach((input) => {
            const inputField = document.getElementById(input.id);
            //console.log(inputField);
            if (input.type === "checkbox") {
              //console.log(data[input.id]);
              inputField.defaultChecked =
                data[input.id] === "on" ? true : false;
              console.log(inputField);
            } else {
              inputField.setAttribute("value", data[input.id]);
            }
          });
        } else {
          console.log("Document not found!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchData();
  }, [collectionName, params.id]);

  console.log(dbData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const formData = {};

    inputs.forEach((input) => {
      if (input.type !== "file") {
        formData[input.id] = form.get(input.id);
      }
    });
    try {
      const updatedData = {
        ...dbData,
        ...formData,
        ...uploadedFiles,
      };

      // Use the correct document reference in updateDoc
      await updateDoc(doc(db, collectionName, params.id), updatedData);
      //console.log(formData);
      navigate(-1);
      toast.success("Entity updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update entity. Please try again.");
    }
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
