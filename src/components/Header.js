import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Header as StyledHeader } from "@/styles/common.style";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { customerLoginSet, logoutSet } from "../../redux/reducers/slice/authSlice";
import io from "./clientIo";
import BlockModel from "./Model";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const menuRef = useRef();
  const userData = useSelector(
    (state) => state?.persistedReducer?.user?.userData
  );
  const userAuth = useSelector(
    (state) => state?.persistedReducer?.user
  );

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (userData?.id) {
      dispatch(logoutSet());
      router.push("/home");
    }
  };

  const [showCommonModel, setShowCommonModel] = useState(false);

  const handleCommonModel = () => {
    if (showCommonModel) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
    setShowCommonModel(!showCommonModel);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (userAuth?.token) {
      io.sails.headers = {
        Authorization: `Bearer ${userAuth?.token || ""}`,
      };
      const socket = io.sails.connect(process.env.NEXT_PUBLIC_HOST_API);
      socket.on('connect', () => {
        console.log('Socket connected successfully');
        socket.get(
          `/api/v1/all-user/chat/subscribe-user`,
          {
            headers: {
              Authorization: `Bearer ${userAuth?.token}`,
            },
          },
          function (resData, jwRes) {
            if (resData?.isBlockUser) {
              setIsBlocked(true);
            }
          }
        );
      });

      socket.on('connect_error', (error) => {
        console.error('Socket connection failed:', error);
      });

      socket.on('user', (data) => {
        if (data?.action == "userProfile") {
          if (data?.data?.userData) {
            dispatch(
              customerLoginSet({
                token: userAuth?.token,
                data: {
                  ...userAuth.userData,
                  ...data?.data?.userData,
                },
              })
            );
          }
        }
        if (data?.action === "userStatus" && data?.data?.userBlock) {
          setIsBlocked(true);
        }
      });
    }
  }, [userAuth?.token]);

  return (
    <StyledHeader>
      <div className="header-inner">
        <div className="header-left">
          <a href="/">
            <img src="../../../images/logo.svg" alt="Logo"></img>
          </a>
        </div>
        <div className={`header-right ${showCommonModel ? "" : "mobile-view"}`}>
          <ul>
            <li>
              <Link className={pathname === "/" ? "active" : ""} href="/">
                Home
              </Link>
            </li>
            {userData?.id && (
              <>
                <li className="has-submenu">
                  <Link
                    className={pathname?.startsWith("/music") ? "active" : ""}
                    href="#"
                  >
                    Music
                  </Link>
                  <ul className="submenu">
                    <li>
                      <Link href="/music/myMusic">My Music</Link>
                    </li>
                    <li>
                      <Link href="/music/uploadMusic">Music Upload</Link>
                    </li>
                    <li>
                      <Link href="/music/album">My Album</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    className={pathname === "/purchaseHistory" ? "active" : ""}
                    href="/purchaseHistory"
                  >
                    Purchase History
                  </Link>
                </li>
                <li>
                  <Link
                    className={pathname === "/walletHistory" ? "active" : ""}
                    href="/walletHistory"
                  >
                    Wallet History
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                className={pathname === "/about" ? "active" : ""}
                href="/about"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                className={pathname === "/contact" ? "active" : ""}
                href="/contact"
              >
                Contact Us
              </Link>
            </li>
            {!userData?.id && (
              <li>
                <Link href="/register">
                  <button className="common-btn">Register</button>
                </Link>
                <Link href="/login">
                  <button className="common-btn">Login</button>
                </Link>
              </li>
            )}
            {userData?.id && (
              <li className="profile-menu" ref={menuRef}>
                <div className="profile-image" onClick={toggleMenu}>
                  <img
                    src={userData?.profileImage || "/images/profile-icon.svg"}
                    alt="Profile"
                    className="profile-img"
                  />
                </div>
                {menuOpen && (
                  <div className="dropdown-menu">
                    <ul>
                      <li>
                        <Link className="menu" href="/profile/updateProfile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <div onClick={handleLogout} className="menu">
                          Logout
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
        <a className="menu-icon" href="#" onClick={handleCommonModel}>
          <img src="/images/menu-icon.svg" alt="menu-icon" />
        </a>
      </div>
      {isBlocked && <BlockModel onClose={() => setIsBlocked(false)} />}
    </StyledHeader>
  );
};

export default Header;
