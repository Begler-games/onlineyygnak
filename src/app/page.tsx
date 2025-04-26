"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  ScreenShare,
  ScreenShareOff,
  UserPlus,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { useRouter } from 'next/navigation';
import {ModeToggle} from "@/components/ui/mode-toggle"

const users = [
  { id: "1", name: "Myrat", imageUrl: "https://picsum.photos/id/237/100/100" },
  { id: "2", name: "Bahar", imageUrl: "https://picsum.photos/id/238/100/100" },
  { id: "3", name: "Çynar", imageUrl: "https://picsum.photos/id/239/100/100" },
  { id: "4", name: "Dünýä", imageUrl: "https://picsum.photos/id/240/100/100" },
  { id: "5", name: "Emin", imageUrl: "https://picsum.photos/id/241/100/100" },
  { id: "6", name: "Firuza", imageUrl: "https://picsum.photos/id/242/100/100" },
];

export default function Home() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Myrat", text: "Hemmä salam!" }, // Hemmä salam! - Hello everyone!
    { sender: "Bahar", text: "Salam Myrat!" }, // Salam Myrat! - Hello Myrat!
  ]);
  const [sessionId, setSessionId] = useState("");
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  const router = useRouter();

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const sendMessage = (text: string) => {
    setMessages([...messages, { sender: "Sen", text }]); // Sen - You
  };

  const handleCreateSession = () => {
    setIsCreatingSession(true);
    const newSessionId = uuidv4(); // Generate a new UUID
    setSessionId(newSessionId);
    setSessionError(null);
    router.push(`/?sessionId=${newSessionId}`); // Navigate to the new session
  };

  const handleJoinSession = () => {
    if (sessionId.trim() === "") {
      setSessionError("Sessiýa ID-ni giriziň."); // Sessiýa ID-ni giriziň. - Enter Session ID.
      return;
    }

    setSessionError(null);
    router.push(`/?sessionId=${sessionId}`); // Join the session
  };

  const handleLeaveSession = () => {
      router.push('/'); // Navigate back to the home page
      setSessionId(''); // Clear the session ID
  };

  useEffect(() => {
    // Get session ID from URL parameters on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const urlSessionId = urlParams.get('sessionId');

    if (urlSessionId) {
      setSessionId(urlSessionId);
    }
  }, []);


  return (
    <div className="flex h-screen w-screen bg-secondary">
      {/* Video Konferensiýa Bölümi */} {/* Video Conference Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
         {sessionId ? (
            <>
              <div className="grid grid-cols-3 gap-4 w-full max-w-[1920px]">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="relative rounded-lg shadow-md overflow-hidden aspect-video"
                  >
                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 bg-black/50 text-white p-2 text-sm">
                      {user.name}
                    </div>
                  </div>
                ))}
              </div>
              {/* Duşuşyk Dolandyryşlary */} {/* Meeting Controls */}
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="ghost" onClick={toggleMic}>
                  {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                  <span>{isMicOn ? "Sesini öçür" : "Sesi aç"}</span> {/* Sesini öçür - Mute, Sesi aç - Unmute */}
                </Button>
                <Button variant="ghost" onClick={toggleScreenSharing}>
                  {isScreenSharing ? (
                    <ScreenShareOff size={20} />
                  ) : (
                    <ScreenShare size={20} />
                  )}
                  <span>{isScreenSharing ? "Paýlaşmagy bes et" : "Ekrany paýlaş"}</span> {/* Paýlaşmagy bes et - Stop Share, Ekrany paýlaş - Share Screen */}
                </Button>
                <Button variant="destructive" onClick={handleLeaveSession}>
                  <PhoneOff size={20} />
                  <span>Çyk</span> {/* Çyk - Leave */}
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              {sessionError && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{sessionError}</AlertDescription>
                </Alert>
              )}
              <Input
                type="text"
                placeholder="Sessiýa ID" // Sessiýa ID - Session ID
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="w-full max-w-sm"
              />
              <div className="flex space-x-2">
                <Button onClick={handleJoinSession}>Sessiýa goşul</Button> {/* Sessiýa goşul - Join Session */}
                <Button
                  variant="secondary"
                  onClick={handleCreateSession}
                  disabled={isCreatingSession}
                >
                  {isCreatingSession ? "Döredilýär..." : "Sessiýa döret"} {/* Döredilýär... - Creating..., Sessiýa döret - Create Session */}
                </Button>
              </div>
            </div>
          )}
          <ModeToggle />

      </div>

      {/* Duşuşykda Söhbet Bölümi */} {/* In-Meeting Chat Section */}
      <div className="w-96 bg-gray-100 p-4 flex flex-col">
        <div className="font-bold mb-2">Duşuşyk Söhbeti</div> {/* Meeting Chat */}
        <div className="flex-1 overflow-y-auto mb-2">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {messages.map((message, index) => (
              <div key={index} className="mb-1">
                <span className="font-semibold">{message.sender}:</span>{" "}
                <span>{message.text}</span>
              </div>
            ))}
          </ScrollArea>
        </div>
        <ChatInput onSendMessage={sendMessage} />
      </div>
    </div>
  );
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");

  const handleSendMessage = () => {
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  };

  return (
    <div className="flex items-center">
      <Input
        type="text"
        placeholder="Hat ýazyň..."  /* Hat ýazyň... - Type your message... */
        className="flex-1 mr-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSendMessage}>Ugrat</Button>  /* Ugrat - Send */
    </div>
  );
};
