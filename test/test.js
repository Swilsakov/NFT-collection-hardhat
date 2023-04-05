const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT", function () {
  let NFT, nftContract, owner;

  beforeEach(async () => {
    NFT = await ethers.getContractFactory("NFT");
    nftContract = await NFT.deploy();
    [owner] = await ethers.getSigners();
  });

  it("should set NFT price correctly", async function () {
    const nftPrice = await nftContract.tokenPrice();
    expect(nftPrice).to.equal(ethers.utils.parseEther("0.001"));
  });

  it("should not allow minting more than the maximum supply", async function () {
    const maxSupply = await nftContract.maxSupply();
    for (let i = 0; i < maxSupply; i++) {
      await nftContract.safeMint(owner.address, {
        value: ethers.utils.parseEther("0.001"),
      });
    }
    await expect(
      nftContract.safeMint(owner.address, {
        value: ethers.utils.parseEther("0.001"),
      })
    ).to.be.revertedWith("Maximum supply reached");
  });

  it("should allow owner to set max supply", async function () {
    const newMaxSupply = 10;
    await nftContract.setMaxSupply(newMaxSupply);
    const maxSupply = await nftContract.maxSupply();
    expect(maxSupply).to.equal(newMaxSupply);
  });

  it("should return correct token URI", async function () {
    await nftContract.safeMint(owner.address, {
      value: ethers.utils.parseEther("0.001"),
    });
    const tokenURI = await nftContract.tokenURI(0);
    expect(tokenURI).to.equal(
      "ipfs://QmPSJdvnwrGQHh9Y9Rpw2ErDaWp6hatjkhyLaJ8zLh9mQ3/0.json"
    );
  });

  it("should return correct token price", async function () {
    const tokenPrice = await nftContract.tokenPrice();
    expect(tokenPrice).to.equal(ethers.utils.parseEther("0.001"));
  });

  it("should allow owner to withdraw contract balance", async function () {
    await nftContract.safeMint(owner.address, {
      value: ethers.utils.parseEther("0.001"),
    });
    const contractBalanceBefore = await ethers.provider.getBalance(
      nftContract.address
    );
    await nftContract.withdraw();
    const contractBalanceAfter = await ethers.provider.getBalance(
      nftContract.address
    );
    expect(contractBalanceBefore).to.not.equal(contractBalanceAfter);
    expect(contractBalanceAfter).to.equal(ethers.BigNumber.from("0"));
  });
});
