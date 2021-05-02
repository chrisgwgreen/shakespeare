import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import { Icon, Button, Switch } from 'components'

interface Props {
  isPlaying: boolean
}

/*
 * Styled Components
 */
const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

/*
 * Component
 */
export const AutoscrollControls = (props: Props) => {
  const { isPlaying } = props
  const [isAutoscrolling, setIsAutoscrolling] = useState<boolean>(
    false
  )
  const isScrolling = useRef<boolean>(false)
  const autoScrollPosition = useRef<number>(0)
  const autoScrollRate = useRef<number>(0.5)

  useEffect(() => {
    return () => {
      isScrolling.current = false
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      isScrolling.current = true

      if (isAutoscrolling && document.scrollingElement)
        autoScrollPosition.current =
          document.scrollingElement.scrollTop
    } else {
      isScrolling.current = false
    }
  }, [isPlaying])

  useEffect(() => {
    if (isAutoscrolling && document.scrollingElement)
      autoScrollPosition.current = document.scrollingElement.scrollTop
  }, [isAutoscrolling])

  useEffect(() => {
    if (isAutoscrolling && isPlaying) {
      const autoScroll = () => {
        window.requestAnimationFrame(() => {
          if (isScrolling.current) {
            if (document.scrollingElement) {
              autoScrollPosition.current += autoScrollRate.current

              document.scrollingElement.scrollTop =
                autoScrollPosition.current
            }

            autoScroll()
          }
        })
      }

      autoScroll()
    }
  }, [isAutoscrolling, isPlaying])

  const handleAutoscrollChange = (isChecked: boolean) => {
    isScrolling.current = isChecked
    setIsAutoscrolling(isChecked) // Triggers render
  }

  const handleDecreaseAutoscrollSpeed = () =>
    (autoScrollRate.current -= 0.1)

  const handleIncreaseAutoscrollSpeed = () =>
    (autoScrollRate.current += 0.1)

  return (
    <ControlWrapper>
      <Button onClick={handleDecreaseAutoscrollSpeed}>
        <Icon icon="minus" />
      </Button>
      <Switch label="Autoscroll" onChange={handleAutoscrollChange} />
      <Button onClick={handleIncreaseAutoscrollSpeed}>
        <Icon icon="plus" />
      </Button>
    </ControlWrapper>
  )
}
