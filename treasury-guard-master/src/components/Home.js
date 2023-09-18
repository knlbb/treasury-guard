import React, {useCallback, useEffect} from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Activity from './Activity';
import useInitialization from "../hooks/useInitialization";
import useWalletConnectEventsManager from "../hooks/useWalletConnectEventsManager";
import {createTheme, NextUIProvider} from '@nextui-org/react'
import Modal from "./Modal";
import {web3wallet} from "../utils/WalletConnectUtils";
import ModalStore from "../store/ModalStore";


export default function Home() {
    const initialized = useInitialization()

    useWalletConnectEventsManager(initialized)

    return (
        <NextUIProvider theme={createTheme({type: 'white'})}>
            <div style={{display: 'flex', height: '100vh', overflow: 'hidden'}}>
                <Sidebar/>
                <Navbar/>
                <Activity/>
            </div>

            <Modal />
        </NextUIProvider>
    )
}
