// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { util } = require("chai");
const { utils } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {

  [per1,per2,per3,per4] = await ethers.getSigners()

//   let Router ="0xE592427A0AEce92De3Edee1F18E0157C05861564";
//   let Factory="0x1F98431c8aD98523631AE4a59f267346ea31F984";
  
//   router = await ethers.getContractAt("ISwapRouter",Router);
//   factory = await ethers.getContractAt("IUniswapV3Factory",Factory);
  
  const tokenA = await hre.ethers.getContractFactory("tokenA");
  const TokenA = await tokenA.deploy();
  await TokenA.deployed();
  console.log(`this is token A address`,TokenA.address);

  const tokenB = await hre.ethers.getContractFactory("tokenB");
  const TokenB = await tokenB.deploy();
  await TokenB.deployed();
  console.log(`this is token B address`,TokenB.address);
  

// // console.log("router",router);
// // console.log("factory",factory);


// factory.createPool(TokenA.address,TokenB.address,3);
// const get = await factory.getPool(TokenA.address,TokenB.address,3);
// console.log("get",get)

const Web3 = require('web3');
const UniswapV3Factory = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json');
const WETH9 = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/IWETH9.sol/IWETH9.json');

const provider = new Web3.providers.HttpProvider("https://eth-mainnet.g.alchemy.com/v2/");
const web3 = new Web3(provider);

const factoryAddress = '0x1F98431c8aD98523631AE4a59f267346ea31F984';
const factory = new web3.eth.Contract(UniswapV3Factory.abi, factoryAddress);

const token0 = TokenA.address;
const token1 = TokenB.address;
const fee = 3000;
const tickSpacing = 60;

const tx = await factory.methods.createPool(token0, token1, fee).send({ from: per1.address});
const poolAddress = tx.events.PoolCreated.returnValues.pool;

// const pool = new web3.eth.Contract(UniswapV3Pool.abi, poolAddress);
// const amount0Desired = web3.utils.toWei('100', 'ether');
// const amount1Desired = web3.utils.toWei('1000', 'ether');
// const amount0Min = web3.utils.toWei('90', 'ether');
// const amount1Min = web3.utils.toWei('900', 'ether');
// const deadline = Math.floor(Date.now() / 1000) + 3600;
// const tickLower = -1 * tickSpacing;
// const tickUpper = tickSpacing;

// await weth.methods.deposit().send({ value: amount0Desired, from: per1.address });
// await weth.methods.approve(poolAddress, amount0Desired).send({ from: per1.address });

// await token1.methods.approve(poolAddress, amount1Desired).send({ from: per1.address });

// await pool.methods.mint(YOUR_ADDRESS, tickLower, tickUpper, amount0Desired, amount1Desired, amount0Min, amount1Min).send({ from: YOUR_ADDRESS, deadline });




//   const _value = ethers.utils.parseEther('10000')
//   await TokenA.approve(router.address, _value);
//   await TokenB.approve(router.address, _value); 


//   await router.addLiquidity(
//     TokenA.address,
//     TokenB.address,
//     _value, 
//     _value,
//     _value, 
//     _value,
//     per1.getAddress(),
//     Math.floor(Date.now()/1000)+60*10);

//   pair = await ethers.getContractAt("IPancakePair",get);
//   const balance= await pair.balanceOf(per1.getAddress());


//   const value = ethers.utils.parseEther("1000");
//   const tranfer = await TokenA.transfer(per2.getAddress(),value);
//   const balacesA = await TokenA.balanceOf(per2.address);
//   console.log("this is balacne of per2 TokenA before swape ",balacesA.toString());
//   const balacesBs = await TokenB.balanceOf(per2.getAddress());
//   console.log("this is balanc of per2 tokenB before swape ",balacesBs.toString());

  
//   const query1 = await pair.getReserves();
//   let price1 = query1[1]/query1[0];
//   console.log(`if you wanna buy token A you have to give ${price1} of Token B`);

//   let price2 = query1[0]/query1[1];
//   console.log(`if you wanna buy token B you have to give ${price2} of Token A`);
  
// console.log("Buying Token B......")
//   const value2 = ethers.utils.parseEther(`900`)
//   const approve = await TokenA.connect(per2).approve(router.address,value);
//   const getamount = await router.connect(per2).getAmountsIn(value2,[TokenA.address,TokenB.address]);
//   const tx = await router.connect(per2).swapExactTokensForTokens(
//     getamount[0].toString(),
//     getamount[1].toString(),
//     [TokenA.address,TokenB.address],
//     per2.getAddress(),
//     Math.floor(Date.now()/1000)+60*10);
//   console.log("successs");

//   const query2 = await pair.getReserves();
//   let price0 = query2[1]/query2[0];
//   console.log(`if you wanna buy token A you have to give ${price0} of Token B`);

//   let price3 = query2[0]/query2[1];
//   console.log(`if you wanna buy token B you have to give ${price3} of Token A`);
  
//   const balacesA1 = await TokenA.balanceOf(per2.address);
//   console.log("this is balacne of per2 TokenA after swape ",balacesA1.toString());
//   const balacesB2 = await TokenB.balanceOf(per2.getAddress());
//   console.log("this is balanc of per2 tokenB after swape ",balacesB2.toString());


  
//   console.log("Buying Token A......")
//   const balacesB = await TokenB.balanceOf(per2.address);
//    console.log("this is balacne of per2 TokenB ",balacesB.toString());
//   const value22 = ethers.utils.parseEther("900")
//   const approve1 = await TokenB.connect(per2).approve(router.address,value22);
//   const getamount1 = await router.connect(per2).getAmountsIn(value22,[TokenB.address,TokenA.address]);
//   console.log("this is givin amountIN  ",getamount1[0].toString());
//   console.log("this is teken amountOut ",getamount1[1].toString());
//   const tx1 = await router.connect(per2).swapExactTokensForTokens(
//     getamount1[0].toString(),
//     getamount1[1].toString(),
//     [TokenB.address,TokenA.address],
//     per2.getAddress(),
//     Math.floor(Date.now()/1000)+60*10);
//   console.log("successs");

//   const query3 = await pair.getReserves();
//   let price4 = query3[1]/query3[0];
//   console.log(`if you wanna buy token A you have to give ${price4} of Token B`);

//   let price33 = query3[0]/query3[1];
//   console.log(`if you wanna buy token B you have to give ${price33} of Token A`);
//   const balacesA2 = await TokenA.balanceOf(per2.address);
//   console.log("this is balacne of per2 TokenA back swape ",balacesA2.toString());
//   const balacesB3 = await TokenB.balanceOf(per2.getAddress());
//   console.log("this is balanc of per2 tokenB back swape ",balacesB3.toString());












  
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
