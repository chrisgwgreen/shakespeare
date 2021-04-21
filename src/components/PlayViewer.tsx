import React, { useEffect, useState, createRef } from 'react'
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
const PlayViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  opacity: 0.1;
  background-image: url(${process.env.PUBLIC_URL}/shakespeare.jpg);

  background-size: cover;
  background-position: center;
`

/*
 * Component
 */
export const PlayViewer = () => {
  const { playId } = useParams<Props>()

  /*
   * State/Ref
   */
  const [play, setPlay] = useState<NodeProps>()
  const [playContent, setPlayContent] = useState<PlayContentProps>()
  const playerRef = createRef<any>()

  /*
   * React Hooks
   */
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

  /*
   * Handle Events
   */
  const handleUpdatePlayer = (updateId: string) =>
    playerRef.current.updatePlayer(updateId)

  if (!play) return <Loading />
  if (!play.childNodes) return <>ERROR</>

  return (
    <PlayViewerWrapper>
      <BackgroundImage />
      <Play
        nodeName={play.childNodes[0].nodeName}
        childNodes={play.childNodes[0].childNodes}
        onUpdatePlayer={handleUpdatePlayer}
      />
      {playContent && (
        <Player
          youtubeId={playContent?.youtube}
          actKeyframes={playContent?.actKeyframes}
          ref={playerRef}
        />
      )}
    </PlayViewerWrapper>
  )
}
