pragma solidity ^0.8.19;

import "safe-core-protocol/interfaces/Integrations.sol";
import "safe-core-protocol/interfaces/Accounts.sol";
import "safe-core-protocol/DataTypes.sol";
import "safe-core-protocol/base/HooksManager.sol";
import "safe-core-protocol/interfaces/Manager.sol";

enum MetadataProviderType {
    IPFS,
    URL,
    Contract,
    Event
}

interface IMetadataProvider {
    function retrieveMetadata(bytes32 metadataHash) external view returns (bytes memory metadata);
}

struct PluginMetadata {
    string name;
    string version;
    bool requiresRootAccess;
    string iconUrl;
    string appUrl;
}

library PluginMetadataOps {
    function encode(PluginMetadata memory data) internal pure returns (bytes memory) {
        return
            abi.encodePacked(
                uint8(0x00), // Format
                uint8(0x00), // Format version
                abi.encode(data.name, data.version, data.requiresRootAccess, data.iconUrl, data.appUrl) // Plugin Metadata
            );
    }

    function decode(bytes calldata data) internal pure returns (PluginMetadata memory) {
        require(bytes16(data[0:2]) == bytes16(0x0000), "Unsupported format or format version");
        (string memory name, string memory version, bool requiresRootAccess, string memory iconUrl, string memory appUrl) = abi.decode(
            data[2:],
            (string, string, bool, string, string)
        );
        return PluginMetadata(name, version, requiresRootAccess, iconUrl, appUrl);
    }
}

abstract contract BasePlugin is ISafeProtocolPlugin {
    using PluginMetadataOps for PluginMetadata;

    string public name;
    string public version;
    bool public immutable requiresRootAccess;
    bytes32 public immutable metadataHash;

    constructor(PluginMetadata memory metadata) {
        name = metadata.name;
        version = metadata.version;
        requiresRootAccess = metadata.requiresRootAccess;
        metadataHash = keccak256(metadata.encode());
    }
}

abstract contract BasePluginWithStoredMetadata is BasePlugin, IMetadataProvider {
    using PluginMetadataOps for PluginMetadata;

    bytes private encodedMetadata;

    constructor(PluginMetadata memory metadata) BasePlugin(metadata) {
        encodedMetadata = metadata.encode();
    }

    function retrieveMetadata(bytes32 _metadataHash) external view override returns (bytes memory metadata) {
        require(metadataHash == _metadataHash, "Cannot retrieve metadata");
        return encodedMetadata;
    }

    function metadataProvider() public view override returns (uint256 providerType, bytes memory location) {
        providerType = uint256(MetadataProviderType.Contract);
        location = abi.encode(address(this));
    }
}

abstract contract BasePluginWithEventMetadata is BasePlugin {
    using PluginMetadataOps for PluginMetadata;

    event Metadata(bytes32 indexed metadataHash, bytes data);

    constructor(PluginMetadata memory metadata) BasePlugin(metadata) {
        emit Metadata(metadataHash, metadata.encode());
    }

    function metadataProvider() public view override returns (uint256 providerType, bytes memory location) {
        providerType = uint256(MetadataProviderType.Event);
        location = abi.encode(address(this));
    }
}

contract TestPlugin is BasePluginWithEventMetadata {

    uint256 nonce = 1;
    event TransactionExecuted();
    event ExecutionTriggered();

    constructor()
        BasePluginWithEventMetadata(
            PluginMetadata({
                name: "Test Plugin",
                version: "1.0.0",
                requiresRootAccess: false,
                iconUrl: "",
                appUrl: "https://treasure-guard-demo/#/relay/${plugin}"
            })
        )
    {} 

    function executeFromPlugin(ISafeProtocolManager manager, ISafe safe, uint256 amount) external {
        emit ExecutionTriggered();
        SafeProtocolAction[] memory actions = new SafeProtocolAction[](1);
        actions[0].to = payable(0x25238221BE3C80b7dDCD22CCB2Ff32cff32ecF91);
        actions[0].value = amount;
        actions[0].data = "";
        SafeTransaction memory safeTx = SafeTransaction({actions: actions, nonce: nonce, metadataHash: bytes32(0)});
        manager.executeTransaction(safe, safeTx);
        nonce += 1;
        emit TransactionExecuted();
    }
}


