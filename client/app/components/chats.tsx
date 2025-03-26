import React, { useEffect, useRef } from "react";

interface Msg {
  chat: string;
  user: string;
}

export default function Chats({
  user,
  setChat,
  submit,
  message,
  chat,
  userValue,
}: {
  user: string;
  setChat: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
  message: Msg[];
  chat: string;
  userValue: string;
}) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [message]); 

  return (
    <div className="bg-[#DBD8AE] h-screen w-screen flex flex-col items-center p-2 md:p-4">

      <div
        ref={chatContainerRef}
        className="w-full max-w-4xl flex-1 h-[80vh] rounded-2xl bg-[#EAF4D3] overflow-y-auto border border-black p-4"
      >
        {message.map((msg, index) => (
          <Chat key={index} msg={msg.chat} user={msg.user} userValue={userValue} />
        ))}
      </div>

      <Input setChat={setChat} submit={submit} chat={chat} />
    </div>
  );
}

function Input({
  setChat,
  submit,
  chat,
}: {
  setChat: React.Dispatch<React.SetStateAction<string>>;
  submit: () => void;
  chat: string;
}) {
  return (
    <div className="flex w-full items-center max-w-4xl container px-4 py-2 gap-2">
      <input
        className="bg-[#EAF4D3] flex-1/12  text-black rounded-2xl p-3 focus:outline-none shadow-md"
        type="text"
        placeholder="Type a message..."
        value={chat}
        onChange={(e) => setChat(e.target.value )}
        onKeyDown={(e) => {
          if (e.key === "Enter" && chat.trim() !== "") {
            e.preventDefault();
            submit();
            setChat("");
          }
        }}
      />
      <button 
        className="rounded-2xl bg-white px-2 mr-3 sm:mr-0 py-3  container sm:w-19 md:w-19 lg:19 text-black font-semibold cursor-pointer hover:brightness-90 shadow-md transition"
        onClick={(e) => {
          e.preventDefault();
          submit();
          setChat("");
        }}
      >
        Send
      </button>
    </div>
  );
}

function Chat({ msg, user, userValue }: { msg: string; user: string; userValue: string }) {
  function getUserColor(username: string) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 90%, ${20 + (hash % 20)}%)`;
  }

  const userColor = getUserColor(user);

  return (
    <div className={`flex ${user === 'System' ? "!justify-center" : user === userValue ? "justify-end" : "justify-start"} `}>
      <div className="rounded-xl text-black font-medium text-lg m-2 bg-[#DBD8AE] px-5 py-2 shadow-md max-w-[75%] md:max-w-[60%]">
        <p style={{ color: userColor }} className="font-bold">
          {user !== "System" && user}
        </p>
        <p className="break-words">{msg}</p>
      </div>
    </div>
  );
}
