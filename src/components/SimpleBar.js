import React from 'react';
import { letterFrequency } from '@visx/mock-data';
import {Group} from '@visx/group';
import {Bar} from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import {AxisBottomm, AxisLeft} from '@visx/axis';


const data = letterFrequency;
console.log(data);

// 定義chart的尺寸
const width = 500;
const height = 500;
const margin = {top:20, bottom:20, left:20, right:20};

// 定義界線
const xMax = width - margin.left - margin.right; // x軸最大能展現的範圍 460
const yMax = width - margin.top - margin.bottom; // y軸最大能展現的範圍 460

// 準備取出資料的方法
const x = (d) => d.letter;
const y = (d) => +d.frequency*100;

const xScale = scaleBand({
  range:[0, xMax],
  round:true,
  domain:data.map(x), // ABCD...Z 每個都一樣寬
  padding:0.4
});

const yScale = scaleLinear({
  range:[yMax, 0],
  round:true,
  domain:[0, Math.max(...data.map(y))]  // y的最大值
});

// 將資料scale量化 以兩個函式作為參數 accessor取x,y所需的值 取出來的資料陣列會帶入domain
const compose = (scale, accessor)=> data => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

const SimpleBar = () => {

  return (
    <svg width={width} height={height}>
      {data.map((d,i)=>{
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`} left={20}>
            <Bar 
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#red"
            />
            
          </Group> 
        )
      })}
      <AxisLeft 
      tickTransform='translate(10,0)'
      scale={yScale}
      tickFormat={(y)=> y+'%'}
      tickLabelProps={()=>({
        fill:'red',
        fontSize:11
      })}
      
      />
    </svg>
  )
}

export default SimpleBar;