"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react"

interface TimelineControlProps {
  startDate: Date
  endDate: Date
  currentDate: Date
  onChange: (date: Date) => void
}

export function TimelineControl({ startDate, endDate, currentDate, onChange }: TimelineControlProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

  // Update slider value when currentDate changes
  useEffect(() => {
    const currentDays = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    const newValue = (currentDays / totalDays) * 100
    setSliderValue(newValue)
  }, [currentDate, startDate, totalDays])

  // Animation function using requestAnimationFrame
  const animate = useCallback(
    (timestamp: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp
      }

      const elapsed = timestamp - lastUpdateTimeRef.current

      // Update every 100ms
      if (elapsed > 100) {
        setSliderValue((prev) => {
          if (prev >= 100) {
            // Stop at the end
            setIsPlaying(false)
            return 100
          }

          // Increment the slider value
          const newValue = Math.min(prev + 1, 100)

          // Calculate the new date
          const dayOffset = Math.floor((newValue / 100) * totalDays)
          const newDate = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)

          // Update the parent
          onChange(newDate)

          return newValue
        })

        lastUpdateTimeRef.current = timestamp
      }

      // Continue the animation loop
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      }
    },
    [isPlaying, onChange, startDate, totalDays],
  )

  // Handle play button click
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      const newIsPlaying = !prev

      // If starting to play
      if (newIsPlaying) {
        // Reset the last update time
        lastUpdateTimeRef.current = 0

        // Start the animation
        if (animationRef.current === null) {
          animationRef.current = requestAnimationFrame(animate)
        }
      } else {
        // Stop the animation
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = null
        }
      }

      return newIsPlaying
    })
  }, [animate])

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // Start or stop animation when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      if (animationRef.current === null) {
        lastUpdateTimeRef.current = 0
        animationRef.current = requestAnimationFrame(animate)
      }
    } else {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
    }
  }, [isPlaying, animate])

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    const newValue = values[0]
    setSliderValue(newValue)

    // Calculate the new date
    const dayOffset = Math.floor((newValue / 100) * totalDays)
    const newDate = new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)

    // Update the parent
    onChange(newDate)
  }

  // Handle step buttons
  const stepForward = () => {
    const newValue = Math.min(sliderValue + 10, 100)
    handleSliderChange([newValue])
  }

  const stepBackward = () => {
    const newValue = Math.max(sliderValue - 10, 0)
    handleSliderChange([newValue])
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="timeline-control">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="bg-white border-gold/30 hover:bg-gold/10 hover:text-gold text-gold h-8 w-8"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={stepBackward}
            disabled={sliderValue <= 0}
            className="bg-white border-gold/30 hover:bg-gold/10 hover:text-gold text-gold h-8 w-8 rounded-r-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={stepForward}
            disabled={sliderValue >= 100}
            className="bg-white border-gold/30 hover:bg-gold/10 hover:text-gold text-gold h-8 w-8 rounded-l-none border-l-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 px-2">
        <Slider
          value={[sliderValue]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleSliderChange}
          className="timeline-slider"
        />
      </div>

      <div className="text-sm font-medium bg-white px-3 py-1.5 rounded-md border border-gold/30 text-gray-800">
        {formatDate(currentDate)}
      </div>
    </div>
  )
}
