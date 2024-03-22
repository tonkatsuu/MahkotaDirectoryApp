import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import LockResetIcon from "@mui/icons-material/LockReset";

const Profile = () => {
  const [uploadStatus, setUploadStatus] = useState("Idle");
  const { user } = useContext(AuthContext);

  const [photo, setPhoto] = useState(
    user?.photoURL ??
      "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
  );

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  function handleProfileUpdate(e) {
    const file = e.currentTarget?.files[0];
    if (!file) return;

    setUploadStatus("Uploading");
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setUploadStatus("Uploaded");

        updateProfile(auth.currentUser, { photoURL: downloadURL }).then(() => {
          setPhoto(downloadURL);
          toast.success("Profile updated successfully!");
        });
      })
      .catch((error) => {
        setUploadStatus("Error");
        console.log(`Failed to upload file, please try again. ${error}`);
      })
      .finally(() => {
        setUploadStatus("Uploaded");
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
            <h2>Welcome, {user?.email}!</h2>
            <h4>User</h4>

            {showPasswordFields ? (
              <div className="profileDetails">
                <h5>Enter Old Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  className="password-box"
                />
                <h5>Enter New Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  className="password-box"
                />
                <h5>Confirm New Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  className="password-box"
                />
                <button>Enter</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setShowPasswordFields(true)}>
                  <LockResetIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
