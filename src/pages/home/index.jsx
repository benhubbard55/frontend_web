import React, { useEffect } from "react";
import { CommonPage } from "@/styles/common.style";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { useContactMutation } from "../../../service/contact/contact";

const Home = () => {
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
            <h1>Unleash the Power of Sound</h1>
            <p>
              So, you’ve joined the world’s first open music
              marketplace—welcome! Whether you’re an artist selling directly to
              fans worldwide or a listener discovering fresh tracks, Uphony is
              your space. No labels, no middlemen, no subscriptions. Artists get
              the money, listeners decide what they’re willing to pay.
            </p>
          </div>
        </div>
        <div className="who-are-block">
          <div className="container-common">
            <div className="who-are-block-inner">
              <div className="title-common">
                <h2>ABOUT</h2>
                <p>What is Uphony?</p>
              </div>
              <div className="discription-block-inner">
                <p>
                  Uphony is the world's first open music marketplace app. Uphony
                  puts the power of music ownership back into the hands of
                  artists and fans, letting users take control of their musical
                  journey. Whether you're an emerging artist or a music
                  enthusiast, Uphony is where creativity, community, and
                  commerce come together seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="what-we-are-block">
          <div className="container-common">
            <div className="what-we-are-block-inner">
              <div className="what-we-are-block-inner-left">
                <div className="title-common">
                  <h2>SERVICE</h2>
                  <p>How does it work?</p>
                </div>
                <p>
                  Uphony is completely free to download and use, with no hidden
                  fees. For artists, it’s a chance to reach new audiences and
                  set their own prices for their work. Simply upload your
                  tracks, set your price, and let the market decide the value of
                  your music. With an easy-to-use interface, artists can
                  instantly share their music with a global community while
                  keeping control over how it’s distributed.
                </p>
                <br />
                <p>
                  Fans can browse a diverse catalog of music, support their
                  favorite artists directly, and download songs with prices set
                  by the artists themselves. It’s a revolutionary experience
                  where fans and artists connect directly, creating a thriving
                  music ecosystem driven by choice, freedom, and community.
                </p>
                <br />
                <p className="feature-title">Key Features:</p>
                <br />
                <p>
                  <strong>Upload Your Music:</strong> Share your tracks with the
                  world by uploading them directly. You set the price, and it’s
                  available for fans to download.
                </p>
                <br />
                <p>
                  <strong>Free to Use:</strong> Our app is completely free for
                  all users. Artists set the prices, giving fans direct access
                  to support their work.
                </p>
                <br />

                <p>
                  <strong>Discover and Download:</strong> Find new music from a
                  global community of creators. With an endless variety of
                  genres, styles, and artists, the marketplace is always
                  growing.
                </p>
                <br />
                <p>
                  <strong>Social Interaction:</strong> Connect with artists and
                  fans, leave comments, and engage directly in a community built
                  around music. Marketplace-Driven Pricing: No set fees—let the
                  market decide. Fans pay what artists choose, empowering
                  creators and letting them build their careers on their
                  terms.Join a platform that’s reimagining music ownership and
                  interaction, and be a part of the future of music today!
                </p>
                <br />

                <p>
                  What's in it for us? (AKA How much money are we making on
                  this?)
                </p>
                <br />

                <p>
                  We’re a lean team that take as little commission as possible,
                  just enough to ensure we stay up and running. Why? Simple; we
                  believe that artists should get paid for the work they do. And
                  listeners should only pay for the songs they'll actually
                  listen to.
                </p>
                <br />
                <p>Link takes 1% of your sale.</p>
                <p>Uphony takes 10%</p>
                <br />
                <p>
                  The rest is yours. Hey, it beats Spotify, which takes 88% of
                  all streaming revenue, (And that’s after you’ve shelled out
                  for a publisher, and paid for a subscription, just saying).
                </p>
              </div>
              {/* <div className='what-we-are-block-inner-right'>
                <div className='block-services'>
                  <div className='block-services-left'>
                    <div className='block-services-left-inner'>
                      <div className='img-block'>
                        <img src='../../images/thumbnail-img-1.png'></img>
                      </div>
                      <div className='img-content'>
                        <h4>Upload Your Music</h4>
                        <p>Share your tracks with the world by uploading them directly. You set the price, and it’s available for fans to download.</p>
                      </div>
                    </div>
                  </div>
                  <div className='block-services-left'>
                    <div className='block-services-left-inner'>
                      <div className='img-block'>
                        <img src='../../images/thumbnail-img-1.png'></img>
                      </div>
                      <div className='img-content'>
                        <h4>Free to Use</h4>
                        <p>Our app is completely free for all users. Artists set the prices, giving fans direct access to support their work.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* <div
          style={{
            backgroundImage: "url('/images/test.jpeg')",
            backgroundSize: "cover",
            height: "600px",
          }}
        >
        </div> */}
        <div className="conatct-block">
          <div className="container-common">
            <div className="title-common">
              <h2>UPHONY</h2>
              <p>Contact Us</p>
            </div>
            <div className="contact-form-block">
              <div className="contact-form-block-inner">
                <h2>Connect With Us</h2>
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
        <div className="play-android-block" style={{ paddingTop: "150px" }}>
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
                {/* <div className="play-android-button"></div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </CommonPage>
    </div>
  );
};

export default Home;
