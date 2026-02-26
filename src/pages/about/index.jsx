/** @format */

import React from "react";
import { CommonPage } from "@/styles/common.style";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const About = () => {
  return (
    <div>
      <Header />
      <CommonPage>
        <div className="banner-block">
          <div className="banner-block-inner">
            <h1>About Us</h1>
            <p>
              Uphony is the world’s first open music marketplace app. Our
              mission: put the power back in the community’s hands.
            </p>
          </div>
        </div>
        <div className="who-are-block" style={{ marginBottom: "50px" }}>
          <div className="container-common">
            <div className="who-are-block-inner">
              <div className="title-common">
                <h2>ABOUT</h2>
                <p>What is Uphony?</p>
              </div>
              <div className="discription-block-inner">
                <p>
                  Uphony is the world's first open music marketplace app. Uphony
                  puts the power of music ownership back into the hands of
                  artists and fans, letting users take control of their musical
                  journey. Whether you're an emerging artist or a music
                  enthusiast, Uphony is where creativity, community, and
                  commerce come together seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='what-we-are-block'>
          <div className='container-common'>
            <div className='what-we-are-block-inner'>
              <div className='what-we-are-block-inner-right full-width-block'>
                <div className='block-services'>
                  <div className='block-services-left'>
                    <div className='block-services-left-inner'>
                      <div className='img-block'>
                        <img src='../../images/thumbnail-img-1.png'></img>
                      </div>
                      <div className='img-content'>
                        <h4>Upload Music</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                      </div>
                    </div>
                  </div>
                  <div className='block-services-left'>
                    <div className='block-services-left-inner'>
                      <div className='img-block'>
                        <img src='../../images/thumbnail-img-1.png'></img>
                      </div>
                      <div className='img-content'>
                        <h4>Upload Music</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                      </div>
                    </div>
                  </div>
                  <div className='block-services-left'>
                    <div className='block-services-left-inner'>
                      <div className='img-block'>
                        <img src='../../images/thumbnail-img-1.png'></img>
                      </div>
                      <div className='img-content'>
                        <h4>Upload Music</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                      </div>
                    </div>
                  </div>
                  <div className='block-services-left'>
                    <div className='block-services-left-inner'>
                      <div className='img-block'>
                        <img src='../../images/thumbnail-img-1.png'></img>
                      </div>
                      <div className='img-content'>
                        <h4>Upload Music</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="play-android-block pad-top-none">
          <div className="container-common">
            <div className="play-android-block-inner">
              <div className="play-android-block-inner-left">
                <h2>
                  Use UPHONY App on Your<br></br> iPhone & Android
                </h2>
              </div>
              <div className="play-android-block-inner-right">
                <a href="https://play.google.com/store/apps/details?id=com.uphony" target="_blank">
                  <img src="../../images/download-btn.png" alt="play-store"></img>
                </a>
                <a href="https://apps.apple.com/us/app/uphony/id6633419490" target="_blank">
                  <img src="../../images/download-btn-2.png" alt="apple-store"></img>
                </a>
                {/* <div className='play-android-button'>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </CommonPage>
    </div>
  );
};

export default About;
