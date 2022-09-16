import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function StatChart() {
  const data = [
    {
      name: '06:00',
      times: 5,
    },
    {
      name: '07:00',
      times: 10,
    },
    {
      name: '08:00',
      times: 12,
    },
    {
      name: '09:00',
      times: 9,
    },
    {
      name: '10:00',
      times: 14,
    },
    {
      name: '11:00',
      times: 13,
    },
    {
      name: '12:00',
      times: 13,
    },
    {
      name: '13:00',
      times: 14,
    },
    {
      name: '14:00',
      times: 12,
    },
    {
      name: '15:00',
      times: 13,
    },
    {
      name: '16:00',
      times: 12,
    },
    {
      name: '17:00',
      times: 14,
    },
    {
      name: '18:00',
      times: 13,
    },
    {
      name: '19:00',
      times: 11,
    },
    {
      name: '20:00',
      times: 8,
    },
    {
      name: '21:00',
      times: 2,
    },
  ]
  return (
    <ResponsiveContainer height={300} width={500}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        className='font-IBMPlexLoop text-xs sm:text-sm'
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='times' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}
