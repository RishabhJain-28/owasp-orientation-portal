import React, { useState, useEffect } from "react";

const Counter = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const countDown = new Date("Oct 01,2020 17:30:00").getTime();
    // 5:30pm on 29th September,2020
    const now = new Date().getTime();
    let distance = countDown - now;
    if (distance < 0) distance = 0;
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = 24 * hour;
    setSeconds(distance <= 0 ? 0 : Math.floor((distance % minute) / second));

    setDays(Math.floor(distance / day));
    setHours(Math.floor((distance % day) / hour));
    setMinutes(Math.floor((distance % hour) / minute));
    if (!isActive) {
      const id = setInterval(() => {
        const now = new Date().getTime();
        let distance = countDown - now;
        if (distance < 0) distance = 0;
        const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = 24 * hour;
        setSeconds(Math.floor((distance % minute) / second));

        setDays(Math.floor(distance / day));
        setHours(Math.floor((distance % day) / hour));
        setMinutes(Math.floor((distance % hour) / minute));

        setSeconds((seconds) => seconds + 1);
        setSeconds(
          distance <= 0 ? 0 : Math.floor((distance % minute) / second)
        );
      }, 1000);
      setIsActive(true);
    }
  }, []);

  return (
    <>
      <div className="container-phone">
        <ul className="timer-li-phone ">
          <li className="timer-li-phone">
            <span id="daysphone">{days}</span>days
          </li>
          <li className="timer-li-phone">
            <span id="hoursphone">{hours}</span>Hours
          </li>
          <li className="timer-li-phone">
            <span id="minutesphone">{minutes}</span>Mins
          </li>
          <li className="timer-li-phone">
            <span id="secondsphone">{seconds}</span>Secs
          </li>
        </ul>
      </div>
    </>
  );
};

export default Counter;
