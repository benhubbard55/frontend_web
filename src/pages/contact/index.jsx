import React from "react";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CommonPage } from "@/styles/common.style";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContactMutation } from "../../../service/contact/contact";

const Contact = () => {
  const [contact] = useContactMutation();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test("custom-email-validation", "Invalid email address", (value) => {
        if (!value) return true;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      }),
    phoneNo: Yup.string()
      .required("Phone number is required")
      .min(9, "Phone number must be at least 9 digits")
      .max(15, "Phone number must not exceed 15 digits"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      const response = await contact(values).unwrap();
      toast.success(response.message);
      resetForm();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Header />
      <CommonPage>
        <div className="banner-block">
          <div className="banner-block-inner">
            <h1>Contact Us</h1>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p> */}
          </div>
        </div>
        <div className="who-are-block">
          <div className="container-common">
            <div className="who-are-block-inner">
              <div className="title-common">
                <h2 className="contact-us">CONTACT US</h2>
                <p>Connect with us</p>
              </div>
              <div className="contact-form">
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phoneNo: "",
                    message: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                      <div className="form-group">
                        <Field
                          aria-describedby="logicHelp"
                          type="text"
                          placeholder="Your Name"
                          name="name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="err-message"
                        />
                      </div>
                      <div className="form-group">
                        <Field
                          type="text"
                          placeholder="Your Email Address"
                          name="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="err-message"
                        />
                      </div>
                      <div className="form-group">
                        <Field
                          type="number"
                          placeholder="Your Phone Number"
                          name="phoneNo"
                        />
                        <ErrorMessage
                          name="phoneNo"
                          component="div"
                          className="err-message"
                        />
                      </div>
                      <div className="form-group">
                        <Field
                          as="textarea"
                          id="message"
                          placeholder="Your Message Here....."
                          name="message"
                          value={values.message}
                          onChange={(e) =>
                            setFieldValue("message", e.target.value)
                          }
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="err-message"
                        />
                      </div>
                      <div className="common-btn-div">
                        <button
                          type="submit"
                          className="common-btn"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <div className="play-android-block">
          <div className="container-common">
            <div className="play-android-block-inner">
              <div className="play-android-block-inner-left">
                <h2>
                  Use UPHONY App on Your<br></br> iPhone & Android
                </h2>
              </div>
              <div className="play-android-block-inner-right">
                <a href="https://play.google.com/store/apps/details?id=com.uphony" target="_blank">
                  <img src="../../images/download-btn.png" alt="play-store"></img>
                </a>
                <a href="https://apps.apple.com/us/app/uphony/id6633419490" target="_blank">
                  <img src="../../images/download-btn-2.png" alt="apple-store"></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </CommonPage>
    </div>
  );
};

export default Contact;
