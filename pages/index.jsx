import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import StatChart from '../components/stchart'

export default function Home() {
  const [wmData, setWmData] = useState(false)
  const [wmAll, setWmAll] = useState(false)
  const [current, setCurrent] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      fetch('/api/working', {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((data) => {
          data.ok && setWmData(data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }, 4000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    fetch('/api/getall', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        data.ok && setWmAll(data.data)
      })
      .catch((err) => {
        console.log(err)
      })

    fetch('/api/working', {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        data.ok && setWmData(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(new Date())
    }, 100)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const checkStatus = (id) => {
    return wmData.filter((x) => x.id === id && x.work).length > 0
  }

  const getData = (id) => {
    return wmData.filter((x) => x.id === id && x.work)[0]
  }

  function pad(num, size) {
    num = num.toString()
    while (num.length < size) num = '0' + num
    return num
  }

  const toTimeString = (raw) => {
    const hr = pad(Math.floor(raw / (1000 * 60 * 60)), 2)
    const min = pad(
      Math.floor(raw / (1000 * 60) - 60 * Math.floor(raw / (1000 * 60 * 60))),
      2,
    )
    const sec = pad(
      Math.floor(raw / 1000 - 60 * Math.floor(raw / (1000 * 60))),
      2,
    )
    return `${hr > 0 ? hr + ':' : ''}${min}:${sec}`
  }

  const getUpTime = (id) => {
    if (checkStatus(id)) {
      const raw = current - new Date(getData(id).start)
      return toTimeString(raw)
    } else return ''
  }

  const getAvgTime = (id) => {
    const pv = wmAll.filter((x) => x.id === id && !x.work)
    if (pv.length > 0) {
      const timeData = pv.map((x) => new Date(x.end) - new Date(x.start))
      const raw = timeData.reduce((a, b) => a + b, 0) / timeData.length
      return toTimeString(raw)
    }
    return '-'
  }

  const wmName = [
    {
      id: 1,
      avg: '57:43',
    },
    {
      id: 2,
      avg: '55:21',
    },
    {
      id: 3,
      avg: '53:48',
    },
    {
      id: 4,
      avg: '58:10',
    },
    {
      id: 5,
      avg: '56:55',
    },
    {
      id: 6,
      avg: '51:34',
    },
    {
      id: 7,
      avg: '53:49',
    },
  ]

  return (
    <>
      <Head>
        <title>คิดจะซัก คิดถึง…</title>
        {/* <meta
          name='description'
          content='พวกเรา MWIT30/9 จะพาทุกคนบินลัดฟ้าไปดูจุดเริ่มต้นเเละความเป็นมาของกีฬาโอลิมปิก เรียนรู้วัฒนธรรมเเละประวัติศาสตร์โลก ผ่านการท่องเที่ยวในเมืองที่เคยจัดโอลิมปิกมาเเล้ว อย่างเอเธนส์ ประเทศกรีซ และปารีส ประเทศฝรั่งเศส'
        />

        <meta property='og:url' content='https://olympicstrip.woyiswoy.com' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='OLYMPICS Virtual Trip' />
        <meta
          property='og:description'
          content='พวกเรา MWIT30/9 จะพาทุกคนบินลัดฟ้าไปดูจุดเริ่มต้นเเละความเป็นมาของกีฬาโอลิมปิก เรียนรู้วัฒนธรรมเเละประวัติศาสตร์โลก ผ่านการท่องเที่ยวในเมืองที่เคยจัดโอลิมปิกมาเเล้ว อย่างเอเธนส์ ประเทศกรีซ และปารีส ประเทศฝรั่งเศส'
        />
        <meta
          property='og:image'
          content='https://olympicstrip.woyiswoy.com/img/ogimage.jpg'
        />

        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='olympicstrip.woyiswoy.com' />
        <meta
          property='twitter:url'
          content='https://olympicstrip.woyiswoy.com'
        />
        <meta name='twitter:title' content='OLYMPICS Virtual Trip' />
        <meta
          name='twitter:description'
          content='พวกเรา MWIT30/9 จะพาทุกคนบินลัดฟ้าไปดูจุดเริ่มต้นเเละความเป็นมาของกีฬาโอลิมปิก เรียนรู้วัฒนธรรมเเละประวัติศาสตร์โลก ผ่านการท่องเที่ยวในเมืองที่เคยจัดโอลิมปิกมาเเล้ว อย่างเอเธนส์ ประเทศกรีซ และปารีส ประเทศฝรั่งเศส'
        />
        <meta
          name='twitter:image'
          content='https://olympicstrip.woyiswoy.com/img/ogimage.jpg'
        /> */}
      </Head>

      <div className='w-full min-h-screen flex flex-col gap-3 justify-center items-center px-6'>
        <span className='font-IBMPlex font-bold text-4xl pb-6'>
          คิดจะซัก คิดถึง…
        </span>
        <div className='flex flex-wrap items-start'>
          <div className='flex flex-col justify-center gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <div className='font-IBMPlex font-bold text-center text-xl md:text-2xl whitespace-nowrap'>
                สถานะการทำงานของเครื่องซักผ้า
              </div>
              <div className='w-4 h-4 animate-pulse bg-red-500 rounded-full' />
            </div>

            <table className='table-auto font-IBMPlexLoop text-sm md:text-base w-fit self-center'>
              <thead className='border-b-2 border-b-gray-400'>
                <tr>
                  <th className='px-2'>หมายเลขเครื่อง</th>
                  <th className='px-2'>สถานะ</th>
                  <th className='px-2'>ทำงานมาแล้ว</th>
                  <th className='px-2'>เวลาเฉลี่ย</th>
                </tr>
              </thead>
              <tbody>
                {wmData && wmAll ? (
                  wmName.map((t, ti) => (
                    <tr
                      key={ti}
                      className='border-b border-gray-300 hover:bg-gray-200/80 group transition-colors duration-200'
                    >
                      <td className='p-1 text-center'>เครื่องที่ {t.id}</td>
                      {checkStatus(t.id) ? (
                        <td className='py-1 px-2 md:px-3 text-center bg-red-200 text-red-600 group-hover:bg-red-300 transition-colors duration-200 font-semibold flex gap-2 justify-center items-center text'>
                          <span className='whitespace-nowrap'>ทำงานอยู่</span>
                          <FontAwesomeIcon icon={faCircleXmark} className='' />
                        </td>
                      ) : (
                        <td className='py-1 px-2 md:px-3 text-center bg-green-200 text-green-600 group-hover:bg-green-300 transition-colors font-semibold flex gap-2 justify-center items-center text'>
                          <span>ว่าง</span>
                          <FontAwesomeIcon icon={faCircleCheck} className='' />
                        </td>
                      )}

                      <td className='p-1 text-right font-mono'>
                        {getUpTime(t.id)}
                      </td>

                      <td className='p-1 text-right font-mono'>{t.avg}</td>
                    </tr>
                  ))
                ) : (
                  <tr className='border-b border-gray-300 hover:bg-gray-200/80 transition-colors duration-200'>
                    <td className='py-1 px-2 space-x-1 text-center' colSpan={4}>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className='animate-spin max-h-6'
                      />
                      <span>Loading...</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='font-IBMPlex font-bold text-center text-xl md:text-2xl whitespace-nowrap'>
              สถิติการใช้งานเครื่องซักผ้า
            </div>

            <StatChart />
          </div>
        </div>
      </div>
    </>
  )
}
