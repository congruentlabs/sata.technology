import { useMemo } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { keccak256, concat, pad, toHex, encodePacked } from 'viem';
import IDENTITY_ABI from '../abis/identity.json';
import RIGHTS_ABI from '../abis/rights.json';
import KYC_CLAIM_ABI from '../abis/kycClaim.json';
import SATA_100_ABI from '../abis/sata100.json';

export const IDENTITY_ADDRESS = import.meta.env.VITE_IDENTITY_ADDRESS;
export const RIGHTS_ADDRESS = import.meta.env.VITE_RIGHTS_ADDRESS;
export const KYC_CLAIM_ADDRESS = import.meta.env.VITE_KYC_CLAIM_ADDRESS;
export const SATA_100_ADDRESS = import.meta.env.VITE_SATA_100_ADDRESS;
export const SATA_ADDRESS = import.meta.env.VITE_SATA_ADDRESS;

export { IDENTITY_ABI, RIGHTS_ABI, KYC_CLAIM_ABI, SATA_100_ABI };

const idCfg = (functionName, args) => ({
  address: IDENTITY_ADDRESS,
  abi: IDENTITY_ABI,
  chainId: mainnet.id,
  functionName,
  args,
});

/**
 * Reads all the EIP-712 digest constants from the identity contract in one
 * multicall. Returns null until everything is ready. Build the EIP-712 domain
 * separator once at the app level and pass it down.
 */
export function useIdentityDigests() {
  const { data, isLoading } = useReadContracts({
    contracts: [
      idCfg('EIP712DOMAINTYPE_DIGEST'),
      idCfg('VERSION_DIGEST'),
      idCfg('NAME_DIGEST'),
      idCfg('SALT'),
      idCfg('TXTYPE_CREATE_DIGEST'),
      idCfg('TXTYPE_DESTROY_DIGEST'),
      idCfg('TXTYPE_LOCK_DIGEST'),
      idCfg('TXTYPE_UNLOCK_DIGEST'),
      idCfg('TXTYPE_ROLLOVER_DIGEST'),
    ],
    query: { staleTime: Infinity },
  });

  return useMemo(() => {
    if (isLoading || !data || data.some((r) => r.status !== 'success')) return null;
    const [
      EIP712DOMAINTYPE_DIGEST,
      VERSION_DIGEST,
      NAME_DIGEST,
      SALT,
      TXTYPE_CREATE_DIGEST,
      TXTYPE_DESTROY_DIGEST,
      TXTYPE_LOCK_DIGEST,
      TXTYPE_UNLOCK_DIGEST,
      TXTYPE_ROLLOVER_DIGEST,
    ] = data.map((r) => r.result);

    const DOMAIN_SEPARATOR = keccak256(
      concat([
        EIP712DOMAINTYPE_DIGEST,
        NAME_DIGEST,
        VERSION_DIGEST,
        pad(toHex(mainnet.id), { size: 32 }),
        pad(IDENTITY_ADDRESS, { size: 32 }),
        SALT,
      ]),
    );

    return {
      DOMAIN_SEPARATOR,
      TXTYPE_CREATE_DIGEST,
      TXTYPE_DESTROY_DIGEST,
      TXTYPE_LOCK_DIGEST,
      TXTYPE_UNLOCK_DIGEST,
      TXTYPE_ROLLOVER_DIGEST,
    };
  }, [data, isLoading]);
}

/**
 * Reads the on-chain status flags + counters for a single identity address.
 */
export function useIdentityState(identityAddress) {
  const enabled = Boolean(identityAddress);
  const { data, isLoading, refetch } = useReadContracts({
    contracts: enabled
      ? [
          idCfg('_identityExists', [identityAddress]),
          idCfg('_identityDestroyed', [identityAddress]),
          idCfg('_identityLocked', [identityAddress]),
          idCfg('_identityLockCount', [identityAddress]),
          idCfg('_identityRolloverCount', [identityAddress]),
        ]
      : [],
    query: { enabled },
  });

  return useMemo(() => {
    if (!enabled || isLoading || !data) {
      return { exists: false, destroyed: false, locked: false, lockCount: 0n, rolloverCount: 0n, refetch };
    }
    return {
      exists: Boolean(data[0]?.result),
      destroyed: Boolean(data[1]?.result),
      locked: Boolean(data[2]?.result),
      lockCount: data[3]?.result ?? 0n,
      rolloverCount: data[4]?.result ?? 0n,
      refetch,
    };
  }, [data, enabled, isLoading, refetch]);
}

/**
 * Build the digest a delegate or security key needs to sign for a given
 * identity operation. The exact concatenation matches the on-chain
 * verification in the Signata identity registry.
 */
export function buildOpDigest(domainSeparator, opDigest, packedArgs = '0x') {
  const inputHash = keccak256(concat([opDigest, packedArgs]));
  return keccak256(concat(['0x1901', domainSeparator, inputHash]));
}

export function packCreateArgs(delegateAddress, securityAddress) {
  return encodePacked(['uint256', 'uint256'], [BigInt(delegateAddress), BigInt(securityAddress)]);
}

export function packLockArgs(lockCount) {
  return pad(toHex(lockCount), { size: 32 });
}

export function packRolloverArgs(newDelegate, newSecurity, rolloverCount) {
  return concat([
    pad(newDelegate, { size: 32 }),
    pad(newSecurity, { size: 32 }),
    pad(toHex(rolloverCount), { size: 32 }),
  ]);
}
