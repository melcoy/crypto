import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_HOST, API_KEY} from '../../config/configuration';

const initialState = {
  status: 'idle',
  code: '',
  data: '',
};
export const getCrypto = createAsyncThunk(
  'getCrypto/getCrypto',
  async model => {
    if (model.action !== 'reset') {
      const [data, isData] = await axios({
        method: 'GET',
        url: `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&startTime=${model.startTime}&endTime=${model.endTime}`,
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
  },
);

const getCryptoSlice = createSlice({
  name: 'getCrypto',
  initialState: initialState,
  extraReducers: {
    [getCrypto.pending]: (state, action) => {
      state.status = 'loading';
      state.data = '';
    },

    [getCrypto.fulfilled]: (state, action) => {
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
    [getCrypto.rejected]: (state, action) => {
      state.status = 'error';
      state.data = '';
    },
  },
});
export const getCryptoSelectors = getCryptoSlice.action;
export default getCryptoSlice.reducer;
