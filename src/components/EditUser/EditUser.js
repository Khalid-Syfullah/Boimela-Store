import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button, Form as BootstrapForm, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import * as Yup from "yup";
import { updateProfile } from "../../actions/Dashboard.action";
import styles from "./EditUser.module.scss";

const EditUser = ({ updateProfile, modals, user }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandeler = async (values) => {
    setIsLoading(true);
    let check = await updateProfile(values);
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

  let initVals = {
    email: user?.name,
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Phone is required!"),
  });
  return (
    <div>
      <Formik
        initialValues={initVals}
        validationSchema={SignupSchema}
        enableReinitialize
        onSubmit={(values) => onSubmitHandeler(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <InputGroup className="mb-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center pb-2">
                <label htmlFor="name" className="d-block">
                  Name
                </label>
              </div>
              <Field
                as={BootstrapForm.Control}
                placeholder="Type name..."
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

            <div className="pt-4">
              <Button
                variant="primary"
                type="submit"
                className={styles.btn}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Update Profile"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateProfile })(EditUser);
