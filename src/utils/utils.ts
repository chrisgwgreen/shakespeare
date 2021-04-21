import moment from 'moment'

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

export const getSafeName = (name: string): string =>
  name
    .split(' ')[0]
    .replace(/[\p{P}$+<=>^`|~]/gu, '')
    .toLowerCase()

export const stringToSeconds = (timeString: string) =>
  moment(timeString, 'HH:mm:ss').diff(
    moment('00:00:00', 'HH:mm:ss'),
    'seconds'
  )
