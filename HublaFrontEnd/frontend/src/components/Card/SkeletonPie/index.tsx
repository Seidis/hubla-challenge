import { Divider, Grid, Skeleton, Stack } from "@mui/material";

export default function SkeletonPie() {
  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{ width: "100%", height: "100%" }}
    >
      <Skeleton variant="rectangular" width="70%" height="30px" />
      <Divider
        orientation="horizontal"
        flexItem
        sx={{ width: "80%", margin: "10px auto" }}
      />
      <Skeleton variant="rectangular" width="60%" height="30px" />
      <Skeleton
        variant="circular"
        width="80%"
        height="250px"
        sx={{
          mt: "50px",
          borderRadius: "50%",
        }}
      />
      <Grid container spacing={2} sx={{ mt: "50px" }}>
        <Grid item xs={6}>
          <Skeleton
            variant="rectangular"
            width="60%"
            height="10px"
            sx={{ margin: "auto" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Skeleton
            variant="rectangular"
            width="60%"
            height="10px"
            sx={{ margin: "auto" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Skeleton
            variant="rectangular"
            width="60%"
            height="10px"
            sx={{ margin: "auto" }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
