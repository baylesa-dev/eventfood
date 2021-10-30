import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Cart = {
    elements: Product[];
};

const initialState: Cart = {
    elements: [],
};

const slice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }: PayloadAction<Product>) => {
            state.elements = [...state.elements, payload]
        },
        removeFromCart: (state, { payload }: PayloadAction<string | null>) => {
            if (payload) {
                const index = state.elements.findIndex(element => element.articleid === payload)
                if (index !== -1) state.elements = [...state.elements.slice(0, index), ...state.elements.slice(index + 1)]
            }
        },
        emptyCart: (state) => {
            state.elements = [];
        },
    },
});

export const { reducer } = slice;
export const { emptyCart, addToCart, removeFromCart } = slice.actions;
