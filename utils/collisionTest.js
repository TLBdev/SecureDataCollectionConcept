const bcrypt = require("bcryptjs");
const { HashSecret } = require('../authConfig/secrets')

let dict = {}
let collisionFound = false
let sanityTest = 1
collisionLocation = null

for (let i = 1; i <= 1000; i++) {
    const hash = bcrypt.hashSync(HashSecret + i.toString(), 10)

    if (dict.hasOwnProperty(hash)) {
        collisionFound = true
        collisionLocation = i
        break
    } else {
        dict[hash] = i
    }

}

console.log(dict)

if (collisionFound) {
    console.log(`Collision found: ${hash} = ${dict[hash]} and ${collisionLocation}`)
} else {
    console.log('No collisions found.')
}


return