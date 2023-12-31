import ModalStore from "../store/ModalStore";
import {useCallback, useEffect} from "react";
import {web3wallet} from "../utils/WalletConnectUtils";
import {EIP155_SIGNING_METHODS} from "../data/EIP155Data";

export default function useWalletConnectEventsManager(initialized) {
    console.log("Use Wallet Connect Events Manager updated and initialization is " + initialized)
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
        if (initialized) {
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
    }, [initialized, onSessionProposal, onSessionRequest, onAuthRequest])
}
