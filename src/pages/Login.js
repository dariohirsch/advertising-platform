import { useState } from "react";

import { Formik, Form } from "formik";
import { loginValidator } from "../helpers/formValidator";

import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginUser } = useAuth();
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorPassword, setShowErrorPassword] = useState(false);

  const navigate = useNavigate();

  const handleNotValidForm = () => {
    if (showErrorEmail || showErrorPassword) return;
    setShowErrorEmail(true);
    setShowErrorPassword(true);
  };

  const handleSubmitToFirebase = async (email, password) => {
    await loginUser(email, password);
    // console.log("userLogged", userLogged);
    navigate("/");
  };

  const handleBlurEmail = () => {
    if (showErrorEmail) return;
    setShowErrorEmail(true);
  };
  const handleBlurPassword = () => {
    if (showErrorPassword) return;
    setShowErrorPassword(true);
  };

  return (
    <div>
      <Formik
        validationSchema={loginValidator}
        initialValues={{
          email: "",
          password: "",
        }}
        initialErrors={{
          email: "* Email is required",
          password: "* Password is required",
        }}
        onSubmit={({ email, password }) =>
          handleSubmitToFirebase(email, password)
        }
      >
        {({ handleChange, handleSubmit, values, errors, isValid }) => (
          <Form>
            <input
              value={values.email}
              onBlur={handleBlurEmail}
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={handleChange}
            />
            <p>{showErrorEmail && errors.email}</p>
            <input
              value={values.password}
              onBlur={handleBlurPassword}
              name="password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            <p>{showErrorPassword && errors.password}</p>
            <button
              type="submit"
              onClick={isValid ? handleSubmit : handleNotValidForm}
            >
              Enviar
            </button>
          </Form>
        )}
      </Formik>

      {/* <button onPress={}>
				<p>Forgot password?</p>
			</button> */}
    </div>
  );
}

export default Login;
