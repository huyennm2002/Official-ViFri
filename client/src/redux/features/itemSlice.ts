import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type ItemType = {
    id: Number,
    name: string,
    status: string,
    expiration: Date,
    image: string,
    amount: Number,
    unit: string,
    added_at: Date
}

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