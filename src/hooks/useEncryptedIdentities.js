import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { hexToBytes, toBytes } from 'viem';

/**
 * Encrypted identity store. The encryption key is derived from a wallet
 * signature over a stable message, so the same wallet always re-derives the
 * same key. The signature is cached in sessionStorage so refreshing during a
 * session doesn't re-prompt; closing the tab forces a fresh sign-in.
 *
 * Identity seeds are AES-GCM-256 encrypted with a 12-byte random IV per
 * write. Ciphertext lives in localStorage keyed per wallet.
 *
 * Old unencrypted records (key: signata.identities.<wallet>) are migrated
 * into the encrypted store on first unlock and then deleted.
 */

const SIGN_IN_MESSAGE = (address) =>
  `Sign in to Signata Identity Manager\n\nThis signature derives a key that encrypts your local identity seeds. It does not authorize any transaction.\n\nAddress: ${address}`;

const encStorageKey = (address) => `signata.enc.identities.${address.toLowerCase()}`;
const legacyKey = (address) => `signata.identities.${address.toLowerCase()}`;
const sessionSigKey = (address) => `signata.sig.${address.toLowerCase()}`;

async function deriveKeyFromSignature(signatureHex) {
  const sigBytes = hexToBytes(signatureHex);
  const hashBuf = await crypto.subtle.digest('SHA-256', sigBytes);
  return crypto.subtle.importKey('raw', hashBuf, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
}

async function encryptJson(key, value) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(value));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return {
    iv: Array.from(iv)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(''),
    ct: Array.from(new Uint8Array(ciphertext))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join(''),
  };
}

async function decryptJson(key, payload) {
  const iv = hexToBytes(`0x${payload.iv}`);
  const ct = hexToBytes(`0x${payload.ct}`);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return JSON.parse(new TextDecoder().decode(plain));
}

export const STATUS = {
  NO_WALLET: 'no-wallet',
  NEEDS_SIGN_IN: 'needs-sign-in',
  UNLOCKING: 'unlocking',
  UNLOCKED: 'unlocked',
  ERROR: 'error',
};

export function useEncryptedIdentities() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [key, setKey] = useState(null);
  const [identities, setIdentitiesState] = useState([]);
  const [status, setStatus] = useState(STATUS.NO_WALLET);
  const [error, setError] = useState('');

  const lowerAddress = address?.toLowerCase();

  // Reset state when the wallet changes / disconnects
  useEffect(() => {
    setKey(null);
    setIdentitiesState([]);
    setError('');
    if (!isConnected || !address) {
      setStatus(STATUS.NO_WALLET);
      return;
    }
    // Try to reuse a session-cached signature
    const cachedSig = sessionStorage.getItem(sessionSigKey(address));
    if (cachedSig) {
      (async () => {
        try {
          setStatus(STATUS.UNLOCKING);
          const derived = await deriveKeyFromSignature(cachedSig);
          await loadAndDecrypt(derived);
          setKey(derived);
          setStatus(STATUS.UNLOCKED);
        } catch (err) {
          console.warn('Cached signature failed to decrypt; re-prompting', err);
          sessionStorage.removeItem(sessionSigKey(address));
          setStatus(STATUS.NEEDS_SIGN_IN);
        }
      })();
    } else {
      setStatus(STATUS.NEEDS_SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const loadAndDecrypt = useCallback(
    async (cryptoKey) => {
      const stored = localStorage.getItem(encStorageKey(address));
      if (stored) {
        const payload = JSON.parse(stored);
        const decrypted = await decryptJson(cryptoKey, payload);
        setIdentitiesState(Array.isArray(decrypted) ? decrypted : []);
        return;
      }
      // Migrate legacy unencrypted store on first unlock
      const legacy = localStorage.getItem(legacyKey(address));
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const encrypted = await encryptJson(cryptoKey, parsed);
            localStorage.setItem(encStorageKey(address), JSON.stringify(encrypted));
            localStorage.removeItem(legacyKey(address));
            setIdentitiesState(parsed);
            return;
          }
        } catch {
          // ignore parse errors; fall through to empty
        }
      }
      setIdentitiesState([]);
    },
    [address],
  );

  const unlock = useCallback(async () => {
    if (!isConnected || !address) return;
    try {
      setStatus(STATUS.UNLOCKING);
      setError('');
      const signature = await signMessageAsync({ message: SIGN_IN_MESSAGE(address) });
      sessionStorage.setItem(sessionSigKey(address), signature);
      const derived = await deriveKeyFromSignature(signature);
      await loadAndDecrypt(derived);
      setKey(derived);
      setStatus(STATUS.UNLOCKED);
    } catch (err) {
      console.error(err);
      setError(err.shortMessage || err.message || 'Failed to unlock identities');
      setStatus(STATUS.NEEDS_SIGN_IN);
    }
  }, [isConnected, address, signMessageAsync, loadAndDecrypt]);

  const persist = useCallback(
    async (next) => {
      if (!key || !address) return;
      const encrypted = await encryptJson(key, next);
      localStorage.setItem(encStorageKey(address), JSON.stringify(encrypted));
    },
    [key, address],
  );

  const addIdentity = useCallback(
    async (identity) => {
      const next = [...identities, identity];
      setIdentitiesState(next);
      await persist(next);
    },
    [identities, persist],
  );

  const updateIdentity = useCallback(
    async (identitySeed, patch) => {
      const next = identities.map((id) => (id.identitySeed === identitySeed ? { ...id, ...patch } : id));
      setIdentitiesState(next);
      await persist(next);
    },
    [identities, persist],
  );

  const removeIdentity = useCallback(
    async (identitySeed) => {
      const next = identities.filter((id) => id.identitySeed !== identitySeed);
      setIdentitiesState(next);
      await persist(next);
    },
    [identities, persist],
  );

  const lock = useCallback(() => {
    if (address) sessionStorage.removeItem(sessionSigKey(address));
    setKey(null);
    setIdentitiesState([]);
    if (isConnected) setStatus(STATUS.NEEDS_SIGN_IN);
    else setStatus(STATUS.NO_WALLET);
  }, [address, isConnected]);

  return useMemo(
    () => ({
      identities,
      status,
      error,
      unlock,
      lock,
      addIdentity,
      updateIdentity,
      removeIdentity,
    }),
    [identities, status, error, unlock, lock, addIdentity, updateIdentity, removeIdentity],
  );
}
