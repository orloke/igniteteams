import { Header } from '@components/Header'
import { Container, Title } from './styles'
import { Highlight } from '@components/Highlight'

export const Group = () => {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
    </Container>
  )
}
