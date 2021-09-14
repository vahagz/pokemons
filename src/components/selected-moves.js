import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import Move from './move';

export default function SelectedMoves({ moves, onRemoveMove }) {
  return (
    <Box>
      <Box display="flex">
        <Box width="100%" onClick={moves[0] ? () => onRemoveMove(0) : () => {}}>
          <Move move={moves[0]} />
        </Box>
        <Box width="100%" onClick={moves[1] ? () => onRemoveMove(1) : () => {}}>
          <Move move={moves[1]} />
        </Box>
      </Box>
      <Box display="flex">
        <Box width="100%" onClick={moves[2] ? () => onRemoveMove(2) : () => {}}>
          <Move move={moves[2]} />
        </Box>
        <Box width="100%" onClick={moves[3] ? () => onRemoveMove(3) : () => {}}>
          <Move move={moves[3]} />
        </Box>
      </Box>
    </Box>
  );
}

SelectedMoves.propTypes = {
  moves: PropTypes.array.isRequired,
  onRemoveMove: PropTypes.func.isRequired
};
