export default () => ({
  port: process.env.PORT || 3000,
  kairos: {
    rpcUrl: process.env.KAIROS_TESTNET_URL || 'http://localhost:8545', // Default to local
    privateKey: process.env.PRIVATE_KEY, // For signing transactions (USE WITH CAUTION)
    contractAddress: process.env.CONTRACT_ADDRESS,
  },
});
