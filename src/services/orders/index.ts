import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { orders: Order[] } = {
    orders: [],
};

const slice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addNewOrder: (state, { payload }: PayloadAction<{ products: Product[], promoCode?: string, id: number }>) => {
            const time = new Date().toISOString();
            state.orders = [
                {
                    time,
                    id: payload.id,
                    products: payload.products,
                    promoCode: payload.promoCode
                },
                ...state.orders
            ]
        }
    },
});

export const { reducer } = slice;
export const { addNewOrder } = slice.actions;
