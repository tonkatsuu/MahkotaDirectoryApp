import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const Profile = () => {
  const [uploadStatus, setUploadStatus] = useState("Idle");
  const { user } = useContext(AuthContext);

  const [photo, setPhoto] = useState(
    user?.photoURL ??
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
  );

  console.log(user);

  function handleProfileUpdate(e) {
    const file = e.currentTarget?.files[0];
    if (!file) return;

    setUploadStatus("Uploading!");
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setUploadStatus("Uploaded!");

        updateProfile(auth.currentUser, { photoURL: downloadURL }).then(() => {
          setPhoto(downloadURL);
          toast.success("Profile Picture updated successfully!");
        });
      })
      .catch((error) => {
        setUploadStatus("Error!");
        console.log(`Failed to upload file, please try again later ${error}`);
      })
      .finally(() => {
        setUploadStatus("Uploaded!");
      });
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="profileContent">
          <div className="profileImage">
            <img src={photo} alt="" className="avatar" />

            <label className="addButton" htmlFor="profilePicture">
              <span>+</span>
              <input
                id="profilePicture"
                type="file"
                className="hidden"
                onChange={handleProfileUpdate}
              />
            </label>
          </div>

          <div className="profileDetails">
            <h2>{user?.email}</h2>
            <div>
              <input type="password" placeholder="Enter Old Password" />
            </div>
            <div>
              <input type="password" placeholder="Enter New Password" />
            </div>
            <div>
              <input type="password" placeholder="Confirm New Password" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
