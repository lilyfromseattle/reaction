/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
declare const _OfferSummaryItem_order$ref: unique symbol;
export type OfferSummaryItem_order$ref = typeof _OfferSummaryItem_order$ref;
export type OfferSummaryItem_order = {
    readonly totalListPrice: string | null;
    readonly myLastOffer?: ({
        readonly amount: string | null;
        readonly note: string | null;
    }) | null;
    readonly " $refType": OfferSummaryItem_order$ref;
};



const node: ConcreteFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2,
    "type": "Int"
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": "__id",
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OfferSummaryItem_order",
  "type": "CommerceOrder",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalListPrice",
      "args": v0,
      "storageKey": "totalListPrice(precision:2)"
    },
    v1,
    {
      "kind": "InlineFragment",
      "type": "CommerceOfferOrder",
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "myLastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "amount",
              "args": v0,
              "storageKey": "amount(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "note",
              "args": null,
              "storageKey": null
            },
            v1
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '0261dbe6d5bf78317ddcbcc13f207aa5';
export default node;
