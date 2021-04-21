import React, {
  useState,
  useEffect,
  forwardRef,
  Ref,
  useImperativeHandle
} from 'react'
import styled, { css } from 'styled-components/macro'
import YouTube from 'react-youtube'
import { YouTubePlayer } from 'youtube-player/dist/types'
import { Keyframe, PlayerRefProps } from 'types'
import { stringToSeconds } from 'utils'
import { Icon, Button, Title } from 'components'

interface Props {
  youtubeId: string
  actKeyframes: Keyframe[]
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
    left: 0;
    height: 200px;
    background: #fff;
    box-shadow: ${boxShadow};
    display: flex;
  `
})

const ControlWrapper = styled.div`
  display: flex;
  /* vertical-align: middle; */
`

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`

const YoutubeWrapper = styled.div`
  width: 200px;
  height: 200px;
  background: #eee;
`

/*
 * Component
 */
const PlayerRef = (props: Props, ref: Ref<PlayerRefProps>) => {
  const { youtubeId, actKeyframes } = props

  /*
   * State
   */
  const [player, setPlayer] = useState<YouTubePlayer>()

  useImperativeHandle(ref, () => ({
    updatePlayer: (updateId: string) => {
      const keyframe = actKeyframes.find((actKeyframe) => {
        const { title } = actKeyframe

        return title.toLowerCase() === updateId.toLowerCase()
      })

      if (keyframe) {
        player?.seekTo(stringToSeconds(keyframe.time), true)

        console.log('Update Player >', stringToSeconds(keyframe.time))
      }
    }
  }))

  /*
   * useEffect
   */
  useEffect(() => {
    const handleSaveInterval = () => {
      console.log('handleSaveInterval')
    }

    const interval = setInterval(handleSaveInterval, 120000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  /*
   * Handle Events
   */
  const handleReady = (event: { target: YouTubePlayer }) => {
    const { target } = event

    setPlayer(target)
  }

  const handleStepBackward = () => {
    console.log('handleStepBackward')
  }

  const handleStepForward = () => {
    console.log('handleStepBackward')
  }

  const handleForward = () => {
    console.log('handleForward')
  }

  const handleBack = () => {
    console.log('handleBack')
  }

  const handlePlay = () => {
    player?.playVideo()
  }

  const handlePlayerPlay = () => {
    console.log('handlePlayerPlay')
  }

  const handlePlayerPause = () => {
    console.log('handlePlayerPause')
  }

  const handleGetDetails = () => {
    console.log(player)
    console.log(player?.getCurrentTime())
    console.log(player?.getDuration())
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
              autoplay: 0,
              playsinline: 1
            }
          }}
          onReady={handleReady}
          onPlay={handlePlayerPlay}
          onPause={handlePlayerPause}
        />
      </YoutubeWrapper>
      <DetailsWrapper>
        <Title text="Act i" size="small" />

        <ControlWrapper>
          <Button onClick={handleStepBackward}>
            <Icon icon="step-backward" />
          </Button>
          <Button onClick={handleBack}>
            <Icon icon="backward" size="2x" />
          </Button>
          <Button onClick={handlePlay}>
            <Icon icon="play" size="2x" />
          </Button>
          <Button onClick={handleForward}>
            <Icon icon="forward" size="2x" />
          </Button>
          <Button onClick={handleStepForward}>
            <Icon icon="step-forward" />
          </Button>
        </ControlWrapper>

        <Button onClick={handleGetDetails}>Details</Button>
      </DetailsWrapper>
    </PlayerWrapper>
  )
}

export const Player = forwardRef(PlayerRef)
