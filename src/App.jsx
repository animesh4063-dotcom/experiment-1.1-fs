import React, { createContext, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, selectAllTasks, selectTaskCount } from './taskSlice';
import { useThemeSwitcher } from './useThemeSwitcher';

// UI Libraries
import Button from '@mui/material/Button';
import { DatePicker } from 'antd';
import styled from 'styled-components';

// --- Part A: Context Setup ---
const GlobalContext = createContext();

// React.memo prevents this child from re-rendering unless 'count' changes
const MemoizedChild = React.memo(({ count, onIncrement }) => {
  console.log("Memoized Child Rendered!"); 
  return (
    <div style={{ border: '2px dashed #888', padding: '15px', marginTop: '10px' }}>
      <h4>Part A: Context & Memoization</h4>
      <p>Global Count: {count}</p>
      <Button variant="contained" color="secondary" onClick={onIncrement}>
        Increment Context Count
      </Button>
    </div>
  );
});

// --- Part C: Styled Components ---
const AppContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  font-family: Arial, sans-serif;
  background-color: inherit;
`;

export default function App() {
  // Part D: Custom Hook
  const [theme, toggleTheme] = useThemeSwitcher('light');

  // Part A: State for Context & Memoization testing
  const [count, setCount] = useState(0);
  const [typingTest, setTypingTest] = useState('');

  const incrementCount = useCallback(() => setCount(c => c + 1), []);
  const contextValue = useMemo(() => ({ count, incrementCount }), [count, incrementCount]);

  // Part B: Redux State
  const tasks = useSelector(selectAllTasks);
  const taskCount = useSelector(selectTaskCount);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(addTask({ id: Date.now(), title: `Lab Task ${taskCount + 1}` }));
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <AppContainer>
        <h1>Experiment 1.1 App</h1>
        
        {/* Theme Switcher */}
        <div style={{ marginBottom: '30px' }}>
          <Button variant="outlined" onClick={toggleTheme}>
            Toggle Theme (Current: {theme})
          </Button>
        </div>

        {/* Ant Design */}
        <div style={{ marginBottom: '30px' }}>
          <h3>Part C: Ant Design UI</h3>
          <DatePicker />
        </div>

        {/* Redux */}
        <div style={{ marginBottom: '30px', border: '1px solid #888', padding: '15px', borderRadius: '5px' }}>
          <h3>Part B: Redux Toolkit State</h3>
          <p>Total Tasks: {taskCount}</p>
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Add Redux Task
          </Button>
          <ul style={{ marginTop: '10px' }}>
            {tasks.map(task => <li key={task.id}>{task.title}</li>)}
          </ul>
        </div>

        {/* Context & Memoization */}
        <div>
          <h3>Test Memoization</h3>
          <p style={{ fontSize: '12px', color: 'gray' }}>
            Type in the box below. The parent component updates, but the dashed box below won't re-render because of React.memo!
          </p>
          <input 
            type="text" 
            placeholder="Type here..." 
            value={typingTest}
            onChange={(e) => setTypingTest(e.target.value)}
            style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
          />
          <MemoizedChild count={count} onIncrement={incrementCount} />
        </div>

      </AppContainer>
    </GlobalContext.Provider>
  );
}