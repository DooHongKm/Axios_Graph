import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import axios from 'axios';

interface User {
  [key: string]: number
}

function getRandomInt(): number {
  return Math.floor(Math.random() * 100);
}

const Graph2: React.FC = () => {

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = responseUsers.data;
        const userPosts = users.map((user: any) => ({
            name: user.name,
            a: getRandomInt(),
            b: getRandomInt(),
            c: getRandomInt()
        }));
        setData(userPosts);
      } catch (error) {
        setErrorMsg('Fetching Error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div className='graph-container'>
      <ResponsiveBar
        data={data}
        keys={[
          'a', 'b', 'c'
        ]}
        indexBy="name"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'name',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 2
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
    </div>
  )
}

export default Graph2
