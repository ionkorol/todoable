import { AppBar, Layout } from "components/common";
import { ProgressList } from "components/task";
import { Box } from "native-base";
import React from "react";

const Progress = () => {
  return (
    <Layout>
      <Box p={5}>
        <ProgressList />
      </Box>
    </Layout>
  );
};

export default Progress;
