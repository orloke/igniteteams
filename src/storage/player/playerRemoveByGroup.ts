import AsyncStorage from "@react-native-async-storage/async-storage"
import { playersGetByGroup } from "./playerGetByGroup"
import { PLAYER_COLLECTION } from "@storage/storageConfig"

export const playerRemoveByGroup = async(playerName:string, group:string) =>{
  try {
    const storage = await playersGetByGroup(group)

    const filtered = storage.filter(item=>item.name !== playerName)
    const players = JSON.stringify(filtered)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players)
players
  } catch (error) {
    throw error
  }
}
