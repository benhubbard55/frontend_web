import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ProtectedPageService = () => {
  const router = useRouter();
  const path = router.asPath;

  const userAuth = useSelector((state) => state?.persistedReducer?.user?.auth);
  const userData = useSelector((state) => state?.persistedReducer?.user);

  const afterLoginNotAccessiblePages = ["/login", "/register"];
  const protectedPagesForSpecificUser = [
    "/walletHistory",
    "/music/uploadMusic",
    "/profile/details",
    "/profile/updateProfile",
    "/purchaseHistory",
    "/music/myMusic"
  ];

  useEffect(() => {
    // if (afterLoginNotAccessiblePages.includes(path) && userAuth) {
    //   let dashboard_url = "/";
    //   router.push(dashboard_url);
    // }
    if (path == "/home") {
      router.push("/");
    }
    let isProtectedPath = false;
    protectedPagesForSpecificUser.forEach((pattern) => {
      if ((pattern instanceof RegExp && pattern.test(path)) || path === pattern) {
        isProtectedPath = true;
      }
    });
    if (isProtectedPath && !userAuth) {
      router.push("/");
    }
  }, [userAuth, path, userData, router]);

  return null;
};

export default ProtectedPageService;
