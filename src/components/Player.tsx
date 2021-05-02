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
import { Keyframe, PlayerRef } from 'types'
import { stringToSeconds, findString } from 'utils'
import { Icon, Button, Title, AutoscrollControls } from 'components'

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

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  justify-content: space-around;
`

const YoutubeWrapper = styled.div`
  width: 200px;
  height: 200px;
  background: #eee;
`

const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

/*
 * Component
 */
const PlayerRefComponent = (props: Props, ref: Ref<PlayerRef>) => {
  const { youtubeId, actKeyframes } = props

  /*
   * State
   */
  const [player, setPlayer] = useState<YouTubePlayer>()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    updatePlayer: (updateId: string) => {
      const keyframe = actKeyframes.find((actKeyframe) => {
        const { title } = actKeyframe

        return title.toLowerCase() === updateId.toLowerCase()
      })

      if (keyframe) {
        player?.seekTo(stringToSeconds(keyframe.time), true)

        // console.log('Update Player >', stringToSeconds(keyframe.time))
      }
    }
  }))

  /*
   * useEffect: Scroll to previous Y
   */
  // useEffect(() => {
  //   if (youtubeId) {
  //     const scrollY = localStorage.getItem(`${youtubeId}-s`)

  //     if (scrollY) window.scrollTo(0, parseFloat(scrollY))
  //   }
  // }, [youtubeId])

  /*
   * useEffect: Save audio and page position whilst playing...
   */
  useEffect(() => {
    const handleSaveInterval = () => {
      if (isPlaying) {
        localStorage.setItem(`${youtubeId}-s`, `${window.scrollY}`)
        localStorage.setItem(
          `${youtubeId}-t`,
          `${player?.getCurrentTime()}`
        )
      }
    }

    const interval = setInterval(handleSaveInterval, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isPlaying])

  useEffect(() => {
    // if (isPlaying) {
    //   const seekTime = localStorage.getItem(`${youtubeId}-t`)
    //   if (seekTime) player?.seekTo(parseFloat(seekTime), true)
    //   // const scrollY = localStorage.getItem(`${youtubeId}-s`)
    //   // if (scrollY) window.scrollTo(0, parseFloat(scrollY))
    // }
  }, [isPlaying])

  /*
   * Player Handle Events
   */
  const handleReady = (event: { target: YouTubePlayer }) => {
    const { target } = event

    setPlayer(target)
  }

  const handlePlayerPlay = () => {
    setIsPlaying(true)
  }

  const handlePlayerPause = () => setIsPlaying(false)

  /*
   * Handle Events
   */

  const handleStepBackward = () => {
    findString('ACT I', false, false, true, true)
    console.log('handleStepBackward')
  }

  const handleStepForward = () => {
    findString('ACT II', false, false, true, true)
    console.log('handleStepBackward')
  }

  const handleForward = () => {
    player && player.seekTo(player.getCurrentTime() + 10, true)
  }

  const handleBack = () => {
    player && player.seekTo(player.getCurrentTime() - 10, true)
  }

  const handlePlay = () => {
    if (!isPlaying) {
      player?.playVideo()
    } else {
      player?.pauseVideo()
    }
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
            <Icon icon={isPlaying ? 'pause' : 'play'} size="2x" />
          </Button>
          <Button onClick={handleForward}>
            <Icon icon="forward" size="2x" />
          </Button>
          <Button onClick={handleStepForward}>
            <Icon icon="step-forward" />
          </Button>
        </ControlWrapper>

        <AutoscrollControls isPlaying={isPlaying} />
      </DetailsWrapper>
    </PlayerWrapper>
  )
}

export const Player = forwardRef(PlayerRefComponent)
