import { Header } from '@components/Header'
import { Container, Title } from './styles'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useState } from 'react'
import { FlatList } from 'react-native'

export const Group = () => {
  const [groups, setGroups] = useState(['Galera da Xgrow'])
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subTitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({item}) => <GroupCard title={item} />}
      />
    </Container>
  )
}
