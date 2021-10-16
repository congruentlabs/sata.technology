import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { ThemeModeToggler } from './components';

const Topbar = () => {
  // const {
  //   landings: landingPages,
  // } = pages;

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="Signata"
        width={{ xs: 100, md: 120 }}
      >
        <Box
          component={'img'}
          src="logo.png"
          height={0.4}
          width={0.4}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
        {/* <Box>
          <NavItem
            title={'Landings'}
            id={'landing-pages'}
            items={landingPages}
          />
        </Box> */}
        {/* <Box marginLeft={3}>
          <NavItem
            title={'Pages'}
            id={'secondary-pages'}
            items={secondaryPages}
          />
        </Box>
        <Box marginLeft={3}>
          <NavItem
            title={'Account'}
            id={'account-pages'}
            items={accountPages}
          />
        </Box> */}
        {/* <Box marginLeft={3}>
          <Link
            underline="none"
            component="a"
            href="/docs/introduction"
            color="text.primary"
          >
            Documentation
          </Link>
        </Box> */}
        <Box marginLeft={3}>
          <ThemeModeToggler />
        </Box>
        {/* <Box marginLeft={3}>
          <Button
            variant="contained"
            color="primary"
            component="a"
            target="blank"
            href="https://material-ui.com/store/items/the-front-landing-page/"
            size="large"
          >
            Purchase 
          </Button>
        </Box> */}
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
        <Box marginRight={2}>
          <ThemeModeToggler />
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object,
};

export default Topbar;
