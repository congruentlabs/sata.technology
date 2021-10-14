import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';

import Container from 'components/Container';
import { Topbar, Sidebar, Footer } from './components';
import pages from '../navigation';

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

HideOnScroll.propTypes = {
  children: PropTypes.node.isRequired,
};

const Fluid = ({ children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <Box>
      <HideOnScroll>
        <AppBar
          position={'fixed'}
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
          elevation={1}
        >
          <Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
            <Topbar onSidebarOpen={handleSidebarOpen} pages={pages} />
          </Container>
        </AppBar>
      </HideOnScroll>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
      />
      <main>
        <Box height={{ xs: 58, sm: 66 }} />
        {children}
        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
    </Box>
  );
};

Fluid.propTypes = {
  children: PropTypes.node,
};

export default Fluid;
