import { Box, Typography, Stack } from "@mui/material";

export default function Title({ title }: { title: string }) {
  return (
    <Box
      sx={{
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#F7D358",
            height: "40px",
            width: "15px",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            marginLeft: "10px",
          }}
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
}
