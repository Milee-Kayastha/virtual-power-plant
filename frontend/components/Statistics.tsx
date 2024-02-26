import React from 'react'
import StatCard from './StatCard'
import { StatisticsProps } from '@/utils/interface'

const Statistics = ({isLoading,totalWattCapacity,averageWattCapacity}:StatisticsProps) => {
  return (
    <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Statistics
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {isLoading || (!totalWattCapacity && !averageWattCapacity) ? (
              <>
                <div className="animate-pulse w-full h-[108px] bg-gray-100 rounded"></div>
                <div className="animate-pulse w-full h-[108px] bg-gray-100 rounded"></div>
              </>
            ) : (
              <>
                {totalWattCapacity && (
                  <StatCard
                    title={"Total Watt Capacity"}
                    data={totalWattCapacity + " W"}
                  />
                )}
                {averageWattCapacity && (
                  <StatCard
                    title={"Average Watt Capacity"}
                    data={parseFloat(averageWattCapacity).toFixed(2) + " W"}
                  />
                )}
              </>
            )}
          </div>
        </div>
  )
}

export default Statistics