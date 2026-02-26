"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CommonPage, LoaderContainer, ModelWrapper, AlbumMusicList, Spinner, MusicHistory } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import moment from 'moment';
import { useLazyGetAlbumMusicListQuery, useLazyDeleteAlbumMusicQuery } from '../../../../../service/album/album';

const AlbumDetails = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [playingMusicId, setPlayingMusicId] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [musicList, setMusicList] = useState([]);
    const [album, setAlbum] = useState(null);
    const [isNextPage, setIsNextPage] = useState(false);
    const userAuth = useSelector((state) => state?.persistedReducer?.user);
    const [albumMusicList] = useLazyGetAlbumMusicListQuery();
    const [deleteAlbumMusic] = useLazyDeleteAlbumMusicQuery();
    const observer = useRef();
    const videoRefs = useRef({});

    const fetchAlbumMusicList = async () => {
        setLoading(true);
        try {
            const payload = {
                page: page,
                limit: 10,
                albumId: router?.query?.id,
                token: userAuth?.token,
            };
            const response = await albumMusicList(payload);
            if (response?.data?.data) {
                if (page === 1) {
                    setMusicList(response.data.data.musicList);
                } else {
                    setMusicList((prevList) => [...prevList, ...response.data.data.musicList]);
                }
                setAlbum(response.data.data.album);
                setIsNextPage(response?.data?.pagination?.isNextPage);
            } else if (response?.error) {
                toast.error(response?.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.error('Failed to fetch album music list');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (router?.query?.id) {
            fetchAlbumMusicList();
        }
    }, [page, router?.query?.id]);

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

    const handleDeleteMusic = async () => {
        try {
            const payload = {
                albumMusicId: selectedMusicId,
                token: userAuth?.token,
            };
            setShowDeleteModal(false);
            const response = await deleteAlbumMusic(payload);
            if (response?.data?.status) {
                // Stop audio if the deleted music was playing
                if (audio) {
                    audio.pause();
                    setAudio(null);
                }
                if (videoRefs.current[selectedMusicId]) {
                    videoRefs.current[selectedMusicId].pause();
                }
                setIsPlaying(false);
                setPlayingMusicId(null);

                toast.success(response?.data?.message || 'Music removed from album successfully');
                setPage(1);
                fetchAlbumMusicList();
            } else {
                toast.error(response?.error?.data?.message || 'Failed to remove music from album');
            }
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || 'Something went wrong');
        }
    }

    const handleOpenModal = (musicId) => {        
        setShowDeleteModal(true);
        // document.body.style.overflow = "hidden";
        setSelectedMusicId(musicId);
    }

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        // document.body.style.overflow = "auto";
        setSelectedMusicId(null);
    }

    return (
        <div>
            <Header />
            <CommonPage>
                <div className="banner-block diff-height"></div>
                <div className="privacy-policy-block">
                    <MusicHistory>
                        <div className="music-card-container">
                            <div className='album-name'>
                                <button className='btn common-btn-bt' onClick={() => router.back()}><img src="/images/arrow-back.svg" alt="back" /></button>
                                <h3>{album?.albumName} Music List</h3>
                            </div>
                            {musicList.length > 0 ? (
                                musicList.map((music) => (
                                    <div className="music-card" key={music.id} ref={isNextPage ? lastEventElementRef : null}>
                                        <div className="image-container">
                                            <img src={music.musicId?.profileImage || "/images/thumbnail-img-1.png"} alt="Music Thumbnail" />
                                        </div>
                                        <div className="content">
                                            <div className="header">
                                                <h3>{music.musicId?.title || "Unknown Title"}</h3>
                                                <span className="tag">{moment(music.createdAt).format("DD MMMM, YYYY") || "No Date"}</span>
                                            </div>
                                            <div className="header">
                                                <p>{music.musicId?.description || "No Description"}</p>
                                                {/* <span>${music?.musicId?.amount || "0"}</span> */}
                                            </div>
                                            <div className="footer">
                                                <div className="user-details">
                                                    <span style={{ paddingBottom: "5px" }}>{music?.musicId?.isPremium
                                                        ? `Price: $${music?.musicId?.amount || "0"}`
                                                        : "Free"}</span>
                                                </div>
                                                <div className="likes">
                                                    <span><img src="/images/like.svg" alt="like" />{music?.musicId.likeCount || 0}</span>
                                                    <button className="play-button" onClick={() => handlePlayPause(music?.musicId)}>
                                                        <img
                                                            src={isPlaying && playingMusicId === music?.musicId.id ? "/images/pause.svg" : "/images/play.svg"}
                                                            alt="play"
                                                        />
                                                    </button>
                                                    <button className="play-button" onClick={() => handleOpenModal(music?.id)}><img src="/images/delete.svg" alt="delete" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='no-data purchase'>{!loading && "No Music Available in this album"}</p>
                            )}
                        </div>

                    </MusicHistory>
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
                            <p>Are you sure to remove this music from {album?.albumName} album?</p>
                            <div className='close-btn'>
                                <button onClick={handleDeleteMusic} className="btn common-btn-bt">Delete</button>
                                <button onClick={handleCloseModal} className="btn common-btn-bt">Cancel</button>
                            </div>
                        </div>
                        <div className="modal-overlay" onClick={handleCloseModal}></div>
                    </ModelWrapper>
                )}
                <Footer />
            </CommonPage>
        </div>
    );
};

export default AlbumDetails;