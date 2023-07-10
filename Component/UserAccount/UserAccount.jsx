import React from "react";
import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
import background from "../../public/Images/usersign.png";
import player from "../../public/Images/userPlayer.png";
import styles from "./UserAccount.module.scss";
import { useEffect } from "react";
import HOST from "../../Constants/host";
import { useRouter } from "next/router";
import Link from "next/link";
import Login from "./Login";
import ForgotPassword from "./Forgot/forgotPassword"
import SignUp from "./SignUp";
import Image from "next/image";

const UserAccount = (props) => {
  const router = useRouter()
  const navigate = router.replace

  const [userAccount, setuserAccount] = useState("login");
  const pathname = router.asPath

  function handleOnClickLogin() {
    setuserAccount("login");
  }
  function handleOnClickSignUp() {
    setuserAccount("signUp");
  }
  useEffect(() => {
    if (pathname === "/login/") {
      setuserAccount("login");
    }
    if (pathname === "/signup/") {
      setuserAccount("signUp");
    }
  }, [pathname]);

  return (
    <>
      {/* Desktop View */}
      <div className={styles.userAccount_desktop}>
        <div className={styles.userAccount_background}>
          <div className={styles.background}>
            <Image
              src={background}
              alt="backgound"
              // height={800}

              // width={500}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className={styles.form}>
            <div className={styles.welcome}>
              {pathname === "/forgot/" ? (
                <div>
                  <h1>Forgot Password?</h1>
                  <h2>Enter Your details to reset</h2>
                </div>
              ) : userAccount === "login" ? (
                <div>
                  <h1>Welcome,</h1>
                  <h2>login to continue!</h2>
                </div>
              ) : (
                <div>
                  <h1>Create Account,</h1>
                  <h2>Sign up to get started!</h2>
                </div>
              )}

              <div className={styles.form_component}>
                <div>
                  <div className={styles.LoginSign_Button}>
                    <div
                      className={styles.Loginbutton}
                      style={{
                        backgroundColor:
                          userAccount === "login" && pathname !== "/forgot/"
                            ? "var(--primary)"
                            : "#d9d9d9",
                      }}
                      onClick={() => {
                        navigate("/login/");
                        handleOnClickLogin();
                      }}
                    >
                      <h4>Login</h4>
                    </div>
                    <div
                      className={styles.SignUpbutton}
                      style={{
                        backgroundColor:
                          userAccount === "signUp" || pathname === "/forgot/"
                            ? "var(--primary)"
                            : "#d9d9d9",
                      }}
                      onClick={() => {
                        navigate("/signup/");
                        handleOnClickSignUp();
                      }}
                    >
                      <h4>Sign Up</h4>
                    </div>
                  </div>
                  {pathname === "/forgot/" ? (
                    <ForgotPassword />
                  ) : userAccount === "login" ? (
                    <Login />
                  ) : (
                    <SignUp />
                  )}
                </div>
              </div>
              <div className={styles.copyright}>
                <h5>
                  © 2023 &nbsp;
                  <Link
                    href={`${HOST}`}
                    target="_blank"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    www.cricketaddictor.com
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className={styles.mobileView}>
        <div className={styles.mobileView_login}>
      
          <Image src={player} className={styles.playerimg} alt="playerImage" />
          <div className={styles.mobileView_login_container}>
            <div className={styles.mobileView_login_left}>
              <div className={styles.main_login_button}>
                <div
                  className={styles.Login_Button}
                  style={{
                    backgroundColor:
                      userAccount === "login" && pathname !== "/forgot/"
                        ? "var(--primary)"
                        : null,
                  }}
                  onClick={() => {
                    navigate("/login/");
                    handleOnClickLogin();
                  }}
                >
                  <h5>Login</h5>
                </div>
                {userAccount === "login" && pathname !== "/forgot/" ? (
                  <div id="arrow4" className={styles.arrow}>
                    <div></div>
                  </div>
                ) : null}
              </div>
              <div className={styles.main_signup_button}>
                <div
                  className={styles.SignUp_Button}
                  style={{
                    backgroundColor:
                      userAccount === "signUp" || pathname === "/forgo/t"
                        ? "var(--primary)"
                        : null,
                  }}
                  onClick={() => {
                    navigate("/signup/");
                    handleOnClickSignUp();
                  }}
                >
                  <h5>Sign Up</h5>
                </div>
                {userAccount === "signUp" || pathname === "/forgot" ? (
                  <div id="arrow4" className={styles.arrow}>
                    <div></div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={styles.mobileView_login_right}>
              <div className={styles.top}>
                <div className={styles.header}>
                  <div className={styles.greeting}>
                    {pathname === "/forgot/" ? (
                      <>
                        <h3>Forgot Password?</h3>
                        <h4>Enter Your details to reset</h4>
                      </>
                    ) : userAccount === "login" ? (
                      <>
                        <h3>Welcome,</h3>
                        <h4>Login to continue!</h4>
                      </>
                    ) : (
                      <>
                        <h3>Create Account,</h3>
                        <h4>Sign up to get started!</h4>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.center_box}>
                  {pathname === "/forgot/" ? (
                    <ForgotPassword />
                  ) : userAccount === "login" ? (
                    <Login />
                  ) : (
                    <SignUp />
                  )}
                </div>
              </div>
              <div className={styles.footer}>
                <h6>
                  © 2023 &nbsp;
                  <Link
                    href={`${HOST}`}
                    target="_blank"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    www.oncricket.com
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
