import { useEffect, useState } from 'react';
import { BASE_URL, WS_URL } from '../services/routes';


let socket = new WebSocket(WS_URL + 'ws/users/<userid>/chat/');


const chatBody = ({match, currentChattingMember, setOnlineUserList})  => {
  const chatid = match && match.params ? match.params.chatId : null;
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [typing, setTyping] = useState(false);

  setMessages(fetchChatMessage(match));

  useEffect(()=>{
    setMessages(fetchChatMessage(chatid));
  }, [chatid]);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(chatid === data.roomid) {
      if(data.action === 'message') {
        data['image'] = BASE_URL.slice(0, -1) + data.image;
        setMessages((prevState) => {
          let messagesState = JSON.parse(JSON.stringify(prevState));
          messagesState.results.unshift(data);
          return messagesState;
        });
        setTyping(false);
      } else if (data.action === 'typing' && data.user !== userid) {
        setTyping(data.typing);
      }
    }
    if (data.action === 'onlineUser') {
      setOnlineUserList(data.userList);
    }
  }

  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if(!inputMessage) return;
    socket.send(JSON.stringify({
      action: 'message',
      message: inputMessage,
      userid: userid,
      roomid: chatid
    }));
    setInputMessage("");
  }

  const sendTypingSignal = (typing) => {
    socket.send(
      JSON.stringify({
        action:'typing',
        typing: typing,
        userid: userid,
        roomid: chatid
      })
    );
  };

  const chatMessageTypingHandler = (event) => {
    if(event.keyCode !== 13) {
      if(!isTypingSignalSent)
    }
  }
}
