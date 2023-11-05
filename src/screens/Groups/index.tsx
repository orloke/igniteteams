import { Header } from '@components/Header'
import { Container, Title } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'

export const Group = () => {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
      <GroupCard title='Galera da Xgrow'/>
    </Container>
  )
}
