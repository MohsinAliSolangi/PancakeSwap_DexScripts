require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require('dotenv').config({path: __dirname+'/.env'})
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

// console.log(process.env.ALCHEMY_API)
// console.log(process.env.privateKey)

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

module.exports = {
  solidity: {
    compilers: [{
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },},
    
    {
    version: "0.6.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },}]
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
      gasPrice: 225000000000,
      forking: {
         url: 'https://eth-mainnet.g.alchemy.com/v2/',
        //url: `https://bsc-dataseed1.binance.org/`,
      },
    },
    // goerli: {
    //   url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API}`,
    //   accounts: [`0x${process.env.privateKey}`],
    // },
    // testnet: {
    //   url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    //   chainId: 97,
    //   gasPrice: 21000000000,
    //   accounts: [`0x${process.env.privateKey}`],
    // },
    // mainnet: {
    //   url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
    //   accounts: [`0x${process.env.privateKey}`],
    // },
  },
  // contractSizer: {
  //   alphaSort: true,
  //   disambiguatePaths: false,
  //   runOnCompile: true,
  //   strict: true,
  //   only: [':Staking$',':HESTOKEN$'],
  // },

  // abiExporter: {
  //   path: '../frontend/src/contract',
  //   runOnCompile: true,
  //   clear: true,
  //   only: [':Staking$',':HESTOKEN$',':IERC20Metadata$',':IUniswapV2Router02$'],
  //   flat: true,
  //   spacing: 2,
  //   pretty: true,
  // },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ""
  },
  mocha: {
    timeout: 1000000
  }
};
