import { useContractFunction } from '@usedapp/core';
import { Contract } from '@ethersproject/contracts';
import EXCHANGE_ABI from './gExchangerAbi.json';
import SATA_ABI from './sataAbi.json';

const EXCHANGE_CONTRACT = '0x72dc15c9353EA3d5bc040B67d5Dd94A9E469154A';
const exchangeContract = new Contract(EXCHANGE_CONTRACT, EXCHANGE_ABI);
const SATA_CONTRACT = '0x3ebb4A4e91Ad83BE51F8d596533818b246F4bEe1';
const sataContract = new Contract(SATA_CONTRACT, SATA_ABI);

export function useExchange() {
  const { state, send, events, resetState } = useContractFunction(exchangeContract, 'exchange', {
    transactionName: 'Exchange SATA for dSATA'
  });
  return { state, send, events, resetState };
}

export function useApprove() {
  const { state, send, events, resetState } = useContractFunction(sataContract, 'approve', {
    transactionName: 'Approve'
  });
  return { state, send, events, resetState };
}

export function useAllowance() {
  const { state, send, events, resetState } = useContractFunction(sataContract, 'allowance');
  return { state, send, events, resetState };
}
