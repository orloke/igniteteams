import AsyncStorage from '@react-native-async-storage/async-storage'
import { groupsGetAll } from './groupsGetAll'
import { GROUP_COLLECTION } from '@storage/storageConfig'

export const groupRemoveByName = async (groupDeleted: string) => {
  try {
    const storedGroups = await groupsGetAll()
    const groups = storedGroups.filter((group) => group !== groupDeleted)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
    await AsyncStorage.removeItem(`${GROUP_COLLECTION}-${groupDeleted}`)
  } catch (error) {
    throw error
  }
}
