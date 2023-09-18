import { Modal as NextModal } from "@nextui-org/react"
import { useSnapshot } from "valtio"
import ModalStore from "../store/ModalStore";
import SessionProposalModal from "../views/SessionProposalModal";

export default function Modal() {
    const { open, view } = useSnapshot(ModalStore.state)
    console.log(`open is ${open}`)
    console.log(`ModalStore.state is ${JSON.stringify(ModalStore.state)}`)

    return (
        <NextModal
            blur
            open={open}
            style={{ border: "1px solid rgba(139, 139, 139, 0.4)" }}
        >
            {view === "SessionProposalModal" && <SessionProposalModal />}

        </NextModal>
    )
}
