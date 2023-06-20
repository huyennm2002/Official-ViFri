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

const initialState = {
    items: [] as ItemType[],
}

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        handleUpdateItemList: (state, action) => {
            console.log("HERE");
            console.log(action);
            console.log(action.payload);
            return {
                ...state,
                items: action.payload
            }
        }
    }
})

export const { handleUpdateItemList } = itemSlice.actions;
export default itemSlice.reducer;