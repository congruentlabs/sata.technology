import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import { useTranslation } from 'react-i18next';

const Footer = () => {
  // const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="Signata"
            width={80}
          >
            <Box
              component={'img'}
              src="logo.png"
              height={0.4}
              width={0.4}
            />
          </Box>
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            {[
              {
                href: 'https://t.me/satatoken',
                alt: 'Telegram',
                fontIconClass: 'fab fa-telegram',
              },
              {
                href: 'https://discord.gg/pEJu4ZjnfX',
                alt: 'Discord',
                fontIconClass: 'fab fa-discord',
              },
              {
                href: 'https://twitter.com/satatoken',
                alt: 'Twitter',
                fontIconClass: 'fab fa-twitter',
              },
              {
                href: 'https://github.com/congruentlabs',
                alt: 'Github',
                fontIconClass: 'fab fa-github',
              },
              {
                href: 'https://blog.congruentlabs.co/',
                alt: 'Blog',
                fontIconClass: 'fas fa-rss',
              },
              {
                href: 'https://www.linkedin.com/company/congruent-labs-pty-ltd/',
                alt: 'LinkedIn',
                fontIconClass: 'fab fa-linkedin',
              },
            ].map((listItem) => (
              <Box marginTop={1} marginRight={2} key={listItem.href}>
                <Link
                  underline="none"
                  component="a"
                  href={listItem.href}
                  target="_blank"
                  color="text.primary"
                  variant={'subtitle2'}
                >
                  {listItem.alt}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          &copy; {new Date().getFullYear()} Congruent Labs Pty Ltd. All rights reserved.
        </Typography>
        {/* <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          When you visit or interact with our sites, services or tools, we or
          our authorised service providers may use cookies for storing
          information to help provide you with a better, faster and safer
          experience and for marketing purposes.
        </Typography> */}
      </Grid>
    </Grid>
  );
};

export default Footer;
