import { proxy } from "valtio"

/**
 * State
 */
const state = proxy({
    open: false
})

/**
 * Store / Actions
 */
const ModalStore = {
    state,

    open(view, data) {
        state.view = view
        state.data = data
        state.open = true
    },

    close() {
        state.open = false
    }
}

export default ModalStore
