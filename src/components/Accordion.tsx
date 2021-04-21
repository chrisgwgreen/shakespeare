import React, { ReactNode, useState, useRef } from 'react'
import styled, { css } from 'styled-components/macro'
import { Icon } from 'components'
import { easing } from 'utils'

interface AccordionItem {
  title?: string
  titleRender?: () => ReactNode
  isPaddedSides?: boolean
  render?: () => ReactNode
}

interface Props {
  items: AccordionItem[]
}

/*
 * Styled Components
 */
const AccordionWrapper = styled.div((props) => {
  const {
    theme: { color }
  } = props

  return css`
    overflow: hidden;
    user-select: none;
    transform: translate3d(0, 0, 0);

    Icon {
      fill: ${color};
    }
  `
})

const AccordionTitle = styled.span`
  margin: 1rem 0;
  text-transform: uppercase;
`

const AccordionGroupWrapper = styled.div``

const AccordionExpandWrapper = styled.div`
  height: 0;
  opacity: 0;
  overflow: hidden;
`

const AccordionHeaderWrapper = styled.div((props) => {
  const {
    theme: { color, borderColor }
  } = props

  return css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    font-size: 0.8125rem;
    border-bottom: 1px solid ${borderColor};
    fill: ${color};
  `
})

const AccordionContentWrapper = styled.div<{
  isPaddedSides: boolean
}>((props) => {
  const { isPaddedSides } = props

  return css`
    padding: 1rem 0;

    ${isPaddedSides &&
    css`
      padding: 1rem;
    `}
  `
})

/*
 * Component
 */
export const Accordion = (props: Props) => {
  const { items } = props

  const [openSection, setOpenSection] = useState<number[]>([])

  const contentRef = useRef<HTMLElement[]>([])

  const animate = (
    index: number,
    startHeight: number,
    endHeight: number,
    startTime: number
  ) => {
    window.requestAnimationFrame(() => {
      const parentElement = contentRef.current[index].parentElement
      let deltaHeight = 0

      if (parentElement) {
        if (startHeight < endHeight) {
          deltaHeight = easing.easeInSine(
            performance.now() - startTime,
            startHeight,
            endHeight,
            200
          )

          if (deltaHeight < endHeight) {
            animate(index, startHeight, endHeight, startTime)
            parentElement.style.height = `${deltaHeight}px`
          } else {
            parentElement.style.height = `auto`
          }
        }

        if (endHeight < startHeight) {
          deltaHeight =
            startHeight -
            easing.easeInSine(
              performance.now() - startTime,
              endHeight,
              startHeight,
              200
            )

          if (deltaHeight > endHeight) {
            animate(index, startHeight, endHeight, startTime)
            parentElement.style.height = `${deltaHeight}px`
          } else {
            parentElement.style.height = '0'
          }
        }
      }
    })
  }

  return (
    <AccordionWrapper>
      {items &&
        items.map((item, index) => {
          const {
            title,
            titleRender,
            render,
            isPaddedSides = false
          } = item

          const isOpen = openSection.includes(index)

          const handleItemClick = () => {
            const contentHeight =
              contentRef.current[index] &&
              contentRef.current[index].clientHeight

            if (!openSection.includes(index)) {
              setOpenSection([...openSection, index])

              animate(index, 0, contentHeight, performance.now())
            } else {
              const i = openSection.indexOf(index)
              openSection.splice(i, 1)
              setOpenSection([...openSection])

              setTimeout(() => {
                animate(index, contentHeight, 0, performance.now())
              }, 100)
            }
          }

          return (
            <AccordionGroupWrapper key={`accordion-item-${index}`}>
              <AccordionHeaderWrapper onClick={handleItemClick}>
                {titleRender && titleRender()}
                {!titleRender && (
                  <AccordionTitle>{title}</AccordionTitle>
                )}
                <Icon
                  icon={isOpen ? 'chevron-down' : 'chevron-right'}
                />
              </AccordionHeaderWrapper>

              <AccordionExpandWrapper
                style={{
                  transition: isOpen ? `opacity 0.4s ease 0.2s` : ``,
                  opacity: isOpen ? 1 : 0
                }}
              >
                <AccordionContentWrapper
                  ref={(ref) => {
                    contentRef.current[index] = ref as HTMLElement
                  }}
                  isPaddedSides={isPaddedSides}
                >
                  {render && render()}
                </AccordionContentWrapper>
              </AccordionExpandWrapper>
            </AccordionGroupWrapper>
          )
        })}
    </AccordionWrapper>
  )
}
