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
import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";
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
  const handleClose = () => setAlertValue(0);
  const playerRef = useRef<Player>(null);
  const ICON = require("./icons/success.json");
  useEffect(() => {
    if (alertValue === 200) {
      playerRef.current?.play();
    }
  }, [alertValue]);
  return (
    <>
      <Dialog
        open={alertValue >= 200 && alertValue < 300}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box display="flex" justifyContent="center">
          <Player ref={playerRef} size={150} icon={ICON} />
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Form başarıyla gönderildi.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setAlertValue(0);
              window.location.reload();
            }}
          >
            Yeni oluştur
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Devam et
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setAlertValue(0);
              window.history.back();
            }}
          >
            Geri dön
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={alertValue >= 400 && alertValue < 600}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"HATA!"}
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Clear />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Formu gönderirken bir hata oluştu.
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Verilerinizi kontrol edip tekrar deneyin.
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
            Düzenle
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
              Formu kapat
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};
