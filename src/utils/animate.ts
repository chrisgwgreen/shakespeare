import { keyframes } from 'styled-components/macro'

export const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const quillAnimation = keyframes`
  0% {
    transform: translateX(-20px) rotate(-10deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }

  25% {
    transform:  translateX(-10px) rotate(10deg);
  }

  50% {
    transform: translateX(0) rotate(-10deg);
  }

  75% {
    transform: translateX(10px) rotate(10deg); 
  }

  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(20px) rotate(-10deg);
    opacity: 0;
  }
`

export const lineAnimation = keyframes`
  0% {
    transform: translateX(0);
  }

  10% {}

  25% {
    transform: translateX(5px);
  }

  50% {
    transform: translateX(15px);
  }

  75% {
    transform: translateX(25px);
  }

  90% {}

  100% {
    transform: translateX(30px);
  }
`

export const leftInAnimation = keyframes`
  from {
    transform: translateX(30px);
  }

  to {
    transform: translateX(0);
  }
`
