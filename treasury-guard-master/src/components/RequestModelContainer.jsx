import { Container, Modal, Text } from "@nextui-org/react"
import { Fragment } from "react"

/**
 * Component
 */
export default function RequestModalContainer({ children, title }) {
    return (
        <Fragment>
            <Modal.Header>
                <Text h3>{title}</Text>
            </Modal.Header>

            <Modal.Body>
                <Container css={{ padding: 0 }}>{children}</Container>
            </Modal.Body>
        </Fragment>
    )
}
