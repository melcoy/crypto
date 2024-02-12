import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {Svg, Text} from 'react-native-svg';
import {scaleLinear} from 'd3-scale';

import Candle, {Candle as CandleModel} from '../atoms/Candle';
import {Flex} from 'native-base';
import {getDomain} from '../../helpers/helpers';

export const {width: size} = Dimensions.get('window');

interface ChartProps {
  candles: CandleModel[];
  domain: [number, number];
}

export default ({candles}: ChartProps) => {
  const domain = getDomain(candles);
  const width = candles ? size / candles.length : 0;

  const scaleY = domain ? scaleLinear().domain(domain).range([size, 0]) : 0;
  const scaleBody = domain
    ? scaleLinear()
        .domain([0, Math.max(...domain) - Math.min(...domain)])
        .range([0, size])
    : 0;

  const lastCandle = candles[candles.length - 1];
  const highestCandle = candles.reduce((maxCandle, currentCandle) =>
    currentCandle.high > maxCandle.high ? currentCandle : maxCandle,
  );
  const lowestCandle = candles.reduce((minCandle, currentCandle) =>
    currentCandle.low < minCandle.low ? currentCandle : minCandle,
  );
  useEffect(() => {
    console.log('objectDom', domain);
  }, [domain]);
  return (
    // <Flex></Flex>
    <Svg width={size} height={size}>
      {candles && domain ? (
        <>
          {candles.map((candle, index) => (
            <Flex key={candle.date}>
              <Candle {...{candle, index, width, scaleY, scaleBody}} />
            </Flex>
          ))}

          {/* Display last, highest, and lowest values */}
        </>
      ) : null}
    </Svg>
  );
};
