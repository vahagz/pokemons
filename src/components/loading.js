import { Box, CircularProgress } from '@material-ui/core';

export default function Loading(props) {
  return (
    <Box textAlign="center" {...props}>
      <CircularProgress />
    </Box>
  );
}

Loading.propTypes = Box.propTypes;
