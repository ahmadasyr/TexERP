import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import exp from "constants";
import { useEffect } from "react";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const FormModal = (
  alertValue: number,
  setAlertValue: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    console.log("change");
  }, [alertValue]);
  return (
    <>
      <Modal
        open={alertValue === 200}
        onClose={() => setAlertValue(0)}
        aria-labelledby="alert-modal-title"
        aria-describedby="alert-modal-description"
      >
        <div
          style={{
            padding: 20,
            backgroundColor: "white",
            margin: "auto",
            maxWidth: 400,
          }}
        >
          <Typography id="alert-modal-title" variant="h6" component="h2">
            {alertValue === 200 ? "Success" : "Error"}
          </Typography>
          <Typography id="alert-modal-description" sx={{ mt: 2 }}>
            Form submitted successfully!
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAlertValue(0);
                  window.location.reload();
                }}
              >
                Create New
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setAlertValue(0)}
              >
                Continue
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => {
                  setAlertValue(0);
                  window.history.back();
                }}
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
      <Modal
        open={alertValue === 500}
        onClose={() => setAlertValue(0)}
        aria-labelledby="alert-modal-title"
        aria-describedby="alert-modal-description"
      >
        <Box sx={style}>
          <Typography id="alert-modal-title" variant="h6" component="h2">
            {alertValue === 200 ? "Success" : "Error"}
          </Typography>
          <Typography id="alert-modal-description" sx={{ mt: 2 }}>
            {alertValue === 200
              ? "Form submitted successfully!"
              : "There was an error submitting the form."}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setAlertValue(0);
                  window.location.reload();
                }}
              >
                Create New
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setAlertValue(0)}
              >
                Continue
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                onClick={() => {
                  setAlertValue(0);
                  window.history.back();
                }}
              >
                Go Back
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
