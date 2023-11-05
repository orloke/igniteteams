import { Button } from '@components/Button/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { useState } from 'react'
import { Alert } from 'react-native'
import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  const handleNew = async () => {
    try {
      if (group.trim().length === 0) {
        return Alert.alert('Novo Grupo', 'Informe o nome da Turma.')
      }
      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message)
      }
      Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
      console.log(error)
    }
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
        <Input
          placeholder="Nome da turma"
          onChangeText={setGroup}
          value={group}
        />
        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  )
}
