import { Button, Col, Flex, Row, Spacer } from "@artsy/palette"
import { Accept_order } from "__generated__/Accept_order.graphql"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Helper } from "Apps/Order/Components/Helper"
import { TwoColumnLayout } from "Apps/Order/Components/TwoColumnLayout"
import { track } from "Artsy/Analytics"
import { Router } from "found"
import React, { Component } from "react"
import { Media } from "Utils/Responsive"
import {
  counterofferFlowSteps,
  OrderStepper,
} from "../../Components/OrderStepper"

import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"

import { AcceptOfferMutation } from "__generated__/AcceptOfferMutation.graphql"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { ShippingSummaryItemFragmentContainer as ShippingSummaryItem } from "Apps/Order/Components/ShippingSummaryItem"
import { StickyFooter } from "Apps/Order/Components/StickyFooter"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { Dialog, injectDialog } from "Apps/Order/Dialogs"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { CountdownTimer } from "Components/v2/CountdownTimer"
import { ErrorWithMetadata } from "Utils/errors"
import { get } from "Utils/get"
import createLogger from "Utils/logger"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "../../Components/ArtworkSummaryItem"
import { CreditCardSummaryItemFragmentContainer as CreditCardSummaryItem } from "../../Components/CreditCardSummaryItem"

interface AcceptProps {
  order: Accept_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
}

interface AcceptState {
  isCommittingMutation: boolean
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

@track()
export class Accept extends Component<AcceptProps, AcceptState> {
  state: AcceptState = {
    isCommittingMutation: false,
  }

  onSubmit: () => void = () => {
    this.setState({ isCommittingMutation: true }, () => {
      if (this.props.relay && this.props.relay.environment) {
        commitMutation<AcceptOfferMutation>(this.props.relay.environment, {
          mutation: graphql`
            mutation AcceptOfferMutation($input: buyerAcceptOfferInput!) {
              ecommerceBuyerAcceptOffer(input: $input) {
                orderOrError {
                  ... on OrderWithMutationSuccess {
                    __typename
                    order {
                      id
                      ... on OfferOrder {
                        awaitingResponseFrom
                      }
                    }
                  }
                  ... on OrderWithMutationFailure {
                    error {
                      type
                      code
                      data
                    }
                  }
                }
              }
            }
          `,
          variables: {
            input: {
              offerId: this.props.order.lastOffer.id,
            },
          },
          onCompleted: data => {
            this.setState({ isCommittingMutation: false })
            const {
              ecommerceBuyerAcceptOffer: { orderOrError },
            } = data
            this.onSubmitCompleted(orderOrError)
          },
          onError: this.onMutationError.bind(this),
        })
      }
    })
  }

  onSubmitCompleted(orderOrError) {
    const error = orderOrError.error
    if (error) {
      switch (error.code) {
        case "capture_failed": {
          this.onMutationError(
            new ErrorWithMetadata(error.code, error),
            "An error occurred",
            "There was an error processing your payment. Please try again or contact orders@artsy.net."
          )
          break
        }
        default: {
          this.onMutationError(new ErrorWithMetadata(error.code, error))
          break
        }
      }
    } else {
      this.onSuccessfulSubmit()
    }
  }

  onSuccessfulSubmit() {
    this.props.router.push(`/orders/${this.props.order.id}/status`)
  }

  onMutationError(error, title?, message?) {
    logger.error(error)
    this.props.dialog.showErrorDialog({ title, message })
    this.setState({
      isCommittingMutation: false,
    })
  }

  onChangeResponse = () => {
    const { order } = this.props
    this.props.router.push(`/orders/${order.id}/respond`)
  }

  render() {
    const { order } = this.props
    const { isCommittingMutation } = this.state
    const artwork = get(
      this.props,
      props => order.lineItems.edges[0].node.artwork
    )

    return (
      <>
        <HorizontalPadding px={[0, 4]}>
          <Row>
            <Col>
              <OrderStepper
                currentStep="Review"
                steps={counterofferFlowSteps}
              />
            </Col>
          </Row>
        </HorizontalPadding>
        <HorizontalPadding>
          <TwoColumnLayout
            Content={
              <Flex
                flexDirection="column"
                style={isCommittingMutation ? { pointerEvents: "none" } : {}}
              >
                <Media at="xs">
                  <Flex flexDirection="column">
                    <ArtworkSummaryItem order={order} />
                  </Flex>
                  <Spacer mb={2} />
                </Media>
                <Flex flexDirection="column">
                  <CountdownTimer
                    action="Respond"
                    note="Expired offers end the negotiation process permanently."
                    countdownStart={order.lastOffer.createdAt}
                    countdownEnd={order.stateExpiresAt}
                  />
                  <TransactionDetailsSummaryItem
                    order={order}
                    title="Accept seller's offer"
                    useLastSubmittedOffer={true}
                    onChange={this.onChangeResponse}
                  />
                </Flex>
                <Spacer mb={[2, 3]} />
                <Media greaterThan="xs">
                  <Button
                    onClick={this.onSubmit}
                    loading={isCommittingMutation}
                    size="large"
                    width="100%"
                  >
                    Submit
                  </Button>
                  <Spacer mb={2} />
                  <ConditionsOfSaleDisclaimer textAlign="center" />
                </Media>
              </Flex>
            }
            Sidebar={
              <Flex flexDirection="column">
                <Flex flexDirection="column">
                  <Media greaterThan="xs">
                    {className => (
                      <ArtworkSummaryItem className={className} order={order} />
                    )}
                  </Media>
                  <ShippingSummaryItem order={order} locked />
                  <CreditCardSummaryItem order={order} locked />
                </Flex>
                <Media greaterThan="xs">
                  <Spacer mb={2} />
                  <Helper artworkId={artwork.id} />
                </Media>
                <Media at="xs">
                  <>
                    <Spacer mb={2} />
                    <Button
                      onClick={this.onSubmit}
                      loading={isCommittingMutation}
                      size="large"
                      width="100%"
                    >
                      Submit
                    </Button>
                    <Spacer mb={2} />
                    <ConditionsOfSaleDisclaimer />
                    <Spacer mb={2} />
                    <Helper artworkId={artwork.id} />
                  </>
                </Media>
              </Flex>
            }
          />
        </HorizontalPadding>

        <StickyFooter artworkId={artwork.id} />
      </>
    )
  }
}

export const AcceptFragmentContainer = createFragmentContainer(
  injectDialog(trackPageViewWrapper(Accept)),
  graphql`
    fragment Accept_order on Order {
      id
      stateExpiresAt
      lastOffer {
        id
        createdAt
      }
      lineItems {
        edges {
          node {
            artwork {
              id
            }
          }
        }
      }
      ...TransactionDetailsSummaryItem_order
      ...ArtworkSummaryItem_order
      ...ShippingSummaryItem_order
      ...CreditCardSummaryItem_order
    }
  `
)
