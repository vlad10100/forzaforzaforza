import { defineStore } from 'pinia'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { ref } from 'vue'

export const useAthleteStore = defineStore('athleteStore', () => {
  const athlete = ref()
  const loadAthlete = async (id: string) => {
    if (!id) return
    const athleteDoc = doc(db, 'athletes', id)
    const resp = await getDoc(athleteDoc)
    athlete.value = resp.data()
    return resp.data()
  }

  return { athlete, loadAthlete }
})

type Athlete = {
  username: String | null
  connected_to_strava: Boolean
  created_at: Date
  first_name: String
  last_name: String
  age: Number
  gender: String
  height: Number
  weight: Number
  strava_refresh_token: String
}

export type {Athlete}