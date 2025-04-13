import { useEffect, useRef } from "react";
import { WS_URL } from "../../services/routes";


const useChatSocket = ({ userid, chatid, setMessages, setTyping, setOnlineUserList }) => {
    const socketRef = useRef(null);
    const typingTimerRef = useRef(null);
    const isTypingSignalSentRef = useRef(false);

    useEffect(() => {
        socketRef.current = new WebSocket(`${WS_URL}ws/users/${userid}/chat/`);

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if(data.action == 'message' && data.roomid === chatid) {
                setMessages(prev => [data, ...(prev || [])]);
                setTyping(false);
            } else if (
                data.action === 'typing' &&
                data.user !== userid && 
                data.roomid === chatid
            ) {
                setTyping(data.typing);
            } else if (data.action === 'online_user') {
                setOnlineUserList(data.userList);
            }

        }
        return () => socketRef.current.close();       

    }, [chatid, userid]);

    const sendMessage = (message) => {
        socketRef.current?.send(JSON.stringify({
            action: 'message',
            message: message,
            userid: userid,
            roomid: chatid,
        }));
    };

    const sendTypingSignal = (typing) => {
        socketRef.current?.send(JSON.stringify({
          action:'typing',
          typing: typing,
          userid: userid,
          roomid: chatid,
        }));
    };

    const handleTyping = (event) => {
        if(event.keyCode !== 13) {
            if (!isTypingSignalSentRef.current) {
                sendTypingSignal(true);
                isTypingSignalSentRef.current = true;
            }
            clearTimeout(typingTimerRef.current);
            typingTimerRef.current = setTimeout(() => {
                sendTypingSignal(false);
                isTypingSignalSentRef.current = false;
            }, 3000);
        } else {
            clearTimeout(typingTimerRef.current);
            isTypingSignalSentRef.current = false;
        }
    }

    return { sendMessage, handleTyping };
}

export default useChatSocket;