import React, { ReactNode, useState, useRef } from 'react'
import styled, { css } from 'styled-components/macro'
import { Icon } from 'components'
import { easing } from 'utils'

interface AccordionItem {
  title: string
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
    width: 100%;

    Icon {
      fill: ${color};
    }
  `
})

const AccordionTitle = styled.span((props) => {
  const {
    theme: { headerFont }
  } = props

  return css`
    margin: 2rem 0;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    font-family: ${headerFont};
    font-size: 1rem;
  `
})

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

const AccordionContentWrapper = styled.div((props) => {
  const {
    theme: { borderColor }
  } = props

  return css`
    margin-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: ${borderColor} solid 1px;
  `
})

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
`

/*
 * Component
 */
export const Accordion = (props: Props) => {
  const { items } = props

  /*
   * State/Ref
   */
  const [openSection, setOpenSection] = useState<number[]>([])
  const contentRef = useRef<HTMLElement[]>([])

  /*
   * Function
   */
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
          const { title, render } = item

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
                <AccordionTitle>{title}</AccordionTitle>

                <IconWrapper>
                  <Icon
                    icon={isOpen ? 'chevron-down' : 'chevron-right'}
                  />
                </IconWrapper>
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
