import {Col, Row, Text} from "@nextui-org/react"
import AccountSelectCard from "./AccountSelectCard";

/**
 * Component
 */
export default function ProposalSelectSection({
                                                  addresses,
                                                  selectedAddresses,
                                                  chain,
                                                  onSelect
                                              }) {
    return (
        <Row>
            <Col>
                <Text h4 css={{marginTop: "$5"}}>{`Choose ${chain} accounts`}</Text>
                {addresses.map((address, index) => (
                    <AccountSelectCard
                        key={address}
                        address={address}
                        index={index}
                        onSelect={() => onSelect(chain, address)}
                        selected={selectedAddresses?.includes(address) ?? false}
                    />
                ))}
            </Col>
        </Row>
    )
}
