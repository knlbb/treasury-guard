import {ethers} from 'ethers'
import {EthersAdapter} from '@safe-global/protocol-kit'
import {SafeFactory} from '@safe-global/protocol-kit'
import {SafeAccountConfig} from '@safe-global/protocol-kit'
import Safe from '@safe-global/protocol-kit'
import {SafeTransactionDataPartial, OperationType, SafeTransaction} from '@safe-global/safe-core-sdk-types'
import protocolDeployments from "@safe-global/safe-core-protocol"

import SafeApiKit from '@safe-global/api-kit'

// https://chainlist.org/?search=goerli&testnets=true
const RPC_URL = 'https://eth-goerli.public.blastapi.io'
const MANAGER_ADDRESS = "0xAbd9769A78Ee63632A4fb603D85F63b8D3596DF9"
const HOOKS_DATA = "0xfb63daa10000000000000000000000005ed179a6ea66c180a8dfa42e0775d402c0d3b587" // will change in the future
const PLUGIN_DATA = "0x250db3c0000000000000000000000000d450713f617058bddd0828d7afe5c7b64df6003c0000000000000000000000000000000000000000000000000000000000000000" // will change in the future

class LoggingProvider extends ethers.providers.JsonRpcProvider {
    async send(method: string, params: any): Promise<any> {
        console.log('Method:', method);
        console.log('Params:', params);
        return super.send(method, params);
    }
}

const provider = new LoggingProvider(RPC_URL);

// Initialize signers
const owner1Signer = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)

const ethAdapterOwner1 = new EthersAdapter({
    ethers,
    signerOrProvider: owner1Signer
})

const safeApiKit = new SafeApiKit({
    txServiceUrl: 'https://safe-transaction-goerli.safe.global/',
    ethAdapter: ethAdapterOwner1
})

async function create_safe() {
    // const safeAddress = await create_account()
    const safeAddress = "0xe41dC73F3999E0279da02817Cc6cF5868f9Dc329"
    await deposit(safeAddress)
    const safeSdk = await Safe.create({ethAdapter: ethAdapterOwner1, safeAddress: safeAddress})
    await enable_module(safeAddress, safeSdk)
    await enable_hooks_or_plugins(safeAddress, safeSdk, HOOKS_DATA)
    await enable_hooks_or_plugins(safeAddress, safeSdk, PLUGIN_DATA)
}

async function create_account(): Promise<any> {
    const safeFactory = await SafeFactory.create({ethAdapter: ethAdapterOwner1});
    const safeAccountConfig: SafeAccountConfig = {
        owners: [await owner1Signer.getAddress()],
        threshold: 1,
        // ... (Optional params)
    }
    const safeSdkOwner1 = await safeFactory.deploySafe({safeAccountConfig})

    const safeAddress = await safeSdkOwner1.getAddress()

    console.log('Your Safe has been deployed:')
    console.log(`https://goerli.etherscan.io/address/${safeAddress}`)
    console.log(`https://app.safe.global/gor:${safeAddress}`)
    return safeAddress
}

async function deposit(address: string) {

    const safeAmount = ethers.utils.parseUnits('1', 'ether').toHexString()

    const transactionParameters = {
        to: address,
        value: safeAmount
    }

    const tx = await owner1Signer.sendTransaction(transactionParameters)

    console.log('Fundraising.')
    console.log(`Deposit Transaction: https://goerli.etherscan.io/tx/${tx.hash}`)
}

async function enable_module(address: string, safeSdk: Safe) {
    const safeTransaction = await safeSdk.createEnableModuleTx(MANAGER_ADDRESS);
    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
    const senderSignature = await safeSdk.signTransactionHash(safeTxHash)

    await safeApiKit.proposeTransaction({
        safeAddress: address,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: await owner1Signer.getAddress(),
        senderSignature: senderSignature.data,
    })
    await safeApiKit.confirmTransaction(safeTxHash, senderSignature.data);

    const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
    const receipt = await executeTxResponse.transactionResponse?.wait()

    console.log('Transaction executed:')
    if (receipt) {
        console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`)
    }
}

async function enable_hooks_or_plugins(address: string, safeSdk: Safe, encodedData: string) {
    const safeTransactionData: SafeTransactionDataPartial = {
        to: MANAGER_ADDRESS,
        data: encodedData,
        value: "0",
    }
    const safeTransaction: SafeTransaction = await safeSdk.createTransaction({ safeTransactionData })
    const safeTxHash = await safeSdk.getTransactionHash(safeTransaction)
    const senderSignature = await safeSdk.signTransactionHash(safeTxHash)

    await safeApiKit.proposeTransaction({
            safeAddress: address,
            safeTransactionData: safeTransaction.data,
            safeTxHash,
            senderAddress: await owner1Signer.getAddress(),
            senderSignature: senderSignature.data
        }
    )
    await safeApiKit.confirmTransaction(safeTxHash, senderSignature.data)
    const executeTxResponse = await safeSdk.executeTransaction(safeTransaction)
    const receipt = await executeTxResponse.transactionResponse?.wait()

    console.log('Transaction executed:')
    if (receipt) {
        console.log(`https://goerli.etherscan.io/tx/${receipt.transactionHash}`)
    }
}


async function transaction_from_plugin() {
    const pluginAddress = "0x719954B1689BD0AfdeC6E07A6e605d60938f79D3";
    const SAMPLE_PLUGIN_ABI = [
        "function executeFromPlugin(address manager, address safe, bytes calldata data) external"
    ]

    const getTestPlugin = async () => {
        return new ethers.Contract(
            pluginAddress,
            SAMPLE_PLUGIN_ABI,
            owner1Signer
        )
    }

    const plugin = await getTestPlugin();

    const safeProtocolInfo = protocolDeployments[5][0].contracts.TestSafeProtocolManager;

    const manager = new ethers.Contract(
        safeProtocolInfo.address,
        safeProtocolInfo.abi,
        provider
    );

    const amount = ethers.utils.parseUnits('0.1', 'ether').toNumber;

    console.log(manager.address);
    await plugin.executeFromPlugin(manager.address, "0x2DB14E367FbB4EB6B733709756d12De9b0B39B59", amount);
}

transaction_from_plugin();