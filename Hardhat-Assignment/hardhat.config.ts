import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { PRIVATE_KEY, ETHERSCAN_KEY, SEPOLIA_URL_KEY, CORE_TESTNET_URL, CORE_SCAN_API_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_URL_KEY || "https://rpc.sepolia.org",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    coreTestnet: {
      url: CORE_TESTNET_URL || "https://rpc.testnet.coredao.org",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
      chainId: 1114, // Core Testnet chain ID
      timeout: 60000,
      gasPrice: "auto", // Optional: Let Hardhat estimate gas price
      // maxPriorityFeePerGas: 1000000000, // 1 Gwei (matches the minimum required)
      // maxFeePerGas: 2000000000,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEY || "",
      coreTestnet: CORE_SCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "coreTestnet",
        chainId: 1114,
        urls: {
          apiURL: `https://api.testnet.coredao.org/api`,
          browserURL: "scan.test2.btcs.network",
        },
      },
    ],
  },
};

export default config;