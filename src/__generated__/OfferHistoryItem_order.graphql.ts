/* tslint:disable */

import { ConcreteFragment } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
declare const _OfferHistoryItem_order$ref: unique symbol;
export type OfferHistoryItem_order$ref = typeof _OfferHistoryItem_order$ref;
export type OfferHistoryItem_order = {
    readonly totalListPrice: string | null;
    readonly offers?: ({
        readonly edges: ReadonlyArray<({
            readonly node: ({
                readonly id: string;
                readonly amount: string | null;
                readonly _createdAt: string | null;
                readonly fromParticipant: CommerceOrderParticipantEnum | null;
            }) | null;
        }) | null> | null;
    }) | null;
    readonly lastOffer?: ({
        readonly id: string;
        readonly fromParticipant: CommerceOrderParticipantEnum | null;
        readonly amount: string | null;
        readonly shippingTotal: string | null;
        readonly taxTotal: string | null;
        readonly note: string | null;
    }) | null;
    readonly " $refType": OfferHistoryItem_order$ref;
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
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "amount",
  "args": v0,
  "storageKey": "amount(precision:2)"
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "fromParticipant",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "OfferHistoryItem_order",
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
          "name": "offers",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOfferConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "CommerceOfferEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "CommerceOffer",
                  "plural": false,
                  "selections": [
                    v2,
                    v3,
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "_createdAt",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "format",
                          "value": "MMM D",
                          "type": "String"
                        }
                      ],
                      "storageKey": "_createdAt(format:\"MMM D\")"
                    },
                    v4,
                    v1
                  ]
                }
              ]
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "lastOffer",
          "storageKey": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "plural": false,
          "selections": [
            v2,
            v4,
            v3,
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "shippingTotal",
              "args": v0,
              "storageKey": "shippingTotal(precision:2)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "taxTotal",
              "args": v0,
              "storageKey": "taxTotal(precision:2)"
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
(node as any).hash = '02d691f8e59700ce14a8df0b1a0a1b1f';
export default node;
