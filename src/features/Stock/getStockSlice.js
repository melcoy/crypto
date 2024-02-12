import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_HOST, API_KEY} from '../../config/configuration';

const initialState = {
  status: 'idle',
  code: '',
  data: '',
};
export const getStock = createAsyncThunk('getStock/getStock', async model => {
  if (model.action !== 'reset') {
    const [data, isData] = await axios({
      method: 'GET',
      url: `https://api.binance.com/api/v3/depth?limit=10&symbol=BTCUSDT`,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        const responseAPI = result;
        return [responseAPI, true];
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
        }

        return [error.response, false];
      });

    return JSON.stringify(data);
  }

  return JSON.stringify({data: 'reset'});
});

const getStockSlice = createSlice({
  name: 'getStock',
  initialState: initialState,
  extraReducers: {
    [getStock.pending]: (state, action) => {
      state.status = 'loading';
      state.data = '';
    },

    [getStock.fulfilled]: (state, action) => {
      var record = JSON.parse(action.payload);
      if (record.status === 200) {
        state.status = 'loaded';
        state.code = record.status;
        state.data = record.data;
      } else {
        if (record.data === 'reset') {
          state.status = 'idle';
          state.data = '';
          state.code = '';
        } else {
          state.status = 'error';
          state.code = record.status;
          state.data = record.data;
        }
      }
    },
    [getStock.rejected]: (state, action) => {
      state.status = 'error';
      state.data = '';
    },
  },
});
export const getStockSelectors = getStockSlice.action;
export default getStockSlice.reducer;
