import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Input from "../../components/input/input";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";

const Edit = ({ inputs, title, collectionName }) => {
  const navigate = useNavigate();
  const params = useParams();
  const form = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbDocument = await getDoc(doc(db, collectionName, params.id));
        if (dbDocument.exists()) {
          const data = dbDocument.data();
          for (const [key, value] of Object.entries(data)) {
            form.setValue(key, value);
          }
        } else {
          console.log("Document not found!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchData();
  }, [collectionName, params.id]);

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // const form = new FormData(e.currentTarget);
    // const formData = {};
    // inputs.forEach((input) => {
    //   if (input.type !== "file") {
    //     formData[input.id] = form.get(input.id);
    //   }
    // });

    try {
      // Use the correct document reference in updateDoc
      await updateDoc(doc(db, collectionName, params.id), values);
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
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                {inputs.map((input) => (
                  <Input key={input.id} input={input} />
                ))}
                <br />
                <button type="submit" className="buttonStyle">
                  Update
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
