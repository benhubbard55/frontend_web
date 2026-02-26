import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  AddMusicWapper,
  ButtonDiv,
  CommonPage,
  ProfileWapper,
} from "@/styles/common.style";
import Header from "@/components/Header";
import { toast } from "react-toastify";
import Footer from "@/components/Footer";
import ReactPlayer from "react-player";
import { Range } from "react-range";
import { useSelector } from "react-redux";
import {
  useLazyGenretypeQuery,
  useUploadmusicMutation,
  useImageuploadMutation,
  useVideouploadMutation,
  useAudiouploadMutation,
} from "../../../../service/music/music";
import Select from "react-select";
import { customSelectStyles } from "@/styles/reactSelect";

const UploadMusic = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [musicProfile, setMusicProfile] = useState(null);
  const [musicProfileVideo, setmusicProfileVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [musicFile, setMusicFile] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState("");
  const [musicFileName, setMusicFileName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(1);
  const [previewDuration, setPreviewDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [option, setOption] = useState([]);
  const playerRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState([0, 1]);
  const MIN = 0;
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const formikRef = useRef();

  const userAuth = useSelector((state) => state?.persistedReducer?.user);
  const [genreType] = useLazyGenretypeQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          page: 1,
          limit: 50,
          token: userAuth?.token,
        };
        const response = await genreType(payload);
        const formattedOptions = response?.data.map((item) => ({
          value: item.id,
          label: item.genreName,
        }));
        setOption(formattedOptions);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setError("");
    setAudioUrl(null);
    setDuration(1);
    setPreviewDuration(0);
    setSelectedRange([0, 1]);
    setMusicFileName("");
  };
  const handleReady = () => {    
    if (isInitialLoad) {
      const totalDuration = playerRef.current.getDuration() * 1000;
      setDuration(totalDuration);
      setPreviewDuration((totalDuration / 1000).toFixed(2));
      setIsInitialLoad(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsInitialLoad(true); // Reset initial load flag when new file is selected
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const allowedTypes = ["mp3", "wav"];
      const maxSize = 70 * 1024 * 1024; // 70MB in bytes
      if (file.size > maxSize) {
        alert("File size should not exceed 70MB.");
        return;
      }

      if (!allowedTypes.includes(fileExtension)) {
        alert("Invalid file type. Please upload only .mp3 or .wav files.");
        return;
      }
      setSelectedType(`.${fileExtension}`);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.onloadedmetadata = () => {
        const totalDuration = audio.duration * 1000;
        setSelectedRange([0, totalDuration]);
        setDuration(totalDuration);
        const initialPreviewDuration = parseFloat(audio.duration.toFixed(2));
        setPreviewDuration(initialPreviewDuration);
        if (formikRef.current) {
          formikRef.current.setFieldValue("previewDuration", initialPreviewDuration);
        }
      };
      setMusicFile(file);
      setMusicFileName(file.name);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Music title is required")
      .test(
        "not-empty-or-whitespace",
        "Music title cannot be empty or just spaces",
        (value) => value && value.trim() !== ""
      )
      .max(100, "Music title cannot be longer than 100 characters"),
    description: Yup.string()
      .test(
        "not-whitespace-only",
        "Description cannot be just spaces",
        (value) => !value || value.trim() !== ""
      ),
    musicTypeId: Yup.string().required("Please select a genre"),
    isPremium: Yup.string().required("Please select a price type"),
    amount: Yup.number()
      .max(100, "Amount cannot exceed $100")
      .test(
        "amount-required",
        "Amount is required for paid music",
        function (value) {
          const { isPremium } = this.parent;
          if (isPremium === "paid" && (!value || value <= 0)) {
            return this.createError({
              message: "Amount must be positive and required for paid music",
            });
          }
          return true;
        }
      )
      .notRequired(),
    fileType: Yup.mixed().required("Music file is required"),
    image_file: Yup.mixed().required("Image/Video is required"),
    previewDuration: Yup.number()
      .required("Preview duration is required")
      .min(15, "Preview duration must be at least 15 seconds")
  });

  const [uploadMusic] = useUploadmusicMutation();
  const [uploadAudio] = useAudiouploadMutation();
  const [uploadImage] = useImageuploadMutation();
  const [uploadVideo] = useVideouploadMutation();

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    let imageUrl = null;
    if (musicProfile) {
      const imageFormData = new FormData();
      imageFormData.append("musicProfile", musicProfile);
      const imageResponse = await uploadImage({
        body: imageFormData,
        token: userAuth?.token,
      }).unwrap();
      if (!imageResponse?.status) {
        throw new Error("Something went wrong");
      }
      imageUrl = imageResponse?.data || null;
    }

    // Upload Audio
    let audioUrl, musicOriginalName = null;
    if (musicFile) {
      const audioFormData = new FormData();
      audioFormData.append("musicFile", musicFile);
      const audioResponse = await uploadAudio({
        body: audioFormData,
        token: userAuth?.token,
      }).unwrap();
      if (!audioResponse?.status) {
        throw new Error("Something went wrong");
      }
      audioUrl = audioResponse?.data?.fileName || null;
      musicOriginalName = audioResponse?.data?.musicOriginalName || null;
    }

    // Upload Video
    let videoUrl = null;
    if (musicProfileVideo) {
      const videoFormData = new FormData();
      videoFormData.append("musicProfileVideo", musicProfileVideo);
      const videoResponse = await uploadVideo({
        body: videoFormData,
        token: userAuth?.token,
      }).unwrap();
      if (!videoResponse?.status) {
        throw new Error("Something went wrong");
      }
      videoUrl = videoResponse?.data?.video || "";
      imageUrl = videoResponse?.data?.thumbnail || null;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("musicTypeId", values.musicTypeId);
    formData.append("isPremium", values.isPremium === "free" ? 0 : 1);
    formData.append("fileType", selectedType);
    formData.append("previewStartTime", selectedRange[0] / 1000);
    formData.append("previewEndTime", selectedRange[1] / 1000);
    formData.append("musicProfileType", musicProfileVideo == null ? "image" : "video");
    formData.append("token", userAuth?.token);
    if (imageUrl) formData.append("profileImage", imageUrl);
    if (audioUrl) formData.append("musicFileName", audioUrl);
    if (videoUrl) formData.append("musicProfileVideo", videoUrl);
    if (musicOriginalName) formData.append("musicFileDisplayName", musicOriginalName);
    if (values.amount !== null) {
      formData.append("amount", values.amount);
    }
    const credentials = {
      body: formData,
      token: userAuth?.token,
    };

    try {
      const response = await uploadMusic(credentials).unwrap();
      resetForm();
      setSelectedRange([0, 1]);
      setImagePreview(null);
      setVideoPreview(null);
      setMusicProfile(null);
      setmusicProfileVideo(null);
      setSelectedType(null);
      setDuration(10);
      setPreviewDuration(0);
      setMusicFileName("");
      setAudioUrl(null);
      toast.success(response.message);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleSelectMusic = () => {
    document.getElementById("fileType").click();
  };
  const handlePlayRange = () => {
    if (playerRef.current) {
      const startTimeInSeconds = selectedRange[0] / 1000;
      const endTimeInSeconds = selectedRange[1] / 1000;
      
      // Calculate and set the preview duration
      const currentPreviewDuration = parseFloat((endTimeInSeconds - startTimeInSeconds).toFixed(2));
      setPreviewDuration(currentPreviewDuration);

      playerRef.current.seekTo(startTimeInSeconds);
      setIsPlaying(true);

      const interval = setInterval(() => {
        const currentTime = playerRef?.current?.getCurrentTime() * 1000;
        if (currentTime >= selectedRange[1]) {
          setIsPlaying(false);
          clearInterval(interval);
        }
      }, 100);
    }
  };

  return (
    <div>
      <Header />
      <CommonPage>
        <div className="banner-block diff-height"></div>
        <div className="privacy-policy-block">
          <AddMusicWapper>
            <div className="form-div">
              <Formik
                innerRef={formikRef}
                initialValues={{
                  title: "",
                  description: "",
                  musicTypeId: "",
                  isPremium: "",
                  fileType: null,
                  image_file: null,
                  music_type: selectedType,
                  amount: null,
                  previewDuration: 0
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, isSubmitting, values, errors }) => (
                  <Form>
                    <div className="form-group">
                      <Field
                        type="text"
                        name="title"
                        placeholder="Music Title Here"
                        className="input-field"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="err-message"
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Music Description (Optional)"
                        className="textarea-field"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="err-message"
                      />
                    </div>
                    <div className="form-group select-music">
                      <div className="select-field">
                        <Select
                          options={option}
                          placeholder="Genre"
                          styles={customSelectStyles}
                          onChange={(selectedOption) => {
                            setFieldValue("musicTypeId", selectedOption.value);
                          }}
                          value={
                            values?.musicTypeId
                              ? option.find(
                                (option) =>
                                  option.value === values.musicTypeId
                              )
                              : null
                          }
                        />
                        <ErrorMessage
                          name="musicTypeId"
                          component="div"
                          className="err-message"
                        />
                      </div>
                      <div>
                        <div className="radio-group">
                          <label>
                            <Field type="radio" name="isPremium" value="free" />
                            Free
                          </label>
                          <label>
                            <Field type="radio" name="isPremium" value="paid" />
                            Paid
                          </label>
                        </div>
                        <ErrorMessage
                          name="isPremium"
                          component="div"
                          className="err-message"
                        />
                      </div>
                    </div>
                    {values.isPremium === "paid" && (
                      <div className="form-group">
                        <div className="input-with-symbol">
                          <span className="currency-symbol">$</span>
                          <Field
                            type="number"
                            name="amount"
                            placeholder="Enter Music Amount"
                            className="input-field"
                          />
                        </div>
                        <ErrorMessage
                          name="amount"
                          component="div"
                          className="err-message"
                        />
                      </div>
                    )}
                    <div>
                      <div className="file-upload">
                        <div
                          className="upload-main-div"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            className="upload-box"
                            onClick={() => handleSelectMusic()}
                          >
                            <input
                              type="file"
                              accept=".mp3, .wav"
                              onChange={(event) => {
                                const file = event.target.files[0];
                                setFieldValue("fileType", file);
                                handleFileChange(event);
                              }}
                              style={{ display: "none" }}
                              id="fileType"
                            />
                            <label className="wrap-title" htmlFor="fileType1">
                              {musicFileName ? musicFileName : "Add Music (Max 70MB)"}
                            </label>
                          </div>
                          <ErrorMessage
                            name="fileType"
                            component="div"
                            className="err-message"
                          />
                        </div>

                        <div
                          className="upload-main-div"
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div
                            className="upload-box"
                            style={{ position: "relative", cursor: "pointer" }}
                            onClick={() =>
                              document.getElementById("image_file").click()
                            }
                          >
                            <input
                              type="file"
                              accept="image/*,video/*"
                              onChange={(event) => {
                                const file = event.target.files[0];
                                setFieldValue("image_file", file);
                                if (file) {
                                  const maxSize = 70 * 1024 * 1024;
                                  const reader = new FileReader();
                                  if (file.type.startsWith("image/")) {
                                    setMusicProfile(file);
                                    setmusicProfileVideo(null);
                                    reader.onload = () => setImagePreview(reader.result);
                                    reader.readAsDataURL(file);
                                  } else if (file.type.startsWith("video/")) {
                                    if (file.size > maxSize) {
                                      alert("Video size should not exceed 70MB.");
                                      return;
                                    }
                                    setmusicProfileVideo(file);
                                    const videoURL = URL.createObjectURL(file);
                                    setImagePreview(videoURL);
                                  }
                                }
                              }}
                              style={{ display: "none" }}
                              id="image_file"
                            />
                            {!imagePreview ? (
                              <label htmlFor="image_file1">Add Image/video (Max 70MB)</label>
                            ) : (
                              <>
                                {imagePreview.includes("data:image/") ? (
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                      width: "100%",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                ) : (
                                  <video
                                    src={imagePreview}
                                    controls
                                    style={{
                                      width: "100%",
                                      height: "100px",
                                      borderRadius: "8px",
                                    }}
                                  />
                                )}
                              </>
                            )}
                          </div>
                          <ErrorMessage
                            name="image_file"
                            component="div"
                            className="err-message"
                          />
                        </div>
                      </div>
                      {audioUrl && (
                        <>
                          <div style={{ display: "flex", gap: "30px" }}>
                            <ReactPlayer
                              ref={playerRef}
                              url={audioUrl}
                              controls
                              playing={isPlaying}
                              onReady={handleReady}
                              width="100%"
                              height="100px"
                            />
                            <Range
                              step={1}
                              min={MIN}
                              max={duration}
                              values={selectedRange}
                              onChange={(values) => {
                                setSelectedRange(values);
                                const startTimeInSeconds = values[0] / 1000;
                                const endTimeInSeconds = values[1] / 1000;                                
                                const newPreviewDuration = parseFloat((endTimeInSeconds - startTimeInSeconds).toFixed(2));
                                setPreviewDuration(newPreviewDuration);
                                setFieldValue("previewDuration", newPreviewDuration);
                              }}
                              renderTrack={({ props, children }) => (
                                <div
                                  {...props}
                                  style={{
                                    ...props.style,
                                    height: "6px",
                                    width: "100%",
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: "3px",
                                    marginTop: "70px",
                                  }}
                                >
                                  {children}
                                </div>
                              )}
                              renderThumb={({ props, value }) => (
                                <div {...props} className="thumb">
                                  <div className="tooltip">{Number(value).toFixed(2)}</div>
                                </div>
                              )}
                            />
                          </div>
                          <button
                            className="play-selcted-btn"
                            type="button"
                            onClick={handlePlayRange}
                          >
                            Play Selected Portion
                          </button>
                        </>
                      )}
                    </div>

                    <div className="form-group select-music">
                      <div className="preview-label">
                        <label>Preview Duration: {previewDuration}s</label>
                        <ErrorMessage
                          name="previewDuration"
                          component="div"
                          className="err-message"
                        />
                      </div>
                    </div>

                    <ButtonDiv>
                      <button
                        className="common-btn"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? "Uploading..." : "Upload"}
                      </button>
                    </ButtonDiv>
                  </Form>
                )}
              </Formik>
            </div>
          </AddMusicWapper>
        </div>
        <Footer />
      </CommonPage>
    </div>
  );
};

export default UploadMusic;
