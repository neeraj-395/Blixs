const ChatBodyEmpty = () => {
  return (
    <div className="flex-grow h-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
          alt="No chat selected"
          className="w-24 h-24 mb-4 opacity-80"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Chat Selected
        </h2>
        <p className="text-gray-500 max-w-sm">
          Please select a user from the chat list to start a conversation.
        </p>
      </div>
    </div>
  );
};

export default ChatBodyEmpty;
