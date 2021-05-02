import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components/macro'
import ReactSwitch from 'react-switch'
import { SwitchProps } from 'types'

/*
 * Styled Components
 */
const Label = styled.span`
  font-size: 0.625rem;
  color: inherit;
  text-transform: uppercase;
`

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

/*
 * Component
 */
export const Switch = (props: SwitchProps) => {
  const {
    label,
    isLabelVisible = true,
    isChecked = false,
    onChange
  } = props

  const { accentColor } = useTheme()

  /*
   * State
   */
  const [isCheckedState, setChecked] = useState(isChecked)

  /*
   * Event Handlers
   */
  const handleChange = () => {
    setChecked(!isCheckedState)
    onChange && onChange(!isCheckedState)
  }

  return (
    <SwitchWrapper>
      {label && isLabelVisible && <Label>{label}</Label>}
      <ReactSwitch
        checked={isCheckedState}
        onChange={handleChange}
        onColor={accentColor}
        aria-checked={isCheckedState}
        aria-label={label}
        height={16}
      />
    </SwitchWrapper>
  )
}
