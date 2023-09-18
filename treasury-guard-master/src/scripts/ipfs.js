import * as ipfsClient from "ipfs-http-client"
require('dotenv').config()

// model for drawing charts
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

// IPFS storage
class Ipfs {

    constructor(ipfsStorageContract) {
        this.ipfsStorageContract = ipfsStorageContract

        const projectId = process.env.INFURA_PROJECT_ID
        const projectSecret = process.env.INFURA_PROJECT_SECRET
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
        const chartPoints = await this.getChartPoints(cid)
        console.log("Point " + chartPoints);
        chartPoints.add(chartPoint)
        const jsonString = JSON.stringify(chartPoints)
        console.log("jsonString " + jsonString);
        await this.client.pin.rmAll(cid)
        await this.client.add(jsonString).then((res) => {
            const cidV0 = res.cid.toV0().toString()
            console.log("cidV0 " + cidV0);
            this.ipfsStorageContract.saveCIDForChest(cidV0, chestAddress)
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

export { Ipfs, ChartPoint }
