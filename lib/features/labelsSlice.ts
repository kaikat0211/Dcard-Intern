import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LabelsState {
    labels: string[];
    color: string[];
}

const initialLabels: LabelsState = {
    labels: [''],
    color: [''], 
}

const labelsSlice = createSlice({
    name: 'labels',
    initialState: initialLabels,
    reducers:{
        setLabels(state, action: PayloadAction<string[]>){
            state.labels = action.payload;
        },
        setColor(state, action: PayloadAction<string[]>) {
            state.color = action.payload;
        }
    }
})

export const { setLabels, setColor } = labelsSlice.actions
export default labelsSlice.reducer