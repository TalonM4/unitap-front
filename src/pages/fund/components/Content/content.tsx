import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PrimaryButton } from 'components/basic/Button/button';
import { ContentWrapper } from './content.style';
import Icon from 'components/basic/Icon/Icon';
import Input from 'components/basic/Input/input';
import Dropdown from 'components/basic/Dropdown/dropdown';
import { ChainListContext } from '../../../../hooks/useChainList';
import { Chain } from '../../../../types';
import { useAddAndSwitchToChain } from '../../../../hooks/useAddAndSwitchToChain';
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React';
import { parseEther } from '@ethersproject/units';
import { calculateGasMargin } from '../../../../utils/web3';

const Content: FC = () => {
  const { chainList } = useContext(ChainListContext);
  const { active, chainId, library, account } = useActiveWeb3React();

  const [selectedChain, setSelectedChain] = useState<Chain | null>(null);
  useEffect(() => {
    if (chainList.length > 0 && !selectedChain) {
      setSelectedChain(chainList[0]);
    }
  }, [chainList, selectedChain]);

  const { addAndSwitchToChain } = useAddAndSwitchToChain();

  const [fundAmount, setFundAmount] = useState<string>('');

  const isRightChain = useMemo(() => {
    if (!active || !chainId || !selectedChain) return false;
    return chainId === Number(selectedChain.chainId);
  }, [selectedChain, active, chainId]);

  const handleSendFunds = useCallback(async () => {
    if (!active || !chainId || !selectedChain || !account) return;
    if (!isRightChain) {
      await addAndSwitchToChain(selectedChain);
      return;
    }
    if (!fundAmount) {
      alert('Enter fund amount');
      return;
    }
    if (!library) return;
    const tx = {
      from: account,
      to: selectedChain.fundManagerAddress,
      value: parseEther(fundAmount),
    };

    const estimatedGas = await library.estimateGas(tx).catch((err: any) => {
      if (err?.data?.message) {
        alert(err.data.message);
      }
      return {
        error: new Error('Unexpected error. Could not estimate gas for this transaction.'),
      };
    });

    if ('error' in estimatedGas) {
      throw new Error('Unexpected error. Could not estimate gas for this transaction.');
    }

    return library.getSigner().sendTransaction({
      ...tx,
      ...(estimatedGas ? { gasLimit: calculateGasMargin(estimatedGas) } : {}),
      // gasPrice /// TODO add gasPrice based on EIP 1559
    });
  }, [active, chainId, selectedChain, account, isRightChain, library, fundAmount, addAndSwitchToChain]);

  return (
    <ContentWrapper>
      <Icon iconSrc={'assets/images/fund/content-header.png'} width="220px" height="auto" />
      <p className="content-text">Fund any amount higher than 100$.</p>
      <p className="content-subtext">
        99% of fund amount goes for Claim Gas Fees. <br /> 1% of fund amount goes for Unitap development.
      </p>
      {selectedChain && (
        <Dropdown label="Chain" value={selectedChain.chainName} icon="assets/images/fund/coin-icon.png" />
      )}
      <Input
        className="fund-input"
        value={fundAmount}
        onChange={(e) => setFundAmount(e.target.value)}
        label="Fund Amount"
        postfix={selectedChain?.symbol || ''}
        type="number"
        step="0.001"
        styleType="success"
        placeholder="0.00"
        width="100%"
        fontSize="24px"
      />
      <PrimaryButton width="100%" height="3.5rem" fontSize="20px" onClick={handleSendFunds} disabled={!active}>
        {active && !isRightChain ? 'Switch Network' : 'Submit Fund'}
      </PrimaryButton>
    </ContentWrapper>
  );
};

export default Content;
