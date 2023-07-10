import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import styles from "./login.module.scss"
import { loginAPI } from '../../Constants/Api/Api';
const Login = () => {

    const router = useRouter()
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
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

                // console.log("error", res.response.data.message);
            });
    };
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
                        <Form.Group className={styles.input_field_remember}>
                            <Form.Check type="checkbox" label="Remember me" />
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
                                {/* <img
                src={Google}
                className={styles.googleIcon}
                alt="google"
                onClick={() => loginGooglenew()}
              /> */}

                                {/* <FacebookLogin
                appId="910141450305671"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                onClick={componentClicked}
                render={(renderProps) => (
                  <img
                    src={Fb}
                    onClick={renderProps.onClick}
                    className={styles.fbIcon}
                    alt="facebook"
                  />
                )}
              /> */}
                            </>
                        ) : null}
                        {/* <img src={Fb} className={styles.fbIcon} alt="facebook" /> */}
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