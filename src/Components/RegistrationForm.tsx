import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../Features/Slice";
import { HashLoader } from "react-spinners";

interface FormFields {
  name: string;
  email: string;
  mobileno: string;
  gender: string;
  state: string;
  city: string;
}

type StateType = "Gujarat" | "Telangana" | "Maharashtra";

const cityMapping: Record<StateType, string[]> = {
  // the utility type for key value pair
  Gujarat: ["Surat", "Ahmedabad", "Rajkot"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
};

const regexMobile = /^\d{10}$/;
const RegistrationForm: React.FC = () => {
  const [isLoading, setIsloading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const formValidation = Yup.object({
    name: Yup.string().min(3).required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobileno: Yup.string()
      .matches(regexMobile, "Mobile number must be exactly 10 digits")
      .required("Mobile no is required"),

    gender: Yup.string().required("Gender is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
  });

  const initialValues: FormFields = {
    name: "",
    email: "",
    mobileno: "",
    gender: "",
    state: "",
    city: "",
  };

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  });

  return (
    <>
      {isLoading === true ? (
        <HashLoader
          color="white"
          className="pre-loader"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            // transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={formValidation}
            onSubmit={(values, actions) => {
              dispatch(setUser(values));
              console.log("Submitted values:", values);

              Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfullu submitted your form",
                showConfirmButton: false,
                timer: 1500,
              });
              actions.resetForm();
            }}
          >
            {({
              handleSubmit,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form className="form-container" onSubmit={handleSubmit}>
                <div className="form-field">
                  <h2 className="Heading-txt">Register</h2>
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Tooltip
                    title={
                      (touched.name || isSubmitting) && errors.name
                        ? errors.name
                        : ""
                    }
                    arrow
                    placement="left"
                    open={(touched.name || isSubmitting) && !!errors.name}
                  >
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      className={`form-input ${
                        (touched.name || isSubmitting) && errors.name
                          ? "input-error"
                          : ""
                      }`}
                    />
                  </Tooltip>
                  {/* {touched.name && errors.name && <div className="errors">{errors.name}</div>} */}
                </div>

                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Tooltip
                    title={
                      (touched.email || isSubmitting) && errors.email
                        ? errors.email
                        : ""
                    }
                    arrow
                    placement="left"
                    open={(touched.email || isSubmitting) && !!errors.email}
                  >
                    <Field
                      name="email"
                      type="text"
                      placeholder="Enter your Email"
                      className={`form-input ${
                        (touched.email || isSubmitting) && errors.email
                          ? "input-error"
                          : ""
                      }`}
                    />
                  </Tooltip>
                </div>

                <div className="form-field">
                  <label htmlFor="mobileno" className="form-label">
                    Mobile Number
                  </label>
                  <Tooltip
                    title={
                      (touched.mobileno || isSubmitting) && errors.mobileno
                        ? errors.mobileno
                        : ""
                    }
                    arrow
                    placement="left"
                    open={
                      (touched.mobileno || isSubmitting) && !!errors.mobileno
                    }
                  >
                    <Field
                      name="mobileno"
                      type="text"
                      placeholder="Enter your Mobile No"
                      className={`form-input ${
                        (touched.mobileno || isSubmitting) && errors.mobileno
                          ? "input-error"
                          : ""
                      }`}
                    />
                  </Tooltip>
                </div>

                <div className="form-field">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <Tooltip
                    title={
                      (touched.gender || isSubmitting) && errors.gender
                        ? errors.gender
                        : ""
                    }
                    arrow
                    placement="left"
                    open={(touched.gender || isSubmitting) && !!errors.gender}
                  >
                    <Field as="select" name="gender" className="form-input">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                  </Tooltip>
                </div>

                <div className="form-field">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <Tooltip
                    title={
                      (touched.state || isSubmitting) && errors.state
                        ? errors.state
                        : ""
                    }
                    arrow
                    placement="left"
                    open={(touched.state || isSubmitting) && !!errors.state}
                  >
                    <Field
                      as="select"
                      name="state"
                      className="form-input"
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        const selectedState = event.target.value as StateType;
                        const newCities = cityMapping[selectedState];
                        setAvailableCities(newCities);
                        setFieldValue("state", event.target.value);
                        setIsDisable(false);
                      }}
                    >
                      <option value="">Select State</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </Field>
                  </Tooltip>
                </div>
                <div className="form-field">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <Tooltip
                    title={
                      (touched.city || isSubmitting) && errors.city
                        ? errors.city
                        : ""
                    }
                    arrow
                    placement="left"
                    open={(touched.city || isSubmitting) && !!errors.city}
                  >
                    <Field
                      as="select"
                      name="city"
                      className="form-input"
                      disabled={isDisable === true ? true : false}
                    >
                      <option value="">Select City</option>
                      {availableCities.map((cityName) => (
                        <option key={cityName} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                    </Field>
                  </Tooltip>
                </div>

                <button type="submit" className="form-button">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
