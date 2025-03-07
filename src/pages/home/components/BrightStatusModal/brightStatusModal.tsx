import React from "react";
import Icon from "components/basic/Icon/Icon";
import { BrightStatusModalWrapper } from "./brightStatusModal.style";
import { Text } from "components/basic/Text/text.style";

const BrightStatusModal = ({ success }: { success: true }) => {
  function successState() {
    return (
      <>
        <Icon iconSrc="./assets/images/modal/bright-icon.svg" mb={2}></Icon>
        <Icon iconSrc="./assets/images/modal/bright-success-icon.svg" mb={2} ml={-1.5}></Icon>
        <Text color="space_green" mb={1} data-testid="brightid-connect-success">
          BrightID Connected
        </Text>
        <Text color="second_gray_light" fontSize="14" textAlign="center" lineHeight="1.5rem" mb={0}>
          Your BrightID and Metamask Wallet connected Successfully
        </Text>
      </>
    );
  }

  function failedState() {
    return (
      <>
        <Icon iconSrc="./assets/images/modal/bright-icon.svg" mb={3}></Icon>
        <Icon iconSrc="./assets/images/modal/bright-fail-icon.svg" mb={2} ml={-1.5}></Icon>
        <Text color="warningRed" mb={3}>
          BrightID Not Verified
        </Text>
        <Text color="warningPink" fontSize="14" textAlign="center" lineHeight="1.5rem">
          Try to verify your BrightID and try again later.
        </Text>
      </>
    );
  }

  return <BrightStatusModalWrapper>{success ? successState() : failedState()}</BrightStatusModalWrapper>;
};

export default BrightStatusModal;
