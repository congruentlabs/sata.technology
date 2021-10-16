/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { BarStackHorizontal } from '@visx/shape';
import { Group } from '@visx/group';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { withTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const data = [
  { Tokens: 100, date: '2029-04-01' },
  { Tokens: 97.5, date: '2029-01-01' },
  { Tokens: 95, date: '2028-10-01' },
  { Tokens: 92.5, date: '2028-07-01' },
  { Tokens: 90, date: '2028-04-01' },
  { Tokens: 87.5, date: '2028-01-01' },
  { Tokens: 85, date: '2027-10-01' },
  { Tokens: 82.5, date: '2027-07-01' },
  { Tokens: 80, date: '2027-04-01' },
  { Tokens: 77.5, date: '2027-01-01' },
  { Tokens: 75, date: '2026-10-01' },
  { Tokens: 72.5, date: '2026-07-01' },
  { Tokens: 70, date: '2026-04-01' },
  { Tokens: 67.5, date: '2026-01-01' },
  { Tokens: 65, date: '2025-10-01' },
  { Tokens: 62.5, date: '2025-07-01' },
  { Tokens: 60, date: '2025-04-01' },
  { Tokens: 57.5, date: '2025-01-01' },
  { Tokens: 55, date: '2024-10-01' },
  { Tokens: 52.5, date: '2024-07-01' },
  { Tokens: 50, date: '2024-04-01' },
  { Tokens: 47.5, date: '2024-01-01' },
  { Tokens: 45, date: '2023-10-01' },
  { Tokens: 42.5, date: '2023-07-01' },
  { Tokens: 40, date: '2023-04-01' },
  { Tokens: 37.5, date: '2023-01-01' },
  { Tokens: 35, date: '2022-10-01' },
  { Tokens: 32.5, date: '2022-07-01' },
  { Tokens: 30, date: '2022-04-01' },
  { Tokens: 27.5, date: '2022-01-01' },
  { Tokens: 25, date: '2021-10-01' },
];
const keys = Object.keys(data[0]).filter((d) => d !== 'date');

const tokenTotals = data.reduce((allTotals, currentDate) => {
  const totalToken = keys.reduce((quarterlyTotal, k) => {
    quarterlyTotal += Number(currentDate[k]);
    return quarterlyTotal;
  }, 0);
  allTotals.push(totalToken);
  return allTotals;
}, []);

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %Y');
const formatDate = (date) => format(parseDate(date));

let tooltipTimeout;

const Graph = withTooltip(({
  width,
  height,
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  hideTooltip,
  showTooltip,
  theme,
}) => {
  // accessors
  const getDate = (d) => d.date;

  // scales
  const tokenScale = scaleLinear({
    domain: [0, Math.max(...tokenTotals)],
    reverse: true,
    nice: true,
  });
  const dateScale = scaleBand({
    domain: data.map(getDate),
    reverse: true,
    padding: 0.1,
  });
  
  const tooltipStyles = {
    ...defaultStyles,
    minWidth: 60,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  };

  const margin = { top: 40, left: 80, right: 50, bottom: 40 };
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  
  const colorScale = scaleOrdinal({
    domain: keys,
    reverse: true,
    range: [theme.palette.secondary.main],
  });

  tokenScale.rangeRound([0, xMax]);
  dateScale.rangeRound([yMax, 0]);

  return width < 10 ? null : (
    <div>
      <svg width={width} height={height}>
        <rect width={width} height={height} fill={theme.palette.background.default} rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={data}
            keys={keys}
            height={yMax}
            y={getDate}
            xScale={tokenScale}
            yScale={dateScale}
            color={colorScale}
          >
            {(barStacks) =>
              barStacks.map((barStack) =>
                barStack.bars.map((bar) => (
                  <rect
                    key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    onMouseLeave={() => {
                      tooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 500);
                    }}
                    onMouseMove={() => {
                      if (tooltipTimeout) clearTimeout(tooltipTimeout);
                      const top = bar.y + margin.top;
                      const left = bar.x + bar.width + margin.left - 150;
                      showTooltip({
                        tooltipData: bar,
                        tooltipTop: top,
                        tooltipLeft: left,
                      });
                    }}
                  />
                )),
              )
            }
          </BarStackHorizontal>
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={dateScale}
            tickFormat={formatDate}
            stroke={theme.palette.text.primary}
            tickStroke={theme.palette.text.primary}
            tickLabelProps={() => ({
              fill: theme.palette.text.primary,
              fontSize: 11,
              textAnchor: 'end',
            })}
          />
          <AxisBottom
            top={yMax}
            scale={tokenScale}
            stroke={theme.palette.text.primary}
            tickStroke={theme.palette.text.primary}
            tickLabelProps={() => ({
              fill: theme.palette.text.primary,
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div style={{ color: theme.palette.primary.main }}>
            <strong>Unlocked Tokens</strong>
          </div>
          <div>{tooltipData.bar.data[tooltipData.key]}M SATA</div>
          <div>
            <small>{formatDate(getDate(tooltipData.bar.data))}</small>
          </div>
        </Tooltip>
      )}
    </div>
  );
});

const Token = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid item xs={12} md={6} data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Typography sx={{ fontWeight: 700 }} variant={'h4'} gutterBottom>
            Blockchains are the new engine powering humanity. Be a part of the
            decentralized identity future.
          </Typography>
          <Typography variant={'h6'} component={'p'} color={'text.secondary'}>
            The SATA token connects and powers the Signata identity ecosystem:
          </Typography>
          <ul>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Users pay for rights with SATA
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Services verify identities using SATA
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              SATA holders stake to earn governance rights
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Services stake SATA to protect service integrity
            </Typography>
            <Typography variant={'h6'} component={'li'} color={'text.secondary'}>
              Bridges will link SATA to multiple blockchains
            </Typography>
          </ul>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={6}
          data-aos={'zoom-in'}
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Box component={Card} boxShadow={4} height={1} width={1}>
            <Box
              component={CardMedia}
              height={1}
              width={1}
              minHeight={300}
              image="blockchain.jpg"
            />
          </Box>
        </Grid>
      </Grid>
      
      <Box marginTop={4}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box marginBottom={4}>
              <Typography
                variant="h4"
                data-aos={'fade-up'}
                gutterBottom
              >
                Tokenomics
              </Typography>
              <Typography
                variant="h5"
                data-aos={'fade-up'}
                gutterBottom
              >
                100 Million Maximum SATA Supply
              </Typography>
              <Typography
                variant="body1"
                data-aos={'fade-up'}
                gutterBottom
                color={'text.secondary'}
              >
                2.5 Million SATA Unlocked Quarterly Until 2029. Tokens enter circulation through staking pools and adding to exchange liquidity.
              </Typography>
            </Box>
            <ParentSize>{({width}) => <Graph width={width} height={800} theme={theme} />}</ParentSize>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Token;
