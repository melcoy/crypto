import getCryptoSlice from '../features/Stock/getCryptoSlice';
import getStockSlice from '../features/Stock/getStockSlice';

const {configureStore} = require('@reduxjs/toolkit');
export const store = configureStore({
  reducer: {getCrypto: getCryptoSlice, getStock: getStockSlice},
});
