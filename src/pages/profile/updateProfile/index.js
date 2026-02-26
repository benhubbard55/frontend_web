import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ButtonDiv, CommonPage, LoaderContainer, ProfileWapper, Spinner } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useGetuserDetailsQuery, useUpdateprofileMutation } from '../../../../service/auth/userDetails';
import { toast } from 'react-toastify';
import { customerLoginSet } from '../../../../redux/reducers/slice/authSlice';

const Profile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [previewImage, setPreviewImage] = useState('/images/profile1.svg');
    const [profileImage, setProfileImage] = useState({
        file: null,
        preview: '/images/profile.svg',
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const userAuth = useSelector((state) => state?.persistedReducer?.user);    
    const { data: userDetails, isLoading, isError } = useGetuserDetailsQuery({ token: userAuth?.token, userId: userAuth?.userData?.id });

    useEffect(() => {
        if (userDetails?.data?.profileImage) {
            setProfileImage({
                file: userDetails.data.profileImage || null,
                preview: userDetails.data.profileImage,
            });
        }
    }, [userDetails]);

    const [updateProfile] = useUpdateprofileMutation();

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phoneNo: Yup.string()
            .nullable()
            // .required('Phone number is required')
            .min(9, 'Phone number must be at least 9 digits')
            .max(15, 'Phone number must not exceed 15 digits'),
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }
    };

    const handleImageClick = () => {
        document.getElementById('profileImageInput').click();
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('phoneNo', values?.phoneNo);
            formData.append('countryCode', values.countryCode);

            if (profileImage.file) {
                formData.append('file', profileImage.file);
            }

            const credentials = {
                body: formData,
                token: userAuth?.token,
            };

            const response = await updateProfile(credentials).unwrap();
            if (response.status) {
                dispatch(
                    customerLoginSet({
                        token: userAuth.token,
                        data: {
                            ...userAuth.userData,
                            ...response.data,
                        },
                    })
                );
            }
            toast.success(response.message);
            setIsUpdate(true)

        } catch (err) {
            toast.error(err?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues = {
        name: userDetails?.data?.name || '',
        email: userDetails?.data?.email || '',
        phoneNo: userDetails?.data?.phoneNo || '',
        countryCode: userDetails?.data?.countryCode || 1,
    };

    useEffect(() => {
        if (userDetails?.data?.profileImage) {
            setPreviewImage(userDetails.data.profileImage);
        }
    }, [userDetails]);

    return (
        <div>
            <Header />
            <CommonPage>
                <div className="banner-block diff-height"></div>
                <div className="privacy-policy-block">
                    <ProfileWapper>
                        {isLoading ? (
                            <LoaderContainer>
                                <Spinner />
                            </LoaderContainer>
                        ) : (
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="form-div">
                                            <img
                                                src={profileImage.preview || '/images/profile.svg'}
                                                alt="profile"
                                                onClick={handleImageClick}
                                                className="profile-img"
                                            />

                                            <input
                                                type="file"
                                                id="profileImageInput"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                onChange={handleImageChange}
                                            />

                                            <div className="form-group">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="name" component="div" className="err-message" />
                                            </div>

                                            <div className="form-group">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    className="form-control"
                                                    readOnly
                                                />
                                            </div>

                                            <div className="form-group">
                                                <Field
                                                    type="number"
                                                    name="phoneNo"
                                                    placeholder="Phone Number"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="phoneNo" component="div" className="err-message" />
                                            </div>

                                            <ButtonDiv>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="common-btn"
                                                >
                                                    {isSubmitting ? 'Saving...' : 'Save'}
                                                </button>
                                            </ButtonDiv>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </ProfileWapper>
                </div>
                <Footer />
            </CommonPage>
        </div>
    );
};

export default Profile;
