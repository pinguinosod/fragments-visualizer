import { ethers } from 'ethers';
import { useState } from 'react';
import FRAGMENTS_ABI from "./ABI.json";
import MetaDataAudio from "./MetaDataAudio"
import "./app.css";

const FRAGMENTS_ADDRESS = '0xdEA65Dd08eB6d51fb23038322376897C54668964';
const ETHEREUM_MAINNET_CHAIN_ID = 1;



function App() {
  const [metaData, setMetaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState('57');
  const [isError, setIsError] = useState(false);

  const getNFTMetaData = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainId } = await provider.getNetwork();
    if (chainId !== ETHEREUM_MAINNET_CHAIN_ID) {
      console.error('wrong network')
      throw Error("Wrong network, must select Ethereum Mainnet.");
    }
    const FragmentsContract = new ethers.Contract(FRAGMENTS_ADDRESS, FRAGMENTS_ABI, provider);
    const response = await FragmentsContract.tokenURI(tokenId);
    if (response.length > 2) { // we got metadata
      const decodedMetadata = JSON.parse(atob(response.split(/,(.*)/s)[1]));
      setMetaData(decodedMetadata);
      setIsError(false);
    } else {
      setMetaData(null);
      setIsError(true);
    }
    setLoading(false);
  }

  const visualizeMetadata = (metaData) => {
    return <>
      <img src={metaData.image} alt="official visual representation of fragment" />
    </>;
  }

  return (
    <div className="app">
      Token ID: <input
        type="number"
        placeholder="Enter tokenId"
        value={tokenId}
        step="1"
        onChange={(e) => setTokenId(e.target.value)}
        style={{width:'60px'}}
      />
      <button onClick={() => getNFTMetaData()}>Load Fragment</button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {metaData ? (
            <div>
              <MetaDataAudio attributes={metaData.attributes} />
              <hr />
              {visualizeMetadata(metaData)}
            </div>
          ) : (
            isError ? 'No metadata found, does this fragment exists?' : ''
          )}
        </div>
      )}
    </div>
  );

}

export default App;
