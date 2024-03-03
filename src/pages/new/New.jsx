import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Input from "../../components/input/input";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

const New = ({ inputs, title, collectionName }) => {
  const navigate = useNavigate();
  const form = useForm();

  // handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const form = new FormData(e.currentTarget);
  //   const formData = {};

  //   inputs.forEach((input) => {
  //     formData[input.id] = form.get(input.id);
  //   });
  //   //console.log(formData);
  //   const docRef = await addDoc(collection(db, collectionName), {
  //     ...formData,
  //     ...uploadedFiles,
  //   });
  //   navigate(-1);
  //   toast.success("Entity created successfully!");
  // };

  async function handleFormSubmit(values) {
    await addDoc(collection(db, collectionName), values);
    navigate(-1);
    toast.success("Entity created successfully!");
  }

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
              <form onSubmit={form.handleSubmit(handleFormSubmit)}>
                {inputs.map((input) => (
                  <Input input={input} />
                ))}
                <br />

                <button type="submit" className="buttonStyle">
                  Send
                </button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
export default New;
