'use client'

import { useRef, useEffect } from 'react'

interface WaveformVisualizerProps {
  audioUrl?: string;
}

export default function WaveformVisualizer({ audioUrl }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!audioUrl || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyser = audioContext.createAnalyser()
    
    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        // Draw waveform
        const width = canvas.width
        const height = canvas.height
        const data = audioBuffer.getChannelData(0)
        const step = Math.ceil(data.length / width)
        
        ctx.fillStyle = '#FF4081' // accent color
        ctx.strokeStyle = '#FF4081'
        
        for(let i = 0; i < width; i++) {
          const sliceStart = step * i
          const sliceEnd = sliceStart + step
          const slice = data.slice(sliceStart, sliceEnd)
          const value = Math.abs(slice.reduce((a, b) => Math.max(a, Math.abs(b)), 0))
          const y = (value * height)
          
          ctx.beginPath()
          ctx.moveTo(i, height / 2 - y / 2)
          ctx.lineTo(i, height / 2 + y / 2)
          ctx.stroke()
        }
      })

    return () => {
      audioContext.close()
    }
  }, [audioUrl])

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-24 bg-dark-800 rounded-lg"
      width={800}
      height={100}
    />
  )
}