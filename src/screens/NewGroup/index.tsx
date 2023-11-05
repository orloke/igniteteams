import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'

type Props = {
  /* props go here */
}

export function NewGroup() {
  const navigation = useNavigation()

  const handleNew = () => {
    navigation.navigate('players', { group: 'XGROW' })
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subTitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nome da turma" />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
