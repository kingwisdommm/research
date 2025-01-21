// // import { Ethereum } from "@particle-network/chains";
// import { Sei, SeiDevnet, SeiTestnet } from '@particle-network/chains';
// import {
//   ParticleConnect,
//   Provider,
//   coinbase,
//   isEVMProvider,
//   isSolanaProvider,
//   metaMask,
//   rainbow,
//   walletconnect,
// } from "@particle-network/connect";
// import { useCallback, useEffect, useMemo, useState } from "react";

// function ParticleCustomConnect() {
//   const [provider, setProvider] = useState<Provider>();

//   const [connectModal, setConnectModal] = useState(false);
//   const [address, setAddress] = useState<string>();

//   const connectKit = useMemo(() => {
//     return new ParticleConnect({
//       projectId: "e41f824d-c173-49a6-a188-2d3c843f6df6",
//       clientKey: "cL1XJw0uBT3BYXTRxjD5HsVoTvDTznTX6AgELjoX",
//       appId: "3759cb08-f421-43e5-9787-6f709d491714",
//     //   chains: [Ethereum],
//       chains: [Sei, SeiDevnet, SeiTestnet],
//       wallets: [
//         metaMask({ projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID }),
//         rainbow({ projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID }),
//         coinbase(),
//         walletconnect({
//           projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
//         }),
//       ],
//     });
//   }, []);

//   const connectWallet = async (id: string, options?: any) => {
//     console.log("connectWallet", id, options);
//     setConnectModal(false);
//     try {
//       const connectProvider = await connectKit.connect(id, options);
//       setProvider(connectProvider);
//     } catch (error) {
//       console.error("connectWallet", error);
//       message.error(error.message ?? error);
//     }
//   };

//   const disconnectWallet = async () => {
//     try {
//       await connectKit.disconnect({ hideLoading: true });
//     } catch (error) {
//       console.error(error);
//     }
//     setProvider(null);
//   };

//   useEffect(() => {
//     const id = connectKit.cachedProviderId();
//     if (id) {
//       connectKit
//         .connectToCachedProvider()
//         .then((provider) => {
//           setProvider(provider);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     } else {
//       setProvider(null);
//     }

//     const onDisconnect = () => {
//       setProvider(null);
//     };

//     connectKit.on("disconnect", onDisconnect);

//     return () => {
//       connectKit.removeListener("disconnect", onDisconnect);
//     };
//   }, [connectKit]);

//   useEffect(() => {
//     if (provider) {
//       getAddress();
//     } else {
//       setAddress(undefined);
//     }
//   }, [provider]);

//   const personalSign = useCallback(async () => {
//     if (address && provider && isEVMProvider(provider)) {
//       try {
//         const result = await provider.request({
//           method: "personal_sign",
//           params: ["0x48656c6c6f20576f726c64", address],
//         });
//         notification.success({
//           message: "Personal Sign",
//           description: result,
//         });
//       } catch (error) {
//         console.log("personal_sign", error);
//       }
//     }
//   }, [provider, address]);

//   const getAddress = async () => {
//     if (isEVMProvider(provider)) {
//       const addresses = await provider.request({ method: "eth_accounts" });
//       setAddress(addresses[0]);
//     } else if (isSolanaProvider(provider)) {
//       const address = provider.publicKey.toBase58();
//       setAddress(address);
//     }
//   };

//   return (
//     <div className="app">
//       <div className="app-title">Custom ConnectKit</div>
//       {provider !== undefined && provider && (
//         <button
//           className="btn-action"
//           size="large"
//           type="primary"
//           onClick={disconnectWallet}
//         >
//           Disconnect
//         </button>
//       )}

//       {address && (
//         <>
//           <div className="address">{address}</div>
//           <button
//             className="btn-action"
//             size="large"
//             type="primary"
//             onClick={personalSign}
//           >
//             Personal Sign
//           </button>
//         </>
//       )}

//       <div className="wallet-items">
//         <div onClick={() => connectWallet("metamask")}>
//           MetaMask
//           <img src="./assets/metamask_icon.png" alt=""></img>
//         </div>
//         {/* <div onClick={() => connectWallet('walletconnect_v2')}>
//                         WalletConnect <img src='./assets/walletconnect_icon.png' alt=""></img>
//                     </div> */}
//       </div>

//       <p>Or connect with Particle Wallet</p>

//       <div className="particle-methods">
//         <img
//           onClick={() =>
//             connectWallet("particle", { preferredAuthType: "twitter" })
//           }
//           src="./assets/twitter_icon.png"
//           alt=""
//         ></img>
//         <img
//           onClick={() =>
//             connectWallet("particle", { preferredAuthType: "google" })
//           }
//           src="./assets/google_icon.png"
//           alt=""
//         ></img>

//         <img
//           onClick={() =>
//             connectWallet("particle", { preferredAuthType: "discord" })
//           }
//           src="./assets/discord_icon.png"
//           alt=""
//         ></img>
//       </div>
//     </div>
//   );
// }

// function  ParticleCustomConnect() {
//   return <div>Hlle</div>
// }

// export default ParticleCustomConnect;
