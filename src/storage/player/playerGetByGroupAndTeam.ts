import { playersGetByGroup } from './playerGetByGroup'

export const playersGetByGroupAndTeam = async (group: string, team: string) => {
  try {
    const storage = await playersGetByGroup(group)
    const players = storage.filter((item) => item.team === team)
    return players
  } catch (error) {
    throw error
  }
}
