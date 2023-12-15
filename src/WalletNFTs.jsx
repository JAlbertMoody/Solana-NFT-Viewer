import { useState, useEffect } from 'react';
import { getNFTs } from './utils/getNFTs';
import { useWallet } from '@solana/wallet-adapter-react'; // Use the wallet hook

function WalletNFTs() {
  const { publicKey } = useWallet(); // Access the public key directly from the wallet
  const [nftList, setNftList] = useState(null);
  const [nftDisplay, setNftDisplay] = useState(null);

  useEffect(() => {
    if (publicKey) {
      getNFTs(publicKey.toString())
        .then(setNftList)
        .catch(error => console.error("Error fetching NFTs:", error));
    } else {
      setNftList(null);
      setNftDisplay(null);
    }
  }, [publicKey]);

  useEffect(() => {
    if (nftList) {
      const display = nftList.map(nft => (
        <div className="nft-card" key={nft.id}>
          <img src={nft.content.links.image} alt={`Image of ${nft.content.metadata.name}`} />
          <h3>{nft.content.metadata.name}</h3>
          <p><strong>ID:</strong> {nft.id}</p>
          <p><strong>Description:</strong> {nft.content.metadata.description}</p>
        </div>
      ));
      setNftDisplay(<div className="nfts-section"><h2>NFTs</h2>{display}</div>);
    } else {
      setNftDisplay(<p>No NFTs found or wallet not connected.</p>);
    }
  }, [nftList]);

  return (
    <div>
      {publicKey ? (
        <p>Connected Wallet Address: {publicKey.toString()}</p>
      ) : (
        <p>Please connect your wallet to view NFTs.</p>
      )}
      {nftDisplay}
    </div>
  );
}

export default WalletNFTs;