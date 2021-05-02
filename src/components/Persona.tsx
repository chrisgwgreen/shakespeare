import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { SketchPicker, ColorResult } from 'react-color'
import { Icon } from 'components'
import { fadeInAnimation } from 'utils'
import { PersonaeConsumer } from 'contexts'
import { PersonaeContextProps } from 'types'

interface Props {
  name: string
}

interface PersonaProps {
  name: string
  getPersonaColor: (name: string) => string | null
  setPersonaColor: (name: string, color: string) => void
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
 * Components
 */
const PersonaComponent = (props: PersonaProps) => {
  const { name, getPersonaColor, setPersonaColor } = props

  const [
    isColorPickerVisible,
    setIsColorPickerVisible
  ] = useState<boolean>()

  const [sketchPickerColor, setSketchPickerColor] = useState<string>(
    ''
  )

  /*
   * React Hooks
   */
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
  const handleToggleColorPicker = () => {
    if (!isColorPickerVisible) {
      const color = getPersonaColor(name)
      color && setSketchPickerColor(color)

      setIsColorPickerVisible(true)
    } else {
      setIsColorPickerVisible(false)
    }
  }

  const handleColorChange = (color: ColorResult) => {
    const { hex } = color

    setSketchPickerColor(hex)
  }

  const handleChangeComplete = () => {
    setPersonaColor(name, sketchPickerColor)
  }

  const color = isColorPickerVisible
    ? sketchPickerColor
    : getPersonaColor(name)

  return (
    <PersonaWrapper>
      <PersonaTitleWrapper
        style={{
          color: color || `#000`
        }}
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
            color={sketchPickerColor}
            onChange={handleColorChange}
            onChangeComplete={handleChangeComplete}
          />
        </SketchPickerWrapper>
      )}
    </PersonaWrapper>
  )
}

export const Persona = (props: Props) => {
  const { name } = props

  return (
    <PersonaeConsumer>
      {(context) => {
        const {
          getPersonaColor,
          setPersonaColor
        } = context as PersonaeContextProps

        return (
          <PersonaComponent
            name={name}
            getPersonaColor={getPersonaColor}
            setPersonaColor={setPersonaColor}
          />
        )
      }}
    </PersonaeConsumer>
  )
}
