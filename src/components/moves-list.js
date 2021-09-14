import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import styles from '../css/moves.module.css';
import { useMemo } from 'react';

export default function MovesList({moveMethod, moveMethods, moves, onSelectMethod, onSelectMove}) {
  const MovesListMemoized = useMemo(
    () => <MovesListWrapper moves={moves} onSelectMove={onSelectMove} />,
    [moves, onSelectMove]
  );
  return (
    <Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}
        className={`text-yellow`}
      >
        {moveMethods.map((methodName) => {
          return <Box
            key={methodName}
            onClick={() => onSelectMethod(methodName)}
            className={styles['move-method']}
            marginLeft="5px"
            marginRight="5px"
            style={(moveMethod === methodName) ? {
              fontWeight: 'bold',
              textDecoration: 'underline',
            } : {}}
          >
            {methodName}
          </Box>
        })}
      </Box>
      <Box
        marginTop={1}
        height="350px"
        style={{
          overflowY: 'auto'
        }}
      >
        {MovesListMemoized}
      </Box>
    </Box>
  );
}

function MovesListWrapper({moves, onSelectMove}) {
  return <>
    {moves.map((moveName) => <Box
        key={moveName}
        onClick={() => onSelectMove(moveName)}
        className={`text-blue ${styles.move}`}
      >
        {moveName}
      </Box>
    )}
  </>;
}

MovesList.propTypes = {
  moveMethods: PropTypes.array.isRequired,
  moveMethod: PropTypes.string.isRequired,
  moves: PropTypes.array.isRequired,
  onSelectMethod: PropTypes.func.isRequired,
  onSelectMove: PropTypes.func.isRequired
};
