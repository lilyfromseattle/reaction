import { Flex, Sans, Spinner } from "@artsy/palette"
import React from "react"
import { useEffect, useState } from "react"

export function ArtistDetails({ id }: { id: string }) {
  const [artist, { loading, error }] = useJson(
    `https://stagingapi.artsy.net/api/v1/artist/${id}`
  )

  console.log("artist", artist)
  console.log("error", error)

  if (loading) {
    return (
      <Flex position="relative" id="banana" flexGrow="1">
        <Spinner />
        &nbsp;
      </Flex>
    )
  }

  if (error) {
    return (
      <Sans size="3" color="black60">
        {error.message}
      </Sans>
    )
  }

  return artist.hometown ? (
    <Sans size="3" color="black60">
      {artist.name} is from {artist.hometown}
    </Sans>
  ) : (
    <Sans size="3" color="black60">
      {artist.name} is of unknown origin.
    </Sans>
  )
}

function useJson(
  url: string
): [any, { loading: boolean; error: Error | null }] {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  async function fetchUrl() {
    const response = await fetch(url, {
      headers: {
        "X-Xapp-Token":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YmQ4Yjc4OTcxZDJkNjYzNTU2M2MzMjEiLCJzYWx0X2hhc2giOiI2ZmQ0Mjg1OGRmMTgyODNiMjdjNmIzNjY0OGRiODA1OSIsInJvbGVzIjoidXNlcixhZG1pbiIsInBhcnRuZXJfaWRzIjpbXSwiZXhwIjoxNTYzODE3OTA5LCJpYXQiOjE1NTg2MzM5MDksImF1ZCI6IjRlMzZlZmE0ZGI0ZTMyMDAwMTAwMDM1OSIsImlzcyI6IkdyYXZpdHkiLCJqdGkiOiI1Y2U2ZGRiNTA2MmQ4MTAwMTJkNjRiZWIifQ.vTELd4io8qDtG0FF0hswHf-ef_xV6xc0rcBefNhu1Zg",
      },
    })

    try {
      const json = await response.json()
      console.log("JSON", json)

      setData(json.data)
      setError(null)
    } catch (error) {
      console.log("error", error)
      setError(error)
    }

    setLoading(false)
    // const json = await response.json()
    // setData(json)
    // setLoading(false)
  }

  useEffect(() => {
    fetchUrl()
  }, [])
  return [data, { loading, error }]

  // TODO: implement me
  // return [
  //   { name: "David", hometown: "Brighton, United Kingdom" },
  //   { loading: false, error: null },
  // ]
}
