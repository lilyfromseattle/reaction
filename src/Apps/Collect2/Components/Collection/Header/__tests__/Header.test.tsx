import { EntityHeader } from "@artsy/palette"
import {
  collectionHeaderArtworks,
  defaultCollectionHeaderArtworks,
} from "Apps/Collect2/Components/Collection/Header/__tests__/fixtures/artworks"
import { MockBoot } from "DevTools/MockBoot"
import { mount, shallow } from "enzyme"
import React from "react"
import { CollectionHeader, getFeaturedArtists, Props } from "../index"

jest.mock("sharify", () => ({
  get data() {
    return { IS_MOBILE: false }
  },
}))

describe("collections header", () => {
  let props: Props
  beforeEach(() => {
    props = {
      artworks: collectionHeaderArtworks,
      collection: {
        title: "KAWS: Toys",
        category: "Collectible Sculptures",
        slug: "kaws-toys",
        headerImage:
          "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
        query: {
          gene_id: null,
          artist_id: null,
          artist_ids: ["4e934002e340fa0001005336"],
        },
      },
    }
  })

  function mountComponent(
    theProps: Props,
    breakpoint: "xs" | "sm" | "md" | "lg" = "sm"
  ) {
    return mount(
      <MockBoot breakpoint={breakpoint}>
        <CollectionHeader {...theProps} />
      </MockBoot>
    )
  }

  it("renders the default collections header when there is no header image", () => {
    props.collection.headerImage = null
    props.artworks = defaultCollectionHeaderArtworks as any
    const component = mountComponent(props)

    const defaultHeader = component.find("CollectionDefaultHeader")
    const singleImageHeader = component.find("CollectionSingleImageHeader")

    expect(defaultHeader.length).toEqual(1)
    expect(singleImageHeader.length).toEqual(0)
  })

  describe("getFeaturedArtists", () => {
    const mockMediator = jest.fn()

    it("returns the queried artists when there is explicit artist_ids", () => {
      const { collection, artworks } = props
      const results = getFeaturedArtists(
        9,
        collection,
        artworks.merchandisable_artists,
        mockMediator,
        {}
      )

      expect(results.length).toEqual(1)
    })

    it("passes correct arguments featuredArtistsEntityCollection", () => {
      const { collection, artworks } = props

      const wrapper = shallow(
        <div>
          {getFeaturedArtists(
            9,
            collection,
            artworks.merchandisable_artists,
            mockMediator,
            {}
          )}
        </div>
      )

      const entities = wrapper.find(EntityHeader)
      expect(entities.length).toBe(1)

      const artist = entities.at(0).props().FollowButton.props.artist
      expect(artist).toMatchObject({
        id: "kaws",
        _id: "4e934002e340fa0001005336",
        name: "KAWS",
        imageUrl:
          "https://d32dm0rphc51dk.cloudfront.net/WhacjFyMKlMkNVzncPjlRA/square.jpg",
        birthday: "1974",
        nationality: "American",
      })
    })
  })

  describe("collection meta data", () => {
    it("renders the title", () => {
      props.collection.title = "Scooby Doo"

      const component = mountComponent(props)

      expect(component.text()).toContain("Scooby Doo")
    })

    it("renders breadcrumb category", () => {
      props.collection.category = "Nachos"

      const component = mountComponent(props)

      expect(component.text()).toContain("All works")
      expect(component.text()).toContain("Nachos")
    })

    describe("description", () => {
      describe("smaller screen", () => {
        it("renders truncated description if description exists", () => {
          props.collection.description = "some description"

          const component = mountComponent(props)

          const readMore = component.find("ReadMore")
          expect(readMore.length).toEqual(1)
          expect(readMore.text()).toContain("some description")
        })

        it("renders truncation with no text if description does not exist", () => {
          props.collection.description = undefined

          const component = mountComponent(props)

          const readMore = component.find("ReadMore")
          expect(readMore.length).toEqual(1)
          expect(readMore.text()).toEqual("")
        })
      })

      describe("larger screen", () => {
        it("renders description untruncated if description exists", () => {
          props.collection.description = "some description"

          const component = mountComponent(props, "lg")

          expect(component.find("ReadMore").length).toEqual(0)
          expect(component.text()).toContain("some description")
        })
      })

      it("renders a formatted string description", () => {
        props.collection.description = "<i>your description</i>"

        const component = mountComponent(props)

        expect(component.html()).toContain("<i>your description</i>")
      })
    })
  })
})
