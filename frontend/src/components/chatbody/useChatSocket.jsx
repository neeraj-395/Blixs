import { useEffect, useRef } from "react";
import { get_userid } from "../../services/user";
import { BASE_URL, WS_URL } from "../../services/routes";


const useChatSocket = ({ match, setMessages, setTyping, setOnlineUserList }) => {
    const socketRef = useRef(null);
    const typingTimerRef = useRef(null);
    const isTypingSignalSentRef = useRef(false);

    const userid = async () => await get_userid();
    const chatid = match && match.params ? match.params.chatid : null;

    useEffect(()=>{
        socketRef.current = new WebSocket(`${WS_URL}ws/users/${userid}/chat/`);

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if(data.action == 'message' && data.roomid == chatid) {
                data.image = BASE_URL.slice(0, -1) + data.image;
                setMessages(prev => ({
                    ...prev,
                    results: [data, ...(prev.results || [])],
                }));
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

        return () => socketRef.current?.close();
    }, [chatid]);

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

    return { userid, chatid, sendMessage, handleTyping };
}

export default useChatSocket;