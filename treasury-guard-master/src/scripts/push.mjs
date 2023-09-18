import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import * as dotenv from "dotenv";
dotenv.config()

const PK = ""
const pk = `0x${PK}`
const _signer = new ethers.Wallet(pk)

async function main() {
    try {
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer: _signer,
            type: 3, // broadcast
            identityType: 2, // direct payload
            notification: {
                title: `[SDK-TEST] notification TITLE:`,
                body: `[sdk-test] notification BODY`
            },
            payload: {
                title: `[sdk-test] payload title`,
                body: `sample msg body`,
                cta: '',
                img: ''
            },
            recipients: "0x12bb12903ec37423a5429ac9Cf23B1A9A57292dC",
            channel: 'eip155:5:0x7988ba7A5C1993f40271bA4463BF8043d5cfaa0C', // your channel address
            env: 'staging'
        });
        const notifications = await PushAPI.user.getFeeds({
            user: 'eip155:5:0x12bb12903ec37423a5429ac9Cf23B1A9A57292dC', // user address in CAIP
            env: 'staging',
            spam: true
        });
        console.log(" " + JSON.stringify(notifications))
    } catch (err) {
        console.error('Error: ', err);
    }
}

(async () => {
    try {
        await main();
    } catch (e) {
        // Deal with the fact the chain failed
    }
    // `text` is not available here
})();


