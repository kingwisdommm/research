export default () => ({
  port: process.env.PORT || 3000,
  kairos: {
    rpcUrl: process.env.KAIROS_TESTNET_URL || 'http://localhost:8545', // Default to local
    privateKey: process.env.PRIVATE_KEY, // For signing transactions (USE WITH CAUTION)
    socketUrl: process.env.KAIROS_TESTNET_SOCKET_URL || 'http://localhost:8545', // Default to local
    signerPrivateKey: process.env.SIGNER_PRIVATE_KEY, // For signing transactions (USE WITH CAUTION)
    contractAddress: process.env.CONTRACT_ADDRESS,
  },
});
