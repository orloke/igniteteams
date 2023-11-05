import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button/Button'

type Props = {
  /* props go here */
}

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Button title="Criar" />
      </Content>
    </Container>
  )
}
