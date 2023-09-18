import { Core } from "@walletconnect/core"
import { Web3Wallet } from "@walletconnect/web3wallet"

export let web3wallet
export let core

export async function createWeb3Wallet() {
    core = new Core({
        logger: "debug",
        projectId: "affdbbd6d7616bde35171854383e0636",
    })

    web3wallet = await Web3Wallet.init({
        core,
        metadata: {
            name: "React Web3Wallet",
            description: "React Web3Wallet for WalletConnect",
            url: "https://walletconnect.com/",
            icons: ["https://avatars.githubusercontent.com/u/37784886"]
        }
    })
}

export async function pair(params) {
    console.log('pairing URI', "wc:f7db20d8a5b41c74ffdb548b2a803f2ae7fc8a966bdef6d058163159f1f7d647@2?relay-protocol=irn&symKey=1e5dded0506dca7fda7c33e497859540ef586ccee2f18a9f37225b6655f74b61")

    return await core.pairing.pair({ uri: "wc:f7db20d8a5b41c74ffdb548b2a803f2ae7fc8a966bdef6d058163159f1f7d647@2?relay-protocol=irn&symKey=1e5dded0506dca7fda7c33e497859540ef586ccee2f18a9f37225b6655f74b61" })
}
