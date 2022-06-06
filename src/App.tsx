import React from 'react';
import Home from 'components/pages/home';
import './App.css';
import { Web3Provider } from '@ethersproject/providers';
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core';
import { NetworkContextName } from './constants/misc';
import Footer from 'components/common/Footer/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fund from './components/pages/fund';

require('typeface-jetbrains-mono');

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

function getLibrary(provider: any) {
  return new Web3Provider(provider);
}

function App() {
  return (
    <React.StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fund" element={<Fund />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </React.StrictMode>
  );
}

export default App;
