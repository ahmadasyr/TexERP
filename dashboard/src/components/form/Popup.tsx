import React from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import PopupForms from "./popupForms";
import { Clear } from "@mui/icons-material";
interface PopupProps {
  open: boolean;
  table: string;
  togglePopup: (table: string, column: string, on: boolean) => void;
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
}

const Popup: React.FC<PopupProps> = ({
  open,
  table,
  togglePopup,
  popupHandler,
  popupSetter,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => togglePopup("", "", false)}
      aria-labelledby="popup-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <IconButton
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onClick={() => togglePopup("", "", false)}
        >
          <Clear />
        </IconButton>
        <Box mt={2}>
          <PopupForms
            parsedString={table}
            popupHandler={popupHandler}
            popupSetter={popupSetter}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default Popup;
