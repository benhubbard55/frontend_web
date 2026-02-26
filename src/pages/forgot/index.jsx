

/** @format */

import React, { useEffect, useState, useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LoginLayoutWrapper, ModelWrapper } from '@/styles/common.style';
import { useLazyForgotpasswordQuery } from '../../../service/auth/auth';
import { useDispatch } from 'react-redux';

const Forgot = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

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
  });
  const [forgotPassword] = useLazyForgotpasswordQuery();
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await forgotPassword(values).unwrap();
      setShowModal(true);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
    finally {
      resetForm();
      setSubmitting(false);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/login");
  }

  return (
    <LoginLayoutWrapper>
      <div className='uphony-login'>
        <div className='uphony-logo'>
          <a href='/'>
            <img src='../../../images/logo.svg' alt='logo'></img>
          </a>
        </div>
        <div className='uphony-form'>
          <h2>Forgot Password</h2>
          <div className='form-main'>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className='form-group'>
                    <Field type='email' name='email' className='' placeholder='Email Address' />
                    <div className='info-icon'>
                      <img src='../../../images/mail-icon.svg' alt='email'></img>
                    </div>
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>
                  <div className='common-btn'>
                    <button type='submit' disabled={isSubmitting} className='btn common-btn-bt'>{isSubmitting ? 'Sending...' : 'Send'}</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {showModal && (
        <ModelWrapper>
          <div className="modal-content">
            <h2>Success</h2>
            <p>Your password reset link has been successfully sent to your registered email.</p>
            <div className='close-btn'>
              <button onClick={handleCloseModal} className="btn common-btn-bt">Ok</button>
            </div>
          </div>
          {/* <div className="modal-overlay" onClick={handleCloseModal}></div> */}
        </ModelWrapper>
      )}
    </LoginLayoutWrapper >
  );
};

export default Forgot;
