import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";

export default function Logout() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);
  }, []);

  useEffect(() => {
    if (showAlert) {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to log out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out",
        cancelButtonText: "No, cancel",
        customClass: {
          confirmButton: "sweet-confirm",
          cancelButton: "sweet-cancel",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setIsLoggedIn(false);
          localStorage.clear();

          navigate("/login");
        } else if (result.isDismissed) {
          navigate("/");
        }
        setShowAlert(false);
      });
    }
  }, [showAlert]);

  return null;
}
