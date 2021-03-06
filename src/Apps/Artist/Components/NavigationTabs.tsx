import { Flex } from "@artsy/palette"
import { NavigationTabs_artist } from "__generated__/NavigationTabs_artist.graphql"
import { track } from "Artsy/Analytics"
import * as Schema from "Artsy/Analytics/Schema"
import { withContext } from "Artsy/SystemContext"
import { Mediator } from "Artsy/SystemContext"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "Styleguide/Components"

interface Props {
  artist: NavigationTabs_artist
  mediator: Mediator
}

@track({
  context_module: Schema.ContextModule.NavigationTabs,
})
export class NavigationTabs extends React.Component<Props> {
  @track((_props, _state, [tab, destination_path]: string[]) => ({
    action_type: Schema.ActionType.Click,
    subject: tab,
    destination_path,
  }))
  handleClick(tab: string, destination_path: string) {
    // no-op
  }

  renderTab(
    text: string,
    to: string,
    options: {
      exact?: boolean
      mediator: {
        trigger: (action: string, config: object) => void
      }
    }
  ) {
    const { exact, mediator } = options

    return (
      <RouteTab
        to={to}
        exact={exact}
        onClick={() => {
          mediator && mediator.trigger("artist:tabclick", { to })
          this.handleClick(text, to)
        }}
      >
        {text}
      </RouteTab>
    )
  }

  renderTabs() {
    const {
      artist: { id, statuses },
      mediator,
    } = this.props

    const route = path => `/artist/${id}${path}`

    return (
      <>
        {this.renderTab("Overview", route(""), {
          exact: true,
          mediator,
        })}
        {statuses.cv && this.renderTab("CV", route("/cv"), { mediator })}
        {statuses.articles &&
          this.renderTab("Articles", route("/articles"), {
            mediator,
          })}
        {statuses.shows &&
          this.renderTab("Shows", route("/shows"), { mediator })}
        {statuses.auction_lots &&
          this.renderTab("Auction results", route("/auction-results"), {
            mediator,
          })}
        {statuses.artists &&
          this.renderTab("Related artists", route("/related-artists"), {
            mediator,
          })}
      </>
    )
  }

  render() {
    return (
      <>
        <Flex mx={[-2, 0]}>
          <RouteTabs>{this.renderTabs()}</RouteTabs>
        </Flex>
      </>
    )
  }
}

export const NavigationTabsFragmentContainer = createFragmentContainer(
  withContext(NavigationTabs),
  graphql`
    fragment NavigationTabs_artist on Artist {
      id
      statuses {
        shows
        artists
        articles
        cv(minShowCount: 0)
        auction_lots
      }
    }
  `
)
