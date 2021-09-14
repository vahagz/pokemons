import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import PokemonListItem from './pokemon-list-item';

export default function PokemonList({ list, searchValue, onSelect }) {
  return (
    <Box>
      {list.map((pokemon) => (searchValue === '' || pokemon.name.match(new RegExp(`${searchValue}`)))
        ? <PokemonListItem key={pokemon.id} pokemon={pokemon} onSelect={onSelect} />
        : ''
      )}
    </Box>
  );
}

PokemonList.propTypes = {
  list: PropTypes.array.isRequired,
  searchValue: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};
