import React, { useState } from "react";

function PopupExample() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>
        Open Popup
      </button>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "100px",
            left: "100px",
            width: "250px",
            padding: "20px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 100,
          }}
        >
          <p>This is a popup!</p>
          <button onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default PopupExample;