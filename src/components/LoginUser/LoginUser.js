import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import {
  Button,
  Card,
  InputGroup,
  Form as BootstrapForm,
} from "react-bootstrap";
import * as Yup from "yup";
import styles from "./LoginUser.module.scss";
import { login } from "../../actions/Dashboard.action";
import { connect } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ResetPassword } from "../ResetPassword";

const LoginUser = ({ login, modals }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await login(values);
    if (check === true) {
      setTimeout(() => {
        setIsLoading(false);
        modals.closeAll();
      }, 1000);
    } else {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const openForgetModal = () =>
    modals.openModal({
      title: "Reset Password",
      children: (
        <>
          <ResetPassword />
        </>
      ),
      centered: true,
      closeOnClickOutside: false,
    });

  let initVals = {
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Phone is required!"),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password is too short!"),
  });
  return (
    <div>
      <Formik
        initialValues={initVals}
        validationSchema={SignupSchema}
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="email" className="d-block">
                  Phone
                </label>
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type Phone..."
                name="email"
                isValid={!errors.email && touched.email}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.email && touched.email}
              />
              {errors.email && touched.email ? (
                <small className="text-danger pt-2">{errors.email}</small>
              ) : null}
            </InputGroup>

            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center">
                <label htmlFor="password" className="d-block">
                  Password
                </label>
                {errors.password && touched.password ? (
                  <small className="text-danger">{errors.password}</small>
                ) : null}
              </div>
              <Field
                as={BootstrapForm.Control}
                name="password"
                placeholder="Type Password..."
                isValid={!errors.password && touched.password}
                type={isPasswordVisible ? "text" : "password"}
                className={`${styles.input} w-100 icon-hidden`}
                isInvalid={errors.password && touched.password}
                style={{ position: "relative" }}
              />
              {!isPasswordVisible ? (
                <AiOutlineEye
                  className={styles.eyeIcon}
                  color="black"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className={styles.eyeIcon}
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )}
            </InputGroup>
            <div className="d-flex justify-content-end">
              <span
                className={`d-block ${styles.forget}`}
                onClick={openForgetModal}
              >
                Reset password now
              </span>
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                type="submit"
                className={styles.btn}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { login })(LoginUser);
