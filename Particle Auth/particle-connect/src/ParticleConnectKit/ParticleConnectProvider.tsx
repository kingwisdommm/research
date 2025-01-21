import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import {
  sei,
  seiDevnet,
  seiTestnet,
} from "@particle-network/connectkit/chains";
import {
  coinbaseWallet,
  evmWalletConnectors,
  injected,
  walletConnect,
} from "@particle-network/connectkit/evm";
import {
  wallet,
  type EntryPosition,
} from "@particle-network/connectkit/wallet";
import React from "react";

const config = createConfig({
  projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
  clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY, 
  appId:  import.meta.env.VITE_PARTICLE_APP_ID,
  appearance: {
    recommendedWallets: [
      { walletId: "metaMask", label: "Recommended" },
      { walletId: "coinbaseWallet", label: "Popular" },
      { walletId: "okxWallet", label: "none" },
      { walletId: "phantom", label: "none" },
      { walletId: "trustWallet", label: "none" },
      { walletId: "bitKeep", label: "none" },
      { walletId: "walletConnect", label: "none" },
    ],
    theme: {
      "--pcm-font-family": "'__Poppins_68bcaa', '__Poppins_Fallback_68bcaa'",
      "--pcm-rounded-sm": "4px",
      "--pcm-rounded-md": "8px",
      "--pcm-rounded-lg": "11px",
      "--pcm-rounded-xl": "22px",
    },
    splitEmailAndPhone: false,
    collapseWalletList: false,
    hideContinueButton: false,
    connectorsOrder: ["social", "wallet"],
    language: "en-US",
    collapsePasskeyButton: true,
  },
  walletConnectors: [
    evmWalletConnectors({
      metadata: { name: "My App" },
      connectorFns: [
        injected({ target: "metaMask" }),
        injected({ target: "okxWallet" }),
        injected({ target: "phantom" }),
        injected({ target: "trustWallet" }),
        injected({ target: "bitKeep" }),
        walletConnect({
          showQrModal: false,
        }),
        coinbaseWallet(),
      ],
      multiInjectedProviderDiscovery: true,
    }),

    authWalletConnectors({
      authTypes: ["google", "twitter", "discord"],
      fiatCoin: "USD",
      promptSettingConfig: {
        promptMasterPasswordSettingWhenLogin: 1,
        promptPaymentPasswordSettingWhenSign: 1,
      },
    }),
  ],
  plugins: [
    
    wallet({
      entryPosition: "bottom-right" as EntryPosition,
      visible: true,
      customStyle: {
        fiatCoin: "USD",
      },
    }),
  ],
  chains: [sei, seiTestnet, seiDevnet],
});

// Wrap your application with this component.
const ParticleConnectProvider = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};

export default ParticleConnectProvider;
