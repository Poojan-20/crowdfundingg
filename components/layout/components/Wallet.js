import React, { useState } from 'react'
import styled from "styled-components";
import { ethers } from "ethers";
// import { useState } from "react";
const networks = {
  goreli: {
    chainId: `0x${Number(5).toString(16)}`,
    chainName: "Goreli Testnet",
    nativeCurrency: {
      name: "GöETH",
      symbol: "GÖETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.infura.io/v3/a9676e95b8804387bf210f095e969fda"],
    blockExplorerUrls: ["https://goerli.etherscan.io/"],
  },
};

const Wallet = () => {
  const [address, setaddress] = useState('');
  const [balance, setBalance] = useState("");
  const connectwallet = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    if (provider.network !== 'matic') {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks['goreli']
          }
        ]
      })
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setaddress(Address);
      const Balance = ethers.utils.formatEther(await account.getBalance());
      setBalance(Balance);
    }

  }
  return (
    <ConnectWalletWrapper onClick={connectwallet}>
      {balance == '' ? <Balance></Balance> : <Balance>{balance.slice(0,4)} Eth</Balance> }
      {address == '' ? <Address>Connect Wallet</Address> : <Address>{address.slice(0,6)}...{address.slice(39)}</Address>}
    </ConnectWalletWrapper>
  );
};

const ConnectWalletWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgDiv};
  padding: 5px 9px;
  height: 100%;
  color: ${(props) => props.theme.color};
  border-radius: 10px;
  margin-right: 15px;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: small;
  cursor: pointer;
`;

const Address = styled.h2`
    background-color: ${(props) => props.theme.bgSubDiv};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px 0 5px;
    border-radius: 10px;
`

const Balance = styled.h2`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
`

export default Wallet;