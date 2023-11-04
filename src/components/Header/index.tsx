import { BackIcon, Container, Logo } from './styles'
import LogoImg from '@assets/logo.png'

export function Header() {
  return (
    <Container>
      <BackIcon />
      <Logo source={LogoImg} />
    </Container>
  )
}
