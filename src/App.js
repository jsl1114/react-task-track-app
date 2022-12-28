import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react"

const App = () => {
  const name = "Jason";
  const cool = true;
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doc Appt',
        day: 'Feb 5th at 2:30pm',
        reminder: false
    },
    {
        id: 2,
        text: 'grocery',
        day: 'Feb 7th at 5:00pm',
        reminder: true
    },
    {
        id: 3,
        text: 'Doc 2nd appt',
        day: 'Feb 15th at 2:30pm',
        reminder: false
    },
  ])

  return (
    <div className="container">
      {/* <h2>你好, {name}, 你是个{cool ? '酷人' : '傻逼'}</h2> */}
      <Header />
      <Tasks tasks={tasks} />
    </div>
  );
}

export default App;
