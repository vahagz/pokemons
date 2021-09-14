import { useState, useMemo, useCallback } from 'react';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { Grid, Box } from '@material-ui/core';

import mainStyles from './css/main.module.css';

import Logo from './components/logo';
import PokemonSelector from './components/pokemon-selector';
import PokemonPreview from './components/pokemon-preview';
import PokemonSquad from './components/pokemon-squad';

const client = new GraphQLClient({
  url: process.env.REACT_APP_POKE_ENDPOINT,
});

const squadLimit = 6;

export default function App() {
  const [selectedPokemonName, setSelectedPokemonName] = useState(null);
  const [squad, setSquad] = useState([]);
  
  const addToSquad = useCallback((pokemon, moves) => {
    setSquad((squads) => {
      if (squads.length === squadLimit) return squads;
      for (const squad of squads) {
        if (squad.pokemon.id === pokemon.id) {
          return squads;
        }
      }
      return [...squads, {pokemon, moves}]
    });
  }, [setSquad]);

  const removeFromSquad = (removeIndex) => {
    squad.splice(removeIndex, 1);
    setSquad([...squad]);
  };

  const PokemonSelectorMemoized = useMemo(
    () => <PokemonSelector onSelect={(pokemon) => setSelectedPokemonName(pokemon.name)} />,
    []
  );
  const PokemonPreviewMemoized = useMemo(
    () => selectedPokemonName ? <PokemonPreview
      pokemonName={selectedPokemonName}
      onSavePokemon={addToSquad}
    /> : <></>,
    [selectedPokemonName, addToSquad]
  );

  return (
    <ClientContext.Provider value={client}>
      <>
        <Box>
          <Grid container spacing={3} className={`${mainStyles.container} ${mainStyles.bordered}`}>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Logo />
              </Box>
            </Grid>
            <Grid item xs={2}>
              {PokemonSelectorMemoized}
            </Grid>
            <Grid item xs={10}>
              {PokemonPreviewMemoized}
            </Grid>
          </Grid>
          <Box padding={2}>
            <Box textAlign="center" className={`text-yellow`}>SELECTED SQUAD</Box>
            <Box marginTop={2}>
              <PokemonSquad squadArr={squad} onRemove={removeFromSquad} />
            </Box>
          </Box>
        </Box>
      </>
    </ClientContext.Provider>
  );
}
