import { Grid } from "@mui/material";

import Skeleton from "./Skeleton";

const tableSkeletonRow = {
  height: "60px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
};

interface Props {
  rows?: number;
  columns?: number | number[];
}

const TableSkeleton = ({ rows = 10, columns = 6 }: Props) => {
  if (typeof columns === "number") {
    columns = Array(columns).fill(0);
  }

  return (
    <Grid data-testid="table-skeleton" container direction="column">
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <Grid data-testid="table-skeleton-row" item key={i}>
            <Grid
              container
              alignItems="center"
              columnSpacing={1}
              sx={tableSkeletonRow}
            >
              {Object.keys(columns).map((_, i) => {
                const randomSize = Math.random() * (100 - 30) + 30;
                return (
                  <Grid
                    data-testid="table-skeleton-column"
                    item
                    alignItems="center"
                    xs
                    key={i}
                  >
                    <Skeleton
                      height={32}
                      width={`${randomSize}%`}
                      animation="wave"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default TableSkeleton;
