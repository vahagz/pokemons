// import {useEffect} from 'react';
import { useQuery } from 'graphql-hooks'

// const ALL_POKEMONS = `query Pokemons {
//   Pokemons(first: 100) {
//     id
//     name
//   }
// }`;

const POKEMON = `query Pokemon {
  Pokemon(name: "snorlax") {
    id
    name
    image
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

export default function Test() {
  // const { loading: loading1, data: data1 } = useQuery(ALL_POKEMONS);
  // if (!loading1) console.log(data1);
  
  const { loading: loading2, data: data2 } = useQuery(POKEMON/*, {variables: {"name": 'snorlax'}}*/);
  if (!loading2) console.log(data2);

  return <></>;
}
