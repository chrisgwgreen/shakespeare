import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { SketchPicker, ColorResult } from 'react-color'
import { Icon } from 'components'
import { getRandomColor, getSafeName, fadeInAnimation } from 'utils'

interface Props {
  name: string
  onUpdatePersona: (name: string, color: string) => void
}

/*
 * Styled Components
 */
const PersonaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`

const SketchPickerWrapper = styled.div`
  position: relative;
  padding: 2rem;
  opacity: 0;
  animation: ${fadeInAnimation} forwards 0.4s;
`

const PersonaTitleWrapper = styled.div`
  cursor: pointer;
`

const ButtonWrapper = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`

/*
 * Component
 */
export const Persona = (props: Props) => {
  const { name, onUpdatePersona } = props

  /*
   * State
   */
  const [safeNameColor, setSafeNameColor] = useState<string>()
  const [
    isColorPickerVisible,
    setIsColorPickerVisible
  ] = useState<boolean>()

  /*
   * React Hooks
   */
  useEffect(() => {
    const safeName = getSafeName(name)
    const safeNameColor = localStorage.getItem(safeName)

    if (!safeNameColor) {
      const randomColor = getRandomColor()

      // TODO move this to "Play"
      localStorage.setItem(safeName, randomColor)

      setSafeNameColor(randomColor)

      onUpdatePersona(name, randomColor)
    } else {
      setSafeNameColor(safeNameColor)
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsColorPickerVisible(false)
    }

    document.addEventListener('keyup', handleEsc)

    return () => {
      document.removeEventListener('keyup', handleEsc)
    }
  }, [])

  /*
   * Event Handlers
   */
  const handleToggleColorPicker = () =>
    setIsColorPickerVisible(!isColorPickerVisible)

  const handleColorChange = (color: ColorResult) => {
    const { hex } = color

    setSafeNameColor(hex)
  }

  const handleChangeComplete = () => {
    const safeName = getSafeName(name)

    safeNameColor && localStorage.setItem(safeName, safeNameColor)

    safeNameColor && onUpdatePersona(name, safeNameColor)
  }

  const style = {
    color: safeNameColor
  }

  return (
    <PersonaWrapper>
      <PersonaTitleWrapper
        style={style}
        onClick={handleToggleColorPicker}
      >
        {name}
      </PersonaTitleWrapper>
      {isColorPickerVisible && (
        <SketchPickerWrapper>
          <ButtonWrapper onClick={handleToggleColorPicker}>
            <Icon icon="times" />
          </ButtonWrapper>
          <SketchPicker
            color={safeNameColor}
            onChange={handleColorChange}
            onChangeComplete={handleChangeComplete}
          />
        </SketchPickerWrapper>
      )}
    </PersonaWrapper>
  )
}
