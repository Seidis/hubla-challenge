import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { BsBoxArrowRight } from "react-icons/bs";
import { Grid, Stack, TextField, Typography } from "@mui/material";

type TransactionDrawerProps = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TransactionDrawer({
  openDrawer,
  setOpenDrawer,
}: TransactionDrawerProps) {
  const handleClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Drawer anchor="right" open={openDrawer} onClose={() => handleClose()}>
      <Box sx={{ width: "80vh" }}>
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Button
            onClick={() => setOpenDrawer(false)}
            startIcon={<BsBoxArrowRight />}
            fullWidth
          >
            Close
          </Button>
        </Stack>
        <Grid container sx={{ width: "80%", m: "auto" }}>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: "1.1rem" }}>Transaction</Typography>
            <TextField variant="standard" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Drawer>
  );
}
