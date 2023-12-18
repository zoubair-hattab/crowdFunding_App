/* eslint-disable no-undef */
/* eslint-disable react/jsx-pascal-case */
import React, { createContext, useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// internal import

import { crowdFundingAddress, crowdFundingABI } from './constants';
// fetching smart contract

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(crowdFundingAddress, crowdFundingABI, signerOrProvider);

export const CrowdFundingContext = createContext();
export const networks = {
  11155111: {
    chainId: '0xAA36A7',
    chainName: 'soplia Network',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rpc2.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io'],
  },
};
export const CrowdFundingProvider = ({ children }) => {
  const titleData = 'crowdFunding contract';
  const [currentAccount, setCurrentAccount] = useState('');
  const createCompaign = async (compaign) => {
    const { title, description, amount, deadline, image } = compaign;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = await fetchContract(signer);
    try {
      const transaction = await contract?.createComapin(
        currentAccount,
        title,
        description,
        ethers.utils.parseUnits(amount, 18),
        new Date(deadline).getTime(),
        image
      );
      await transaction.wait();
      console.log('contract call success', transaction);
    } catch (error) {
      console.log('contract call failure');
    }
  };
  const getCompaigns = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc2.sepolia.org'
      );
      const contract = await fetchContract(provider);
      const compaigns = await contract?.getCompaigns();
      const parsedCompaigns = compaigns?.map((compaign, i) => ({
        owner: compaign.owner,
        title: compaign.title,
        description: compaign.description,
        target: ethers.utils.formatEther(compaign.target.toString()),
        deadline: compaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          compaign.amountCollected.toString()
        ),
        image: compaign.image,
        pid: i,
      }));
      return parsedCompaigns;
    } catch (e) {
      console.log('here are no contracts on this network.');
    }
  };
  const getUserCompaigns = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = await fetchContract(provider);
      const allcompaigns = await contract?.getCompaigns();
      const signer = provider.getSigner();
      const currentUser = await signer.getAddress();
      console.log(currentUser);
      const filteredCompaigns = allcompaigns?.filter(
        (comaign) =>
          comaign?.owner?.toLowerCase() === currentUser?.toLowerCase()
      );

      const userData = filteredCompaigns?.map((compaign, i) => ({
        owner: compaign.owner,
        title: compaign.title,
        description: compaign.description,
        target: ethers.utils.formatEther(compaign.target.toString()),
        deadline: compaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          compaign.amountCollected.toString()
        ),
        image: compaign.image,
        pid: i,
      }));
      return userData;
    } catch (error) {
      console.log('here are no contracts on this network.');
    }
  };
  const donate = async (pid, amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = await fetchContract(signer);
    try {
      const compaignData = await contract?.donationToCompaign(pid, {
        value: ethers.utils.parseUnits(amount, 18),
      });

      await compaignData.wait();
      console.log(await compaignData.wait());
      window.location.reload();
      return compaignData;
    } catch (error) {
      console.log('transaction donation success');
    }
  };
  const getDonation = async (pid) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        'https://rpc2.sepolia.org'
      );
      const contract = await fetchContract(provider);
      const donations = await contract?.getDonators(pid);
      const numberOfDonations = donations[0].length;
      const parsedDonations = [];
      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }
      return parsedDonations;
    } catch (error) {
      console.log('here are no contracts on this network.');
    }
  };
  // check if wallet is connect
  const checkIfWalletConnected = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        return console.log('MetaMask is not install');
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await signer.getAddress();
      const { chainId } = await provider.getNetwork();
      if (chainId && chainId !== 11155111) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: networks[11155111].chainId }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networks[11155111]],
              });
            } catch (addError) {
              if (addError.code === 4001) {
                console.error('Please approve Songbird network.');
              } else {
                console.error(addError);
              }
            }
          } else {
            console.error(switchError);
          }
        }
      }

      if (accounts) {
        setCurrentAccount(accounts);
      } else {
        console.log('No Account Found');
      }
    } catch (error) {
      console.log('something wrong while connecting to wallet');
    }
  };
  useEffect(() => {
    checkIfWalletConnected();
  }, []);
  // connect wallet

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        return console.log('Install MetaMask!');
      }
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log('Something wrong with connection');
    }
  };
  return (
    <CrowdFundingContext.Provider
      value={{
        titleData,
        currentAccount,
        createCompaign,
        getDonation,
        donate,
        getCompaigns,
        getUserCompaigns,
        checkIfWalletConnected,
        connectWallet,
      }}
    >
      {children}
    </CrowdFundingContext.Provider>
  );
};
