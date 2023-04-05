# Sample NFT Collection on Hardhat

This is a Sample NFT Collection built on Ethereum using the ERC721 standard. It allows users to buy, sell, and trade non-fungible tokens. The Collection has been deployed on the BNB testnet.

## Getting Started

### Prerequisites
To run this project, you will need the following:

+ Node.js and npm
+ Metamask browser extension
+ A BNB testnet wallet with test token


### Installing
1. Clone the repository:
```
 git clone https://github.com/Swilsakov/NFT-collection-hardhat/
```

2. Install dependencies:
```
cd NFT-collection-hardhat
npm install
```
3. Create a .env file and set the following variables:
```
PRIVATE_KEY=<Your private key wallet>
ETHERSCAN_API_KEY=<Your Etherscan private key>
NETWORK_URL=<Network url>
```

### Usage
1. Compile and deploy the smart contract:
```
npx hardhat compile
npx hardhat run scripts/deploy.js --network bnbt
```
