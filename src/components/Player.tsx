import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import YouTube from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { Icon } from 'components'

interface Props {
  youtubeId: string
}

/*
 * Styled Components
 */
const PlayerWrapper = styled.div((props) => {
  const {
    theme: { boxShadow }
  } = props

  return css`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 200px;
    background: #fff;
    box-shadow: ${boxShadow};
    display: flex;
  `
})

const ControlWrapper = styled.div``
const YoutubeWrapper = styled.div`
  width: 200px;
  height: 200px;
  background: #eee;
`

/*
 * Component
 */
export const Player = (props: Props) => {
  const { youtubeId } = props

  /*
   * State
   */
  const [player, setPlayer] = useState<YouTubePlayer>()

  /*
   * Handle Events
   */
  const handleReady = (event: { target: YouTubePlayer }) => {
    const { target } = event
    setPlayer(target)
  }

  const handlePlay = () => {
    player?.playVideo()
  }

  const handleGetDetails = () => {
    console.log(player)
    console.log(player?.getCurrentTime())
    console.log(player?.getDuration())

    // Current Time = 557.648687
    // Duration = 11049
    //19.81

    // Total Page = 130525
    // ScrollY = 4312
    // 30
  }

  return (
    <PlayerWrapper>
      <YoutubeWrapper>
        <YouTube
          videoId={youtubeId}
          opts={{
            height: '200',
            width: '200',
            playerVars: {
              controls: 0,
              autoplay: 0
            }
          }}
          onReady={handleReady}
        />
      </YoutubeWrapper>
      <ControlWrapper>
        <button onClick={handlePlay}>
          <Icon icon="play" />
        </button>
        <button onClick={handleGetDetails}>Details</button>
      </ControlWrapper>
    </PlayerWrapper>
  )
}
