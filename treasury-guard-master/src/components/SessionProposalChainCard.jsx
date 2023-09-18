import { Col, Row, Text } from "@nextui-org/react"
import { Fragment } from "react"
import {EIP155_MAINNET_CHAINS, EIP155_TEST_CHAINS} from "../data/EIP155Data";
import ChainCard from "./ChainCard";
import {formatChainName} from "../utils/HelperUtil";

/**
 * Utilities
 */
const CHAIN_METADATA = {
    ...EIP155_MAINNET_CHAINS,
    ...EIP155_TEST_CHAINS,
}

/**
 * Component
 */
export default function SessionProposalChainCard({ requiredNamespace }) {
    return (
        <Fragment>
            {requiredNamespace.chains?.map(chainId => {
                const allMethods = requiredNamespace.methods
                const allEvents = requiredNamespace.events
                // @ts-expect-error
                const rgb = CHAIN_METADATA[chainId]?.rgb

                return (
                    <ChainCard
                        key={chainId}
                        rgb={rgb ?? ""}
                        flexDirection="col"
                        alignItems="flex-start"
                    >
                        <Text h5 css={{ marginBottom: "$5" }}>
                            {formatChainName(chainId)}
                        </Text>
                        <Row>
                            <Col>
                                <Text h6>Methods</Text>
                                <Text color="$gray300">
                                    {allMethods.length ? allMethods.join(", ") : "-"}
                                </Text>
                            </Col>
                        </Row>
                        <Row css={{ marginTop: "$5" }}>
                            <Col>
                                <Text h6>Events</Text>
                                <Text color="$gray300">
                                    {allEvents.length ? allEvents.join(", ") : "-"}
                                </Text>
                            </Col>
                        </Row>
                    </ChainCard>
                )
            })}
        </Fragment>
    )
}
