import EIP155Lib from "../lib/EIP155Lib";

export let wallet1
export let eip155Wallets
export let eip155Addresses

let address1

/**
 * Utilities
 */
export function createOrRestoreEIP155Wallet() {
    const mnemonic = localStorage.getItem("EIP155_MNEMONIC_1")

    if (mnemonic) {
        wallet1 = EIP155Lib.init({ mnemonic: mnemonic })
    } else {
        wallet1 = EIP155Lib.init({})

        // Don't store mnemonic in local storage in a production project!
        localStorage.setItem("EIP155_MNEMONIC_1", wallet1.getMnemonic())
    }

    address1 = wallet1.getAddress()

    eip155Wallets = {
        [address1]: wallet1,
    }
    eip155Addresses = Object.keys(eip155Wallets)

    return {
        eip155Wallets,
        eip155Addresses
    }
}
