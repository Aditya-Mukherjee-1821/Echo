import { Grid, Box, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const LoaderHome = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: "1vh" }}>
      <Grid container columnSpacing={1}>
        <Grid item xs={3} sx={{ height: "90vh", overflow: "auto" }}>
          <Stack rowGap={1} sx={{ ml: 1 }}>
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
            <Skeleton
              variant="rounded"
              sx={{ height: "5rem"}}
            />
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Stack sx={{ mr: 1 }}>
            <Skeleton
              variant="rounded"
              sx={{ height: "90vh"}}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoaderHome;
