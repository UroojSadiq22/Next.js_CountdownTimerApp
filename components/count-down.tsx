"use client"
import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Countdown(){
    const [duration, setDuration] = useState<number | string>("")
    const [timeLeft, setTimeLeft] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleSetDuartion = () => {
        if(typeof duration === "number" && duration > 0){
            setTimeLeft(duration)
            setIsActive(false)
            setIsPaused(false)
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    
    }

    const handleStart= () => {
        if(timeLeft > 0){
            setIsActive(true)
            setIsPaused(false)
        }
        else{
            alert("Please enter the correct time.")
        }
    }

    const handlePause = () => {
        if(isActive){
            setIsActive(false)
            setIsPaused(true)
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    }

    const handleReset = () => {
        setIsActive(false)
        setIsPaused(false)
        setTimeLeft(typeof duration === "number" ? duration : 0)
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }

    useEffect(() => {
        if(isActive && !isPaused){
            timerRef.current = setInterval(() => {
                setTimeLeft((prevtime) => {
                    if(prevtime <= 1){
                        clearInterval(timerRef.current!)
                        return 0
                    }
                    return prevtime - 1
                })
            }, 1000);
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    }, [isActive, isPaused])

    const formatTime = (time:number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    }

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value) || "")
    }

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-pink-500 dark:from-blue-900 dark:to-pink-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 w-full max-w-xl max-h-xl w-[32rem] h-[26rem] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-10 text-blue-800 dark:text-blue-200 text-center">
                    Countdown Timer
                </h1>
            <div className="flex items-center mb-8">
                    <Input 
                    type="number"
                    id="duration" 
                    placeholder="Enter duration in seconds" 
                    value={duration} 
                    onChange={handleDurationChange}
                    className="flex-1 mr-4 roundd-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                    />
                    <Button onClick={handleSetDuartion}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                        Set
                    </Button>
                </div>
                <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center animate-pulse">
                    {formatTime(timeLeft)}
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={handleStart}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-colors duration-300">
                        {isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button onClick={handlePause}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200 hover:bg-yellow-500 hover:text-white dark:hover:bg-yellow-500 dark:hover:text-white transition-colors duration-300">Pause
                    </Button>
                    <Button onClick={handleReset}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white transition-colors duration-300">Reset</Button>
                </div>
            </div>
        </div>
    )
}