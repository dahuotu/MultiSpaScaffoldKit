import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../store/actions';

const Counter = () => {
    const count = useSelector(state => state.counter.value );
    const dispatch = useDispatch();
    const { incremented, decremented, incrementByAmount } = Actions.default;

    const incrementAsync = amount => dispatch => {
        console.log(amount);
        setTimeout(() => {
          dispatch(incrementByAmount(amount));
        }, 1000);
      };

      

    return (
        <div>
            <p>{count}</p>
            <div><button aria-label="Increment value" onClick={ () => dispatch(incremented()) }> Increment </button></div>
            <div><button aria-label="Decrement value" onClick={ () => dispatch(decremented()) }> Decrement </button></div>
            <div><button aria-label="IncrementByAmount value" onClick={ () => incrementAsync() }> IncrementByAmount </button></div>
        </div>
    );
};

export default Counter;