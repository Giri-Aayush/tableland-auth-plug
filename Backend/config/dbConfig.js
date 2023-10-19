// const mysql = require("mysql");
const env = require("dotenv").config();
// const dbConfig = mysql.createConnection({
//   host: "localhost",
//   database: "loginauth",
//   user: process.env.User,
//   password: process.env.PASSWORD,
// });
// dbConfig.connect((error) => {
//   if (error) throw error;
//   console.log("Database connected successfully");
// });

// module.exports = dbConfig;

const ethers = require("ethers");
const tableland = require("@tableland/sdk");

// Set up the provider and wallet using your private key.
let provider = new ethers.providers.JsonRpcProvider(
  "https://capable-winter-paper.matic-testnet.quiknode.pro/152107c19beb0243104885340d25c00808394af7/"
);
let privateKey =
  "0x522c6ab985d1f22f3bf1f918ef1e19cd52e986fa91bfe8c18208d20a00ecbbde"; // Your private key
let wallet = new ethers.Wallet(privateKey, provider);

// Connect the wallet to the provider.
let signer = wallet.connect(provider);

// Create the Tableland database instance using the signer.
const db = new tableland.Database({ signer });

module.exports = db;
