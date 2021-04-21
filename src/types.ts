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

export interface PlayerRefProps {
  updatePlayer: (updateId: string) => void
}
