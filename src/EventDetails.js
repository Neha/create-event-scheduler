import React from "react";

const EventDetail = props => {
  return (
    <div className="event-details">
      <h2>{props.name}</h2>
      <p>{props.detail}</p>
      <p>{props.date}</p>
      <p>{props.time}</p>
      <p
        className="resetLink"
        onClick={e => {
          props.reset();
        }}
      >
        Create another event
      </p>
    </div>
  );
};

export default EventDetail;
