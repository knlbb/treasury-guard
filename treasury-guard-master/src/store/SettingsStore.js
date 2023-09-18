import { proxy } from "valtio"

/**
 * State
 */
const state = proxy({
    testNets:
        typeof localStorage !== "undefined"
            ? Boolean(localStorage.getItem("TEST_NETS"))
            : true,
    account: 0,
    eip155Address: "",
})

/**
 * Store / Actions
 */
const SettingsStore = {
    state,
    setEIP155Address(eip155Address) {
        state.eip155Address = eip155Address
    },
}

export default SettingsStore
