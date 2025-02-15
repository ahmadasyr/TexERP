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
  handleChange?: any;
  formData?: any;
}

export const FormModal: React.FC<FormModalProps> = ({
  alertValue,
  setAlertValue,
  isPopup,
  handleChange,
  formData,
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
          {!isPopup ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setAlertValue(0);

                window.history.back();
              }}
            >
              Formdan Çık
            </Button>
          ) : null}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setAlertValue(0);
            }}
          >
            Düzenle
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alertValue == -1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Formu Sıfırlamak İstediğinizden Emin misiniz?"}
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Clear />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Formu sıfırlamak istediğinizden emin misiniz? Bu işlem geri
            alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setAlertValue(0);
              Object.keys(formData).forEach((key) => {
                handleChange({
                  target: { name: key, value: "" },
                } as React.ChangeEvent<{ name: string; value: any }>);
              });
            }}
          >
            Evet
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Hayır
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={alertValue == -2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Formu Geri Almak İstediğinizden Emin misiniz?"}
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Clear />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Formu geri almak istediğinizden emin misiniz? Bu işlem geri
            alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              setAlertValue(0);
              const data = JSON.parse(
                localStorage.getItem(window.location.pathname) || "{}"
              );
              Object.keys(data).forEach((key) => {
                handleChange({
                  target: { name: key, value: data[key] },
                } as React.ChangeEvent<{ name: string; value: any }>);
              });
            }}
          >
            Evet
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Hayır
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
