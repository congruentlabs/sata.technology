import {
  BaseError,
  ContractFunctionRevertedError,
  UserRejectedRequestError,
  InsufficientFundsError,
} from 'viem';

/**
 * Translate a wagmi/viem error into a short, user-facing message.
 * Returns null if the error is "expected and benign" (user rejected) so the
 * caller can choose to silently ignore.
 */
export function formatError(err) {
  if (!err) return null;

  if (err instanceof BaseError) {
    const userRejected = err.walk((e) => e instanceof UserRejectedRequestError);
    if (userRejected) return null;

    const reverted = err.walk((e) => e instanceof ContractFunctionRevertedError);
    if (reverted) {
      const reason = reverted.data?.errorName || reverted.shortMessage || reverted.message;
      return `Contract reverted: ${reason}`;
    }

    const insufficient = err.walk((e) => e instanceof InsufficientFundsError);
    if (insufficient) return 'Insufficient ETH for gas.';

    return err.shortMessage || err.message;
  }

  // Non-viem error
  if (err?.message?.includes('User rejected')) return null;
  if (err?.message?.includes('User denied')) return null;
  if (err?.code === 4001) return null; // legacy EIP-1193 user rejection

  return err.shortMessage || err.message || String(err);
}

export function isUserRejection(err) {
  if (!err) return false;
  if (err instanceof BaseError) {
    return Boolean(err.walk((e) => e instanceof UserRejectedRequestError));
  }
  return (
    err?.code === 4001 ||
    err?.message?.includes('User rejected') ||
    err?.message?.includes('User denied')
  );
}
