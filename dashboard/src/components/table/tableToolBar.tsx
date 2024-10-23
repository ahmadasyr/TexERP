import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField"; // Import TextField for search input
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import { handleDelete } from "./utils";
import {
  Checkbox,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";
import { Add, Edit } from "@mui/icons-material";

interface TableToolbarProps {
  title: string;
  numSelected: number;
  setSelected: React.Dispatch<React.SetStateAction<any[]>>;
  tableName: string;
  selected: any[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  visibleColumns: { id: string; label: string; visible: boolean }[];
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<{ id: string; label: string; visible: boolean }[]>
  >;
  headCells: any[];
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  numSelected,
  tableName,
  selected,
  setSelected,
  setRefresh,
  refresh,
  searchTerm,
  setSearchTerm,
  visibleColumns,
  setVisibleColumns, // Track visible columns
  headCells,
}) => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [startDate, setStartDate] = useState<string>(""); // Add state for start date
  const [endDate, setEndDate] = useState<string>(""); // Add state for end date
  const [drawerOpen, setDrawerOpen] = useState(false); // Manage drawer state

  interface DeleteResult {
    message: string;
    code: number;
    failed: number[];
  }

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update search term
  };

  // Handle start date change
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value); // Update start date
  };

  // Handle end date change
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value); // Update end date
  };

  const [deleteResult, setDeleteResult] = useState<DeleteResult>({
    message: "",
    code: 0,
    failed: [],
  });

  const router = useRouter();

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
  // Handle toggling column visibility
  const handleToggleColumn = (column: { id: string; label: string }) => {
    // Find the column index
    const columnIndex = visibleColumns.findIndex(
      (visibleColumn) => visibleColumn.id === column.id
    );

    // Update the column visibility
    setVisibleColumns((prevVisibleColumns) => {
      const newVisibleColumns = [...prevVisibleColumns];
      newVisibleColumns[columnIndex] = {
        ...newVisibleColumns[columnIndex],
        visible: !newVisibleColumns[columnIndex].visible,
      };
      return newVisibleColumns;
    });
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
          <>
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {title}
            </Typography>
            <Button
              onClick={() => router.push(`/${tableName}/form`)}
              variant="outlined"
              style={{
                whiteSpace: "nowrap",
                minWidth: "max-content",
              }}
              startIcon={<Add />}
            >
              Create New
            </Button>

            <TextField
              value={searchTerm} // Bind searchTerm
              onChange={handleSearchChange} // Handle input change
              label="Search"
              variant="outlined"
              size="small"
              sx={{ ml: 2 }}
            />
          </>
        )}
        {numSelected === 1 ? (
          <>
            <Tooltip title="Delete">
              <IconButton onClick={() => setOpenConfirmDialog(true)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={() =>
                  router.push(`${tableName}/form/?id=${selected[0]}`)
                }
              >
                <Edit />
              </IconButton>
            </Tooltip>
          </>
        ) : numSelected > 1 ? (
          <Tooltip title="Delete">
            <IconButton onClick={() => setOpenConfirmDialog(true)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton
              onClick={
                () => setDrawerOpen(true) // Open drawer on click
              }
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      {/* Drawer for filtering and column visibility */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: 250, padding: 20 }}>
          <Typography variant="h6">Filter Options</Typography>
          <Divider sx={{ my: 2 }} />

          {/* Date range filters */}
          {/* <TextField
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            label="Start Date"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            label="End Date"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          /> */}

          {/* Column visibility toggles */}
          <Typography variant="subtitle1">Toggle Columns</Typography>
          <List>
            {headCells.map((column, index) => (
              <ListItem key={index}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        visibleColumns.find(
                          (visibleColumn) => visibleColumn.id === column.id
                        )?.visible
                      }
                      onChange={() => handleToggleColumn(column)}
                      color="primary"
                    />
                  }
                  label={column.label}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
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
