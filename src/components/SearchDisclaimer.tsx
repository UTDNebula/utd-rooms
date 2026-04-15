import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type SearchDisclaimerDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function SearchDisclaimerDialog({
  open,
  onClose,
  onConfirm,
}: SearchDisclaimerDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="text-pretty">
      <DialogTitle className="text-center">** Disclaimer **</DialogTitle>

      <DialogContent className="text-center">
        UTD Rooms is not affiliated with the University of Texas at Dallas. Room
        availability is provided for convenience only and is not guaranteed.
        Users are responsible for reserving and verifying rooms through official
        university sources.
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
