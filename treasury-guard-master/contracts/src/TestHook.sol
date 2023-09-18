pragma solidity ^0.8.19;

import "safe-core-protocol/interfaces/Integrations.sol";
import "safe-core-protocol/interfaces/Accounts.sol";
import "safe-core-protocol/interfaces/Registry.sol";
import "safe-core-protocol/DataTypes.sol";
import "safe-core-protocol/base/HooksManager.sol";
import "@safe-global/safe-core-protocol/contracts/DataTypes.sol";
import "@safe-global/safe-core-protocol/contracts/interfaces/Accounts.sol";
import "@safe-global/safe-core-protocol/contracts/interfaces/Integrations.sol";

contract TestHook is ISafeProtocolHooks {

    event PreCheckCalled(address sender, uint256 executionType, bytes executionMeta);
    event PostCheckCalled(address sender, bool success, bytes preCheckData);
    event PreCheckRootAccessCalled(address sender, uint256 executionType, bytes executionMeta);

    mapping (address => mapping (address => uint)) public _chestsShares;
    mapping (address => uint) public _chestsBalances;

    /**
     * @notice A function that will be called by a Safe before the execution of a transaction if the hooks are enabled
     * @dev Add custom logic in this function to validate the pre-state and contents of transaction for non-root access.
     * @param safe A Safe instance
     * @param tx A struct of type SafeTransaction that contains the details of the transaction.
     * @param executionType uint256
     * @param executionMeta Arbitrary length of bytes
     * @return preCheckData bytes
     */
    function preCheck(
        ISafe safe,
        SafeTransaction calldata tx,
        uint256 executionType,
        bytes calldata executionMeta
    ) external returns (bytes memory preCheckData) {
        emit PreCheckCalled(msg.sender, executionType, executionMeta);
        // address chest = address(safe);
        // address participant = msg.sender;
        // uint chestBalance = _chestsBalances[chest];
        // uint participantShares = _chestsShares[chest][participant];
        require(tx.actions.length > 0 && tx.actions[0].value <= 1 ether, "Insufficient balance: value exceeds shares balance");
    }

    function deposit(
        ISafe safe,
        address participant,
        uint amount
    ) external {
        address chest = address(safe);
        _chestsBalances[chest] += amount;
        _chestsShares[chest][participant] += amount;
    }

    // function addToChest(
    //     ISafe safe,
    //     uint amount
    // ) external {
    //     address chest = address(safe);
    //     uint chestBalance = _chestsBalances[chest];
    //     _chestsBalances[chest] += amount;
    //     address[] participants = safe.getOwners();
    //     for (uint i; i < participants.length; i++) {
    //         uint percent = _chestsBalances[chest][participants[i]] * 100000 / chestBalance;
    //         _chestsParticipants[chest][participants[i]] = amount * percent / 100000;
    //     }
    // }

    /**
     * @notice A function that will be called by a safe before the execution of a transaction if the hooks are enabled and
     *         transaction requies tool access.
     * @dev Add custom logic in this function to validate the pre-state and contents of transaction for root access.
     * @param safe A Safe instance
     * @param rootAccess DataTypes.SafeRootAccess
     * @param executionType uint256
     * @param executionMeta bytes
     * @return preCheckData bytes
     */
    function preCheckRootAccess(
        ISafe safe,
        SafeRootAccess calldata rootAccess,
        uint256 executionType,
        bytes calldata executionMeta
    ) external returns (bytes memory preCheckData) {
        emit PreCheckRootAccessCalled(msg.sender, executionType, executionMeta);
    }

    /**
     * @notice A function that will be called by a safe after the execution of a transaction if the hooks are enabled. Hooks should revert if the post state of after the transaction is not as expected.
     * @dev Add custom logic in this function to validate the post-state after the transaction is executed.
     * @param safe ISafe
     * @param success bool
     * @param preCheckData Arbitrary length bytes that was returned by during pre-check of the transaction.
     */
    function postCheck(ISafe safe, bool success, bytes calldata preCheckData) external {
        emit PostCheckCalled(msg.sender, success, preCheckData);
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return true;
    }
}