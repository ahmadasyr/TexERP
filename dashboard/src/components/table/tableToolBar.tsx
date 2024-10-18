import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { handleDelete } from "./utils";

interface TableToolbarProps {
  numSelected: number;
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  tableName: string;
  selected: any[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TableToolbar: React.FC<TableToolbarProps> = ({
  numSelected,
  tableName,
  selected,
  setSelected,
  setRefresh,
  refresh,
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  interface DeleteResult {
    message: string;
    code: number;
    failed: number[];
  }

  const [deleteResult, setDeleteResult] = useState<DeleteResult>({
    message: "",
    code: 0,
    failed: [],
  });

  // Function to open confirmation dialog
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  // Function to close confirmation dialog
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  // Function to handle deletion
  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);

    // Run the delete logic
    const result = await handleDelete(tableName, selected);
    setSelected([]);
    setRefresh(!refresh);
    setDeleteResult({
      ...result,
      failed: result.failed || [],
    });
    setOpenSnackbar(true);
  };

  // Function to close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          },
        ]}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Placeholder
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleOpenConfirmDialog}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the selected items?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Result Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {deleteResult.code === 200 ? (
          <Alert onClose={handleCloseSnackbar} severity="success">
            {deleteResult?.message}
          </Alert>
        ) : deleteResult.code === 207 ? (
          <Alert onClose={handleCloseSnackbar} severity="warning">
            {deleteResult?.message}
            <br />
            Failed IDs: {deleteResult?.failed.join(", ")}
          </Alert>
        ) : deleteResult.code === 500 ? (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {deleteResult?.message}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="info">
            {deleteResult?.message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default TableToolbar;
