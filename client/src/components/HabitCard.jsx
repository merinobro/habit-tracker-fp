// import React, { useState, useEffect } from 'react';
// import '../styles/HabitCard.css'; 

// const HabitCard = ({ text: initialText, completed: initialCompleted, onUpdate }) => {
//   // Initialize the state with the initialText and initialCompleted values
//   const [text, setText] = useState(initialText || '');
//   const [completed, setCompleted] = useState(initialCompleted || false);

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleCheckboxChange = () => {
//     setCompleted(!completed);
//   };

//   useEffect(() => {
//     // Check if the state has changed before logging
//     if (text !== initialText || completed !== initialCompleted) {
//       onUpdate({ text, completed }); // Notify the parent component of the update
//       console.log('Text state:', text);
//       console.log('Completed state:', completed);
//     }
//   }, [text, completed, onUpdate, initialText, initialCompleted]);

//   return (
//     <div className="box">
//       <div className="rectangle-eat-card">
//         <div className="input-container">
//           <input
//             type="text"
//             className="card-input"
//             placeholder="Enter your habit"
//             value={text}
//             onChange={handleTextChange}
//           />

//           <input
//             type="checkbox"
//             className="card-checkbox"
//             checked={completed}
//             onChange={handleCheckboxChange}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HabitCard;

// import React, { useState, useEffect } from 'react';
// import '../styles/HabitCard.css';

// const HabitCard = ({ text: initialText, completed: initialCompleted, onUpdate, onDelete }) => {
//   const [text, setText] = useState(initialText || '');
//   const [completed, setCompleted] = useState(initialCompleted || false);
//   const [isEditing, setIsEditing] = useState(false);

//   const handleTextChange = (e) => {
//     setText(e.target.value);
//   };

//   const handleCheckboxChange = () => {
//     setCompleted(!completed);
//   };

//   const handleDelete = () => {
//     // Call the onDelete callback function to delete the card
//     onDelete();
//   };

//   useEffect(() => {
//     if (text !== initialText || completed !== initialCompleted) {
//       onUpdate({ text, completed });
//       console.log('Text state:', text);
//       console.log('Completed state:', completed);
//     }
//   }, [text, completed, onUpdate, initialText, initialCompleted]);

//   return (
//     <div className="box">
//       <div className="rectangle-eat-card">
//         <div className="input-container">
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 className="card-input"
//                 placeholder="Enter your habit"
//                 value={text}
//                 onChange={handleTextChange}
//               />
//               <img
//                 src={require('../assets/trash.svg').default}
//                 alt="Trash Icon"
//                 onClick={handleDelete}
//                 className="trash-icon"
//               />
//             </>
//           ) : (
//             <>
//               <span className="habit-text">{text}</span>
//               <input
//                 type="checkbox"
//                 className="card-checkbox"
//                 checked={completed}
//                 onChange={handleCheckboxChange}
//               />
//             </>
//           )}
//         </div>
//         <div className="card-options" onClick={() => setIsEditing(!isEditing)}>
//           <img
//             src={require('../assets/ellipsis.svg').default}
//             alt="Ellipsis Icon"
//             className="ellipsis-icon"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HabitCard;


import React, { useState, useEffect } from 'react';
import '../styles/HabitCard.css';

const HabitCard = ({ id, text: initialText, completed: initialCompleted, onUpdate, onDelete }) => {
  const [text, setText] = useState(initialText || '');
  const [completed, setCompleted] = useState(initialCompleted || false);
  const [isEditing, setIsEditing] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  useEffect(() => {
    if (text !== initialText || completed !== initialCompleted) {
      onUpdate({ id, text, completed });
    }
  }, [text, completed, onUpdate, initialText, initialCompleted, id]);

  return (
    <div className="box">
      <div className="input-container">
      <div className="rectangle-eat-card">
        
          {isEditing ? (
            <div className="input-content">
              <input
                type="text"
                className="card-input"
                placeholder="Enter your habit"
                value={text}
                onChange={handleTextChange}
              />
              <img
                src={require('../assets/trash.svg').default}
                alt="Trash Icon"
                onClick={handleDelete}
                className="trash-icon"
              />
            </div>
          ) : (
            <>
              <span className="habit-text">{text}</span>
              <input
                type="checkbox"
                className="card-checkbox"
                checked={completed}
                onChange={handleCheckboxChange}
              />
            </>
          )}
        </div>
        <div className="card-options" onClick={() => setIsEditing(!isEditing)}>
          <img
            src={require('../assets/ellipsis.svg').default}
            alt="Ellipsis Icon"
            className="ellipsis-icon"
          />
        </div>
      </div>
    </div>
  );
}

export default HabitCard;