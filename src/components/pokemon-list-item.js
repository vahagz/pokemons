import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import styles from '../css/pokemon-list.module.css';

export default function PokemonListItem({ pokemon, onSelect }) {
  return (
    <Box className={styles['list-item']} id={pokemon.id} onClick={() => onSelect(pokemon)}>
      {pokemon.name}
    </Box>
  );
}

PokemonListItem.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired
};
