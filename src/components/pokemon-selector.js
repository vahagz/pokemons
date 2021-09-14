import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from 'graphql-hooks';
import { Box, TextField } from '@material-ui/core';

import styles from '../css/pokemon-list.module.css';

import Loading from './loading';
import PokemonList from './pokemon-list';

const POKEMONS = `query Pokemons {
  Pokemons(first: 150) {
    id
    name
  }
}`;

export default function PokemonSelector({ onSelect }) {
  const [searchValue, setSearchValue] = useState('');
  const [pokemons, setPokemons] = useState(null);
  const { loading, data } = useQuery(POKEMONS);

  if (loading) return <Loading />;
  if (!loading && pokemons === null) setPokemons(data?.Pokemons, []);

  return (
    <Box>
      <TextField
        fullWidth={true}
        id="outlined-basic"
        label="TYPE TO FILTER"
        variant="outlined"
        inputProps={{
          className: `border-blue`
        }}
        onInput={(e) => {
          clearTimeout();
          setTimeout(() => {
            setSearchValue(e.target.value);
          }, 500);
        }}
      />
      <Box className={styles.list}>
        <PokemonList list={pokemons || []} searchValue={searchValue} onSelect={onSelect} />
      </Box>
    </Box>
  );
}

PokemonSelector.propTypes = {
  onSelect: PropTypes.func.isRequired
}