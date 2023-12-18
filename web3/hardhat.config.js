require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.19',
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/Qe_VE6R98jL7sBiUgRbdCeKcu4dJbmAP`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
