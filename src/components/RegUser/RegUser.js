import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { Button, InputGroup, Form as BootstrapForm } from "react-bootstrap";
import * as Yup from "yup";
import styles from "./RegUser.module.scss";
import { register } from "../../actions/Dashboard.action";
import { connect } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { firebase, auth } from "../../firebase";
import OtpInput from "react-otp-input";

const RegUser = ({ register, modals }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const [valuesCopy, setValuesCopy] = useState(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const onSubmitHandeler = (values) => {
    if (
      values.phone === "" ||
      values.phone.length < 10 ||
      !values.phone.includes("+880")
    ) {
      toast.error("Invalid phone number!");
      return;
    }
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(values.phone, verify)
      .then((result) => {
        setfinal(result);
        setValuesCopy(values);
        toast.success("Code sent to phone!");
        setshow(true);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  let initVals = {
    name: "",
    phone: "",
    password: "",
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        if (valuesCopy?.phone === "") {
          return;
        }
        const providerEmail = firebase.auth.EmailAuthProvider.credential(
          `${valuesCopy?.phone}@boimela.com`,
          valuesCopy?.password
        );
        auth.currentUser
          .linkWithCredential(providerEmail)
          .then((result) => {
            register(valuesCopy);
            modals.closeAll();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        toast.error("Wrong Code!");
      });
  };

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    phone: Yup.string()
      .min(14, "Enter valid phone number with +880!")
      .max(14, "Enter valid phone number!")
      .required("Phone is required!"),
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
          <Form style={{ display: !show ? "block" : "none" }}>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="name" className="d-block">
                  Name
                </label>
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type Name..."
                name="name"
                isValid={!errors.name && touched.name}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.name && touched.name}
              />
              {errors.name && touched.name ? (
                <small className="text-danger pt-2">{errors.name}</small>
              ) : null}
            </InputGroup>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="phone" className="d-block">
                  Phone
                </label>
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type Phone..."
                name="phone"
                isValid={!errors.phone && touched.phone}
                type="text"
                className={`${styles.input} w-100`}
                isInvalid={errors.phone && touched.phone}
              />
              {errors.phone && touched.phone ? (
                <small className="text-danger pt-2">{errors.phone}</small>
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
            <div id="recaptcha-container"></div>
            <div className="pt-4">
              <Button
                variant="primary"
                type="submit"
                className={styles.btn}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div
        style={{ display: show ? "flex" : "none" }}
        className="text-center justify-content-center flex-column align-items-center"
      >
        <span className="d-block text-center fs-4 pb-3">Enter your OTP</span>
        <OtpInput
          value={otp}
          onChange={setotp}
          numInputs={6}
          inputStyle={styles.code}
          focusStyle={styles.code_focus}
          separator={<span>-</span>}
        />

        <br />
        <br />
        <button className={styles.btn} onClick={ValidateOtp}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default connect(null, { register })(RegUser);
