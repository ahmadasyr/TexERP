import { Clear } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

interface FormModalProps {
  alertValue: number;
  setAlertValue: React.Dispatch<React.SetStateAction<number>>;
  isPopup?: boolean;
}

export const FormModal: React.FC<FormModalProps> = ({
  alertValue,
  setAlertValue,
  isPopup,
}) => {
  useEffect(() => {
    console.log("change");
  }, [alertValue]);

  const handleClose = () => setAlertValue(0);

  return (
    <>
      <Dialog
        open={alertValue === 200}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Form submitted successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Continue
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setAlertValue(0);
              window.history.back();
            }}
          >
            Go Back
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertValue === 500}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Error"}
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Clear />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There was an error submitting the form.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setAlertValue(0);
            }}
          >
            Edit
          </Button>
          {!isPopup ? (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                setAlertValue(0);

                window.history.back();
              }}
            >
              Go Back
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};
