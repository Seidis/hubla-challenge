import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SkeletonPie from "./SkeletonPie";

export default function Card({ title, children, sx, loading }: any) {
  const style = {
    ...sx,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 3,
    border: 0,
    color: "black",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
    padding: "10px",
  };

  return (
    <>
      <Box sx={style}>
        {!loading ? (
          <Stack
            direction="column"
            alignItems="center"
            divider={
              <Divider
                orientation="horizontal"
                flexItem
                sx={{ width: "80%", margin: "10px auto" }}
              />
            }
          >
            <Typography variant="h6" sx={{ mt: "10px" }}>
              {title}
            </Typography>
            {children}
          </Stack>
        ) : (
          <SkeletonPie />
        )}
      </Box>
    </>
  );
}
