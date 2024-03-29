import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import LockResetIcon from "@mui/icons-material/LockReset";
import { isAdmin } from "../../utils/admin";

const Profile = () => {
  const [uploadStatus, setUploadStatus] = useState("Idle");
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  function handleChangePassword() {
    if (!oldPassword) {
      toast.error("Please enter your old password");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter password!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const creds = EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );

    toast.loading("Updating your password...");

    reauthenticateWithCredential(auth.currentUser, creds)
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowPasswordFields(false);

            toast.dismiss();
            toast.success("Password updated successfully!");
          })
          .catch((error) => {
            console.log(error);
            toast.dismiss();
            toast.error(
              "Could not change your password this time, Please try again!"
            );
          });
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
        toast.error("Wrong password!");
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
            <h4>{isAdmin(user) ? "Admin" : "User"}</h4>

            {showPasswordFields ? (
              <div className="profileDetails">
                <h5>Enter Old Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="password-box"
                />
                <h5>Enter New Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-box"
                />
                <h5>Confirm New Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="password-box"
                />
                <button onClick={handleChangePassword}>Update Password</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setShowPasswordFields(true)}>
                  <b>Change Password</b>
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
