import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Stack } from "@mui/material";

export default function DescriptionAlerts({ type, text }) {
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;

  // const handleClick = (newState) => () => {
  //   setState({ open: true, ...newState });
  // };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
      {/* {buttons} */}
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        message={type}
        onClose={handleClose}
      /> */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={6000}
          onClose={handleClose}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
            {text}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
