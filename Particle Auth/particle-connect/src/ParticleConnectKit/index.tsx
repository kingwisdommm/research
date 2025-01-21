import {
  ConnectButton,
  useAccount,
  useParticleAuth,
  useWallets,
} from "@particle-network/connectkit";
import { useEffect } from "react";
import "./styles.css";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000";
const ConnectWithConnectKit = () => {
  const { address, isConnected, chainId } = useAccount();
  const { getUserInfo } = useParticleAuth();

  // Retrieve the primary wallet from the Particle Wallets
  const [primaryWallet] = useWallets();

  // Store userInfo in a useState to use it in your app
  //  const [userInfo, setUserInfo] = useState<unknown>(null);

  useEffect(() => {
    const getProfile = async (access_token: string) => {
      const { data } = await axios.get(BACKEND_URL + "/user/profile", {
        headers: { Authorization: "Bearer " + access_token },
      });

      console.log("getProfile :>> ", data);
    };

    const getAccessToken = async (token: string, uuid: string) => {
      const { data } = await axios.post(BACKEND_URL + "/auth/access-token", {
        token,
        uuid,
      });

      console.log("getAccessToken :>> ", data);
      if (data?.access_token) {
        return getProfile(data.access_token);
      }
    };

    const fetchUserInfo = async () => {
      // Use walletConnectorType as a condition to avoid account not initialized errors
      if (primaryWallet?.connector?.walletConnectorType === "particleAuth") {
        const userInfo = await getUserInfo();
        // setUserInfo(userInfo);

        if (userInfo?.uuid && userInfo?.token) {
          return getAccessToken(userInfo.token, userInfo.uuid);
        }
        console.log("userInfo :>> ", userInfo);
      }
    };

    fetchUserInfo();
  }, [isConnected, getUserInfo, primaryWallet?.connector?.walletConnectorType]);

  // Standard ConnectButton utilization
  return (
    <div>
      <h2>Connect With Connect Kit</h2>
      <ConnectButton />
      {isConnected && (
        <>
          <h2>Address: {address}</h2>
          <h2>Chain ID: {chainId}</h2>
        </>
      )}
    </div>
  );
};

export default ConnectWithConnectKit;
