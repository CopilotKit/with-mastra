import { useState } from "react";

export interface TimeSlot {
  date: string;
  time: string;
  duration?: string;
}

export interface MeetingTimePickerProps {
  status: "inProgress" | "executing" | "complete";
  respond?: (response: string) => void;
  title?: string;
  timeSlots?: TimeSlot[];
}

export function MeetingTimePicker({
  status,
  respond,
  title = "Schedule a Meeting",
  timeSlots = [
    { date: "Tomorrow", time: "2:00 PM", duration: "30 min" },
    { date: "Friday", time: "10:00 AM", duration: "30 min" },
    { date: "Next Monday", time: "3:00 PM", duration: "30 min" },
  ]
}: MeetingTimePickerProps) {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [declined, setDeclined] = useState(false);

  const handleSelectSlot = (slot: TimeSlot) => {
    setSelectedSlot(slot);
    respond?.(`Meeting scheduled for ${slot.date} at ${slot.time}${slot.duration ? ` (${slot.duration})` : ''}.`);
  };

  const handleDecline = () => {
    setDeclined(true);
    respond?.("The user declined all proposed meeting times. Please suggest alternative times or ask for their availability.");
  };

  return (
    <div className="rounded-2xl shadow-lg max-w-md w-full border mx-auto mb-10">
      <div className="backdrop-blur-md p-8 w-full rounded-2xl">
        {/* Show confirmation or prompt */}
        {selectedSlot ? (
          <div className="text-center">
            <div className="text-7xl mb-4">📅</div>
            <h2 className="text-2xl font-bold mb-2">
              Meeting Scheduled
            </h2>
            <p className="text-gray-600 mb-2">
              {selectedSlot.date} at {selectedSlot.time}
            </p>
            {selectedSlot.duration && (
              <p className="text-sm text-gray-500">
                Duration: {selectedSlot.duration}
              </p>
            )}
          </div>
        ) : declined ? (
          <div className="text-center">
            <div className="text-7xl mb-4">🔄</div>
            <h2 className="text-2xl font-bold mb-2">
              No Time Selected
            </h2>
            <p className="text-gray-600">
              Let me find a better time that works for you
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">🗓️</div>
              <h2 className="text-2xl font-bold mb-2">
                {title}
              </h2>
              <p className="text-gray-600">
                Select a time that works for you
              </p>
            </div>

            {/* Time slot options */}
            {status === "executing" && (
              <div className="space-y-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSlot(slot)}
                    className="w-full px-6 py-4 rounded-xl font-medium
                      border-2 border-gray-200 hover:border-blue-500
                      shadow-sm hover:shadow-md transition-all cursor-pointer
                      hover:scale-102 active:scale-98
                      flex justify-between items-center
                      hover:bg-blue-50"
                  >
                    <div className="text-left">
                      <div className="font-bold text-gray-900">{slot.date}</div>
                      <div className="text-sm text-gray-600">{slot.time}</div>
                    </div>
                    {slot.duration && (
                      <div className="text-sm text-gray-500">{slot.duration}</div>
                    )}
                  </button>
                ))}

                <button
                  onClick={handleDecline}
                  className="w-full px-6 py-3 rounded-xl font-medium
                    text-gray-600 hover:text-gray-800
                    transition-all cursor-pointer
                    hover:bg-gray-100"
                >
                  None of these work
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
