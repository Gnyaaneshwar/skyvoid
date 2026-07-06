import "./LiveClock.css";
import { useEffect, useState } from "react";

function LiveClock() {

  const [now, setNow] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {

      setNow(new Date());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (

    <div className="live-clock">

      <h3>

        {now.toLocaleDateString("en-US",{

          weekday:"long",

          month:"long",

          day:"numeric",

          year:"numeric"

        })}

      </h3>

      <h1>

        {now.toLocaleTimeString()}

      </h1>

    </div>

  );

}

export default LiveClock;