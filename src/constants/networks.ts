import { StaticJsonRpcProvider } from '@ethersproject/providers';

import { SupportedChainId } from './chains';

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const RPC_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [SupportedChainId.GOERLI]: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};

export const RPC_PROVIDERS = Object.keys(RPC_URLS).reduce((acc, key) => {
  const chainId = Number(key) as SupportedChainId;
  acc[chainId] = new StaticJsonRpcProvider(RPC_URLS[chainId]);
  return acc;
}, {} as { [key in SupportedChainId]: StaticJsonRpcProvider });
