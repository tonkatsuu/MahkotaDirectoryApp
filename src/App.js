import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CreateAccount from "./components/login/CreateAcc";
import List1 from "./pages/list/ShopList";
import List2 from "./pages/list/CategoryList";
import List3 from "./pages/list/AmenityList";
import List4 from "./pages/list/EventList";
import New from "./pages/new/New";
import Edit from "./pages/new/Edit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  shopInputs,
  categoryInputs,
  amenityInputs,
  eventInputs,
} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="/">
              <Route
                index
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="shops">
              <Route
                index
                element={
                  <RequireAuth>
                    <List1 />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={shopInputs}
                      title="Add New Shop"
                      collectionName="shops"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <Edit
                      inputs={shopInputs}
                      title="Edit Shop"
                      collectionName="shops"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="category">
              <Route
                index
                element={
                  <RequireAuth>
                    <List2 />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={categoryInputs}
                      title="Add New Category"
                      collectionName="categories"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <Edit
                      inputs={categoryInputs}
                      title="Edit Category"
                      collectionName="categories"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="amenity">
              <Route
                index
                element={
                  <RequireAuth>
                    <List3 />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={amenityInputs}
                      title="Add New Amenity"
                      collectionName="amenities"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <Edit
                      inputs={amenityInputs}
                      title="Edit Amenity"
                      collectionName="amenities"
                    />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="event">
              <Route
                index
                element={
                  <RequireAuth>
                    <List4 />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New
                      inputs={eventInputs}
                      title="Add New Event"
                      collectionName="events"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="edit/:id"
                element={
                  <RequireAuth>
                    <Edit
                      inputs={eventInputs}
                      title="Edit Event"
                      collectionName="events"
                    />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
