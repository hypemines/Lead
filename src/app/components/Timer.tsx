"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Digit = ({ value }: { value: string }) => (
  <div className="relative w-6 h-10 overflow-hidden">
    <AnimatePresence initial={false}>
      <motion.div
        key={value}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
      >
        {value}
      </motion.div>
    </AnimatePresence>
  </div>
)

const TimerSection = ({ value, label, isLast }: { value: number; label: string; isLast?: boolean }) => {
  const formattedValue = value.toString().padStart(2, '0')
  return (
    <div className={`flex flex-col items-center w-16 ${isLast ? 'opacity-50' : ''} select-none`}>
      <div className="flex">
        <Digit value={formattedValue[0]} />
        <Digit value={formattedValue[1]} />
      </div>
      <span className="text-xs text-gray-400 w-full text-center" style={{ marginTop: '-2px' }}>{label}</span>
    </div>
  )
}

const InfoBox = () => (
  <div className="mt-6 p-3 bg-gray-800 border border-gray-700 rounded-lg max-w-sm text-center select-none">
    <p className="text-sm text-white">
      Winners will be selected when timer reaches 0:00:00. Rewards will be{' '}
      <span 
        className="text-yellow-400 select-text cursor-pointer"
        onClick={() => {/* Add your click handler here */}}
      >
        credited
      </span>{' '}
      shortly after.
    </p>
  </div>
)

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const endDate = new Date('2024-09-30T23:59:59').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = endDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center select-none" style={{ width: '16rem' }}>
        <h2 className="text-lg font-bold mb-2 w-full text-center">LEADERBOARDS END IN:</h2>
        <div className="flex">
          <TimerSection value={timeLeft.days} label="DAYS" />
          <TimerSection value={timeLeft.hours} label="HOURS" />
          <TimerSection value={timeLeft.minutes} label="MIN" />
          <TimerSection value={timeLeft.seconds} label="SEC" isLast={true} />
        </div>
      </div>
      <InfoBox />
    </div>
  )
}
