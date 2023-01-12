import { createSlice } from '@reduxjs/toolkit'
import { getArtifactsResultHash } from "../../utils/hash"
import { getAllFitsAndAllRarity } from "../../utils/weights";


export const artifactsSlice = createSlice({
  name: 'artifacts',
  initialState: {
    fitsAndRarity: {},
  },
  reducers: {
    updateFitsAndRarity: (state, action) => {
      const { hash, enabledBuilds, allFits, allRarity } = action.payload;
      const resultHash = getArtifactsResultHash(enabledBuilds)
      if (!!!state.fitsAndRarity[hash]) { 
        state.fitsAndRarity[hash] = {}
      }
      state.fitsAndRarity[hash][resultHash] = { allFits, allRarity };
    },
    calculateFitsAndRarity: (state, action) => {
      const { hash, artifacts, enabledBuilds } = action.payload;
      const resultHash = getArtifactsResultHash(enabledBuilds);
      if (!!!state.fitsAndRarity[hash]) {
        state.fitsAndRarity[hash] = {}
      }
      if (!!!state.fitsAndRarity[hash][resultHash]) {
        const { allFits, allRarity } = getAllFitsAndAllRarity(artifacts, enabledBuilds)
        state.fitsAndRarity[hash][resultHash] = { allFits, allRarity };
      }
    },
  },
})

export const { updateFitsAndRarity, calculateFitsAndRarity } = artifactsSlice.actions
export default artifactsSlice.reducer