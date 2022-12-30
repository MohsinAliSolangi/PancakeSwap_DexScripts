// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");


const fac = "0xca143ce32fe78f1f7019d7d551a6402fc5350c73"
const rou = "0x10ED43C718714eb63d5aA57B78B54704E256024E"

async function main() {
 // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("start")
  // BUSD = await ethers.getContractFactory("BUSD")  
  // console.log("1")
  // busd = await BUSD.deploy()
  // console.log("2")
  // await busd.deployed() 
  // console.log("busd",busd.address)
  factory = await ethers.getContractAt("Factory",fac)  

  router = await ethers.getContractAt("Router",rou)  

  TokenA = await ethers.getContractFactory("TokenA")  
  console.log("1")
  tokenA = await TokenA.deploy()
  console.log("2")
  await tokenA.deployed()
  console.log("tokenA",tokenA.address)

  TokenB = await ethers.getContractFactory("TokenB")  
  console.log("1")
  tokenB = await TokenB.deploy()
  console.log("2")
  await tokenB.deployed()
  console.log("tokenB",tokenB.address)

  // const pairAddress = await factory.createPair.call(token1.address, token2.address);
  const tx = await factory.createPair(tokenA.address, tokenB.address);
  const pairAddress= await factory.getPair(tokenA.address, tokenB.address);
  const value = ethers.utils.parseEther("10000")
  console.log("pairAddress",pairAddress)
  await tokenA.approve(router.address, value);
  await tokenB.approve(router.address, value); 
   
  await router.addLiquidity(
    tokenA.address,
    tokenB.address,
    value,
    value,
    value,
    value,
    deployer.getAddress(),
    Math.floor(Date.now() / 1000) + 60 * 10
  );

  pair = await ethers.getContractAt("Pair",pairAddress)  
  const balance = await pair.balanceOf(deployer.getAddress()); 
  console.log(`balance LP: ${balance.toString()}`);
  const value2 = ethers.utils.parseEther("1000")
   await tokenA.transfer(per1.address,value2)
  const checkingBalance = await tokenA.balanceOf(per1.address)
  console.log("Balance of A",checkingBalance.toString())
  const checkingBalance2 = await tokenB.balanceOf(per1.address)
  console.log("Balance of B",checkingBalance2.toString())
  const accounts = await ethers.getSigners();
  const SecondAccount = await router.connect(accounts[1])
  const SecondAccount2 = await tokenA.connect(accounts[1])
  await SecondAccount2.approve(router.address, value2);
  const value3 = ethers.utils.parseEther("900")
  const tx2 = await SecondAccount.getAmountsIn(value3,[tokenA.address,tokenB.address])
     console.log("result",tx2)
    const tx3 = await SecondAccount.swapExactTokensForTokens(tx2[0],tx2[1],[tokenA.address,tokenB.address],per1.address, Math.floor(Date.now() / 1000) + 5 * 10)
    console.log("acc 2 balance of tokenA", await tokenA.balanceOf(per1.address)) 
    console.log("acc 2 balance of tokenB", await tokenB.balanceOf(per1.address))
    const tx4 = await SecondAccount.getAmountsIn(value3,[tokenA.address,tokenB.address])
    console.log("2nd estimation",tx4)


}




main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby