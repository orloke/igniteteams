import AsyncStorage from "@react-native-async-storage/async-storage"
import { GROUP_COLLECTION } from "@storage/storageConfig"

export const groupCreate = async (newGroup: string) => {
  try {
    await AsyncStorage.setItem(GROUP_COLLECTION, newGroup)
  } catch (error) {
    throw error
  }
}
