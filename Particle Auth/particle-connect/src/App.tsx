import "./App.css";
import "./index.css";

import ConnectWithConnectKit from "./ParticleConnectKit";
import ParticleConnectProvider from "./ParticleConnectKit/ParticleConnectProvider";
// import ParticleConnectProvider from "./ParticleConnectKit/ParticleConnectProvider";
// import ParticleCustomConnect from "./ParticleCustomConnect";

const Home = () => {
  return (
    <div>
    <ParticleConnectProvider>
      <ConnectWithConnectKit />
    </ParticleConnectProvider>

      {/* <ParticleCustomConnect /> */}
    </div>
  );
};

function App() {
  return <Home />;
}

export default App;
