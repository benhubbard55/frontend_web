import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginLayoutWrapper } from '@/styles/common.style';
// import { registerAction } from '@/redux/Auth/action';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setEmail } from '../../../redux/reducers/slice/authSlice';
import { useRegisterMutation } from '../../../service/auth/auth';

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [register] = useRegisterMutation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .test(
        "custom-email-validation",
        "Invalid email address",
        (value) => {
          if (!value) return true;
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(value);
        }
      ),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[A-Z]/,
        'Password must contain at least one uppercase letter'
      )
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      )
      .matches(
        /\d/,
        'Password must contain at least one digit'
      ),
    // phoneNo: Yup.string().required('Phone Number is required'),
    agreeToTerms: Yup.bool().oneOf([true], 'You must agree to the terms and conditions'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    const { agreeToTerms, ...otherValues } = values;
    // const strippedPhoneNo = phoneNo.startsWith('1') ? phoneNo.slice(1) : phoneNo;

    const payload = {
      ...otherValues,
      // countryCode: `1`,
      // phoneNo: strippedPhoneNo,
    };

    try {
      const response = await register(payload).unwrap();
      toast.success(response.message);
      dispatch(setEmail(payload?.email));
      router.push('/verify');

    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <LoginLayoutWrapper>
      <div className="uphony-login">
        <div className="uphony-logo">
          <a href="/">
            <img src="../../../images/logo.svg" alt="Logo" />
          </a>
        </div>
        <div className="uphony-form">
          <h2>Register to your Account</h2>
          <div className="form-main">
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                // phoneNo: '',
                // countryCode: '+1',
                agreeToTerms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className="form-group">
                    <Field
                      type="text"
                      name="name"
                      placeholder="User Name"
                      className="form-control"
                    />
                    <div className="info-icon">
                      <img src="../../../images/user-icon.svg" alt="User Icon" />
                    </div>
                    <ErrorMessage name="name" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control"
                    />
                    <div className="info-icon">
                      <img src="../../../images/mail-icon.svg" alt="Mail Icon" />
                    </div>
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  {/* <div className="form-group">
                    <PhoneInput
                      country={'us'}
                      disableDropdown={true}
                      countryCodeEditable={false}
                      onlyCountries={['us']}
                      value={values.phoneNo}
                      onChange={(value) => setFieldValue('phoneNo', value)}
                      className="form-control"
                    />
                    <div className="info-icon">
                      <img src="../../../images/phone-number.svg" alt="Phone Icon" />
                    </div>
                    <ErrorMessage name="phoneNo" component="div" className="error-message" />
                  </div> */}
                  <div className="form-group">
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      maxLength={20}
                      className="form-control"
                    />
                    <div className="info-icon">
                      <img src="../../../images/lock-icon.svg" alt="Lock Icon" />
                    </div>
                    <div
                      className="eye-password"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={
                          showPassword
                            ? '../../../images/hide-eye.svg'
                            : '../../../images/eye-icon.svg'
                        }
                        alt={showPassword ? 'Hide Password' : 'Show Password'}
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>
                  <div className="terms-check">
                    <div className="terms-check-inner">
                      <Field
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                      />
                      <label htmlFor="agreeToTerms">
                        <span>I have read and understood these <a href="/termCondition">Terms & Conditions</a></span>
                      </label>
                    </div>
                    <ErrorMessage name="agreeToTerms" component="div" className="error-message" />
                  </div>
                  <div className="common-btn">
                    <button
                      type="submit"
                      className="btn common-btn-bt"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </button>
                  </div>
                  <div className="bottom-text-block">
                    <p>
                      Already have an Account? <a href="/login">Login</a>
                    </p>
                  </div>
                  <ErrorMessage name="submit" component="div" className="error-message" />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </LoginLayoutWrapper>
  );
};

export default Register;
