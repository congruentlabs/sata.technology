import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { ThemeModeToggler } from './components';
import AccountMenu from '../../../../components/AccountMenu';

const navItems = [
  { label: 'Identities', to: '/' },
  { label: 'Vote', to: '/vote' },
  { label: 'Staking', to: '/staking' },
  { label: 'About', to: '/about' },
];

const Topbar = () => {
  const location = useLocation();
  const currentPath = location.pathname || '/';

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" width={1}>
      <Box
        display="flex"
        component={RouterLink}
        to="/"
        title="Signata"
        width={{ xs: 100, md: 120 }}
      >
        <Box component="img" src="logo.png" height={0.4} width={0.4} alt="Signata" />
      </Box>

      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
        {navItems.map((item) => {
          const active = item.to === '/' ? currentPath === '/' : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              component={RouterLink}
              to={item.to}
              underline={active ? 'always' : 'none'}
              color={active ? 'primary' : 'text.primary'}
              sx={{ fontWeight: active ? 600 : 400 }}
            >
              {item.label}
            </Link>
          );
        })}
        <AccountMenu />
        <ThemeModeToggler />
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            component={RouterLink}
            to={item.to}
            underline="none"
            color="text.primary"
            variant="caption"
            sx={{ fontSize: 11 }}
          >
            {item.label}
          </Link>
        ))}
        <AccountMenu />
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};

export default Topbar;
