import { Box } from "@artsy/palette"
import { ArtworkSidebarPageviewsQueryRenderer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarPageviews"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("Pageviews", () => {
  return (
    <React.Fragment>
      <Section title="Artwork with > 10 views">
        <Box width="100%">
          <ArtworkSidebarPageviewsQueryRenderer artworkID="andy-warhol-skull" />
        </Box>
      </Section>
    </React.Fragment>
  )
})
