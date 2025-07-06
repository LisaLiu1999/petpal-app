import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Schedule.css';

// 可用時間段
const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM'
];

// 工具函數
const isToday = (date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

const isSameMonth = (date, currentMonth) => {
  return date.getMonth() === currentMonth.getMonth() && 
         date.getFullYear() === currentMonth.getFullYear();
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
};

const generateCalendar = (currentMonth) => {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days = [];
  const current = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return days;
};

// 日期比較函數 - 只比較日期部分，忽略時間
const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// 創建標準化日期字符串用於比較
const getDateKey = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

// 主組件
export default function Schedule() {
  const [selectedDateKey, setSelectedDateKey] = useState(null); // 改用字符串鍵值
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const navigate = useNavigate();
  const location = useLocation();
  const selectedService = location.state?.selectedService;

  const calendarDays = generateCalendar(currentMonth);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (date) => {
    if (isSameMonth(date, currentMonth)) {
      // 創建一個新的日期對象，只保留日期部分
      const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dateKey = getDateKey(normalizedDate);
      
      setSelectedDateKey(dateKey);
      setSelectedDate(normalizedDate);
      setSelectedTime(null); // 重置時間選擇
    }
  };

  const handleBack = () => {
    navigate('/services');
  };

  const handleNext = () => {
    if (selectedDate && selectedTime && selectedService) {
      const bookingData = {
        service: selectedService,
        date: selectedDate,
        time: selectedTime
      };
      console.log('Booking data:', bookingData);
      alert(`Successfully booked ${selectedService.title} on ${formatDate(selectedDate)} at ${selectedTime}`);
    }
  };

  if (!selectedService) {
    return (
      <div className="schedule-page">
        <div className="container">
          <div className="no-service">
            <h2>No service selected</h2>
            <p>Please select a service first.</p>
            <button className="back-btn" onClick={handleBack}>
              ← Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="container">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Services
        </button>
        
        <header className="schedule-header">
          <h1>Schedule your service</h1>
          <p className="subtitle">
            Check out our availability and book the date and time that works for you
          </p>
        </header>

        <div className="schedule-container">
          {/* 左侧：日期時間選擇 */}
          <div className="schedule-form">
            <div className="form-section">
              <h2>Select a Date and Time</h2>
              <div className="timezone-info">
                Time zone: Pacific Daylight Time (PDT)
              </div>

              {/* 月份導航 */}
              <div className="month-navigation">
                <button 
                  className="nav-btn" 
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                >
                  &#8249;
                </button>
                <h3 className="month-title">
                  {currentMonth.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h3>
                <button 
                  className="nav-btn" 
                  onClick={goToNextMonth}
                  aria-label="Next month"
                >
                  &#8250;
                </button>
              </div>

              {/* 日曆 */}
              <div className="calendar">
                <div className="calendar-header">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-day-header">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="calendar-body">
                  {calendarDays.map((date, index) => {
                    const isCurrentMonth = isSameMonth(date, currentMonth);
                    const isTodayDate = isToday(date);
                    const dateKey = getDateKey(date);
                    const isSelected = selectedDateKey === dateKey;

                    return (
                      <button
                        key={dateKey}
                        className={`calendar-day ${
                          !isCurrentMonth ? 'other-month' : ''
                        } ${
                          isTodayDate ? 'today' : ''
                        } ${
                          isSelected ? 'selected' : ''
                        }`}
                        onClick={() => handleDateSelect(date)}
                        disabled={!isCurrentMonth}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 時間選擇 */}
              {selectedDate && (
                <div className="time-selection">
                  <h3>Availability for {formatDate(selectedDate)}</h3>
                  <div className="time-slots">
                    {TIME_SLOTS.map(time => (
                      <button
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右側：服務詳情 */}
          <div className="service-details">
            <h2>Service Details</h2>
            <div className="selected-service">
              <h3>{selectedService.title}</h3>
              
              <div className="detail-item">
                <span className="label">Date & Time:</span>
                <span className="value">
                  {selectedDate && selectedTime 
                    ? `${formatDate(selectedDate)} at ${selectedTime}`
                    : 'Select date and time'
                  }
                </span>
              </div>

              <div className="detail-item">
                <span className="label">Location:</span>
                <span className="value">Client's place</span>
              </div>

              <div className="detail-item">
                <span className="label">Staff:</span>
                <span className="value">Staff Member #1</span>
              </div>

              <div className="detail-item">
                <span className="label">Duration:</span>
                <span className="value">{selectedService.duration} min</span>
              </div>

              <div className="detail-item price-item">
                <span className="label">Price:</span>
                <span className="price">${selectedService.price}</span>
              </div>
              
              {selectedDate && selectedTime && (
                <button 
                  className="next-btn"
                  onClick={handleNext}
                >
                  Book Now →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}