import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ItemType } from "../../../types";

const initialState = [] as ItemType[];

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        handleUpdateItemList: (state, action: PayloadAction<ItemType[]>) => action.payload,
    }
})

export const { handleUpdateItemList } = itemSlice.actions;
export default itemSlice.reducer;