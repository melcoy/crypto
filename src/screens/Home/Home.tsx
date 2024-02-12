import {View, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';

// import data from '../../Data/data.json';
import data from '../../Data/dataChart.json';

import Chart, {size} from '../../components/molecules/Chart';
import {Candle} from '../../components/atoms/Candle';
import {API_KEY} from '../../config/configuration';
import {
  Box,
  Button,
  Flex,
  HStack,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getCrypto} from '../../features/Stock/getCryptoSlice';
import {getDomain} from '../../helpers/helpers';
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import useCryp from '../../utils/useCryp';
import {getStock} from '../../features/Stock/getStockSlice';

const Home = () => {
  // const candles = data.slice(0, 20);
  const candles = useCryp();
  const dimension = Dimensions.get('window');

  const [dataCryp, setDataCryp] = useState([]);
  const dispatch = useDispatch();
  const getCryptoState = useSelector((state: any) => state.getCrypto);
  const getOrderBookState = useSelector((state: any) => state.getStock);
  useEffect(() => {
    if (candles) {
      setDataCryp(candles);
    }
  }, [candles]);
  useEffect(() => {
    dispatch(getStock({}));
  }, [dispatch]);

  useEffect(() => {
    if (dataCryp.length > 0) {
      // setDataCryp(candles);
      const ws = new WebSocket(
        'wss://stream.binance.com:9443/ws/btcusdt@kline_1m',
      );

      ws.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log(data);

        // console.log('close', new Date(data.k.T));

        let timestampExists = true;

        if (data.k.x === true) {
          timestampExists = dataCryp.some(item => item.date === data.k.t);
        }
        if (!timestampExists) {
          setDataCryp(prevData => {
            const date = new Date(data.k.t);
            const day = date.getDate();
            const updatedData = [
              ...prevData,
              {
                date: data.k.t,
                day: day,
                open: parseFloat(data.k.o),
                high: parseFloat(data.k.h),
                low: parseFloat(data.k.l),
                close: parseFloat(data.k.c),
                x: new Date(data.k.t),
              },
            ];

            if (updatedData.length > 10) {
              updatedData.shift();
            }

            return updatedData;
          });
        }
      });

      return () => {
        ws.close();
      };
    }
  }, [dataCryp, getCryptoState.data]);

  useEffect(() => {
    console.log('cry', dataCryp);
  }, [dataCryp]);
  return (
    <Flex>
      {dataCryp.length > 0 && getOrderBookState.data ? (
        <>
          <VictoryChart
            theme={VictoryTheme.material}
            width={dimension.width + 50}
            domainPadding={{x: 25}}
            scale={{x: 'time'}}>
            <VictoryAxis
              tickFormat={t => `${t.getHours()}:${t.getMinutes()}`}
            />
            <VictoryAxis dependentAxis />
            <VictoryCandlestick
              candleColors={{positive: '#11dc2f', negative: '#c43a31'}}
              data={dataCryp}
            />
          </VictoryChart>
          <ScrollView>
            <HStack width={size}>
              <Flex flex={1} mr={5}>
                <Flex px={5} pb={5} flexDir={'row'}>
                  <Text fontWeight={'bold'}>Bid</Text>
                </Flex>
                <Flex px={5} flexDir={'row'}>
                  <Flex>
                    <Text fontWeight={'bold'}>Amount(BTC)</Text>
                    {getOrderBookState.data.bids.map(d => (
                      <Text>{parseFloat(d[1])}</Text>
                    ))}
                  </Flex>
                  <Box width={size - 400}></Box>
                  <Flex>
                    <Text fontWeight={'bold'}>Price(USD)</Text>
                    {getOrderBookState.data.bids.map(d => (
                      <Text fontWeight={'semibold'} color={'green.400'}>
                        {parseFloat(d[0])}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              </Flex>

              <Flex flex={1}>
                <Flex px={5} pb={5} flexDir={'row'}>
                  <Text fontWeight={'bold'}>Ask</Text>
                </Flex>
                <Flex px={5} flexDir={'row'}>
                  <Flex>
                    <Text fontWeight={'bold'}>Amount(BTC)</Text>
                    {getOrderBookState.data.asks.map(d => (
                      <Text>{parseFloat(d[1])}</Text>
                    ))}
                  </Flex>
                  <Box width={size - 400}></Box>
                  <Flex>
                    <Text fontWeight={'bold'}>Price(USD)</Text>
                    {getOrderBookState.data.asks.map(d => (
                      <Text fontWeight={'semibold'} color={'red.400'}>
                        {parseFloat(d[0])}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </HStack>
          </ScrollView>
          <Flex flexDir={'row'} justifyContent={'space-between'} p={1} mt={2}>
            <Button
              onPress={() => {
                // setIsInvalid(false);
                // setRejectReason('');
                // setModalVisible(false);
              }}
              // isLoading={rfpUpdateState.status === 'loading'}
              _pressed={{
                backgroundColor: '#0a841c',
              }}
              bg="#11dc2f"
              // background="rgba(17, 220, 47, 0.735)"
              w="full"
              maxW="48%">
              <Text color="white" fontWeight="bold">
                Buy
              </Text>
            </Button>
            <Button
              // onPress={() => handleUpdate('reject')}
              bg="#EF4444"
              w="full"
              _pressed={{
                backgroundColor: '#CC1D1D',
              }}
              // isLoading={rfpUpdateState.status === 'loading'}
              maxW="48%">
              <Text color="white" fontWeight="bold">
                Reject
              </Text>
            </Button>
          </Flex>
        </>
      ) : null}
    </Flex>
  );
};

export default Home;
{
  /* <VictoryCandlestick
        data={[
          {x: new Date(2016, 6, 1), open: 5, close: 8, high: 25, low: 0},
          {x: new Date(2016, 6, 2), open: 11, close: 20, high: 25, low: 5},
          {x: new Date(2016, 6, 3), open: 15, close: 20, high: 22, low: 10},
          {x: new Date(2016, 6, 4), open: 20, close: 10, high: 25, low: 7},
          {x: new Date(2016, 6, 5), open: 11, close: 11, high: 25, low: 7},
          {x: new Date(2016, 6, 6), open: 10, close: 8, high: 15, low: 5},
        ]}
      /> */
}
