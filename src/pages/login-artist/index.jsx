/** @format */

import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { LoginLayoutWrapper } from '@/styles/common.style';
const LoginArtist = () => {
  const options = [
    { value: 'Genre', label: 'Genre' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <LoginLayoutWrapper>
      <div className='uphony-login'>
        <div className='uphony-logo'>
          <a href='#'>
            <img src='../../../images/logo.svg' alt='logo'></img>
          </a>
        </div>
        <div className='uphony-form'>
          <h2>Add Music</h2>
          <div className='form-main'>
            <form>
              <div className='form-group width-diff'>
                <input type='text' className='' placeholder='Music Title Here'></input>
              </div>
              <div className='form-group width-diff'>
                <textarea placeholder='Music Description'></textarea>
              </div>
              <div className='two-block-select'>
                <div className='select-drop'>
                  <Select options={options} />
                </div>
                <div className='radio-block-inner'>
                  <div className='radio-block'>
                    <input id='free' type='radio' className='form__radio-input' name='size'></input>
                    <lable for='free' className='form__radio-label'>
                      <span className='form__radio-button'></span>
                      <span className='form__radio-label-text'>Free</span>
                    </lable>
                  </div>
                  <div className='radio-block'>
                    <input id='paid' type='radio' className='form__radio-input' name='size'></input>
                    <lable for='paid' className='form__radio-label'>
                      <span className='form__radio-button'></span>
                      <span className='form__radio-label-text'>Paid</span>
                    </lable>
                  </div>
                </div>
              </div>
              <div className='common-btn'>
                <button className='btn common-btn-bt'>Log in</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </LoginLayoutWrapper>
  );
};

export default LoginArtist;
