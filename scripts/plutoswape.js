// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");



async function main() {

  const [per1,per2] = await ethers.getSigners();
  
  TokenA = await ethers.getContractFactory("tokenA")  
  tokenA = await TokenA.deploy()
  await tokenA.deployed()
  console.log("tokenA",tokenA.address)
  TokenB = await ethers.getContractFactory("tokenB")  
  tokenB = await TokenB.deploy()
  await tokenB.deployed()
  console.log("tokenB",tokenB.address);

  plutoswape = await ethers.getContractFactory("plutoswape")  
  swape = await plutoswape.deploy()
  await swape.deployed()
  console.log("plutoswape",swape.address);

  // const CreatePaire = await swape.CreatePaire();
  // const getPair = await swape.getPair();
  // console.log("this is pair address ",getPair);
  
  // value = await ethers.utils.parseEther("10000")
  // const transferA = await tokenA.transfer(swape.address,value);
  // const transferB= await tokenB.transfer(swape.address,value);
  // const balanceA=await tokenA.balanceOf(swape.address);
  // const balanceB=await tokenB.balanceOf(swape.address);
  // console.log("this is balance of swapecontract tokenA",balanceA);
  // console.log("this is balance of swapecontract tokenB",balanceB);

 
  // const setapprove= await swape.setApprove();
  const _value = ethers.utils.parseEther('10000');
  await tokenA.approve("0x10ED43C718714eb63d5aA57B78B54704E256024E", _value);
  await tokenB.approve("0x10ED43C718714eb63d5aA57B78B54704E256024E", _value); 
  await tokenA.approve(swape.address, _value); 
  await tokenB.approve(swape.address, _value); 

  const allowanceA= await tokenA.allowance(per1.address,"0x10ED43C718714eb63d5aA57B78B54704E256024E");
  console.log("this is allownce of A",allowanceA.toString());
  const allowanceB= await tokenB.allowance(per1.address,"0x10ED43C718714eb63d5aA57B78B54704E256024E");
  console.log("this is allownce of B",allowanceB.toString());

  const transferTokens = await swape.addLiquidity(tokenA.address,tokenB.address,_value,_value,_value,_value,per1.address,Math.floor(Date.now()/1000)+60*10);
  
  // await router.addLiquidity(
  //   TokenA.address,
  //   TokenB.address,
  //   _value, 
  //   _value,
  //   _value, 
  //   _value,
  //   per1.getAddress(),
  //   Math.floor(Date.now()/1000)+60*10);





}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby