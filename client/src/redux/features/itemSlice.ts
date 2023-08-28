import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ItemReport } from "../../../types";


const initialState = {} as ItemReport;

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        handleUpdateItemReport: (state, action: PayloadAction<ItemReport>) => (action.payload)
    }
})

export const { handleUpdateItemReport } = itemSlice.actions;
export default itemSlice.reducer;