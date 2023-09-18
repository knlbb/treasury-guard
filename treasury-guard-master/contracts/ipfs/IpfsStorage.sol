// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract IpfsStorage is Ownable  {

    uint256 private tax = 0;

    mapping (address => string) private cids;

    function saveCIDForChest(string calldata cid, address chestAddress) public {
        cids[chestAddress] = cid;
    }

    function getCidForChest(address chestAddress) public view returns (string memory) {
        return cids[chestAddress];
    }

    function setTax(uint256 newTax) public onlyOwner {
        tax = newTax;
    }

    function getTax()  public view returns (uint256) {
        return tax;
    }
}
