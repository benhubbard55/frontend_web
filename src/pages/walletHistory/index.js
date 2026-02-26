import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CommonPage,
  LoaderContainer,
  MusicHistory,
  Spinner,
} from "@/styles/common.style";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { useLazyWallethistoryQuery } from "../../../service/payment/payment";
import moment from "moment";
import { useGetuserDetailsQuery } from "../../../service/auth/userDetails";

const UploadMusic = () => {
  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [page, setPage] = useState(1);
  const [playingMusicId, setPlayingMusicId] = useState(null);
  const [isNextPage, setIsNextPage] = useState(false);
  const userAuth = useSelector((state) => state?.persistedReducer?.user);
  const [walletHistory] = useLazyWallethistoryQuery();
  const observer = useRef();

  const { data: userDetails, isLoading, isError, refetch } = useGetuserDetailsQuery({ token: userAuth?.token, userId: userAuth?.userData?.id });

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        page: page,
        limit: 10,
        token: userAuth?.token,
      };
      const response = await walletHistory(payload);
      if (response?.data?.data) {
        if (page == 1) {
          setWalletList(response.data.data);
        } else {
          setWalletList((prevwalletList) => [
            ...prevwalletList,
            ...response.data.data,
          ]);
        }
      }
      setIsNextPage(response?.data?.pagination?.isNextPage);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Header />
      <CommonPage>
        <div className="banner-block diff-height"></div>
        <div className="privacy-policy-block">
          <MusicHistory>
            <div className="music-card-container">
              <h1 style={{ textAlign: isMobile ? "center" : "end" }}>
                Total Balance : ${userDetails?.data?.balance || 0}
              </h1>
              {walletList.length > 0 ? (
                walletList.map((data) => (
                  <div className="music-card" key={data.id} ref={isNextPage ? lastEventElementRef : null}>
                    <div className="content">
                      <div className="footer">
                        <div className="user-details">
                          <img
                            src={
                              data?.userId?.profileImage ||
                              "/images/profile1.svg"
                            }
                            alt="User"
                          />
                          <p>
                            {data?.transferType == "withdraw"
                              ? "Withdraw"
                              : data?.userId?.name || "Anonymous"}
                          </p>
                        </div>
                        <p>
                          {data.type == "debit" ? "-" : "+"} $
                          {data?.totalAmount.toFixed(2)}{" "}
                          {data.transferType == "withdraw"
                            ? data.status == "success"
                              ? "Success"
                              : "Pending"
                            : "Earnings"}{" "}
                        </p>
                        <p className="date-text">
                          {moment(data.createdAt).format("DD MMMM, YYYY") ||
                            "No Date"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data wallet">{!loading && "No wallet history available"}</p>
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
      </CommonPage>
    </div>
  );
};

export default UploadMusic;
