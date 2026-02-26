import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CommonPage, LoaderContainer, ModelWrapper, MusicList, Spinner } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useLazyGetAlbumListQuery, useLazyDeleteAlbumQuery, useCreateAlbumMutation, useUpdateAlbumMutation } from '../../../../service/album/album';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const albumSchema = Yup.object().shape({
    albumName: Yup.string()
        .required('Album name is required')
        .min(2, 'Album name must be at least 2 characters')
        .max(50, 'Album name must not exceed 50 characters')
        .matches(/^[a-zA-Z0-9\s]*$/, 'Album name can only contain letters and numbers')
        .trim(),
    albumImage: Yup.mixed().when('isEditMode', {
        is: true,
        then: () => Yup.mixed().nullable(),
        otherwise: () => Yup.mixed().required('Album image is required')
    })
});

const Album = () => {        
    const router = useRouter();
    const [showAlbumModal, setShowAlbumModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);    
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [albumList, setAlbumList] = useState([]);
    const [isNextPage, setIsNextPage] = useState(false);
    const userAuth = useSelector((state) => state?.persistedReducer?.user);
    const [albumListCall] = useLazyGetAlbumListQuery();
    const [albumdelete] = useLazyDeleteAlbumQuery();
    const observer = useRef();
    const [imagePreview, setImagePreview] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editAlbumData, setEditAlbumData] = useState(null);
    const [selectedAlbumName, setSelectedAlbumName] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            const payload = {
                page: page,
                limit: 10,
                userId: userAuth?.userData?.id,
                token: userAuth?.token,
            };
            const response = await albumListCall(payload);
            if (response?.data?.data) {
                if (page == 1) {
                    setAlbumList(response.data.data);
                } else {
                    setAlbumList((prevAlbumList) => [...prevAlbumList, ...response.data.data]);
                }

            }
            setIsNextPage(response?.data?.pagination?.isNextPage);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const lastEventElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && isNextPage) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [loading, isNextPage]
    );

    const handleDeleteAlbum = async () => {
        try {
            const payload = {
                albumId: selectedAlbumId,
                token: userAuth?.token,
            };
            setShowDeleteModal(false);
            const response = await albumdelete(payload);
            if (response?.data?.status) {
                toast.success(response?.data?.message || 'Album deleted successfully');
                setPage(1);
                fetchData();
            } else {
                toast.error(response?.error?.data?.message || 'Failed to delete album');
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }

    const handleOpenModal = (albumId, albumName) => {        
        setShowDeleteModal(true);
        setSelectedAlbumId(albumId);
        setSelectedAlbumName(albumName);
    }

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setSelectedAlbumId(null);
        setSelectedAlbumName('');
    }

    const handleOpenAlbumModal = (album = null) => {
        if (album) {
            setIsEditMode(true);
            setEditAlbumData(album);
            setImagePreview(album.albumCoverImage);
        } else {
            setIsEditMode(false);
            setEditAlbumData(null);
            setImagePreview(null);
        }
        setShowAlbumModal(true);
        // document.body.style.overflow = "hidden";
    }

    const handleCloseAlbumModal = () => {
        setShowAlbumModal(false);
        setImagePreview(null);
        setIsEditMode(false);
        setEditAlbumData(null);
        // document.body.style.overflow = "auto";
    }

    const [getAlbumList] = useLazyGetAlbumListQuery();
    const [createAlbum] = useCreateAlbumMutation();
    const [updateAlbum] = useUpdateAlbumMutation();
    const fetchAlbumList = async () => {
        const payload = {
            page: page,
            limit: 10,
            userId: userAuth?.userData?.id,
            token: userAuth?.token,
        };
        const response = await getAlbumList(payload);
        if (response?.data?.data) {
            setAlbumList(response.data.data);
        } else if (response?.error) {
            toast.error(response?.error || 'Something went wrong');
        }
    }
    useEffect(() => {
        fetchAlbumList();
    }, []);

    const handleImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setFieldValue('albumImage', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreateAlbum = async (values, { resetForm }) => {
        try {
            const formData = new FormData();
            
            // Always append name first
            formData.append('albumName', values.albumName);
            
            // Append ID if in edit mode
            if (isEditMode) {
                formData.append('albumId', editAlbumData.id);
            }
            
            // Always append image last if it exists
            if (values.albumImage instanceof File) {
                formData.append('albumCoverImage', values.albumImage);
            }

            let response;
            if (isEditMode) {
                response = await updateAlbum({ payload: formData, token: userAuth?.token });
            } else {
                response = await createAlbum({ payload: formData, token: userAuth?.token });
            }

            if (response?.data?.status) {
                toast.success(isEditMode ? 'Album updated successfully' : 'Album created successfully');
                setShowAlbumModal(false);
                setImagePreview(null);
                setIsEditMode(false);
                setEditAlbumData(null);
                setPage(1);
                setAlbumList([]);
                fetchData();
            } else {
                toast.error(response?.error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} album`);
            }
        } catch (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        } finally {
            resetForm();
            setImagePreview(null);
        }
    }

    return (
        <div>
            <Header />
            <CommonPage>
                <div className="banner-block diff-height"></div>
                <div className="privacy-policy-block">
                    <MusicList>
                        <div className='album-header'>
                            <p>My Albums</p>
                            <div className='add-album-btn'>
                                <button className='plus-btn' onClick={() => handleOpenAlbumModal()}>
                                    <img src='/images/plus.svg' alt='plus' /> Create New Album
                                </button>
                            </div>
                        </div>
                        <div className="music-card-container">
                            {albumList?.length == 0 && !loading ? (
                                <p className='no-data'>No album available.</p>
                            ) : (
                                albumList.map((album, index) => (
                                    <div className="music-card" key={index} ref={isNextPage ? lastEventElementRef : null}>
                                        <div className="image-container" style={{cursor:'pointer'}} onClick={() => router.push(`/music/album/album-details/${album.id}`)}>
                                            {/* <img src={music.profileImage || '/images/thumbnail-img-1.png'} alt={music.name} /> */}
                                            <img
                                                src={album.albumCoverImage || "/images/thumbnail-img-1.png"}
                                                alt={album.albumName || "Default thumbnail"}
                                            />
                                        </div>
                                        <div className="content">                                            
                                            <div className="footer">
                                                <h4 className='item-title'>{album.albumName}</h4>
                                                <div className="duration">
                                                    <button className='plus-btn' onClick={() => handleOpenAlbumModal(album)}>
                                                        <img src='/images/edit-button.svg' alt='edit' />
                                                    </button>
                                                    <button className='delete-btn' onClick={() => handleOpenModal(album.id, album.albumName)}>
                                                        <img src='/images/delete.svg' alt='delete' />
                                                    </button>
                                                </div>
                                            </div>
                                            <span>{album.musicCount || 0} tracks</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </MusicList>
                    {loading && (
                        <LoaderContainer>
                            <Spinner />
                        </LoaderContainer>
                    )}
                </div>
                {showDeleteModal && (
                    <ModelWrapper>
                        <div className="modal-content">
                            <h2>Delete</h2>
                            <p>Are you sure you want to delete "{selectedAlbumName}" Album?</p>
                            <div className='close-btn'>
                                <button onClick={handleDeleteAlbum} className="btn common-btn-bt">Delete</button>
                                <button onClick={handleCloseModal} className="btn common-btn-bt">Cancel</button>
                            </div>
                        </div>
                        <div className="modal-overlay" onClick={handleCloseModal}></div>
                    </ModelWrapper>
                )}
                {showAlbumModal && (
                    <ModelWrapper>
                        <div className="modal-content">
                            <h2>{isEditMode ? 'Edit Album' : 'Create New Album'}</h2>
                            <Formik
                                initialValues={{ 
                                    albumName: editAlbumData?.albumName || '', 
                                    albumImage: null,
                                    isEditMode: isEditMode
                                }}
                                validationSchema={albumSchema}
                                onSubmit={handleCreateAlbum}
                                enableReinitialize
                            >
                                {({ isSubmitting, setFieldValue, values, dirty }) => (
                                    <Form>
                                        <Field
                                            className="input-field"
                                            type="text"
                                            name="albumName"
                                            placeholder="Enter Album Name"
                                        />
                                        <ErrorMessage
                                            style={{ textAlign: 'left' }}
                                            name="albumName"
                                            component="div"
                                            className="err-message"
                                        />

                                        <div className="image-upload-container">
                                            <div className="image-preview">
                                                {imagePreview ? (
                                                    <label 
                                                        htmlFor="albumImage"
                                                        style={{ 
                                                            width: '100%', 
                                                            height: '150px', 
                                                            cursor: 'pointer',
                                                            position: 'relative',
                                                            display: 'block'
                                                        }}
                                                    >
                                                        <img 
                                                            src={imagePreview} 
                                                            alt="Album preview" 
                                                            style={{ 
                                                                width: '100%', 
                                                                height: '100%', 
                                                                objectFit: 'cover',
                                                                borderRadius: '8px',
                                                                marginBottom: '10px',
                                                                border: '2px solid #ddd',
                                                            }} 
                                                        />
                                                        <div 
                                                            style={{
                                                                position: 'absolute',
                                                                top: '50%',
                                                                left: '50%',
                                                                transform: 'translate(-50%, -50%)',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                                color: 'white',
                                                                padding: '8px 16px',
                                                                borderRadius: '4px',
                                                                opacity: 0,
                                                                transition: 'opacity 0.3s'
                                                            }}
                                                            onMouseOver={(e) => e.target.style.opacity = 1}
                                                            onMouseOut={(e) => e.target.style.opacity = 0}
                                                        >
                                                            Change Image
                                                        </div>
                                                    </label>
                                                ) : (
                                                    <label 
                                                        htmlFor="albumImage"
                                                        style={{ 
                                                            width: '100%', 
                                                            height: '150px', 
                                                            border: '2px dashed #ccc',
                                                            borderRadius: '8px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginBottom: '10px',
                                                            cursor: 'pointer',
                                                            backgroundColor: '#fff',
                                                            color: '#777',
                                                            fontFamily: "Lato",
                                                            fontSize: '16px'                                                                                                                                                                                                                               
                                                        }}
                                                    >
                                                        Add Album Image
                                                    </label>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, setFieldValue)}
                                                style={{ display: 'none' }}
                                                id="albumImage"
                                            />
                                        </div>
                                        <ErrorMessage
                                            style={{ textAlign: 'left' }}
                                            name="albumImage"
                                            component="div"
                                            className="err-message"
                                        />
                                        <div className='close-btn'>
                                            <button
                                                type="submit"
                                                className="btn common-btn-bt"
                                                disabled={isSubmitting || (isEditMode && !dirty && imagePreview === editAlbumData?.albumCoverImage)}
                                                style={{
                                                    opacity: isSubmitting || (isEditMode && !dirty && imagePreview === editAlbumData?.albumCoverImage) ? 0.5 : 1,
                                                    backgroundColor: isSubmitting || (isEditMode && !dirty && imagePreview === editAlbumData?.albumCoverImage) ? '#ab19ff80' : '',
                                                    cursor: isSubmitting || (isEditMode && !dirty && imagePreview === editAlbumData?.albumCoverImage) ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                {isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update' : 'Create')}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCloseAlbumModal}
                                                className="btn common-btn-bt"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                        <div className="modal-overlay" onClick={handleCloseAlbumModal}></div>
                    </ModelWrapper>
                )}
                <Footer />
            </CommonPage>
        </div>
    )
}

export default Album;
