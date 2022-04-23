import React from 'react';
import styled from 'styled-components/';
import { DV } from 'components/basic/designVariables';
import { GreenOutlinedButton, PrimaryOutlinedButton, SecondaryButton } from 'components/basic/button';

// ###### Local Styled Components

const ChainCard = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${DV.colors.black};
  border-radius: ${DV.sizes.baseRadius * 1.5}px;
  background-color: #1e1e29;
  margin-bottom: ${DV.sizes.baseMargin * 2}px;
  padding: ${DV.sizes.basePadding * 3}px ${DV.sizes.basePadding * 6}px;

  img {
    width: 30px;
    position: absolute;
    padding: 38px ${DV.sizes.baseMargin * 1.5}px;
    display: flex;
    border-radius: ${DV.sizes.baseRadius * 1.5}px 0 0 ${DV.sizes.baseRadius * 1.5}px;
    left: -1px;
    bottom: 0;
    top: 1-px;
    background-color: ${DV.colors.black};
  }
  p {
    color: white;
    &:first-child {
      margin-right: ${DV.sizes.baseMargin * 8}px;
    }
  }
`;
const ChainName = styled.p`
  margin-left: ${DV.sizes.baseMargin * 6}px;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
`;

// ###### Local Interfaces
interface chainObj {
  icon: string;
  name: string;
  chain_id: number;
  symbol: string;
}

const ChainList = (data: any) => {
  return (
    <div>
      {data.data.map((x: chainObj) => {
        return (
          <ChainCard key={x.chain_id}>
            <img src={x.icon} alt="" />
            <ChainName>{x.name}</ChainName>
            <p>
              <span>Chain ID</span> {x.chain_id}
            </p>
            <p>
              <span>Currency</span> {x.symbol}
            </p>
            <Action>
                {/* this commented button is for when we have already claimed the token [logic connection needed] */}
              {/* <GreenOutlinedButton mr={2}>Already claimed</GreenOutlinedButton> */}
              <PrimaryOutlinedButton mr={2}>Claim 0.003 MATIC</PrimaryOutlinedButton>
              <SecondaryButton>Add to MetaMask</SecondaryButton>
            </Action>
          </ChainCard>
        );
      })}
    </div>
  );
};

export default ChainList;
