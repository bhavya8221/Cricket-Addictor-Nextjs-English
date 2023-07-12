import * as React from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendOtp from "./SendOtp";
import VerifyOtp from "./VerifyOtp";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { Button } from "react-bootstrap";
import styles from "./Forgot.module.scss";
// import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {
  OtpSendAPI,
  ResetPasswordAPI,
  VerifyOtpAPI,
} from "../../../Constants/Api/Api";
import DescriptionAlerts from "../../../Common/alert/alert";
import Link from "next/link";
import { useRouter } from "next/router";
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function ForgotPassword() {
  const router = useRouter()
  const navigate = router.replace
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = useState({
    username: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    text: "",
  });
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ?
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleVerifyOTP = () => {
    VerifyOtpAPI(formData.username, formData.otp)
      .then((res) => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: "type password",
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      })
      .catch((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: res.response.data.code === 404 ? "warning" : "info",
          text: res.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      });
  };
  const handleChangePassword = () => {
    ResetPasswordAPI(
      formData.username,
      formData.otp,
      formData.password,
      formData.confirmPassword
    )
      .then((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: res.data.message,
        });

        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
        navigate("/login")
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertConfig({
          type: "warning",
          text: error.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      });
  };
  const handleSendOTP = () => {
    OtpSendAPI(formData.username)
      .then((res) => {
        setShowAlert(true);
        setAlertConfig({
          type: "info",
          text: res.data.message,
        });

        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertConfig({
          type: error.response.data.code === 404 ? "warning" : "info",
          text: error.response.data.message,
        });
        setTimeout(() => {
          setShowAlert(false);
        }, 7000);
      });
  };
  return (
    <div className="forgot_form">
      {showAlert && (
        <DescriptionAlerts text={alertConfig.text} type={alertConfig.type} />
      )}
      {allStepsCompleted() ? (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
            {activeStep === 0 && (
              <SendOtp formData={formData} setFormData={setFormData} />
            )}

            {activeStep === 1 && (
              <VerifyOtp formData={formData} setFormData={setFormData} />
            )}
            {activeStep === 2 && (
              <ChangePassword formData={formData} setFormData={setFormData} />
            )}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />

            <>
              {completedSteps() === totalSteps() - 3 ? (
                <Button
                  onClick={handleSendOTP}
                  className={styles.forgot_form_button}
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  disabled={!formData.username}
                >
                  Proceed
                </Button>
              ) : completedSteps() === totalSteps() - 2 ? (
                <Button
                  onClick={handleVerifyOTP}
                  className={styles.forgot_form_button}
                  style={{ marginLeft: "20px", marginRight: "20px" }}

                  disabled={!formData.otp}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleChangePassword}
                  className={styles.forgot_form_button}
                  style={{ marginLeft: "20px", marginRight: "20px" }}

                  disabled={!formData.password || !formData.confirmPassword}
                >
                  Login
                </Button>
              )}
            </>
          </Box>
          <div className={styles.forgot_form_bottom}>
            <h5>Already have an Account.</h5>
            <h5>
              <Link href="/login/" className={styles.link}>
                Sign In
              </Link>
            </h5>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
