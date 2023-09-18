const fs = require("fs")

export function extractAbiFromFile(fileName) {
    return JSON.parse(fs.readFileSync(fileName))
}
