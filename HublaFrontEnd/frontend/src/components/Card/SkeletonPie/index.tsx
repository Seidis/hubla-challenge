import { Divider, Skeleton, Stack } from "@mui/material";

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
        height="55%"
        sx={{
          mt: "70px",
          borderRadius: "50%",
        }}
      />
    </Stack>
  );
}
