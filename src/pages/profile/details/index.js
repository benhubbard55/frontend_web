import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ButtonDiv, CommonPage, LoaderContainer, ProfileWapper, Spinner } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useGetuserDetailsQuery } from '../../../../service/auth/userDetails';

const Profile = () => {
    const router = useRouter();
    const [profileImage, setProfileImage] = useState('/images/profile1.svg');
    const userAuth = useSelector((state) => state?.persistedReducer?.user);
    const { data: userDetails, isLoading, isError, refetch } = useGetuserDetailsQuery({ token: userAuth?.token, userId: userAuth?.userData?.id });

    useEffect(() => {
        refetch();
    }, []);

    useEffect(() => {
        if (userDetails?.data?.profileImage) {
            setProfileImage(userDetails.data.profileImage);
        }
    }, [userDetails]);

    return (
        <div>
            <Header />
            <CommonPage>
                <div className="banner-block diff-height"></div>
                <div className="privacy-policy-block">
                    <ProfileWapper>
                        <div className='form-title'>
                            <h1>My Profile</h1>
                            <img
                                src={'/images/edit-profile.svg'}
                                alt="edit"
                                onClick={() => router.push('/profile/updateProfile/')}
                            />
                        </div>
                        {isLoading ? (
                            <LoaderContainer>
                                <Spinner />
                            </LoaderContainer>
                        ) : (
                            <div className="form-div">
                                <img
                                    src={profileImage || '/images/profile1.svg'}
                                    alt="profile"
                                    className='profile-img'
                                />
                                <div className='profile-info'>
                                    <p><strong>Username:</strong> {userDetails?.data?.name}</p>
                                    <p><strong>Email:</strong> {userDetails?.data?.email}</p>
                                    <p><strong>Phone No:</strong> {userDetails?.data?.countryCode + userDetails?.data?.phoneNo}</p>
                                </div>
                            </div>
                        )}
                    </ProfileWapper>
                </div>
                <Footer />
            </CommonPage>
        </div>
    );
};

export default Profile;
