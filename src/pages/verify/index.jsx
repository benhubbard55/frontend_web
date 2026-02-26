import React, { useEffect, useState, useRef } from 'react';

import { LoginLayoutWrapper } from '@/styles/common.style';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useLazyVerifyotpQuery, useSendotpMutation } from '../../../service/auth/auth';

const Verify = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const email = useSelector((state) => state?.persistedReducer?.user?.email);

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required('OTP is required')
      .matches(/^[0-9]{6}$/, 'OTP must be a 6-digit number'),
  });
  const [verifyOtp] = useLazyVerifyotpQuery();
  const [resedOtp] = useSendotpMutation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await verifyOtp(values).unwrap();
      toast.success(response.message);
      router.push('/login');

    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resedOtp({ email: email }).unwrap();
      toast.success(response.message);
    } catch (err) {
      toast.error(err?.data?.message || 'Something went wrong');
    }
  };
  return (
    <LoginLayoutWrapper>
      <div className='uphony-login'>
        <div className='uphony-logo'>
          <a href='#'>
            <img src='../../../images/logo.svg' alt='logo'></img>
          </a>
        </div>
        <div className='uphony-form'>
          <h2>Verify Your Account</h2>
          <div className='form-main'>
            <Formik
              initialValues={{
                otp: '',
                email: email,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values, resetForm }) => (
                <Form>
                  <div className='form-group pad-change-fr'>
                    <Field type='text' name='otp' className='' placeholder='E.g. 123456' />
                    <ErrorMessage name="otp" component="div" className="error-message" />
                  </div>
                  <div className='common-btn'>
                    <button
                      type="submit"
                      className='btn common-btn-bt'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submiting...' : 'Submit'}
                    </button>
                  </div>
                  <div className='bottom-text-block'>
                    <p>
                      <button type="button" onClick={handleResendOtp}>Resend Verification code</button>
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

export default Verify;
