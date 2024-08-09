import { useContext, useEffect, useState } from "react";
import { Button, Card, CardFooter, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered Successfully") {
          setEmail("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!",
            customClass: {
              confirmButton: "sweet-warning",
            },
          }).then(() => {
            navigate("/login");
          });
        } else if (data.error === "Email invalid") {
          Swal.fire({
            title: "Invalid Email Format",
            icon: "error",
            text: "Invalid email format.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else if (data.error === "Password must be atleast 8 characters") {
          Swal.fire({
            title: "Password Invalid",
            icon: "error",
            text: "Password must be atleast 8 characters long.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else if (data.error === "Username must be at least 3 characters") {
          Swal.fire({
            title: "Invalid Username Format",
            icon: "error",
            text: "Username must be at least 3 characters.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else if (data.error === "Email already in use") {
          Swal.fire({
            title: "Email already in use",
            icon: "error",
            text: "Please use a different email address.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else if (data.error === "Username already taken") {
          Swal.fire({
            title: "Username already taken",
            icon: "error",
            text: "Please use a different username.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else {
          Swal.fire({
            title: "Something went wrong.",
            icon: "error",
            text: "Please try again later or contact us for assistance.",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        }
      });
  }

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      username !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, username, password, confirmPassword]);

  return isLoggedIn ? (
    <Navigate to="/login" />
  ) : (
    <Form onSubmit={registerUser}>
      <h1 className="my-4 text-center">Register</h1>
      <div className="form-wrapper">
        <Card>
          <Form.Group className="p-3">
            <Form.Group>
              <Form.Label>Email Address </Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Enter Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Username </Form.Label>
              <Form.Control
                id="username"
                type="text"
                placeholder="Enter username"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Password </Form.Label>
              <Form.Control
                id="pass"
                type="password"
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Confirm Password </Form.Label>
              <Form.Control
                id="confirmpass"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form.Group>

          <CardFooter className="text-muted">
            <Button
              className="w-100"
              variant={isActive ? "primary" : "danger"}
              type="submit"
              id="regBtn"
              disabled={!isActive}
            >
              {isActive ? "Register" : "Please Enter your Registration details"}{" "}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Form>
  );
}
