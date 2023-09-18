import './modalCss.css'
import {Loading} from '@nextui-org/react'
import {Fragment, useCallback, useEffect, useState} from 'react'
import {pair} from '../utils/WalletConnectUtils'
import PageHeader from './PageHeader'
import {web3wallet} from "../utils/WalletConnectUtils";
import ModalStore from "../store/ModalStore";
import {EIP155_SIGNING_METHODS} from "../data/EIP155Data";
import '../App.css'
import {Divider} from "@nextui-org/react"
import closepn from './close.png'



const WalletModal = ({open, closeModal}) => {
    const [uri, setUri] = useState('')
    const [loading, setLoading] = useState(false)

    /******************************************************************************
     * 1. Open session proposal modal for confirmation / rejection
     *****************************************************************************/
    const onSessionProposal = useCallback(proposal => {
        console.log("onSessionProposalCalled called")
        ModalStore.open("SessionProposalModal", { proposal })
    }, [])

    const onAuthRequest = useCallback(request => {
        console.log("onAuthRequest called")
        ModalStore.open("AuthRequestModal", { request })
    }, [])

    /******************************************************************************
     * 3. Open request handling modal based on method that was used
     *****************************************************************************/
    const onSessionRequest = useCallback(async requestEvent => {
        console.log("onSessionRequest called")
        console.log("session_request", requestEvent)
        const { topic, params } = requestEvent
        const { request } = params
        // const requestSession = signClient.session.get(topic)
        const requestSession = web3wallet.engine.signClient.session.get(topic)

        switch (request.method) {
            case EIP155_SIGNING_METHODS.ETH_SIGN:
            case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
                return ModalStore.open("SessionSignModal", {
                    requestEvent,
                    requestSession
                })

            case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
            case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
            case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
                return ModalStore.open("SessionSignTypedDataModal", {
                    requestEvent,
                    requestSession
                })

            case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
            case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
                return ModalStore.open("SessionSendTransactionModal", {
                    requestEvent,
                    requestSession
                })

            default:
                return ModalStore.open("SessionUnsuportedMethodModal", {
                    requestEvent,
                    requestSession
                })
        }
    }, [])

    /******************************************************************************
     * Set up WalletConnect event listeners
     *****************************************************************************/
    useEffect(() => {
        if (web3wallet) {
            // sign
            web3wallet.on("session_proposal", onSessionProposal)
            web3wallet.on("session_request", onSessionRequest)
            // auth
            web3wallet.on("auth_request", onAuthRequest)

            // TODOs
            // signClient.on('session_ping', data => console.log('ping', data))
            // signClient.on('session_event', data => console.log('event', data))
            // signClient.on('session_update', data => console.log('update', data))
            // signClient.on('session_delete', data => console.log('delete', data))
        }
    }, [web3wallet, onSessionProposal, onSessionRequest, onAuthRequest])

    if (!open) return null;

    async function onConnect(uri) {
        try {
            setLoading(true)
            await pair({ uri })
        } catch (err) {
            alert(err)
        } finally {
            setUri('')
            setLoading(false)
        }
    }

    return (
        <div className='modalBackground'>
            <div className='modalContainer' style={{position:'relative'}}>
                <Fragment>
                    <button style={{right:25, position:'absolute'}} onClick={() => closeModal(false)}>
                        <img src={closepn} alt="" />
                    </button>
                    <PageHeader title="WalletConnect"/>
                    <input type="text" placeholder='address' style={{marginBottom:25}} name="" id="" />
                    {/* <PageHeader title="WalletConnect"/> */}
                    <Divider css={{ marginBottom: "$10" }} />
                    <button onClick={() => onConnect(uri)} style={{height:40, width:'20%', right:25, bottom: 20, position:'absolute', color:'white', backgroundColor:'#607ADD'}}>{loading ? <Loading size="sm"/> : 'Connect'}</button>
                </Fragment>
            </div>
        </div>
    )
}

export default WalletModal