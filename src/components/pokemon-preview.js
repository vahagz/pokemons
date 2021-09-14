import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'graphql-hooks';
import { Grid, Box, Button } from '@material-ui/core';

import styles from '../css/pokemon-preview.module.css';

import Loading from './loading';
import PokemonStats from './pokemon-stats';
import SelectedMoves from './selected-moves';
import MovesList from './moves-list';

const POKEMON = `query Pokemon($name: String!) {
  Pokemon(name: $name) {
    id
    name
    image
    moves {
      name
      learnMethod
    }
    abilities {
      name
    }
    stats {
      name
      value
    }
    types {
      name
    }
  }
}`;

export default function PokemonPreview({ pokemonName, onSavePokemon }) {
  const [pokemon, setPokemon] = useState(null);
  const [selectedMoves, setSelectedMoves] = useState([]);
  const { loading, data } = useQuery(POKEMON, {variables: {name: pokemonName}});

  const addMove = useCallback((learnMethod, name) => {
    setSelectedMoves(selectedMoves => {
      for (const move of selectedMoves) {
        if (move.learnMethod === learnMethod && move.name === name) {
          return selectedMoves;
        }
      }

      return (selectedMoves.length < 4)
        ? [...selectedMoves, {learnMethod, name}]
        : selectedMoves;
    });
  }, [setSelectedMoves]);

  const PokemonPreviewMemoized = useMemo(
    () => pokemon
      ? <PreviewWrapper
          pokemon={pokemon}
          selectedMoves={selectedMoves}
          onSelectMove={addMove}
          onSavePokemon={(pokemon) => onSavePokemon(pokemon, selectedMoves)}
          onRemoveMove={(index) => {
            selectedMoves.splice(index, 1);
            setSelectedMoves([...selectedMoves]);
          }}
        />
      : <></>,
    [pokemon, selectedMoves, addMove, onSavePokemon]
  );

  if (loading) return <Loading />;
  if (!loading && data && data.Pokemon && data.Pokemon !== pokemon) {
    setSelectedMoves([]);
    setPokemon(data.Pokemon || null);
    return;
  }
  if (!loading && !pokemon) return <p>Not found</p>;

  return <>{PokemonPreviewMemoized}</>;
}

function PreviewWrapper({ pokemon, selectedMoves, onSelectMove, onRemoveMove, onSavePokemon }) {
  const [moves, setMoves] = useState(null);
  const [selectedLearnMethod, setSelectedLearnMethod] = useState(null);

  useEffect(() => {
    const mvs = {};
    for (const move of (pokemon.moves)) {
      if (!mvs[move.learnMethod]) {
        mvs[move.learnMethod] = [];
      }
      mvs[move.learnMethod].push(move.name);
    }

    setMoves(mvs);
    setSelectedLearnMethod(Object.keys(mvs)[0]);
  }, [pokemon]);

  const addMove = useCallback((moveName) => {
    onSelectMove(selectedLearnMethod, moveName);
  }, [selectedLearnMethod, onSelectMove]);

  const MovesListMemoized = useMemo(() => (selectedLearnMethod && moves) ? <MovesList
    moveMethods={Object.keys(moves)}
    moveMethod={selectedLearnMethod}
    moves={moves[selectedLearnMethod]}
    onSelectMethod={(method) => setSelectedLearnMethod(method)}
    onSelectMove={addMove}
  /> : <></>, [selectedLearnMethod, moves, addMove]);

  return (
    <Grid container spacing={3} className={styles.container}>
      <Grid item xs={3}>
        <Box>
          <img width="100%" src={pokemon.image} alt="Pokemon" />
        </Box>
        <Box textAlign="center" className={`text-blue ${styles['pokemon-name']}`}>
          {pokemon.name}
        </Box>
        <Box>
          <Button
            fullWidth={true}
            className={`text-white bg-blue`}
            onClick={() => onSavePokemon(pokemon)}
          >
            SAVE POKEMON
          </Button>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            <Box textAlign="center" fontWeight="bold" className={`text-blue`}>STATS</Box>
            <PokemonStats stats={pokemon.stats} />
          </Box>
          <Box marginTop={1}>
            <Box textAlign="center" fontWeight="bold" className={`text-blue`}>SELECTED MOVES</Box>
            <SelectedMoves moves={selectedMoves} onRemoveMove={onRemoveMove} />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box>
          {MovesListMemoized}
        </Box>
      </Grid>
    </Grid>
  );
}

PokemonPreview.propTypes = {
  pokemonName: PropTypes.string.isRequired,
  onSavePokemon: PropTypes.func.isRequired
};
