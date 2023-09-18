import { createWeb3Wallet } from "../utils/WalletConnectUtils"
import { useCallback, useEffect, useRef, useState } from "react"
import SettingsStore from "../store/SettingsStore";
import {createOrRestoreEIP155Wallet} from "../utils/EIP155WalletUtil";

export default function useInitialization() {
    const [initialized, setInitialized] = useState(false)

    const onInitialize = useCallback(async () => {
        try {
            const { eip155Addresses } = createOrRestoreEIP155Wallet()

            SettingsStore.setEIP155Address(eip155Addresses[0])

            await createWeb3Wallet()

            setInitialized(true)
        } catch (err) {
            alert(err)
        }
    }, [])

    useEffect(() => {
        if (!initialized) {
            onInitialize()
        }
    }, [initialized, onInitialize])

    return initialized
}
