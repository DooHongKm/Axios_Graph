import React, { useState, useEffect } from 'react'
import { ResponsivePie } from '@nivo/pie'
import axios from 'axios';

interface User {
  id: string;
  label: string;
  value: number;
}

const Graph: React.FC = () => {

  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = responseUsers.data;
        const responsePosts = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = responsePosts.data;
        const userPosts = users.map((user: any) => {
          const filterPosts = posts.filter((post: any) => post.userId === user.id);
          return {
            id: user.id.toString(),
            label: user.name,
            value: filterPosts.length
          }
        });
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
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 50,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 15,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </div>
  )
}

export default Graph
