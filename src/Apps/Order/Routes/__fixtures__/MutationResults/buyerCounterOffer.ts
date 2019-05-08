import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import moment from "moment"

export const buyerCounterOfferSuccess = {
  commerceBuyerCounterOffer: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        stateExpiresAt: moment()
          .add(1, "day")
          .toISOString(),
      },
    },
  },
}
export const buyerCounterOfferFailed = {
  commerceBuyerCounterOffer: {
    orderOrError: {
      error: {
        type: "validation",
        code: "invalid_amount_cents",
        data: null,
      },
    },
  },
}
