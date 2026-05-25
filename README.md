# sata.technology

The marketing site and dApp front-end for [Signata](https://signata.net).

## Stack

- **Vite 5** + **React 19** + **MUI 6**
- **wagmi v2** + **viem 2** + **@reown/appkit** for wallet connection
- **react-router 7** (HashRouter — for IPFS hosting compatibility)

## Getting started

```bash
nvm use            # Node 20+
npm install
cp .env.example .env   # fill in VITE_REOWN_PROJECT_ID
npm run dev
```

Build for production:

```bash
npm run build      # outputs to dist/
npm run preview    # local preview of the dist build
```

## Environment

Wallet connection requires a [Reown Cloud](https://cloud.reown.com) project ID
(formerly WalletConnect Cloud). On-chain contract addresses default to Signata's
Ethereum mainnet deployment but are overridable via `VITE_*` env vars — see
[`.env.example`](.env.example).

## Hosting

### Cloudflare Pages (primary)

One-off deploy from your machine:

```bash
npx wrangler login          # first time only
npm run deploy              # builds, then pushes dist/ to Cloudflare Pages
npm run deploy:preview      # publishes to a preview branch URL instead
```

The `wrangler.toml` declares the project name (`sata-technology`) and output
directory. `public/_redirects` provides the SPA fallback and `public/_headers`
sets caching + security headers — both are Cloudflare Pages conventions.

**Git-integrated deploys** (recommended for production): in the Cloudflare
dashboard, create a Pages project pointing at this repo with:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (leave blank) |
| Environment variables | `NODE_VERSION=20`, plus everything from `.env.example` |

Push to `main` deploys production; any other branch gets a preview URL.

### Firebase (legacy)

`firebase.json` is retained for the `sata-ico` / `sata-dev` Firebase sites:

```bash
firebase deploy --only hosting:sata-dev
```
