import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { supabase } from './services/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import Redeem from './pages/Redeem';
import RedeemDetails from './pages/RedeemDetails';
import MyNfts from './pages/MyNfts';
import WalletNfts from './pages/WalletNfts';
import Game from './components/Game'; // Corrected import
import P2P from './pages/P2P'; // Import P2P component
import GameLaunchOptions from './pages/GameLaunchOptions'; // Import GameLaunchOptions component
import Leaderboard from './components/Leaderboard';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { initData, miniApp, useLaunchParams, useSignal, openTelegramLink, openLink } from '@telegram-apps/sdk-react';

function App() {
    const [session, setSession] = useState(null);
    const lp = useLaunchParams();

    // Wallet-connect is incompatible with Telegram mini apps
    // We should use deep-links for wallets
    const overrideWindowOpen = useCallback(() => {
      window.open = (url) => {
        console.log('Intercepted window.open with URL:', url);
        try {
          if (url.startsWith('tg://') || url.startsWith('https://t.me')) {
            openTelegramLink(url)
          } else if (url.startsWith('wc://')) {
            // WalletConnect universal link
            const wcUri = url.substring('wc://'.length);
            const universalLink = `https://walletconnect.org/wc?uri=${encodeURIComponent(wcUri)}`;
            console.log('Opening WalletConnect universal link:', universalLink);
            openLink(universalLink);
          } else if (url.startsWith('metamask://')) {
            // MetaMask universal link
            const param = url.substring('metamask://'.length);
            const universalLink = `https://metamask.app.link/${param}`;
            console.log('Opening MetaMask universal link:', universalLink);
            openLink(universalLink);
          } else if (url.startsWith('trust://')) {
            // Trust Wallet universal link
            const param = url.substring('trust://'.length);
            const universalLink = `https://link.trustwallet.com/${param}`;
            console.log('Opening Trust Wallet universal link:', universalLink);
            openLink(universalLink);
          } else if (url.startsWith('rainbow://')) {
            // Rainbow Wallet universal link (example, verify actual pattern)
            const param = url.substring('rainbow://'.length);
            const universalLink = `https://rainbow.me/wc?uri=${encodeURIComponent(param)}`; // Placeholder, verify actual
            console.log('Opening Rainbow Wallet universal link:', universalLink);
            openLink(universalLink);
          } else if (url.startsWith('coinbase://')) {
            // Coinbase Wallet universal link (example, verify actual pattern)
            const param = url.substring('coinbase://'.length);
            const universalLink = `https://go.cb-w.com/wc?uri=${encodeURIComponent(param)}`; // Placeholder, verify actual
            console.log('Opening Coinbase Wallet universal link:', universalLink);
            openLink(universalLink);
          } else {
            console.log('Opening generic link:', url);
            openLink(url)
          }
        } catch (error) {
          console.error('Error in window.open override:', error)
        }
        return null
      }
      return true
    }, [])
  
    useEffect(() => {
      const isTMA = initData
  
      if (!isTMA) {
        return
      }
  
      overrideWindowOpen()
    }, [overrideWindowOpen])
  
    const isDark = useSignal(miniApp.isDark)

    const updateUserEmailInTable = useCallback(async (userId, email) => {
        try {
            const { error } = await supabase
                .from('users')
                .upsert({ id: userId, email: email }, { onConflict: 'id' }); // onConflict: 'id' ensures update if user exists

            if (error) {
                console.error('Error updating user email in table:', error.message);
            } else {
                console.log('User email updated successfully in table.');
            }
        } catch (error) {
            console.error('Caught error updating user email:', error.message);
        }
    }, []);

    const updateUserWalletAddressInTable = useCallback(async (userId, walletAddress) => {
        try {
            const { error } = await supabase
                .from('users')
                .upsert({ id: userId, wallet_address: walletAddress }, { onConflict: 'id' });

            if (error) {
                console.error('Error updating user wallet address in table:', error.message);
            } else {
                console.log('User wallet address updated successfully in table.');
            }
        } catch (error) {
            console.error('Caught error updating user wallet address:', error.message);
        }
    }, []);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session && session.user && session.user.email) {
                updateUserEmailInTable(session.user.id, session.user.email);
            }
            // Remove hash fragment from URL
            if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session && session.user && session.user.email) {
                updateUserEmailInTable(session.user.id, session.user.email);
            }
            // Remove hash fragment from URL on auth state change
            if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
            }
        });

        return () => subscription.unsubscribe();
    }, [updateUserEmailInTable]);

    const { address, isConnected } = useAccount();

    useEffect(() => {
        if (session && session.user && isConnected && address) {
            updateUserWalletAddressInTable(session.user.id, address);
        }
    }, [session, isConnected, address, updateUserWalletAddressInTable]);


    // const handleLogout = async () => {
    //     await supabase.auth.signOut();
    // }

    // If there is no active session, show the login UI
    if (!session) {
        return (
            <AppRoot
                appearance={isDark ? 'dark' : 'light'}
                platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
            >
                <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ width: '320px' }}>
                    <Auth
                            supabaseClient={supabase}
                            appearance={{ theme: ThemeSupa }}
                            theme="dark"
                            providers={['google', 'github']} // Optional: add social providers
                    />
                    </div>
                </div>
            </AppRoot>
        )
    }
    // If a session exists, show the game UI and routing
    else {
        return (
            <AppRoot
                appearance={isDark ? 'dark' : 'light'}
                platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
            >
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<Home session={session} />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/dashboard" element={<Dashboard session={session} />} />
                        <Route path="/redeem" element={<Redeem />} />
                        <Route path="/redeem/:id" element={<RedeemDetails />} />
                        <Route path="/my-nfts" element={<MyNfts />} />
                        <Route path="/wallet-nfts" element={<WalletNfts />} />
                        <Route path="/multiplayer" element={<Game session={session} />} />
                        <Route path="/p2p" element={<P2P />} />
                        <Route path="/game-options" element={<GameLaunchOptions />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                    {/* <button onClick={handleLogout} style={{ position: 'absolute', top: 10, right: 10, background: '#444', border: '1px solid #666', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                        Logout
                    </button> */}
                </HashRouter>
            </AppRoot>
        );
    }
}

export default App;