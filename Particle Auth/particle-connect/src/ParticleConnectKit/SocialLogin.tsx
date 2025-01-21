import { useConnect,  } from "@particle-network/authkit";

const SocialLogin = () => {
  const { connect } = useConnect();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginSocial = async (type: any) => {
    console.log("social login");

    await connect({
      socialType: type  ,
    });
  };

  return (
    <div>
      <img
        onClick={() => loginSocial("twitter")}
        src="./assets/twitter_icon.png"
        alt=""
      ></img>
      <img
        onClick={() => loginSocial("google")}
        src="./assets/google_icon.png"
        alt=""
      ></img>

      <img
        onClick={() => loginSocial("discord")}
        src="./assets/discord_icon.png"
        alt=""
      ></img>
    </div>
  );
};

export default SocialLogin;
