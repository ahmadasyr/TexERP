import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";
import { Customer } from "./page";
interface CustomerSelectionModalProps {
  customers: Customer[];
  open: boolean;
  onClose: () => void;
  onApply: (selectedCustomerIds: number[]) => void;
}

const CustomerSelectionModal: React.FC<CustomerSelectionModalProps> = ({
  customers,
  open,
  onClose,
  onApply,
}) => {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(id)
        ? prev.filter((customerId) => customerId !== id)
        : [...prev, id]
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Select Customers</DialogTitle>
      <DialogContent>
        <List>
          {customers.map((customer) => (
            <ListItem key={customer.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => handleToggle(customer.id)}
                  />
                }
                label={customer?.name}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onApply(selectedCustomers)}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerSelectionModal;
