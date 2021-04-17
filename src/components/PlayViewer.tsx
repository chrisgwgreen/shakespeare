import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { NodeProps, PlayContentProps } from 'types'
import { Play, Player, Loading } from 'components'

import { xmlParser } from 'utils'

interface Props {
  playId: string
}

/*
 * Styled Components
 */
const PlayViewerWrPlayViewerer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

/*
 * Component
 */
export const PlayViewer = () => {
  const { playId } = useParams<Props>()

  const [play, setPlay] = useState<NodeProps>()
  const [playContent, setPlayContent] = useState<PlayContentProps>()

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/${playId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((playContent) => {
        setPlayContent(playContent)
      })
  }, [playId])

  useEffect(() => {
    if (playContent) {
      axios
        .get(`${process.env.PUBLIC_URL}/plays/${playContent.xml}.xml`)
        .then((response) => {
          const parser = new DOMParser()
          const dom = parser.parseFromString(
            response.data,
            'application/xml'
          )

          setPlay(xmlParser({ dom, childNodes: [] }))
        })
    }
  }, [playContent])

  if (!play) return <Loading />
  if (!play.childNodes) return <>ERROR</>

  return (
    <PlayViewerWrPlayViewerer>
      <Play
        nodeName={play.childNodes[0].nodeName}
        childNodes={play.childNodes[0].childNodes}
      />
      {playContent && <Player youtubeId={playContent?.youtube} />}
    </PlayViewerWrPlayViewerer>
  )
}
