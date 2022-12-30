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

  let Router ="0x10ED43C718714eb63d5aA57B78B54704E256024E";
  let Factory="0xca143ce32fe78f1f7019d7d551a6402fc5350c73";
  
  router = await ethers.getContractAt("IPancakeRouter02",Router);
  factory = await ethers.getContractAt("IPancakeFactory",Factory);
  
  const tokenA = await hre.ethers.getContractFactory("tokenA");
  const TokenA = await tokenA.deploy();
  await TokenA.deployed();
  console.log(`this is token A address`,TokenA.address);

  const tokenB = await hre.ethers.getContractFactory("tokenB");
  const TokenB = await tokenB.deploy();
  await TokenB.deployed();
  console.log(`this is token B address`,TokenB.address);
  
  factory.createPair(TokenA.address,TokenB.address);
  const get = await factory.getPair(TokenA.address,TokenB.address);
  //console.log("this is pair address",get);
  //console.log("this is pairses address +++++++++++:", await factory.allPairs(30));

  const _value = ethers.utils.parseEther('10000')
  await TokenA.approve(router.address, _value);
  await TokenB.approve(router.address, _value); 
  //const allowanceA= await TokenA.allowance(per1.address,router.address);
  //console.log("this is allownce of A",allowanceA.toString());
  //const allowanceB= await TokenB.allowance(per1.address,router.address);
  //console.log("this is allownce of B",allowanceB.toString());

  await router.addLiquidity(
    TokenA.address,
    TokenB.address,
    _value, 
    _value,
    _value, 
    _value,
    per1.getAddress(),
    Math.floor(Date.now()/1000)+60*10);

  pair = await ethers.getContractAt("IPancakePair",get);
  const balance= await pair.balanceOf(per1.getAddress());

  //PairContract = await ethers.getContractAt("IPancakePair",pair);
  
  // const query = await pair.getReserves();
  // let price = query[1]/query[0];
  // console.log("this is price of pair",price);
  // console.log("this is token0 addresss", await pair.token0());
  // console.log("this is token1 addresss", await pair.token1());



  //console.log("this is ",balance.toString());
  const value = ethers.utils.parseEther("1000");
  const tranfer = await TokenA.transfer(per2.getAddress(),value);
  const balacesA = await TokenA.balanceOf(per2.address);
  console.log("this is balacne of per2 TokenA before swape ",balacesA.toString());
  const balacesBs = await TokenB.balanceOf(per2.getAddress());
  console.log("this is balanc of per2 tokenB before swape ",balacesBs.toString());
  // const value2 = ethers.utils.parseEther("900")
  // const approve = await TokenA.connect(per2).approve(router.address,value);
  // const getamount = await router.connect(per2).getAmountsIn(value2,[TokenA.address,TokenB.address]);
  // console.log("this is getAmount ",getamount);
  // const tx = await router.connect(per2).swapExactTokensForTokens(
  //   getamount[0],
  //   getamount[1],
  //   [TokenA.address,TokenB.address],
  //   per2.getAddress(),
  //   Math.floor(Date.now()/1000)+60*10);
  // console.log("successs");
  // console.log("this is balance of Tokens after swaping A", await TokenA.balanceOf(per2.address));
  // console.log("this is balance of Tokens after swaping B", await TokenB.balanceOf(per2.address));
  // const tx2 = await router.connect(per2).getAmountsIn(value2,[TokenA.address,TokenB.address]);
  // console.log("2nd estimation",tx2);
  
  const query1 = await pair.getReserves();
  let price1 = query1[1]/query1[0];
  console.log(`if you wanna buy token A you have to give ${price1} of Token B`);
  // const query2 = await pair.getReserves();
  let price2 = query1[0]/query1[1];
  console.log(`if you wanna buy token B you have to give ${price2} of Token A`);
  
console.log("Buying Token B......")
  const value2 = ethers.utils.parseEther(`900`)
  const approve = await TokenA.connect(per2).approve(router.address,value);
  const getamount = await router.connect(per2).getAmountsIn(value2,[TokenA.address,TokenB.address]);
  //console.log("this is getAmount ",getamount);
  const tx = await router.connect(per2).swapExactTokensForTokens(
    getamount[0].toString(),
    getamount[1].toString(),
    [TokenA.address,TokenB.address],
    per2.getAddress(),
    Math.floor(Date.now()/1000)+60*10);
  console.log("successs");

  const query2 = await pair.getReserves();
  let price0 = query2[1]/query2[0];
  console.log(`if you wanna buy token A you have to give ${price0} of Token B`);
  // const query2 = await pair.getReserves();
  let price3 = query2[0]/query2[1];
  console.log(`if you wanna buy token B you have to give ${price3} of Token A`);
  
  const balacesA1 = await TokenA.balanceOf(per2.address);
  console.log("this is balacne of per2 TokenA after swape ",balacesA1.toString());
  const balacesB2 = await TokenB.balanceOf(per2.getAddress());
  console.log("this is balanc of per2 tokenB after swape ",balacesB2.toString());


  
  console.log("Buying Token A......")
  const balacesB = await TokenB.balanceOf(per2.address);
   console.log("this is balacne of per2 TokenB ",balacesB.toString());
  const value22 = ethers.utils.parseEther("900")
  const approve1 = await TokenB.connect(per2).approve(router.address,value22);
  const getamount1 = await router.connect(per2).getAmountsIn(value22,[TokenB.address,TokenA.address]);
  console.log("this is givin amountIN  ",getamount1[0].toString());
  console.log("this is teken amountOut ",getamount1[1].toString());
  const tx1 = await router.connect(per2).swapExactTokensForTokens(
    getamount1[0].toString(),
    getamount1[1].toString(),
    [TokenB.address,TokenA.address],
    per2.getAddress(),
    Math.floor(Date.now()/1000)+60*10);
  console.log("successs");

  const query3 = await pair.getReserves();
  let price4 = query3[1]/query3[0];
  console.log(`if you wanna buy token A you have to give ${price4} of Token B`);
  // const query2 = await pair.getReserves();
  let price33 = query3[0]/query3[1];
  console.log(`if you wanna buy token B you have to give ${price33} of Token A`);
  const balacesA2 = await TokenA.balanceOf(per2.address);
  console.log("this is balacne of per2 TokenA back swape ",balacesA2.toString());
  const balacesB3 = await TokenB.balanceOf(per2.getAddress());
  console.log("this is balanc of per2 tokenB back swape ",balacesB3.toString());

  
  }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
