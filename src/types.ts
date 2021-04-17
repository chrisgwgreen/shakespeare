export type IconPaddingOptions = 'none' | 'default' | 'small'

export interface NodeProps {
  nodeName: string
  text?: string
  childNodes?: NodeProps[]
}

interface Keyframe {
  title: string
  time: string
}

export interface PlayContentProps {
  title: string
  xml: string
  youtube: string
  keyframes: Keyframe[]
}
