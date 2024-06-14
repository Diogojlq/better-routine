// TaskList.js
import React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import './SquareButton.css'

const TaskList = ({ tasks, onRemoveTask }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Tooltip title="Delete Task" placement="right">
            <Button
              variant="outlined"
              onClick={() => onRemoveTask(task.id)}
              style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', margin: 5}}
              className="SquareButton-root"
            />
          </Tooltip>
          <span>{task.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
