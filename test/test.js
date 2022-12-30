const { ethers } = require("hardhat");

describe("This is pancake swape", function () {

  let tokenA;
  let TokenA;
  let tokenB;
  let TokenB;
  let plutoswape
  let swape
  


  it ("All Smart Contract Deploy here :", async function(){
    
    [per1,per2,per3,per4] = await ethers.getSigners()

    tokenA = await hre.ethers.getContractFactory("tokenA");
    TokenA = await tokenA.deploy();
    await TokenA.deployed();
    console.log(`this is token A address`,TokenA.address);
  
    tokenB = await hre.ethers.getContractFactory("tokenB");
    TokenB = await tokenB.deploy();
    await TokenB.deployed();
    console.log(`this is token B address`,TokenB.address);
    
    plutoswape = await hre.ethers.getContractFactory("plutoswape");
    swape = await plutoswape.deploy();
    await swape.deployed();
    console.log(`this is plutoswape address`,swape.address);
  
  const balance0=await TokenA.balanceOf(per1.address);
  const balance1=await TokenB.balanceOf(per1.address);
  console.log("this is my balanceOf tokenA",balance0);
  console.log("this is my balanceOf tokenB",balance1);

  // const CreatePaire = await swape.CreatePair();
  //  const getPair = await swape.getPair();
  // // console.log("this is pair address ",getPair);
  
  // value = await ethers.utils.parseEther("10000")
  // const transferA = await TokenA.transfer(swape.address,value);
  // const transferB= await TokenB.transfer(swape.address,value);
  // const balanceA=await TokenA.balanceOf(swape.address);
  // const balanceB=await TokenB.balanceOf(swape.address);
  // console.log("this is balance of swapecontract tokenA",balanceA);
  // console.log("this is balance of swapecontract tokenB",balanceB);

 
  //const setapprove= await swape.setApprove();
  // const _value = ethers.utils.parseEther('10000');
  const _value =100000000000;

  await TokenA.approve("0x10ED43C718714eb63d5aA57B78B54704E256024E", _value);
  await TokenB.approve("0x10ED43C718714eb63d5aA57B78B54704E256024E", _value); 
  await TokenA.approve(swape.address, _value); 
  await TokenB.approve(swape.address, _value); 

  const allowanceA= await TokenA.allowance(per1.address,"0x10ED43C718714eb63d5aA57B78B54704E256024E");
  console.log("this is allownce of A",allowanceA.toString());
  const allowanceB= await TokenB.allowance(per1.address,"0x10ED43C718714eb63d5aA57B78B54704E256024E");
  console.log("this is allownce of B",allowanceB.toString());


  const allowance0= await TokenA.allowance(per1.address,swape.address);
  console.log("this is allownce of A",allowance0.toString());
  const allowance1= await TokenB.allowance(per1.address,swape.address);
  console.log("this is allownce of B",allowance1.toString());
  })
  
  it ("this is add liquadity function call  :", async function(){
    const _value =100000000000;
  const transferTokens = await swape.transferTokens(TokenA.address,TokenB.address,_value);
  console.log("transferTokens",transferTokens);
 
    // const setApprove = await swape.CreatePaire();
    // value = await ethers.utils.parseEther("10000")
    // const transfer = await tokenA.transfer(swape.address,value);
    // console.log("success");
  })

  
  


});  