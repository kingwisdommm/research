import {
    useAccount,
    usePublicClient,
    useWallets,
  } from "@particle-network/connectkit";
  import { parseEther, type Address } from "viem";
  import wagmiAbi from "./abi.json";
  
  const CallTransaction = () => {
    const [primaryWallet] = useWallets();
    const { address } = useAccount();
  
    const publicClient = usePublicClient();
  
    const readTx = async () => {
      if (publicClient) {
        const data = await publicClient.readContract({
          address: "0xD5bFecb0A254bC71bA8C2D9197a25A8c8fA8342a",
          abi: wagmiAbi,
          functionName: "itemCount",
        });
  
        console.log("data :>> ", data);
      }
    };
  
    const executeTx = async () => {
      if (publicClient) {
        const { request } = await publicClient.simulateContract({
          address: "0xD5bFecb0A254bC71bA8C2D9197a25A8c8fA8342a",
          abi: wagmiAbi,
          functionName: "buyItems",
          args: [
            [1],
            [1],
            1737428375,
            "0x48d2335dc5b127e0255548cbf252b7aeb30c62f51d87233090745aed943e706e6fa0dd32e2519dda06d8966ec58f4cc6f6ea20643c45aba8b7383cc45d4dbbe41b",
          ],
          account: address as Address,
          value: parseEther("0.01"),
          //    gasLimit: 3000000,
          //    gasPrice: parseEther("0.000000001"),
        });
        // Get the wallet client and send the transaction
        const walletClient = primaryWallet.getWalletClient();
        await walletClient.writeContract(request);
      }
    };
  
    return (
      <div>
        <button onClick={readTx}>Read itemCount</button>
        <button onClick={executeTx}>Send a transaction</button>
      </div>
    );
  };
  
  export default CallTransaction;