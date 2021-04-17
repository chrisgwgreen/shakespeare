import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string

    // Font
    headerFont: string
    copyFont: string

    // Main Colors
    color: string
    background: string
    borderColor: string
    boxShadow: string

    // Dimensions
    imageWidth: number
    menuHeight: number
    menuWidth: number

    // Polygon
    Mesh: {
      width: number
      height: number
      sliceRatio: number
      ambient: string
      diffuse: string
    }
    Lights: {
      zOffset: number
      ambient: string
      spotlights: string[]
    }
  }
}

export const Theme = {
  name: 'Theme',

  // Font
  headerFont: 'bardolatry',
  copyFont: 'latolight',

  // Main Colors
  color: '#212121',
  background: '#ffffff',
  borderColor: '#9fcade',

  // Dimensions
  imageWidth: 224,
  menuHeight: 60,
  menuWidth: 18.75,

  boxShadow: '0 0 0.5rem 0 rgba(0, 0, 0, 0.2)',

  // Polygon
  Mesh: {
    width: 1.2,
    height: 1.2,
    sliceRatio: 0.2,
    ambient: '#555555',
    diffuse: '#FFFFFF'
  },
  Lights: {
    zOffset: 100,
    ambient: '#084abd',
    spotlights: ['#e7e698', '#e0dc82']
  }
}
