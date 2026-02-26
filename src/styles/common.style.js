import styled from "styled-components";
import { mediaQueries } from "@/utils/mediaQuery";

export const LoginLayoutWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle, #311450, #070409);
  background-size: cover;
  background-position: center;

  .uphony-login {
    padding: 70px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    ${mediaQueries("md")`
        padding: 15px;       
      `}
    .uphony-logo {
      margin-bottom: 50px;
      ${mediaQueries("md")`
        margin-bottom: 30px;
      `}
      img {
        width: 300px;
        ${mediaQueries("md")`
          width:200px;
        `}
      }
    }
    .uphony-form {
      padding: 30px;
      width: 700px;
      border-radius: 20px;
      ${mediaQueries("md")`
        padding: 20px;
        width: 100%;
      `}
      h2 {
        font-weight: 600;
        font-size: 26px;
        line-height: 30px;
        color: white;
        text-align: center;
        margin: 0px 0px 30px 0px;
      }
      .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        position: relative;
        input {
          height: 50px;
          border: 1px solid rgba(51, 51, 51, 0.1);
          border-radius: 10px;
          padding: 0px 10px 0px 50px;
          background-color: #ffffff1a !important;
          outline: none;
          box-shadow: none;
          display: block;
          max-width: 100%;          
          font-family: "Lato", sans-serif;
          font-size: 16px;
          color: #fff;
          &::placeholder {
            color: #fff;
          }
          ${mediaQueries("md")`     
            width:auto;     
            flex:1;
            min-height:50px;
            height:50px;
          `}
        }
        input:-webkit-autofill {
          background-color: #ffffff1a !important;
          color: #fff !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        .info-icon {
          position: absolute;
          top: 17px;
          left: 20px;
        }
        .eye-password {
          position: absolute;
          top: 17px;
          right: 20px;
          cursor: pointer;
        }
        &.pad-change-fr {
          input {
            width: 680px;
            padding: 0px 10px;
          }
        }
      }
      .forgot-link {
        display: flex;
        align-items: end;
        justify-content: end;
        position: relative;
        top: -5px;
        a {
          font-size: 16px;
          line-height: 20px;
          color: #fff;
          text-decoration: none;
          &:hover {
            color: #ab19ff;
          }
        }
      }
      .common-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        .common-btn-bt {
          width: 150px;
          padding: 15px 5px;
          background-color: #ab19ff;
          border-radius: 25px;
          color: #f7f7f7;
          font-size: 20px;
          line-height: 20px;
          color: #f7f7f7;
          font-weight: 600;
          cursor: pointer;
          border: none;
          outline: none;
          box-shadow: inset 2px 2px 20px 2px rgba(255, 255, 255, 0.2),
            0px 0px 8px 2px rgba(255, 255, 255, 0.2);
        }
      }
      .bottom-text-block {
        text-align: center;
        margin-top: 15px;
        p {
          font-size: 16px;
          line-height: 20px;
          color: #fff;
          margin: 0px;
          button {
            color: #ab19ff;
            font-weight: 600;
            border: none;
            background-color: transparent;
            cursor: pointer;
          }
          a {
            color: #ab19ff;
            font-weight: 600;
            text-decoration: none;
          }
        }
      }
      .terms-check {
        margin-bottom: 30px;
        .terms-check-inner {
          position: relative;
        }

        .terms-check-inner input {
          padding: 0;
          height: initial;
          width: initial;
          margin-bottom: 0;
          display: none;
          cursor: pointer;
        }

        .terms-check-inner label {
          position: relative;
          cursor: pointer;
          font-size: 16px;
          line-height: 16px;
          color: #fff;
          a {
            text-decoration: none;
            color: #ab19ff;
          }
          span {
            margin-left: 5px;
            position: relative;
            top: 1px;
          }
        }

        .terms-check-inner label:before {
          content: "";
          -webkit-appearance: none;
          background-color: transparent;
          border: 1px solid #858585;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
            inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
          padding: 7px;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          cursor: pointer;
          margin-right: 5px;
          border-radius: 5px;
        }

        .terms-check-inner input:checked + label:after {
          content: "";
          display: block;
          position: absolute;
          top: 6px;
          left: 6px;
          width: 3px;
          height: 7px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      }
    }
  }
`;

export const ModelWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .modal-content {
    position: relative;
    background: #ffffff;
    padding: 30px 30px;
    margin:20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 2;
    width: 400px;
    text-align: center;
   
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
       margin-top: 10px;
    }

    p {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }
  .close-btn {
    display: flex;
    align-items: center;      
    gap:10px;
    justify-content: center;
    margin-top: 20px;
      .common-btn-bt {
        width: 150px;
        padding: 15px 5px;
        background-color: #ab19ff;
        border-radius: 25px;
        color: #f7f7f7;
        font-size: 20px;
        line-height: 20px;
        color: #f7f7f7;
        font-weight: 600;
        cursor: pointer;
        border: none;
        outline: none;
        box-shadow: inset 2px 2px 20px 2px rgba(255, 255, 255, 0.2), 0px 0px 8px 2px rgba(255, 255, 255, 0.2);
        ${mediaQueries("sm")`
            width: 100px;
      `}
    }          
  }
.input-field,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    margin-top: 30px;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 8px;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    outline: none;
    transition: border 0.3s;
    &:focus {
      border-color: #6a0dad;
    }
  }
    .image-upload-container{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 20px;        
        gap: 10px;
        .image-preview{
          width: 100%;
          height: 150px;
          label{
            width: 100%;
            height: 100%;
            border: 2px dashed #ccc;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            cursor: pointer;
            background-color: #fff;
            color: #ccc;
            font-family: "Lato";
            font-size: 16px;            
          }
        }
        input{
          display: none;
        }
      }
`

export const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;  
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  height: 100%;
  max-height: 400px;
  overflow-y: auto;
  .album-list {
    display: flex;   
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    .album-item {
      display: flex;
      align-items: center;   
      text-align: left;
      gap: 10px;
      width: 100%;
      min-width: 0;
      p{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 70px);
          font-size: 16px;
          margin: 0;
          display: block;
          flex: 1;
          min-width: 0;
      } 
    }
    .img-block {
      width: 50px;
      height: 50px;      
      overflow: hidden;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .radio-btn{
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #ab19ff;
      background-color: #ab19ff;
      cursor: pointer;
      &:checked{
        background-color: #ab19ff;
      }
    }    
  }
`

export const Header = styled.div`
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
  z-index: 9;
  .header-inner {
    max-width: 1520px;
    margin: 0 auto;
    padding: 0px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mediaQueries("lg")`
     position: relative;
     `}
    .header-left {
      a {
        img {
          width: 200px;
          ${mediaQueries("lg")`
            width:140px;
          `}
        }
      }
    }
    .header-right {
      ${mediaQueries("lg")`
        background-color:white;
        box-shadow: 0 0 10px 0 #dedede;
        border-radius: 20px;
        padding: 20px 0; 
        position: absolute;
        left: 0;
        top: -40px;
        height: 100vh;
        width: 55%;
      `}
      .logo {
        display: none;
        ${mediaQueries("lg")`
          display:block;
      `}
        img {
          width: 140px;
        }
      }
      ul {
        display: flex;
        align-items: center;
        ${mediaQueries("lg")`
           padding:0; 
          display:block;         
          
      `}
        li {
          padding: 0px 25px;
          list-style: none;
          ${mediaQueries("xl")`            
            padding: 0px 8px;
        `}
          a {
            font-size: 20px;
            line-height: 24px;
            color: #fff;
            text-decoration: none;
            font-weight: 700;
            transition: 0.5s;
            ${mediaQueries("lg")`
              display:block; 
              font-size:16px;
              line-height: 20px;
              color: #000;     
              margin-bottom:15px;
            `}
            &:hover {
              color: #b12aff;
            }
            &.active {
              color: #b12aff;
            }
          }
          button {
            width: 120px;
            padding: 10px 5px;
            margin-right: 20px;
            background-color: #ab19ff;
            border-radius: 25px;
            color: #f7f7f7;
            font-size: 20px;
            line-height: 20px;
            color: #f7f7f7;
            font-weight: 600;
            cursor: pointer;
            border: none;
            outline: none;
            box-shadow: inset 2px 2px 20px 2px rgba(255, 255, 255, 0.2),
              0px 0px 8px 2px rgba(255, 255, 255, 0.2);
            ${mediaQueries("lg")`
            padding:5px;
              font-size:16px;
              line-height: 20px;             
            `}
          }
          .profile-image {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 10px;
            ${mediaQueries("xl")`            
            margin-right: 0;
          `}
          }
          .profile-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .profile-menu {
          position: relative;
          padding-right: 0;
          .profile-image {
            cursor: pointer;
            display: flex;
            align-items: center;
            width: 40px;
            height: 40px;
            border: 2px solid #ddd;
            img {
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .dropdown-menu {
            position: absolute;
            left: -50px;
            top: 50px;
            background-color: #ffffff;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            width: 150px;
            border-radius: 7px;
            z-index: 100;
            ${mediaQueries("xxl")`            
              left: -91px;              
            `}
            ${mediaQueries("lg")`            
              left: 10px;              
            `}
            ul {
              list-style: none;
              display: flex;
              flex-direction: column;
              padding: 0;
              
              margin: 0;
              li {
                width: 100%;
                &:first-child .menu {
                border-radius: 7px 7px 0 0;
                }
                &:last-child .menu {
                  border-radius: 0 0 7px 7px;
                }
                .menu {
                  padding: 10px 15px;
                  text-decoration: none;
                  font-size: 16px;
                  color: #333;
                  height: 20px;
                  display: block;
                  font-weight: 600;
                  &:hover {
                    background-color: #ab19ff;
                    color: #f7f7f7;
                  }
                }
              }
            }
          }
        }
      }

      .has-submenu {
        position: relative;
        .submenu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: #fff;        
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          list-style: none;
          min-width: 130px;
          padding: 0;
          margin: 0;
          border-radius: 7px;
          li {
            width: 100%;
            color: #333;
            padding: 0px;
            &:first-child a {
                border-radius: 7px 7px 0 0;
            }
            &:last-child a {
              border-radius: 0 0 7px 7px; /* Bottom corners rounded */
            }
            a {
              padding: 10px 15px;
              text-decoration: none;
              font-size: 16px;
              color: #333;
              height: 20px;
              display: block;
              font-weight: 600;                                          
              &:hover {
                background-color: #ab19ff;
                color: #f7f7f7;
              }
            }
          }
        }
        &:hover {
          .submenu {
            display: block;
          }
        }
      }
    }
    .menu-icon {
      display: none;
      ${mediaQueries("lg")`
          width:32px;
          height:32px;
          display:block;
      `}
      img {
        width: 100%;
        height: 100%;
      }
    }
    .mobile-view {
      display: block;
      ${mediaQueries("lg")`
        display:none;        
      `}
    }
  }
`;
export const CommonPage = styled.div`
  position: relative;
  .container-common {
    max-width: 1520px;
    padding: 0px 15px;
    margin: 0 auto;
  }
  .banner-block {
    position: relative;
    height: 1000px;
    background: radial-gradient(circle, #311450, #070409);
    background-size: cover;
    background-size: 100%;
    background-position: center;
    ${mediaQueries("md")`
        height: 700px;
    `}
    &.diff-height {
      height: 130px;
      ${mediaQueries("md")`
        height: 100px;
    `}
    }
    .banner-block-inner {
      display: flex;
      justify-content: center;
      flex-direction: column;
      height: 100%;
      width: 65%;
      margin: 0 auto;
      ${mediaQueries("xl")`
          width: 76%;
      `}
      ${mediaQueries("lg")`
          width: 85%;
      `}
      ${mediaQueries("md")`
          width: 100%;  
          height: 83%;       
      `}
      h1 {
        font-size: 60px;
        line-height: 60px;
        font-weight: 700;
        color: #fff;
        margin: 0px 0px 30px;
        text-align: center;
        ${mediaQueries("lg")`
           font-size: 50px;
           line-height: 58px;
      `}
        ${mediaQueries("md")`
           font-size: 40px;
           line-height: 48px;
      `}
       ${mediaQueries("sm")`
          padding:0 20px;
      `}
      }
      p {
        font-size: 20px;
        line-height: 30px;
        color: #fff;
        margin: 0px;
        margin: 0 auto;
        text-align: center;
        font-weight: 400;
        ${mediaQueries("md")`         
          font-size: 18px;
          line-height: 26px;
          padding:0 20px;
      `}
      }
    }
  }
  .who-are-block {
    position: relative;
    margin-top: -185px;
    ${mediaQueries("md")`         
      margin-top: -120px;
    `}

    .who-are-block-inner {
      background-color: #fff;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0px 10px 20px 10px rgba(0, 0, 0, 0.04);
      ${mediaQueries("md")` 
          padding: 20px 10px;
          `}
      .title-common {
        position: relative;
        padding: 60px 0px 80px;
        ${mediaQueries("md")` 
          padding: 28px 0 30px;
          `}
          ${mediaQueries("md")` 
            padding: 24px 0 30px;
            `}
        /* z-index: 1; */
        h2 {
          -webkit-text-stroke: 1px rgba(52, 52, 52, 0.2);
          color: rgb(255, 255, 255);
          font-weight: 800;
          font-size: 120px;
          line-height: 130px;
          font-family: " Poppins";
          position: absolute;
          top: 0px;
          left: 0;
          right: 0;
          text-align: center;
          margin: 0px;
          top: 15px;
          ${mediaQueries("lg")`    
              font-size:100px;
              line-height: 110px;             
          `}
          ${mediaQueries("md")`    
              font-size:80px;
              line-height: 96px;
              top:0;
          `}
            ${mediaQueries("sm")`    
             font-size:20vw;
              line-height:70px; 
              top: 10px;
          `}
        }
        p {
          text-align: center;
          color: #b22bff;
          font-size: 40px;
          line-height: 40px;
          font-weight: 600;
          position: relative;
          /* z-index: 9; */
          margin: 0px;
          ${mediaQueries("md")`         
              font-size:30px;
              line-height: 36px;
          `}
        }
        .contact-us {
          ${mediaQueries("sm")`    
              font-size:45px;
              line-height:55px; 
              top: 16px;
          `}
        }
      }
      .discription-block-inner {
        display: block;
        p {
          font-size: 20px;
          line-height: 30px;
          color: rgba(51, 51, 51, 0.6);
          margin: 0px 0px 30px;
          text-align: center;
          ${mediaQueries("md")`         
            font-size:18px;
            line-height:26px;
          `}
          &:last-child {
            margin: 0px;
          }
        }
        h1 {
          color: #ab19ff;
        }
      }
      .contact-form {
        /* padding: 0px 150px; */
        max-width: 1140px;
        width: 100%;
        margin: 0 auto;
        .form-group {
          margin-bottom: 20px;
          input {
            height: 50px;
            border: 1px solid rgba(51, 51, 51, 0.2);
            padding: 0px 15px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 16px;
            color: rgba(51, 51, 51, 0.6);
            outline: none;
            box-shadow: none;
          }
          textarea {
            width: 100%;
            height: 100px;
            border: 1px solid rgba(51, 51, 51, 0.2);
            padding: 15px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 16px;
            color: rgba(51, 51, 51, 0.6);
            outline: none;
            box-shadow: none;
          }
        }
        .common-btn-div {
          margin-top: 10px;
          text-align: center;
          .common-btn {
            width: 150px;
            padding: 15px 5px;
            background-color: #ab19ff;
            border-radius: 25px;
            color: #f7f7f7;
            font-size: 20px;
            line-height: 20px;
            color: #f7f7f7;
            font-weight: 600;
            cursor: pointer;
            border: none;
            outline: none;
            box-shadow: inset 2px 2px 20px 2px rgba(255, 255, 255, 0.2),
              0px 0px 8px 2px rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
  }
  .what-we-are-block {
    padding: 44.5px 0px;
    position: relative;

    .what-we-are-block-inner {
      display: flex;
      margin: 0 -15px;
      .what-we-are-block-inner-left {
        padding: 0px 15px;
        .title-common {
          position: relative;
          padding: 55px 0px 80px;
          ${mediaQueries("md")` 
            padding: 26px 0 30px;
          `}
          h2 {
            -webkit-text-stroke: 1px rgba(52, 52, 52, 0.2);
            color: rgb(255, 255, 255);
            font-weight: 800;
            font-size: 120px;
            line-height: 120px;
            font-family: "Poppins";
            position: absolute;
            top: 0px;
            left: 0;
            right: 0;
            margin: 0px;
            top: 15px;
            text-align: center;
            ${mediaQueries("md")` 
              font-size:20vw;
              line-height: 96px;
              top: 0px;
          `}
            ${mediaQueries("sm")`    
              font-size:20vw;
              line-height:70px;
              top: 13px;           
          `}
          }
          .feature-title {
            color: #000;
            font-size: 40px;
            line-height: 40px;
            font-weight: 600;
            position: relative;
            z-index: 9;
            margin: 0px;
            ${mediaQueries("md")`         
              font-size:30px;
              line-height: 36px;
          `}
          }
          p {
            color: #b22bff;
            font-size: 40px;
            line-height: 40px;
            font-weight: 600;
            position: relative;
            text-align: center;
            /* z-index: 9; */
            margin: 0px;
          }
        }
        p {
          font-size: 20px;
          line-height: 30px;
          color: rgba(51, 51, 51, 0.6);
          margin: 0px;
          ${mediaQueries("md")`         
            font-size:18px;
            line-height: 26px;
            text-align:center;              
          `}
        }
      }
      .what-we-are-block-inner-right {
        width: 50%;
        padding: 0px 15px;
        &.full-width-block {
          width: 100%;
          .block-services {
            .block-services-left {
              width: 25%;
            }
          }
        }
        .block-services {
          display: flex;
          margin: 0px -15px;
          .block-services-left {
            width: 50%;
            padding: 0px 15px;
            .block-services-left-inner {
              background-color: #fff;
              border-radius: 20px;
              box-shadow: 0px 10px 20px 10px rgba(0, 0, 0, 0.04);
              .img-block {
                width: 100%;
                height: 200px;
                border-radius: 20px;
                > img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              h4 {
                margin: 0px;
                font-size: 26px;
                line-height: 30px;
                color: #333;
                margin-bottom: 15px;
              }
              p {
                font-size: 20px;
                line-height: 30px;
                color: rgba(51, 51, 51, 0.6);
                margin: 0px;
              }
              .img-content {
                padding: 20px;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .conatct-block {
    position: relative;
    height: 460px;
    background-image: url(/images/contact-form-img.svg) !important;    
    padding: 60px 0px;
    ${mediaQueries("xxl")`         
      margin-bottom: 80px;             
    `}
    ${mediaQueries("md")`         
      padding: 45px 0px;
    `}
    .title-common {
      position: relative;
      padding: 18px 0px 80px;
      ${mediaQueries("md")`         
          padding: 5PX 0px 90px;
      `}
      h2 {
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
        color: #2b232b;
        font-weight: 800;
        font-size: 120px;
        line-height: 120px;
        font-family: " Poppins";
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        margin: 0px;
        top: -20px;
        ${mediaQueries("md")`         
          font-size:20vw;
          line-height: 96px;   
          text-align: center;          
        `}
        ${mediaQueries("sm")`    
            font-size:20vw;
            line-height:70px;   
            top: -10px;          
          `}
      }
      p {
        color: #fff;
        font-size: 40px;
        line-height: 40px;
        font-weight: 600;
        position: relative;
        z-index: 9;
        margin: 0;
        ${mediaQueries("md")`         
            font-size:30px;
            line-height: 36px;
            text-align: center;
        `}
      }
    }
    .contact-form-block {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      .contact-form-block-inner {
        max-width: 740px;
        width: 100%;
        padding: 30px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 0px 10px 20px 10px rgba(0, 0, 0, 0.04);
        margin: 20px 0 0;
        ${mediaQueries("xxl")`         
          margin: 70px 0 0;             
        `}
        ${mediaQueries("lg")`         
          max-width:unset;        
        `}
        ${mediaQueries("md")`         
          margin: 20px 0 0; 
           padding:20px 10px;            
        `}
        h2 {
          margin: 0px;
          font-size: 26px;
          line-height: 30px;
          color: #b22bff;
          margin-bottom: 20px;
          text-align: center;
        }
        .form-group {
          margin-bottom: 20px;
          input {
            height: 50px;
            border: 1px solid rgba(51, 51, 51, 0.2);
            padding: 0 15px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 16px;
            color: rgba(51, 51, 51, 0.6);
            outline: none;
            box-shadow: none;
            width: 100%;
          }
          textarea {
            height: 100px;
            border: 1px solid rgba(51, 51, 51, 0.2);
            padding: 15px 15px;
            border-radius: 10px;
            font-size: 16px;
            line-height: 16px;
            font-family: 'Lato';
            font-weight: 400;
            color: rgba(51, 51, 51, 0.6);
            outline: none;
            box-shadow: none;
            width: 100%;
            /* ${mediaQueries("md")`         
             width: 94%;
            `}
            ${mediaQueries("sm")`         
             width: 90%;
            `} */
          }
        }
        .common-btn-div {
          margin-top: 10px;
          text-align: center;
          .common-btn {
            width: 150px;
            padding: 15px 5px;
            background-color: #ab19ff;
            border-radius: 25px;
            color: #f7f7f7;
            font-size: 20px;
            line-height: 20px;
            color: #f7f7f7;
            font-weight: 600;
            cursor: pointer;
            border: none;
            outline: none;
            box-shadow: inset 2px 2px 20px 2px rgba(255, 255, 255, 0.2),
              0px 0px 8px 2px rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
  }
  .play-android-block {
    // position: relative;
    // z-index: -1;
    padding: 120px 0px 80px;
    ${mediaQueries("md")`         
      padding:60px 0px 20px;
    `}
    &.pad-top-none {
      padding-top: 0px;
    }
    .play-android-block-inner {
      display: flex;      
      ${mediaQueries("md")`
        display: block;
        // padding: 0px 20px;
      `}
      .play-android-block-inner-left {
        max-width: 700px;
        width: 100%;
        
        ${mediaQueries("md")`
          width:unset;
          padding: 0 0 30px;
        `}
        h2 {
          margin: 0px 0px 25px;
          font-size: 40px;
          line-height: 55px;
          color: #ab19ff;
          ${mediaQueries("md")`
            font-size: 30px;
            line-height: 45px;
            text-align:center;
        `}
        }
        p {
          font-size: 20px;
          line-height: 30px;
          color: rgba(51, 51, 51, 0.6);
          margin: 0px;
          text-align: center;
        }
      }
      .play-android-block-inner-right {
        max-width: 700px;
        width: 100%;
        margin-left: auto;
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        ${mediaQueries("md")`
          flex-direction: column;
          width:100%;
          margin: 0 auto;
        `}
        a {
          display: block;
          margin: 0px 20px;
          max-width: 300px;
          width: 100%;
          margin: 0 auto 0;
          cursor: pointer;
          ${mediaQueries("xxl")`
              margin: 0px 20px 20px;
            `}
          ${mediaQueries("md")`
              margin: 0px 0 20px;
            `}
          img {
            width: 100%;
            height: 100%;
          }
        }       
      }
    }
  }
  .privacy-policy-block {
    min-height: calc(100vh - 324px);
    padding: 20px 0px;
    // ${mediaQueries("md")`
    //   min-height:unset;      
    // `}
    h1 {
      color: #ab19ff;
      font-size: 40px;
      line-height: 72px;
      margin: 0 0 40px;
      ${mediaQueries("md")`
       font-size: 35px;
       line-height: 48px;
       margin: 0 0 20px;
    `}
    }
    h3 {
      margin: 0px;
      font-size: 26px;
      line-height: 30px;
      color: #333;
      margin-bottom: 10px;
      ${mediaQueries("md")`
       font-size: 24px;
       line-height: 28px;
    `}
    }
    p {
      font-size: 20px;
      line-height: 30px;
      color: rgba(51, 51, 51, 0.6);
      margin: 0px 0px 15px;
      ${mediaQueries("md")`
       font-size: 18px;
       line-height: 26px;
    `}
    }
  }
  .term-policy-wapper{
    min-height: calc(100vh - 324px);

    max-width: 1520px;
    margin: auto;
    padding: 20px;
    p{
      font-size: 16px;      
      color: rgba(51, 51, 51, 0.6);
    }
    li {
      font-size: 16px;      
      color: rgba(51, 51, 51, 0.6);
    }
    strong{
        color:#000;
    }
    h2{
      font-size: 20px;
    }
    h3{
      font-size: 18px;
    }
  }
  .album-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
      font-size: 30px;
      color: #ab19ff;
      font-weight: 500;
    }
  }
  .add-album-btn{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;    
    button{
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: transparent;
      color: #ab19ff;
      padding: 10px 20px ;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid #ab19ff;
      font-size: 18px;
      img{
        width: 20px;
        height: 20px;
      }
    }
    
`;
export const Footer = styled.div`
  position: relative;
  background: radial-gradient(circle, #311450, #070409);
  .footer-top {
    padding: 40px 0px;
    .f-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      ${mediaQueries("md")`
         display: block;
      `}
      .f-logo {
        a {
          img {
            width: 200px;
          }
        }
      }
      ul {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 0;
        ${mediaQueries("xxl")`
          justify-content:center;
      `}
        li {
          padding: 0px 35px 0 0;
          list-style: none;
          &:last-child {
            padding: 0;
          }
          a {
            font-size: 20px;
            line-height: 20px;
            font-weight: 400;
            color: #fff;
            text-decoration: none;
            ${mediaQueries("md")`
              font-size: 18px;
              line-height: 22px;
            `}
          }
        }
      }
    }
  }
  .footer-bottom {
  padding: 25px 0;
  text-align: center;
  display: flex;
  gap:5px;
  justify-content: center;
  align-items: center;
  ${mediaQueries("xs")`
    flex-direction: column;
    gap:0px;
  `}

  p {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    ${mediaQueries("md")`
      font-size: 18px;
      line-height: 22px;
    `}
    a {
      color: #fff;
      text-decoration: none;
    }
  }
}  
`;

export const ProfileWapper = styled.div`
  max-width: 1520px;
  padding: 0px 15px;
  margin: 0 auto;
  .form-title {
    display: flex;
    justify-content: flex-end;

    img {
      width: 50px;
    }
  }
  .form-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .profile-img {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
      border-radius: 10px;
      object-fit: cover;
      border-radius: 100%;
      ${mediaQueries("md")` 
      width: 100px;
      height: 100px;
      `}
    }
    .form-group {
      margin-bottom: 20px;
      width: 50%;
      ${mediaQueries("md")` 
      width: 100%;
      `}
      input {
        height: 50px;
        border: 1px solid rgba(51, 51, 51, 0.2);
        padding: 0px 15px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 16px;
        color: rgba(51, 51, 51, 0.6);
        outline: none;
        box-shadow: none;
        width: 100%;
      }
    }
    .profile-info {
      p {
        display: flex;
      }
      strong {
        width: 130px;
        font-weight: 600;
      }
    }
  }  
`;

export const AddMusicWapper = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: auto;

  .form-div {
    max-width: 650px;
    margin: 0 auto;
    ${mediaQueries("md")`  
     padding:0 20px;
    `}
  }
  .form-group {
    margin: 1rem 0;
  }
  .wrap-title{    
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 70px);
    font-size: 16px;
    margin: 0;
    display: block;
    flex: 1;      
  }

  .input-field,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 8px;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    outline: none;
    transition: border 0.3s;

    &:focus {
      border-color: #6a0dad;
    }
  }
  .input-with-symbol {
    display: flex;
    align-items: center;
    position: relative;
    .input-field {
      padding-left: 25px;
      width: 100%;
    }
  }
  .currency-symbol {
    position: absolute;
    left: 10px;
    font-size: 16px;
    color: #555;
  }
  .select-field {
    display: flex;
    flex-direction: column;
    width: 70%;
    margin-right: 20px;
    ${mediaQueries("sm")`
      width: 100%;
    `}
  }
  .select-music {
    display: flex;
    ${mediaQueries("sm")` 
      flex-direction: column-reverse;
    `}
    .preview-label {
      display: flex;
      padding: 0.8rem;
      flex-direction: column;
      width: 70%;
      margin-right: 20px;
      border-radius: 8px;
      font-family: "Lato", sans-serif;
      font-size: 16px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      ${mediaQueries("sm")`
        width:100%;
      `}
    }
  }
  .custom-select {
    max-height: 50px !important;
    overflow-y: auto;
  }
  .play-selcted-btn {
    font-size: 0.9rem;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.2rem 0.5rem;
    border: none;
    border-radius: 5px;
    color: #ab19ff;
    cursor: pointer;
    margin-top: 50px;  
  }

  textarea {
    height: 100px;
    resize: none;
  }
  .radio-group {
    display: flex;
    gap: 1rem;
    margin: 1rem 0;
    justify-content: center;
    align-items: center;
    ${mediaQueries("md")`
      justify-content: flex-start;
    `}
    label {
      display: flex;
      font-size: 1rem;
      color: #333;

      input[type="radio"] {
        margin-right: 0.5rem;
      }
    }
  }
  .file-upload {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    ${mediaQueries("sm")`
      display:block;
     `}
    .upload-main-div {
      display: flex;
      flex-direction: column;
      width: 50%;
      ${mediaQueries("sm")`
       width: 100%;
       margin-bottom:15px;
     `}
      .upload-box {
        height: 100px;
        border: 2px dashed #ddd;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        font-size: 0.9rem;
        cursor: pointer;
        transition: border 0.3s;
        ${mediaQueries("md")` 
        
        `}
        &:hover {
          border-color: #6a0dad;
        }
      }
    }
    .file-info {
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.5rem;
      text-align: center;
    }
  }
  .duration-time {
    width: 95%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 8px;
    font-family: "Lato", sans-serif;
    font-size: 16px;
    margin-right: 20px;
    outline: none;
    transition: border 0.3s;
    &:focus {
      border-color: #ddd;
    }
  }
`;

export const ButtonDiv = styled.div`
  margin-top: 10px;
  text-align: center;
  .common-btn {
    width: 150px;
    padding: 15px 5px;
    background-color: #ab19ff;
    border-radius: 25px;
    color: #f7f7f7;
    font-size: 20px;
    line-height: 20px;
    color: #f7f7f7;
    font-weight: 600;
    cursor: pointer;
    border: none;
    outline: none;
    box-shadow: inset 2px 2px 20px 2px rgba(255, 255, 255, 0.2),
      0px 0px 8px 2px rgba(255, 255, 255, 0.2);
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45vh;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #3498db;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const MusicList = styled.div`
  max-width: 1520px;
  padding: 0px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .music-card-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
     ${mediaQueries("md")`     
     justify-content: center;
    `} 
  }

  .music-card {
    max-width: 335px;
    width: 100%;
    background: #fff;
    border-radius: 15px;
    padding: 1rem;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    ${mediaQueries("lg")`
      max-width: 325px;
    `}
    ${mediaQueries("md")`
      max-width: 232px;
    `}
    ${mediaQueries("md")`
        max-width:unset;
    `}
    .image-container {
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
          font-size: 1.2rem;
          margin: 0;
          margin-right: 20px;
          color: #222;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tag {
          font-size: 0.9rem;
          color: #666;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .likes {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          span {
            display: flex;
            gap: 5px;
            font-size: 0.9rem;
          }         
        }
        .item-title{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          font-size: 16px;
          margin: 0px;
        }
        .duration {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          span {
            font-size: 0.9rem;
          }
          .play-button {
            background: transparent;
            color: #fff;
            border: none;
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: 0.3s;
            img {
              width: 30px;
              height: 30px;
            }
          }
        }
      }
    }
    .delete-btn {
      background-color: transparent;
      border: none;
      margin-left: 5px;
      cursor: pointer;
      img {
        width: 18px;
      }
    }
    .plus-btn{
      background-color: transparent;
      border: none;
      margin-left: 5px;
      cursor: pointer;
      img {
        width: 25px;
      }
    }
  }
  .no-data{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:auto !important;
    min-height: calc(100vh - 324px);    
  }
`;

export const MusicHistory = styled.div`
  max-width: 1520px;
  padding: 0 15px;
  margin: 0 auto;
  .album-name{
    display: flex;
    align-items: center;    
    margin-bottom: 20px;
    button{
      background-color: transparent;
      border: none;
      cursor: pointer;
      img{
        width: 40px;
      }
    }
  }
  .music-card-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #fff;
    margin: 0 100px;
    ${mediaQueries("lg")`
       margin: 0 50px;
    `}
    ${mediaQueries("md")`
       margin: 0;
    `}
  }

  .music-card {
    /* width: 100%; */
    background: #fff;
    border-radius: 15px;
    padding: 1rem;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1.5rem;
    ${mediaQueries("sm")`
        display: block;
    `}
    .image-container {
      border-radius: 10px;
      overflow: hidden;
      width: 200px;
      height: 150px;

      ${mediaQueries("sm")`
        margin-bottom:20px;
        width: 100%;
        height: 250px;
      `}
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .content {
      display: flex;
      width: 100%;
      justify-content: space-between;
      flex-direction: column;
      ${mediaQueries("md")`
         justify-content: flex-start;
    `}
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${mediaQueries("md")`
           display:block;
           margin-bottom:10px;
       `}

        p {
          margin-bottom: 0px;
          margin-right: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        h3 {
          font-size: 20px;
          line-height: 24px;
          margin: 0;
          color: #222;
          margin-bottom: 10px;
          ${mediaQueries("md")`
            font-size: 18px;
            line-height:22px;
            margin-bottom:15px;
          `}
        }

        .tag {
          font-size: 0.9rem;
          background: rgba(0, 0, 0, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: 5px;
          color: #ab19ff;
          ${mediaQueries("md")`            
            width:135px;
            display:block;
            margin-bottom:15px;
          `}
        }
        .amount {
          font-size: 20px;
          color: #666;
        }
      }

      .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${mediaQueries("md")`
          display:block;
        `}
        .likes {
          display: flex;
          align-items: center;
          gap: 10px;

          span {
            font-size: 18px;
            display: flex;
            gap: 5px;            
          }
          img {
            width: 28px;
            height: 28px;
          }
          .amount {
            background-color: #ab19ff;
            padding: 5px 20px;
            border-radius: 10px;
            color: white;
          }
        }
        .play-button {
          background: transparent;
          border: none;
          cursor: pointer;
          img {
            width: 30px;
            height: 30px;
          }
        }
        p {
          margin-bottom: 0px;
          min-width:250px;
            ${mediaQueries("lg")`
          min-width:auto;
        `}
        }
       .date-text{
          text-align:end;
           ${mediaQueries("md")`
           text-align:start;
        `}
        }
        .user-details {
          display: flex;
          align-items: center;          
          gap: 0.5rem;
          ${mediaQueries("md")`
            margin-bottom:20px;
          `}
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            flex-shrink: 0;
          }
          span{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
            font-size: 16px;
            margin: 0;
            display: block;            
            min-width: 0;
            ${mediaQueries("lg")`
              max-width: 200px;
            `}
            ${mediaQueries("md")`
              max-width: 150px;
            `}
            ${mediaQueries("sm")`
              max-width: 100%;
            `}
          }
          p{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
            font-size: 16px;
            margin: 0;
            display: block;            
            min-width: 0;
            ${mediaQueries("lg")`
              max-width: 200px;
            `}
            ${mediaQueries("md")`
              max-width: 150px;
            `}
            ${mediaQueries("sm")`
              max-width: 100%;
            `}
          }
        }
      }
    }
  }
  .no-data{
    display: flex;
    align-items: center;
    justify-content: center;
    margin:auto !important;        
  }
  .wallet{
    min-height: calc(100vh - 600px);
  }
  .purchase{
    min-height: calc(100vh - 344px);
  }
`;