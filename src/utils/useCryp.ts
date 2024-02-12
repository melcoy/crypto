import {useState, useEffect} from 'react';
import type {User} from '../types/user';
import {useDispatch, useSelector} from 'react-redux';
import {getMe} from '../features/User/getMeSlice';
import {logout} from './logout';
import {useToast} from 'native-base';
import ToastAlert from '../components/atoms/ToastAlert';
import {getCrypto} from '../features/Stock/getCryptoSlice';

export default function useCryp() {
  const defaultCryp: Crypto = [
    {
      date: '',
      day: '',
      open: '',
      high: '',
      low: '',
      close: '',
      x: '',
    },
  ];

  const [currCryp, setCurrCryp] = useState<Crypto>(defaultCryp);
  const getCryptoState = useSelector((state: any) => state.getCrypto);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    if (getCryptoState.status === 'loaded') {
      const arrCryp = [];
      getCryptoState.data.map(d =>
        arrCryp.push({
          date: d[0],
          day: 1,
          open: d[1],
          high: d[2],
          low: d[3],
          close: d[4],
          x: new Date(d[0]),
        }),
      );
      console.log(arrCryp.length);

      setCurrCryp(arrCryp);
    } else if (getCryptoState.status === 'error') {
    }
  }, [getCryptoState.data, getCryptoState.status]);

  useEffect(() => {
    const fetchInit = async () => {
      try {
        let dateStart = new Date();
        let dateEnd = new Date();

        dateStart.setMinutes(dateStart.getMinutes() - 10);
        dateEnd.setMinutes(dateEnd.getMinutes() - 1);

        var timestampStart = dateStart.getTime();
        var timeStampEnd = dateEnd.getTime();
        const model = {
          startTime: timestampStart,
          endTime: timeStampEnd,
        };
        dispatch(getCrypto(model));
      } catch (error) {
        console.error('Error reading from Async Storage:', error);
      }
    };

    fetchInit();
  }, [dispatch]);

  return currCryp[0].date === '' ? null : currCryp;
}
