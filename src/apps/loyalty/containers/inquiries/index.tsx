import * as React from "react"
import * as Relay from "react-relay"
import styled from "styled-components"

import Artwork from "../../../../components/artwork"
import Button from "../../../../components/buttons/inverted"
import Nav from "../../../../components/nav"
import NavItem from "../../../../components/nav_item"
import TextArea from "../../../../components/text_area"
import Title from "../../../../components/title"


const InquiryContainer = styled.div`
  display: inline-block;
`

const Container = styled.div`
  text-align: center;

  & .footer {
    max-width: 500;
    margin: 10px auto;
  }
`

class Inquiries extends React.Component<any, any> {
  renderArtworks() {
    const edges = this.props.user.artwork_inquiries_connection.edges || []
    return edges.map(edge => {
      const artwork = edge.node
      return (
        <InquiryContainer>
          <Artwork key={artwork.__id} artwork={artwork} />
        </InquiryContainer>
      )
    })
  }

  render() {
    return (
      <Container>
        <Nav>
          <NavItem href="https://www.artsy.net">Back To Artsy</NavItem>
        </Nav>
        <Title>Please select all works your purchased</Title>
        <div className="artworks">
          {this.renderArtworks()}
        </div>
        <footer className="footer">
          <Title titleSize="small">If you purchased any works not listed above, please list them.</Title>
          <TextArea block placeholder="Artwork, Artist, Gallery" />
          <Button block>Submit purchases</Button>
        </footer>
      </Container>
    )
  }
}

export default Relay.createContainer(Inquiries, {
  fragments: {
    user: () => Relay.QL`
      fragment on Me {
        artwork_inquiries_connection(first: 10) {
          edges {
            node {
              id
              artwork {
                ${(Artwork.getFragment("artwork"))}
              }
            }
          }
        }
      }
    `,
  },
})
