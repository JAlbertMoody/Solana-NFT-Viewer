import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.REACT_APP_RPC_API_KEY
const rpc = `https://mainnet.helius-rpc.com/?api-key=${apiKey}`

export const getNFTs = async (wallet) => {
    const response = await fetch(rpc, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAssetsByOwner',
            params: {
            ownerAddress: wallet,
            page: 1,
            limit: 1000,
        displayOptions: {
            showFungible: false, //return both fungible and non-fungible tokens
            showNativeBalance: false, // show lamports
        }
            },
        }),
    });

    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    const { result } = jsonResponse;

    const NFTArray = []

    for (const item of result.items) {
        if (item.interface === 'ProgrammableNFT' || item.interface === 'V1_NFT') {
            if (item.burnt) {
                continue; // Skip to the next iteration
            }
            NFTArray.push(item);
            // logNFT(item)
        }
    }

   return NFTArray
};

