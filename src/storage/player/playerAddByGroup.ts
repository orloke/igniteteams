import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppError } from '@utils/AppError'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '@storage/storageConfig'
import { playersGetByGroup } from './playerGetByGroup'

export const playerAddByGroup = async (
  newPlayer: PlayerStorageDTO,
  group: string
) => {
  try {
    const storagePlayers = await playersGetByGroup(group)

    const playersAlreadyExists = storagePlayers.filter(
      (player) => player.name === newPlayer.name
    )

    if (playersAlreadyExists.length > 0) {
      throw new AppError('Essa pessoa já está cadastrada em um time aqui.')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw error
  }
}
