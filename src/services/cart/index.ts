import { createSlice } from '@reduxjs/toolkit';

type Cart = {
    elements: any[];
};

const initialState: Cart = {
    elements: [],
};

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        emptyCart: (state) => {
            state.elements = [];
        },
    },
});

export const { reducer } = slice;
export const { emptyCart } = slice.actions;
