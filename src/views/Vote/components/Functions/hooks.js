import { erc20Abi } from 'viem';
import { useAccount, useReadContract } from 'wagmi';
import EXCHANGE_ABI from './gExchangerAbi.json';

export const SATA_ADDRESS = import.meta.env.VITE_SATA_ADDRESS;
export const DSATA_ADDRESS = import.meta.env.VITE_DSATA_ADDRESS;
export const EXCHANGER_ADDRESS = import.meta.env.VITE_EXCHANGER_ADDRESS;

export { EXCHANGE_ABI };

export function useTokenBalance(token) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });
  return data ?? 0n;
}

export function useTokenAllowance(token, spender) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: 'allowance',
    args: address ? [address, spender] : undefined,
    query: { enabled: Boolean(address) },
  });
  return data ?? 0n;
}
