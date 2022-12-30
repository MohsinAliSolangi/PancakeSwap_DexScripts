const { ChainId, Token, WETH, Fetcher, Route } = require('@uniswap/sdk');
const { ethers } = require("hardhat");

async function main() {

const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6)
const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18)
// note that you may want/need to handle this async code differently,
// for example if top-level await is not an option
const USDCWETHPair = await Fetcher.fetchPairData(USDC, WETH[ChainId.MAINNET])
const DAIUSDCPair = await Fetcher.fetchPairData(DAI, USDC)
const route = new Route([USDCWETHPair, DAIUSDCPair], WETH[ChainId.MAINNET])
console.log(route)
console.log(route.midPrice.toSignificant(6)) // 202.081
console.log(route.midPrice.invert().toSignificant(6)) // 0.00494851

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });