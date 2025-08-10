import React, { useState } from 'react';
import { ethers } from "ethers";

// ##################################################################
// # WARNING: SEVERE SECURITY RISK                                  #
// ##################################################################
// # Never expose a private key in a web application.               #
// # Anyone who can see this code can steal all your funds.         #
// # This is for local testing ONLY.                                #
// ##################################################################
const YOUR_PRIVATE_KEY = "0x18701b29a83677be300e869a8b65fa58fa7518d9a99813001ec93967db94d04f"; // Replace with your private key starting with 0x

// Fuji Testnet RPC URL
const FUJI_RPC_URL = 'https://api.avax-test.network/ext/bc/C/rpc';

function RedeemAvax() { // Renamed from App to RedeemAvax
    const [toAddress, setToAddress] = useState('');
    const [txHash, setTxHash] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTransfer = async () => {
        if (!toAddress) {
            setError('Please enter a recipient address.');
            return;
        }
        if (!YOUR_PRIVATE_KEY || YOUR_PRIVATE_KEY === "YOUR_PRIVATE_KEY_HERE") {
            setError("Please add your private key to the code on line 11.");
            return;
        }

        setIsLoading(true);
        setError('');
        setTxHash('');

        try {
            // 1. Connect to the Avalanche Fuji network
            const provider = new ethers.JsonRpcProvider(FUJI_RPC_URL);

            // 2. Create a wallet instance from your private key
            const wallet = new ethers.Wallet(YOUR_PRIVATE_KEY, provider);

            // 3. Create and send the transaction
            const tx = await wallet.sendTransaction({
                to: toAddress,
                value: ethers.parseEther('0.01'), // Sending 0.01 AVAX
            });

            setTxHash(tx.hash);
            await tx.wait(); // Wait for the transaction to be confirmed

        } catch (err) {
            setError(`Transaction failed: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-red-500">
                    AVAX Transfer (Insecure)
                </h1>
                <p className="text-center text-yellow-400 mb-6 border border-yellow-500 p-3 rounded-md">
                    <strong>Security Warning:</strong> This app uses a hardcoded private key. Do not use in production.
                </p>

                <div className="mb-6">
                    <label htmlFor="toAddress" className="block mb-2 text-sm font-medium">
                        Recipient Address
                    </label>
                    <input
                        type="text"
                        id="toAddress"
                        value={toAddress}
                        onChange={(e) => setToAddress(e.target.value)}
                        className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0x..."
                    />
                </div>
                <button
                    onClick={handleTransfer}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Sending...' : 'Send 0.01 AVAX'}
                </button>

                {txHash && (
                    <div className="mt-6 p-4 bg-green-900/50 border border-green-700 rounded-md">
                        <p className="text-green-300 font-bold">Success! Transaction Sent.</p>
                        <p className="text-sm break-all mt-1">
                            <strong>TxID:</strong>{' '}
                            <a href={`https://testnet.snowtrace.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                {txHash}
                            </a>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-md">
                        <p className="text-red-300"><strong>Error:</strong> {error}</p>
                    </div>
                )}
            </div>
            <footer className="text-center mt-8 text-gray-500 text-sm">
                <p>This application is for demonstration purposes only.</p>
            </footer>
        </div>
    );
}

export default RedeemAvax;
