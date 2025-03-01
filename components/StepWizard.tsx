import React, { useState, useEffect, useContext } from 'react'
import { MinusIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import 'animate.css';
import SongCard from './ui/SongCard';
import { RenderInfoContext } from '@/app/make/page';





interface StepWizardProps {
  isMinimized: boolean
  toggleMinimized: () => void
}

const StepWizard: React.FC<StepWizardProps> = ({ isMinimized, toggleMinimized }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
  })
  
  const { renderInfo } = useContext(RenderInfoContext);



  // New state to track animation direction
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev' | null>(null)
  const [animate, setAnimate] = useState(false)

  const steps = ['Choose a song', 'Customize', 'Finalize']

  

  const nextStep = () => {
    setAnimationDirection('next')
    setAnimate(true)
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1))
  }

  const prevStep = () => {
    setAnimationDirection('prev')
    setAnimate(true)
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  }

  // Reset the animation state after animation completes
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false)
      }, 500) // Duration should match the animation duration
      return () => clearTimeout(timer)
    }
  }, [animate])

  return (
    
    <div
      className={`step-wizard flex flex-col items-center justify-start transition-all duration-300 ease-in-out`}
      style={{
        height: isMinimized ? '3rem' : '11.5rem', // Converted px to rem for responsiveness
      }}
    >
        

      
      <div
        className="bottom-bar w-full bg-none text-gray-800 text-center py-1 cursor-pointer"
        onClick={toggleMinimized}>
        <div className="mx-auto my-1 h-2 w-[60px] rounded-full bg-gray-100"></div>
      </div>

      <div className="controls inline-flex justify-between items-center bg-transparent backdrop-blur-md w-full sm:w-2/3 md:w-1/4 p-2">

      

      
        <button onClick={prevStep} className="p-2 ">
          <ArrowLeftIcon className="text-gray-900 h-6 w-6 cursor-pointer" />
        </button>
        <div className="current-step text-lg">
          <p
            className={`text-gray-600 ${
              animate
                ? animationDirection === 'next'
                  ? 'animate__animated animate__fadeInRight'
                  : 'animate__animated animate__fadeInLeft'
                : ''
            }`}
            style={{ animationDuration: '0.3s' }}
          >
            {steps[currentStep]}{' '}
            <span className="text-gray-300">
              {currentStep + 1}/{steps.length}
            </span>
          </p>
        </div>
        <button onClick={nextStep} className="p-2">
          <ArrowRightIcon className="text-gray-900 h-6 w-6 cursor-pointer" />
        </button>
      </div>

      {!isMinimized && (
        <div className="form-content backdrop-blur-md p-4 flex-1">
          {currentStep === 0 && (
           <SongCard 
             title={renderInfo.trackName} 
             artist={renderInfo.trackArtists} 
             image={renderInfo.artWork} 
             onChange={handleChange}
           />
   
           
          )}
          {currentStep === 1 && (
            <input
              type="text"
              name="field2"
              value={formData.field2}
              onChange={handleChange}
              placeholder="Enter value for Step 2"
              className="text-gray-600 w-full p-2"
            />
           
          )}
          {currentStep === 2 && (
            <input
              type="text"
              name="field3"
              value={formData.field3}
              onChange={handleChange}
              placeholder="Enter value for Step 3"
              className="text-gray-600 w-full p-2"
            />
          )}
        </div>
      )}

      

    </div>
    

  )
}

export default StepWizard