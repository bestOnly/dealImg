const pako = require('pako')

/*
// Deflate
//
const input = new Uint8Array()
//... fill input data here
const output = pako.deflate(input)

const compressed = new Uint8Array()
try {
  const result = pako.inflate(compressed)
  // ... continue processing
} catch (err) {
  console.log(err)
}

const deflator = new pako.Deflate()

deflator.push(chunk1, false)
deflator.push(chunk2), false
deflator.push(chunk_last, true) // `true` says this chunk is last

if (deflator.err) {
  console.log(deflator.msg)
}

const output = deflator.result

const inflator = new pako.Inflate()

inflator.push(chunk1)
inflator.push(chunk2)
inflator.push(chunk_last) // no second param because end is auto-detected

if (inflator.err) {
  console.log(inflator.msg)
}

const output = inflator.result

*/

function unzip(b64Data) {
  var strData = atob(b64Data)
  // Convert binary string to character-number array
  var charData = strData.split('').map(function (x) {
    return x.charCodeAt(0)
  })
  // Turn number array into byte-array
  var binData = new Uint8Array(charData)
  // // unzip
  var data = pako.inflate(binData)
  // Convert gunzipped byteArray back to ascii string:
  strData = String.fromCharCode.apply(null, new Uint16Array(data))
  return decodeURIComponent(strData)
}
function zip(str) {
  var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' })
  return btoa(binaryString)
}

zip('123aadv')
