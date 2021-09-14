import { Box } from '@material-ui/core';

export default function Move({ move, onClick }) {
  return (
    <Box
      border="solid 1px"
      padding={1}
      margin={1}
      className={`border-blue`}
    >
      {(move) ? (
        <Box
          onClick={onClick}
          style={{cursor: "pointer"}}
        >
          <Box className={`text-yellow`}>{move.learnMethod}</Box>
          <Box fontSize={20} className={`text-blue`}>{move.name}</Box>
        </Box>
      ) : (
        <Box style={{cursor: "default"}}>Empty</Box>
      )}
    </Box>
  );
}
