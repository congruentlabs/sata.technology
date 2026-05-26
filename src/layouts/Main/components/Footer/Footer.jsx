import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const LINKS = [
  { href: 'https://github.com/congruentlabs/sata.technology', label: 'GitHub' },
  { href: 'https://blog.congruentlabs.co/', label: 'Blog' },
];

const Footer = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width={1}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box display="flex" component="a" href="/" title="Signata" width={80}>
          <Box component="img" src="logo.png" height={0.4} width={0.4} alt="Signata" />
        </Box>
        <Box display="flex" flexWrap="wrap" alignItems="center">
          {LINKS.map((item) => (
            <Box marginTop={1} marginRight={2} key={item.href}>
              <Link
                underline="none"
                component="a"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                color="text.primary"
                variant="subtitle2"
              >
                {item.label}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Typography align="center" variant="subtitle2" color="text.secondary">
        &copy; {new Date().getFullYear()} Congruent Labs Pty Ltd. All rights reserved.
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
