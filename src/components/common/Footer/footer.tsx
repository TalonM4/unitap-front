import React, { FC } from 'react';
import styled from 'styled-components';

import { DV } from 'components/basic/designVariables';

import Icon from 'components/basic/Icon/Icon';

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  padding: ${DV.sizes.basePadding * 2}px;
  background: ${DV.colors.black3};
`;

const PbyBright = styled(Icon)`
  position: absolute;
  right: ${DV.sizes.basePadding * 10}px;
`;

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <Icon iconSrc="assets/images/footer/twitter.svg" width="34px" height="auto" mr={4} hoverable></Icon>
      <Icon iconSrc="assets/images/footer/github.svg" width="34px" height="auto" mr={4} hoverable></Icon>
      <Icon iconSrc="assets/images/footer/discord.svg" width="34px" height="auto" hoverable></Icon>
      <PbyBright iconSrc="Poweredbybright.svg" width="160px" height="auto"></PbyBright>
    </FooterWrapper>
  );
};

export default Footer;
