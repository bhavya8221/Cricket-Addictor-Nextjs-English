import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import styles from "./login.module.scss"
import Fb from "../../public/Images/fbicon.png";
import Google from "../../public/Images/googleicon.png";
import { facebookLoginAPI, googleLoginAPI, loginAPI } from '../../Constants/Api/Api';
import Image from 'next/image';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
const Login = () => {
    const router = useRouter()
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userResponse, SetUserResponse] = useState(false);
    const [agree, setAgree] = useState(false);
    const checkboxHandler = () => {
        setAgree(!agree);
    };
    const handleSubmit = () => {
        if (!agree) {
            setShowAlert(true);
            setAlertConfig({
                text: "Please agree to the terms and conditions to submit the form.",
                type: 'info'
            });
            setTimeout(() => {
                setShowAlert(false);
            }, 7000);
            return;
        }
        loginAPI(email, password)
            .then((res) => {
                localStorage.setItem(
                    "authTokenRefreshLogin",
                    res.data.data.tokens.refresh.token
                );
                localStorage.setItem(
                    "authTokenAccessLogin",
                    res.data.data.tokens.access.token
                );
                window.location.href = "/";
            })
            .catch((res) => {
                setShowAlert(true);
                setAlertConfig({
                    type:
                        res.message === "Request failed with status code 400"
                            ? "info"
                            : "warning",
                    text:
                        res.message === "Request failed with status code 400"
                            ? "Check your email and verified first."
                            : res.response.data.code === 500
                                ? "Please Enter Required Fields"
                                : res.response.data.message,
                });

                setTimeout(() => {
                    setShowAlert(false);
                }, 7000);
            });
    };
    const loginGooglenew = useGoogleLogin({
        onSuccess: async (respose) => {
            try {
                const res = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    {
                        headers: {
                            Authorization: `Bearer ${respose.access_token}`,
                        },
                    }
                );
                SetUserResponse(res.data);
            } catch (err) {
                console.log(err)

            }
        },
    });

    const responseFacebook = (response) => {
        SetUserResponse(response);
    };

    const componentClicked = (data) => {
    };


    useEffect(() => {

        if (userResponse !== undefined)
            googleLoginAPI(
                userResponse.name,
                userResponse.email,
                userResponse.given_name,
                userResponse.family_name,
                userResponse.picture,
                ""
            )
                .then((res) => {

                    localStorage.setItem(
                        "authTokenRefreshLogin",
                        res.data.data.tokens.refresh.token
                    );
                    localStorage.setItem(
                        "authTokenAccessLogin",
                        res.data.data.tokens.access.token
                    );
                    window.location.href = "/";
                })
                .catch((e) => {
                    console.log(e)
                });
        facebookLoginAPI(
            userResponse.name,
            userResponse.email === undefined ? "" : userResponse.email,
            userResponse.userID
        )
            .then((res) => {
                localStorage.setItem(
                    "authTokenRefreshLogin",
                    res.data.data.tokens.refresh.token
                );
                localStorage.setItem(
                    "authTokenAccessLogin",
                    res.data.data.tokens.access.token
                );
                window.location.href = "/";
            })
            .catch((e) => {
                console.log(e)
            });
    }, [userResponse]);



    return (

        <>
            {showAlert && (
                <DescriptionAlerts text={alertConfig.text} type={alertConfig.type} />
            )}
            <div className={styles.login_form}>
                <div className={styles.login_form_container}>
                    <Form>
                        <Form.Group className={styles.input_field}>
                            <Form.Control
                                type="email"
                                placeholder="Email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className={styles.input_field}>
                            <Form.Control
                                type="password"
                                placeholder="Password*"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className={styles.input_field_remember} onChange={checkboxHandler}>
                            <Form.Check type="checkbox" label=" Remember me" />
                        </Form.Group>
                        <Button
                            className={styles.login_form_button}
                            size="sm"
                            onClick={() => {
                                handleSubmit();
                            }}
                            disabled={!email || !password}
                        >
                            <h6>Login</h6>
                        </Button>
                    </Form>
                    <h6 className={styles.forgot}>
                        <Link href="/forgot/" className={styles.link}>
                            Forgot password?
                        </Link>
                    </h6>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        className={styles.continue_with}
                    >
                        <div className={styles.linediv1} />

                        <div>
                            <p
                                className={styles.continue}
                                style={{ textAlign: "center", margin: 0 }}
                            >
                                Or Continue with
                            </p>
                        </div>

                        <div className={styles.linediv2} />
                    </div>

                    <div className={styles.social_icon}>
                        {router.asPath === "/login/" ? (
                            <>
                                {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  SetUserResponse(decoded);
                }}
                onError={() => {}}
              /> */}
                                <Image
                                    src={Google}
                                    className={styles.googleIcon}
                                    alt="google"
                                    width={10}
                                    height={10}
                                    onClick={() => loginGooglenew()}
                                />

                                <FacebookLogin
                                    appId="910141450305671"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    onClick={componentClicked}
                                    render={(renderProps) => (
                                        <Image
                                            src={Fb}
                                            onClick={renderProps.onClick}
                                            className={styles.fbIcon}
                                            alt="facebook"
                                            width={10}
                                            height={10}
                                        />
                                    )}
                                />
                            </>
                        ) : null}
                    </div>

                    <div className={styles.login_form_bottom}>
                        <h5>i’m a new user.&nbsp;</h5>
                        <h5>
                            <Link href="/signup/" className={styles.linksignUp}>
                                Sign Up
                            </Link>
                        </h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login