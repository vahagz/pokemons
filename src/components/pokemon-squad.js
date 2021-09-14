import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import SquadItem from './pokemon-squad-item';

const squadLimit = 6;

export default function Squad({squadArr, onRemove}) {
  return <Box
    display="flex"
    justifyContent="space-around"
  >
    {[...Array(squadLimit)].map((value, i) => <SquadItem
      key={squadArr[i] ? `pokemon_${squadArr[i].pokemon.id}` : i}
      pokemon={squadArr[i] ? squadArr[i].pokemon : null}
      moves={squadArr[i] ? squadArr[i].moves : null}
      onRemove={() => onRemove(i)}
    />)}
  </Box>;
}

Squad.propTypes = {
  squadArr: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};
