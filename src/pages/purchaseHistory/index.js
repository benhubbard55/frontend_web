import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CommonPage, LoaderContainer, MusicHistory, Spinner } from '@/styles/common.style';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSelector } from 'react-redux';
import { useLazyPurchasedmusicQuery } from '../../../service/payment/payment';
import moment from 'moment';

const UploadMusic = () => {
    const [purchaseList, setPurchaseList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [page, setPage] = useState(1);
    const [playingMusicId, setPlayingMusicId] = useState(null);
    const [isNextPage, setIsNextPage] = useState(false);
    const userAuth = useSelector((state) => state?.persistedReducer?.user);
    const [paymentHistory] = useLazyPurchasedmusicQuery();
    const observer = useRef();

    const fetchData = async () => {
        setLoading(true);
        try {
            const payload = {
                page: page,
                limit: 10,
                token: userAuth?.token,
            };
            const response = await paymentHistory(payload);
            if (response?.data?.data) {
                if (page == 1) {
                    setPurchaseList(response.data.data);
                } else {
                    setPurchaseList((prevPurchaseList) => [...prevPurchaseList, ...response.data.data]);
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
        if (playingMusicId === music.id && isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            if (audio) {
                audio.pause();
                setIsPlaying(false);
            }
            const newAudio = new Audio(music.musicFileName);
            setAudio(newAudio);
            newAudio.play();
            setPlayingMusicId(music.id);
            setIsPlaying(true);
            newAudio.onended = () => {
                setIsPlaying(false);
            };
        }
    };

    return (
        <div>
            <Header />
            <CommonPage>
                <div className="banner-block diff-height"></div>
                <div className="privacy-policy-block">
                    <MusicHistory>
                        <div className="music-card-container">
                            {purchaseList.length > 0 ? (
                                purchaseList.map((music) => (
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
                                                    <img src={music?.receiverId?.profileImage || '/images/profile1.svg'} alt="User" />
                                                    <span>{music?.receiverId?.name || "Anonymous"}</span>
                                                </div>
                                                <div className="likes">
                                                    <span style={{ paddingBottom: "5px" }}>Price: ${music?.musicId?.amount || "0"} | </span>
                                                    <span><img src="/images/like.svg" alt="like" />{music?.musicId.likeCount || 0}</span>
                                                    <button className="play-button" onClick={() => handlePlayPause(music?.musicId)}>
                                                        <img
                                                            src={isPlaying && playingMusicId === music?.musicId.id ? "/images/pause.svg" : "/images/play.svg"}
                                                            alt="play"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className='no-data purchase'>{!loading && "No purchase history available"}</p>
                            )}
                        </div>

                    </MusicHistory>
                    {loading && (
                        <LoaderContainer>
                            <Spinner />
                        </LoaderContainer>
                    )}
                </div>
                <Footer />
            </CommonPage >
        </div >
    );
};

export default UploadMusic;
