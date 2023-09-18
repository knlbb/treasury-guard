import * as ipfsClient from "ipfs-http-client"
import * as dotenv from "dotenv"
import * as ethers from "ethers"
import * as fs from "fs"
dotenv.config()
const PK = ""

const IPFS_STORAGE_ABI = JSON.parse(fs.readFileSync("../abis/ipfs-storage.json"))
const IPFS_STORAGE_ADDRESS = "0xcc82d8DcB01511064009d924eAdeb3Af92B22fB1"

class ChartPoint {
    constructor(
        // time millis
        dateTime,
        // chest balance
        totalBalance,
        // array of participants balances
        personalBalances,
    ) {
        this.dateTime = dateTime
        this.totalBalance = totalBalance
        this.personalBalances = personalBalances
    }
}

class Ipfs {

    constructor(ipfsStorageContract) {
        this.ipfsStorageContract = ipfsStorageContract

        const projectId = "2Su3XKNgJ7ALcECAkqiYMOiS2Xj"
        const projectSecret = ""
        const auth =
            'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
        this.client = ipfsClient.create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        })
    }

    async addChartPoint(chartPoint, chestAddress) {
        const cid = await this.getCidForChest(chestAddress)
        console.log("CID " + cid);
        let chartPoints = [];
        if (cid) {
            chartPoints = await this.getChartPoints(cid)
        }
        console.log("Point " + chartPoints);
        chartPoints.push(chartPoint)
        const jsonString = JSON.stringify(chartPoints)
        console.log("jsonString " + jsonString);
        if (cid) {
            await this.client.pin.rm(cid)
        }
        await this.client.add(jsonString).then((res) => {
            const cidV0 = res.cid.toV0().toString()
            console.log("cidV0 " + cidV0);
            this.ipfsStorageContract.saveCIDForChest(cidV0, chestAddress)
            console.log("chest " + await this.getCidForChest(chestAddress))
        });
    }

    async getCidForChest(chestAddress) {
        return this.ipfsStorageContract.getCidForChest(chestAddress)
    }

    async getChartPoints(cid) {
        const resp = await this.client.cat(cid)
        let content = []
        for await (const chunk of resp) {
            content = [...content, ...chunk]
        }
        const raw = Buffer.from(content).toString('utf8')
        return JSON.parse(raw)
    }
}

async function main() {
    console.log("start")
    try {
        const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/9buKzfPcSOCZtwf0HAoXvR44xVDXUhWb");
        console.log("start")
        const signer = new ethers.Wallet(PK, provider);
        const ipfsStorageContract = new ethers.Contract(IPFS_STORAGE_ADDRESS, IPFS_STORAGE_ABI, signer);
        const ipfs = new Ipfs(ipfsStorageContract)
        await ipfs.addChartPoint(
            new ChartPoint(
                Date.now(),
                20,
                [
                    10,
                    6,
                    4
                ]
            ),
            IPFS_STORAGE_ADDRESS
        )
    } catch (e) {
        console.log("" + e)
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
