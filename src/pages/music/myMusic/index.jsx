import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlbumWrapper, CommonPage, LoaderContainer, ModelWrapper, MusicList, Spinner } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useLazyDeletemusicQuery, useLazyMusiclistQuery } from '../../../../service/music/music';
import { useAddMusicToAlbumMutation, useLazyGetAlbumListQuery } from '../../../../service/album/album';

const UploadMusic = () => {    
    const [musicList, setMusicList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAlbumModal, setShowAlbumModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [playingMusicId, setPlayingMusicId] = useState(null);
    const [albumList, setAlbumList] = useState([]);
    const [isNextPage, setIsNextPage] = useState(false);
    const userAuth = useSelector((state) => state?.persistedReducer?.user);    
    const observer = useRef();
    const videoRefs = React.useRef({});
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [albumPage, setAlbumPage] = useState(1);
    const [isNextAlbumPage, setIsNextAlbumPage] = useState(false);
    const [albumLoading, setAlbumLoading] = useState(false);

    const [musicListCall] = useLazyMusiclistQuery();
    const [musicdelete] = useLazyDeletemusicQuery();
    const [getAlbumList] = useLazyGetAlbumListQuery();
    const [addToAlbum] = useAddMusicToAlbumMutation();


    const fetchData = async () => {
        setLoading(true);
        try {
            const payload = {
                page: page,
                limit: 10,
                token: userAuth?.token,
                userId: userAuth?.userData?.id,
            };
            const response = await musicListCall(payload);
            if (response?.data?.data) {
                if (page == 1) {
                    setMusicList(response.data.data);
                } else {
                    setMusicList((prevMusicList) => [...prevMusicList, ...response.data.data]);
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

    const handlePlayPause = (music) => {
        if (playingMusicId === music.id && !isPlaying) {
            if (audio) {
                audio.play();
            }
            if (videoRefs.current[music.id]) {
                videoRefs.current[music.id].play();
            }
            setIsPlaying(true);
        } else if (playingMusicId === music.id && isPlaying) {
            if (audio) {
                audio.pause();
            }
            if (videoRefs.current[music.id]) {
                videoRefs.current[music.id].pause();
            }
            setIsPlaying(false);
            setPlayingMusicId(null);
        } else {
            if (audio) {
                audio.pause();
                setAudio(null);
            }
            if (videoRefs.current[playingMusicId]) {
                videoRefs.current[playingMusicId].pause();
            }
            if (music.musicFileName) {
                const newAudio = new Audio(music.musicFileName);
                setAudio(newAudio);
                newAudio.play();
                setPlayingMusicId(music.id);
                setIsPlaying(true);
                newAudio.onended = () => {
                    newAudio.currentTime = 0;
                    newAudio.play();
                };
            }
            if (music.musicProfileType === "video" && videoRefs.current[music.id]) {
                videoRefs.current[music.id].play();
            }
        }
    };

    const handleDeleteMusic = async () => {
        try {
            const payload = {
                id: selectedMusicId,
                token: userAuth?.token,
            };
            setShowModal(false);
            const response = await musicdelete(payload);
            toast.success(response?.data.message);
            setPage(1);
            fetchData()
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }
    const handleOpenModal = (musicId) => {
        setShowModal(true);
        // document.body.style.overflow = "hidden";
        setSelectedMusicId(musicId);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        // document.body.style.overflow = "auto";
    }
    const handleAddToAlbumModal = (musicId) => {
        setShowAlbumModal(true);
        // document.body.style.overflow = "hidden";
        setSelectedMusicId(musicId);
    }
    const handleCloseAlbumModal = () => {
        setShowAlbumModal(false);
        setSelectedAlbumId(null)
        // document.body.style.overflow = "auto";
    }

    const fetchAlbumList = async () => {
        setAlbumLoading(true);
        try {
            const payload = {
                page: albumPage,
                limit: 10,
                userId: userAuth?.userData?.id,
                token: userAuth?.token,
            };
            const response = await getAlbumList(payload);        
            if (response?.data?.data) {
                if (albumPage === 1) {
                    setAlbumList(response.data.data);
                } else {
                    setAlbumList((prevAlbumList) => [...prevAlbumList, ...response.data.data]);
                }
                setIsNextAlbumPage(response?.data?.pagination?.isNextPage);
            } else if (response?.error) {
                toast.error(response?.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error fetching album list:', error);
            toast.error('Failed to fetch album list');
        } finally {
            setAlbumLoading(false);
        }
    }

    useEffect(() => {
        fetchAlbumList();
    }, [albumPage]);

    const lastAlbumElementRef = useCallback(
        (node) => {
            if (albumLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && isNextAlbumPage) {
                    setAlbumPage((prevPage) => prevPage + 1);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [albumLoading, isNextAlbumPage]
    );

    const handleAlbumSelect = (albumId) => {
        setSelectedAlbumId(albumId);
    };

    const handleAddToAlbumClick = () => {
        if (!selectedAlbumId) {
            toast.error('Please select an album');
            return;
        }
        handleAddToAlbum(selectedAlbumId);
    };

    const handleAddToAlbum = async (albumId) => {
        try {
            const payload = {
                musicId: selectedMusicId,
                albumId: albumId,
                token: userAuth?.token,
            };
            const response = await addToAlbum(payload);
            if (response?.data?.status) {
                toast.success(response?.data?.message);
                setShowAlbumModal(false);
                setSelectedAlbumId(null)               ;
            } else {
                toast.error(response?.error?.data?.message || 'Something went wrong');
            }            
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div>
            <Header />
            <CommonPage>
                <div className="banner-block diff-height"></div>
                <div className="privacy-policy-block">
                    <MusicList>
                        {/* <h1>My Music List</h1> */}
                        <div className="music-card-container">
                            {musicList?.length == 0 && !loading ? (
                                <p className='no-data'>No music available.</p>
                            ) : (
                                musicList.map((music, index) => (
                                    <div className="music-card" key={index} ref={isNextPage ? lastEventElementRef : null}>
                                        <div className="image-container">
                                            {/* <img src={music.profileImage || '/images/thumbnail-img-1.png'} alt={music.name} /> */}
                                            {music.musicProfileType === "video" && music.musicProfileVideo ? (
                                                <video
                                                    ref={(el) => (videoRefs.current[music.id] = el)}
                                                    src={music.musicProfileVideo}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        borderRadius: "8px",
                                                    }}
                                                    autoplay={false}
                                                    muted
                                                    loop
                                                />
                                            ) : (
                                                <img
                                                    src={music.profileImage || "/images/thumbnail-img-1.png"}
                                                    alt={music.name || "Default thumbnail"}
                                                />
                                            )}
                                        </div>
                                        <div className="content">
                                            <div className="header">
                                                <h3>{music.title}</h3>
                                                <span className="tag">{music.isPremium ? 'Paid' : 'Free'}</span>
                                            </div>
                                            <div className="footer">
                                                <div className="likes">
                                                    <span><img src='/images/like.svg' alt='like' />{music.likeCount}</span>
                                                    <button className='delete-btn' onClick={() => handleOpenModal(music.id)}><img src='/images/delete.svg' alt='delete' /></button>
                                                    <button className='plus-btn' onClick={() => handleAddToAlbumModal(music.id)}>
                                                        <img src='/images/music-album.svg' alt='plus' />
                                                    </button>
                                                </div>
                                                <div className="duration">
                                                    <span>{music.duration}</span>
                                                    <button className='play-button' onClick={() => handlePlayPause(music)}>
                                                        <img
                                                            src={isPlaying && playingMusicId === music.id ? "/images/pause.svg" : "/images/play.svg"}
                                                            alt="play"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
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
                {showModal && (
                    <ModelWrapper>
                        <div className="modal-content">
                            <h2>Delete</h2>
                            <p>Are you sure you want to delete this music?</p>
                            <div className='close-btn'>
                                <button onClick={handleDeleteMusic} className="btn common-btn-bt">Delete</button>
                                <button onClick={handleCloseModal} className="btn common-btn-bt">Cancel</button>
                            </div>
                        </div>
                        <div className="modal-overlay" onClick={handleCloseModal}></div>
                    </ModelWrapper>
                )}
                {showAlbumModal && (
                    <ModelWrapper>
                        <div className="modal-content">
                            <h2>Add Music to Album</h2>
                            <div>
                                <AlbumWrapper>                                    
                                    {albumList?.length > 0 && albumList?.map((album, index) => (
                                        <li 
                                            className='album-list' 
                                            key={index}
                                            ref={isNextAlbumPage && index === albumList.length - 1 ? lastAlbumElementRef : null}
                                        >
                                            <div className='album-item'>
                                                <div className='img-block'>
                                                    <img src={album.albumCoverImage} alt={album.albumName} />
                                                </div>
                                                <p>{album.albumName}</p>
                                            </div>
                                            <input 
                                                type='radio' 
                                                name='album' 
                                                id={`album-${album.id}`}
                                                className='radio-btn'
                                                checked={selectedAlbumId === album.id}
                                                onChange={() => handleAlbumSelect(album.id)}
                                            />
                                        </li>
                                    ))}                                    
                                    {albumList?.length === 0 && !albumLoading && <p>No album available <Link href="/music/album">create new album</Link></p>}
                                    {albumLoading && (
                                        <LoaderContainer>
                                            <Spinner />
                                        </LoaderContainer>
                                    )}
                                </AlbumWrapper>
                                <div className='close-btn'>                                   
                                    <button 
                                        className='btn common-btn-bt'
                                        onClick={handleAddToAlbumClick}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-overlay" onClick={handleCloseAlbumModal}></div>
                    </ModelWrapper>
                )}
                <Footer />
            </CommonPage>
        </div>
    );
};

export default UploadMusic;
