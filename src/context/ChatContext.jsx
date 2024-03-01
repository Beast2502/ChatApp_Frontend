import { createContext, useCallback, useEffect, useState } from "react";

import { baseUrl, getRequest, postRequest } from "../utils/services";

import { io } from 'socket.io-client'

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    // messages
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setIsMessageLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);


    // send message states
    const [sendTxtMessErr, setSndTxtMessErr] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    console.log('onlineUSers', onlineUsers)

    // initial  socket
    const [socket, setSocket] = useState(null);
    useEffect(() => {

        const newSocket = io("http://localhost:4000");
        console.log(newSocket, "CHECKK SOCKET")
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        }
    }, [user]);

    useEffect(() => {

        if (socket === null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers")
        }

    }, [socket]);

    // send message 

    useEffect(() => {

        if (socket === null) return;
        const recipientId = currentChat?.members.find((id) => id !== user?._id);

        socket.emit("sendMessage", { ...newMessage, recipientId })


    }, [newMessage]);

    // recieve message


    useEffect(() => {

        if (socket === null) return;

        socket.on("getMessage", res => {

            if (currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev, res])
        })

        return () => {
            socket.off("getMessage")
        }


    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);
            if (response.error) return console.log("Error fetching error", response);

            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if (user?._id === u._id) return false;

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => chat.members[0] === u._id || chat.members[1] === u._id)
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
        }

        getUsers();
    }, [userChats])

    useEffect(() => {

        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(false);
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false)
                if (response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response);

            }
        }

        getUserChats();

    }, [user]);


    // Messgaes
    useEffect(() => {
        const getMessages = async () => {
            setIsMessageLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

            setIsMessageLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }
            setMessages(response);

        }

        getMessages();

    }, [currentChat])



    const upDateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)
    }, []);


    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId,
            secondId
        }))
        if (response?.error) {
            return console.log("Error creating chat", response?.error)
        }

        setUserChats((prev) => [...prev, response]);

    }, []);


    console.log("Messages", messages);

    // /////Send a message

    const sendtextMessage = useCallback(async (textMessage, senderId, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("You must type something...");

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: senderId._id,
            text: textMessage

        }));

        if (response?.error) return sendTxtMessErr(response);

        setNewMessage(response);

        setMessages((prev) => [...prev, response]);
        setTextMessage("");



    }, [])

    return <ChatContext.Provider value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        upDateCurrentChat,
        currentChat,
        messages,
        isMessageLoading,
        messagesError,
        sendtextMessage,
        onlineUsers
    }}>{children}</ChatContext.Provider>

}

