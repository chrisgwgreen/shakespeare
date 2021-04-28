declare global {
  interface Window {
    find: (
      aString: string,
      aCaseSensitive: boolean,
      aBackwards: boolean,
      aWrapAround: boolean,
      aWholeWord: boolean
    ) => boolean
  }
}

export type IconPaddingOptions = 'none' | 'default' | 'small'

export interface NodeProps {
  nodeName: string
  text?: string
  childNodes?: NodeProps[]
}

export interface Keyframe {
  title: string
  time: string
}

export interface PlayContentProps {
  title: string
  xml: string
  youtube: string
  actKeyframes: Keyframe[]
}

export interface PlayerRef {
  updatePlayer: (updateId: string) => void
}

export interface SwitchProps {
  isChecked?: boolean
  label?: string
  isLabelVisible?: boolean
  onChange?: (isChecked: boolean) => void
}

export interface User {
  name: string
  color: string
}
