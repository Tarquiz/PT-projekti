import React from "react";
import DateTimePicker from "@mui/lab/DateTimePicker";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";

function Addtraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    activity: "",
    date: new Date(),
    duration: "",
    customer: props.customer,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
  };

  const inputChanged = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const dc = (date) => {
    date = date.toISOString();
    setTraining({ ...training, date: date });
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add training</DialogTitle>

        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              padding="12px"
              variant="standard"
              renderInput={(props) => <TextField {...props} />}
              value={training.date}
              onChange={(newDate) => dc(newDate)}
            />
          </LocalizationProvider>
          <TextField
            autoFocus
            name="activity"
            margin="dense"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Addtraining;
