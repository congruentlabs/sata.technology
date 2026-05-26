import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';

import { ThemeModeToggler } from './components';

const Topbar = () => (
  <Box display="flex" justifyContent="space-between" alignItems="center" width={1}>
    <Box
      display="flex"
      component={RouterLink}
      to="/"
      title="Signata"
      width={{ xs: 100, md: 120 }}
      sx={{ alignItems: 'center' }}
    >
      <Box component="img" src="logo.png" height={0.4} width={0.4} alt="Signata" />
    </Box>

    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Tooltip title="View on GitHub">
        <IconButton
          component="a"
          href="https://github.com/congruentlabs/sata.technology"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <ThemeModeToggler />
    </Box>
  </Box>
);

export default Topbar;
