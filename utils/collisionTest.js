const bcrypt = require("bcryptjs");
const { HashSecret } = require('../authConfig/secrets')
let dict = {}

for (let i = 1; i <= 350; i++) {
    const hash = bcrypt.hashSync(HashSecret + i.toString(), 10)
    let sanityTest = 1
    if (dict.hasOwnProperty(hash)) {
        console.log(`Collision found: ${hash}= ${dict[hash]} and ${i}`)
        return
    } else {
        dict[hash] = i
    }

}

console.log(dict)
console.log('No collisions found.')
return