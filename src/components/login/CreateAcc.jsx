import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../../pages/login/login.scss";

const CreateAccount = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleCreateAccount}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
        {error && <span>{error}</span>}
      </form>
    </div>
  );
};

export default CreateAccount;
