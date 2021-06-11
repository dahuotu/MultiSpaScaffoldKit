import { createSlice } from '@reduxjs/toolkit';


const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        user: 'will track changes',
        ignoredPath: 'single level',
        ignoredNested: {
            one: 'one',
            two: 'two',
        },
    },
    reducers: {
        incremented: state => {
            state.value += 1;
        },
        decremented: state => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
    
});
console.log("counterSlice: ",counterSlice.actions);

export default counterSlice;