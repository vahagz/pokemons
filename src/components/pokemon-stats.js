import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

export default function PokemonStats({ stats }) {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Box>
          {stats.slice(0, stats.length / 2).map((stat) => {
            return (
              <Box
                key={stat.name}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Box textAlign="end" className={`text-yellow`}>{stat.name}</Box>
                <Box marginLeft={1} fontSize={30} className={`text-blue`}>{stat.value}</Box>
              </Box>
            );
          })}
        </Box>
        <Box>
          {stats.slice(stats.length / 2).map((stat) => {
            return (
              <Box
                key={stat.name}
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
              >
                <Box textAlign="end" className={`text-yellow`}>{stat.name}</Box>
                <Box marginLeft={1} fontSize={30} className={`text-blue`}>{stat.value}</Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

PokemonStats.propTypes = {
  stats: PropTypes.array.isRequired
};
