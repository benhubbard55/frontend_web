import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { LoginLayoutWrapper } from '@/styles/common.style';
import { useLazyLoginQuery } from '../../../service/auth/auth';
import { customerLoginSet } from '../../../redux/reducers/slice/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const [loginUser] = useLazyLoginQuery();
  const validationSchema = Yup.object({
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
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
      .max(15, 'Password must be at most 15 characters')
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await loginUser(values).unwrap();
      dispatch(customerLoginSet(response));
      toast.success(response.message);
      router.push('/');

    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };
  return (
    <LoginLayoutWrapper>
      <div className='uphony-login'>
        <div className='uphony-logo'>
          <a href='/'>
            <img src='../../../images/logo.svg' alt='logo'></img>
          </a>
        </div>
        <div className='uphony-form'>
          <h2>Log in to your Account</h2>
          <div className='form-main'>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validateOnChange={true}
              validateOnBlur={true}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className='form-group'>
                    <Field type='email' placeholder='Email Address' name='email' />
                    <div className='info-icon'>
                      <img src='../../../images/mail-icon.svg' alt='email'></img>
                    </div>
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  <div className='form-group'>
                    <Field type={showPassword ? 'text' : 'password'} maxLength={20} placeholder='Password' name='password' />
                    <div className='info-icon'>
                      <img src='../../../images/lock-icon.svg' alt='pasword'></img>
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
                  <div className='forgot-link'>
                    <a href='/forgot'>Forgot Password?</a>
                  </div>
                  <div className='common-btn'>
                    <button type='submit' disabled={isSubmitting} className='btn common-btn-bt'>{isSubmitting ? 'Loging...' : 'Log In'}</button>
                  </div>
                  <div className='bottom-text-block'>
                    <p>
                      Don’t have an Account? <a href='/register'>Register</a>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </LoginLayoutWrapper>
  );
};

export default Login;
