import { useCallback } from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { mnemonicToAccount, generateMnemonic, english } from 'viem/accounts';

/**
 * Local store for Signata identities. Identities live in localStorage keyed by
 * the connected wallet address — different wallets see different identity
 * lists. No encryption layer for v1; the on-chain registry is the source of
 * truth for what an identity can do, the local store just remembers which
 * identity addresses you've created and their seeds.
 *
 * Identity shape:
 *   {
 *     identitySeed: '12-word mnemonic',
 *     securitySeed: '12-word mnemonic',
 *     delegateSeed?: '12-word mnemonic',   // only for 'independent' type
 *     identityAddress: '0x...',
 *     delegateAddress: '0x...',            // = connected wallet for 'wallet' type
 *     securityAddress: '0x...',
 *     name: 'My Identity',
 *     type: 'wallet' | 'independent',
 *     creator: '0x...',                    // wallet that created it
 *   }
 */
export function useIdentities(creator) {
  const key = creator ? `signata.identities.${creator.toLowerCase()}` : 'signata.identities.anon';
  const [identities, setIdentities] = useLocalStorageState(key, { defaultValue: [] });

  const addIdentity = useCallback(
    (id) => {
      setIdentities((prev) => [...(prev || []), id]);
    },
    [setIdentities],
  );

  const updateIdentity = useCallback(
    (identitySeed, patch) => {
      setIdentities((prev) =>
        (prev || []).map((id) => (id.identitySeed === identitySeed ? { ...id, ...patch } : id)),
      );
    },
    [setIdentities],
  );

  const removeIdentity = useCallback(
    (identitySeed) => {
      setIdentities((prev) => (prev || []).filter((id) => id.identitySeed !== identitySeed));
    },
    [setIdentities],
  );

  return { identities: identities || [], addIdentity, updateIdentity, removeIdentity, setIdentities };
}

export function generateSeed() {
  return generateMnemonic(english);
}

export function accountFromSeed(seed) {
  return mnemonicToAccount(seed);
}

export function buildWalletIdentity({ identitySeed, securitySeed, walletAddress }) {
  const identityAccount = mnemonicToAccount(identitySeed);
  const securityAccount = mnemonicToAccount(securitySeed);
  return {
    identitySeed,
    securitySeed,
    identityAddress: identityAccount.address,
    delegateAddress: walletAddress,
    securityAddress: securityAccount.address,
    name: 'New Wallet Identity',
    type: 'wallet',
    creator: walletAddress,
  };
}

export function buildIndependentIdentity({ identitySeed, delegateSeed, securitySeed, walletAddress }) {
  const identityAccount = mnemonicToAccount(identitySeed);
  const delegateAccount = mnemonicToAccount(delegateSeed);
  const securityAccount = mnemonicToAccount(securitySeed);
  return {
    identitySeed,
    delegateSeed,
    securitySeed,
    identityAddress: identityAccount.address,
    delegateAddress: delegateAccount.address,
    securityAddress: securityAccount.address,
    name: 'New Independent Identity',
    type: 'independent',
    creator: walletAddress,
  };
}
