# Safe

**Plugins**

Example: https://github.com/5afe/safe-core-protocol-demo/blob/main/contracts/contracts/Plugins.sol

**SafeModuleManager** 

https://goerli.etherscan.io/address/0x9EFbBcAD12034BC310581B9837D545A951761F5A#code

**SafeProtocolRegistry**

https://goerli.etherscan.io/address/0x9EFbBcAD12034BC310581B9837D545A951761F5A

**Hooks**

https://docs.safe.global/safe-core-protocol/hooks

https://github.com/safe-global/safe-core-protocol-specs/blob/main/integrations/README.md#hooks

Implement 

Deploy hook

Call it onto the SafeModuleManager using setHooks using its module manager address.

Only one hook per safe possible atm, but we could generate an aggregate hook which in turn calls other hook contracts.

Other links:

https://safe-global.notion.site/Safe-Hackathon-Success-Guide-26ccbd7263ab44808d8f00106f35c2d7
https://github.com/5afe/safe-core-protocol-demo/blob/main/contracts/contracts/Plugins.sol#L70


Each organization gets a Safe Account
The safe account deploys the hook and the plugin

how can I create a safe account? 
accounts need to activate the hook individually?

