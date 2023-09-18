import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css"
import {ethers} from "ethers";

// biconomy social login sdk instance
let BSLInstance = null;

export async function login() {
    await _initBSLInstance();

    // check if user already logged in
    if (!BSLInstance?.provider) {
        // pops up the UI widget
        BSLInstance.showWallet();
        return null;
    } else {
        // create a provider from the social login provider that
        // will be used by the smart account package of the Biconomy SDK
        const provider = new ethers.providers.Web3Provider(
            BSLInstance.provider,
        );
        // get a list of accounts available with the provider
        const accounts = await provider.listAccounts();
        // check if account is
        if (accounts.length > 0) {
            BSLInstance.hideWallet();
            return accounts;
        }
        return null;
    }
}

async function _initBSLInstance() {
    // check if instance of biconomy sdk is already created
    if (!BSLInstance) {
        // create an instance of SocialLogin
        const socialLogin = new SocialLogin()
        // todo change to host
        const signature1 = await socialLogin.whitelistUrl("http://localhost:3000/")
        // init social login SDK, all params are optional
        await socialLogin.init({
            // todo change chainId - current is testnet
            chainId: "0x13881",
            // todo change to mainnet
            network: "testnet",
            whitelistUrls: {
                // todo change to host
                "http://localhost:3000/": signature1,
            },
        });
        BSLInstance = socialLogin;
    }
}

export async function logout() {
    await _initBSLInstance();
    await BSLInstance.logout();
}

/* EXAMPLE
 * A) LOGIN
 * (async () => {
 *    const accounts = await biconomy.login();
 *    if (accounts) {
 *        console.log("Account address", accounts);
 *    }
 * })();
 *
 * B) LOGOUT
 * (async () => {
 *    await biconomy.logout();
 * })();
 *
 */
