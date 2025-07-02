import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PaymentState {
  paymentId: string
}

const initialState: PaymentState = {
  paymentId: "",
}

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPayment: (state, action: PayloadAction<{ paymentId: string }>) => {
      state.paymentId = action.payload.paymentId
    },
  },
})

export const { setPayment } = paymentSlice.actions

export default paymentSlice.reducer

