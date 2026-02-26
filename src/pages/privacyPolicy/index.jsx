/** @format */

import React from 'react';
import { CommonPage, LoaderContainer, Spinner } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePolicyQuery } from '../../../service/contact/contact';

const Privacy = () => {
  const { data, isLoading, refetch, error } = usePolicyQuery();
  return (
    <div>
      <Header />
      <CommonPage>
        <div className='banner-block diff-height'>
          <div className='banner-block-inner'>
          </div>
        </div>
        <div className='term-policy-wapper'>
          {!isLoading ?
            (data?.data?.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: data.data.description }}
              />
            ) : (
              <p>No policy description available.</p>
            )) : (
              <LoaderContainer>
                <Spinner />
              </LoaderContainer>
            )
          }
        </div>
        <Footer />
      </CommonPage>
    </div>
  );
};

export default Privacy;
