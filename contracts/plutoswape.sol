pragma solidity >=0.6.6;

import "./interfaces/IPancakeRouter02.sol";
import "./interfaces/IPancakeFactory.sol";
import "./interfaces/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract plutoswape {
     
    constructor(){
    // address tokenA_, address tokenB_
    // tokenA=tokenA_;
    // tokenB=tokenB_;        
    }

// address tokenA;
// address tokenB;


//address [] temp;
IPancakeRouter02 public Router = IPancakeRouter02(0x10ED43C718714eb63d5aA57B78B54704E256024E);
//IPancakeFactory  factory = IPancakeFactory(0xca143ce32fe78f1f7019d7d551a6402fc5350c73);


// function createPaires() public {
// factory.createPair(tokenA,tokenB);
// }


// function setApprove()public{
//     uint256 amounts = 10000 ether;
//     IERC20(tokenA).approve(msg.sender, amounts);
//     IERC20(tokenB).approve(msg.sender, amounts);
// }


// function CreatePair() public { 
//        // Create a uniswap pair for this new token
//        IPancakeFactory(Router.factory())
//             .createPair(tokenA,tokenB);
//     //  IPancakeFactory(temp.factory())
//     //         .setFeeTo(msg.sender);
//     }


// function getPair() public view returns(address) {        
//    return IPancakeFactory(Router.factory()).getPair(tokenA,tokenB);      
//     }

function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        ){}

        
// function transferTokens(address tokenA, address tokenB,uint256 amountIn) public { 

//     Router.addLiquidity(
//         tokenA,
//         tokenB,
//         amountIn,
//         amountIn,
//         amountIn,
//         amountIn,
//         msg.sender,
//         block.timestamp+3000);
// }

}
