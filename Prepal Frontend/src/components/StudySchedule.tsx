import type React from "react"
import Card from "./Card"

const StudySchedule: React.FC = () => {
  const schedule = [
    { time: "9:00 AM - 10:30 AM", topic: "Linear Regression" },
    { time: "11:00 AM - 12:30 PM", topic: "Decision Trees" },
    { time: "2:00 PM - 3:30 PM", topic: "Flashcard Review" },
    { time: "4:00 PM - 5:30 PM", topic: "Practice Problems" },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Today's Study Schedule</h2>
      <div className="grid gap-4">
        {schedule.map((item, index) => (
          <Card key={index} title={item.time}>
            <p className="text-gray-600">{item.topic}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default StudySchedule

