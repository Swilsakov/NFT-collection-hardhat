// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721Enumerable, Ownable {
  using Strings for uint256;
  uint256 public maxSupply = 10;
  uint256 public cost = 0.001 ether;
  string public baseURI = "ipfs://QmPSJdvnwrGQHh9Y9Rpw2ErDaWp6hatjkhyLaJ8zLh9mQ3/";

  constructor() ERC721("Crypto Ananas", "CA") {}

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    _requireMinted(tokenId);
    return bytes(baseURI).length > 0
      ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
      : "";
  }

  function safeMint(address _to) public payable {
    require(totalSupply() < maxSupply, "Maximum supply reached");
    require(msg.value == cost, "Please add valid amount of BNB");
    _safeMint(_to, totalSupply());
  }
  
  function tokenPrice() public view returns (uint256) {
    return cost;
  }
  
  function setMaxSupply(uint256 _maxSupply) external onlyOwner {
    maxSupply = _maxSupply;
  }

  function withdraw() public onlyOwner {
    (bool success, ) = payable(msg.sender).call{ value: address(this).balance }("");
    require(success, "Withdrawal failed");
  }
}
