import { Boot } from "Artsy/Router"
import React from "react"
import { Breakpoint } from "Utils/Responsive"

export const MockBoot: React.SFC<{
  breakpoint?: Breakpoint
  headTags?: JSX.Element[]
}> = ({ breakpoint = "xl", headTags, children }) => {
  return (
    <Boot
      onlyMatchMediaQueries={[breakpoint]}
      headTags={headTags}
      context={null as any}
      user={null as any}
      relayEnvironment={null as any}
      resolver={null as any}
      routes={null as any}
    >
      {children}
    </Boot>
  )
}
