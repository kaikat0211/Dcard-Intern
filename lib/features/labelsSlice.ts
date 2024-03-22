import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabelInfo{
    label: string,
    color: string
}
interface LabelsState{
    labels: LabelInfo[]
}
const initialLabels: LabelsState | undefined = {
    labels: []
}

const labelsSlice = createSlice({
    name: 'labels',
    initialState: initialLabels,
    reducers:{
        setLabels(state, action: PayloadAction<LabelInfo[]>){
            state.labels = action.payload;
        },
    }
})

export const { setLabels } = labelsSlice.actions
export default labelsSlice.reducer