function Message({ msg }) {
  return (
    <div className="message">
      <div className="message-header">
        <span className="user">👤 {msg.username}</span>
        <span className="time">
          {msg.created_at
            ? new Date(msg.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : ""}
        </span>
      </div>

      <div className="message-body">
        💬 {msg.message}
      </div>
    </div>
  );
}

export default Message;