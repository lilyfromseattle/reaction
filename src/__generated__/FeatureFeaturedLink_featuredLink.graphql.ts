/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureFeaturedLink_featuredLink = {
    readonly href: string | null;
    readonly title: string | null;
    readonly subtitle: string | null;
    readonly description: string | null;
    readonly image: {
        readonly small: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly medium: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly large: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
    } | null;
    readonly " $refType": "FeatureFeaturedLink_featuredLink";
};
export type FeatureFeaturedLink_featuredLink$data = FeatureFeaturedLink_featuredLink;
export type FeatureFeaturedLink_featuredLink$key = {
    readonly " $data"?: FeatureFeaturedLink_featuredLink$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureFeaturedLink_featuredLink">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "wide"
  ]
},
v1 = [
  {
    "kind": "ScalarField",
    "alias": "src",
    "name": "url",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "width",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "height",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Fragment",
  "name": "FeatureFeaturedLink_featuredLink",
  "type": "FeaturedLink",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "subtitle",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "HTML"
        }
      ],
      "storageKey": "description(format:\"HTML\")"
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "small",
          "name": "cropped",
          "storageKey": "cropped(height:1000,version:[\"wide\"],width:800)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1000
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 800
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": "medium",
          "name": "cropped",
          "storageKey": "cropped(height:1365,version:[\"wide\"],width:1092)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1365
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1092
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": (v1/*: any*/)
        },
        {
          "kind": "LinkedField",
          "alias": "large",
          "name": "cropped",
          "storageKey": "cropped(height:1252,version:[\"wide\"],width:2224)",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1252
            },
            (v0/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 2224
            }
          ],
          "concreteType": "CroppedImageUrl",
          "plural": false,
          "selections": (v1/*: any*/)
        }
      ]
    }
  ]
};
})();
(node as any).hash = '566f91418b2d1e4346ae6aa1c459ffa4';
export default node;
