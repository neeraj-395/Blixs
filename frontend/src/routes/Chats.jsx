import { useState } from 'react';

function ChatApp() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = (e) => {
    if (!e.target.closest('#menuDropdown') && !e.target.closest('#menuButton')) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" onClick={closeMenu}>
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-300">
        {/* Sidebar Header */}
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chats</h1>
          <div className="relative">
            <button
              id="menuButton"
              className="focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            {/* Menu Dropdown */}
            <div
              id="menuDropdown"
              className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg ${menuOpen ? '' : 'hidden'}`}
            >
              <ul className="py-2 px-3">
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">
                    Option 1
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">
                    Option 2
                  </a>
                </li>
                {/* Add more menu options here */}
              </ul>
            </div>
          </div>
        </header>

        {/* Contact List */}
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
          {/* Contact items */}
          {['Alice', 'Martin', 'Charlie', 'David', 'Ella', 'Fiona', 'George', 'Hannah', 'Ian', 'Jack'].map((name, index) => (
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" key={index}>
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={""}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-gray-600">{'last message!'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1">
        {/* Chat Header */}
        <header className="bg-white p-4 text-gray-700">
          <h1 className="text-2xl font-semibold">Alice</h1>
        </header>

        {/* Chat Messages */}
        <div className="h-screen overflow-y-auto p-4 pb-36">
          {/* Chat messages */}
          {[
            { sender: 'Alice', text: "Hey Bob, how's it going?" },
            { sender: 'Bob', text: "Hi Alice! I'm good, just finished a great book. How about you?" },
            { sender: 'Alice', text: "That book sounds interesting! What's it about?" },
            { sender: 'Bob', text: "It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!" },
            { sender: 'Alice', text: "I'm intrigued! Maybe I'll borrow it from you when you're done?" },
            { sender: 'Bob', text: "Of course! I'll drop it off at your place tomorrow." },
            { sender: 'Alice', text: "Thanks, you're the best!" },
            { sender: 'Bob', text: "Anytime! Let me know how you like it. 😊" },
            { sender: 'Alice', text: "So, pizza next week, right?" },
            { sender: 'Bob', text: "Absolutely! Can't wait for our pizza date. 🍕" },
            { sender: 'Alice', text: "Hoorayy!!" },
          ].map((message, index) => (
            <div className={`flex mb-4 cursor-pointer ${message.sender === 'Bob' ? 'justify-end' : ''}`} key={index}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <img
                  src={`https://placehold.co/200x/${message.sender === 'Alice' ? 'ffa8e4' : 'b7a8ff'}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className={`flex max-w-96 ${message.sender === 'Bob' ? 'bg-indigo-500 text-white' : 'bg-white'} rounded-lg p-3 gap-3`}>
                <p className={`text-${message.sender === 'Bob' ? 'white' : 'gray-700'}`}>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChatApp;
