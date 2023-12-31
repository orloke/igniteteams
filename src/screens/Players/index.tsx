import { Alert, FlatList, TextInput, View } from 'react-native'
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { useEffect, useRef, useState } from 'react'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroup } from '@storage/player/playerGetByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

import { Loading } from '@components/Loading'

type RoutePrams = {
  group: string
}

export function Players() {
  const [loading, setLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState<'Time A' | 'Time B'>('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const inputRef = useRef<TextInput>(null)
  const navigation = useNavigation()

  const route = useRoute()
  const { group } = route.params as RoutePrams

  const handleAddPlayer = async (
    playerName: string,
    team: string,
    group: string
  ) => {
    if (playerName.trim().length === 0) {
      return Alert.alert(
        'Nova pessoa',
        'Informe o nome da pessoa para adicionar. '
      )
    }

    const newPlayer = {
      name: playerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      inputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayersByTeam(group, team)
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Nova pessoa', error.message)
      }
      console.error(error)
      Alert.alert('Nova pessoa', 'Não foi possível adicionar.')
    }
  }

  const fetchPlayersByTeam = async (group: string, team: string) => {
    try {
      setLoading(true)
      const playerByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playerByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível adicionar carregar as pessoas')
    } finally {
      setLoading(false)
    }
  }

  const handlePlayerRemove = async (
    playerName: string,
    group: string,
    team: string
  ) => {
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam(group, team)
    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível remover essa pessoa')
    }
  }

  const groupRemove = async (group: string) => {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover grupo', 'Não foi possível remover o grupo.')
    }
  }

  const handleGroupRemove = async (group: string) => {
    Alert.alert('Remover', 'Deseja remover o grupo?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => groupRemove(group) },
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam(group, team)
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group || 'Nome da turma'}
        subTitle="adicione a galera e separe os times"
      />
      <Form>
        <Input
          inputRef={inputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={() => handleAddPlayer(newPlayerName, team, group)}
          returnKeyType="done"
        />
        <ButtonIcon
          icon="add"
          onPress={() => handleAddPlayer(newPlayerName, team, group)}
        />
      </Form>
      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={(item) => item}
          renderItem={({ item }: { item: 'Time A' | 'Time B' }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              onRemove={() => handlePlayerRemove(item.name, group, team)}
              name={item.name}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={() => handleGroupRemove(group)}
      />
    </Container>
  )
}
