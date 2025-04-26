'use client';

import React, {useState, useRef, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from "@/components/ui/button";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {ModeToggle} from "@/components/ui/mode-toggle";
import {Input} from "@/components/ui/input";
import {v4 as uuidv4} from 'uuid';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {MoreVertical, Phone, PhoneOff, Mic, MicOff, Camera, CameraOff, ScreenShare, Users, XCircle} from 'lucide-react';

const Main = () => {
  const router = useRouter();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    getCameraPermission();
  }, []);

  const startSession = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setIsSessionActive(true);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSessionId('');
    router.push('/login');
  };

  const toggleMicrophone = () => {
    setIsMicrophoneOn(!isMicrophoneOn);
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const toggleShareScreen = () => {
    setIsSharingScreen(!isSharingScreen);
  };

  const joinSession = () => {
    if (sessionId) {
      router.push('/?sessionId=' + sessionId);
    } else {
      alert('Please enter a Session ID to join.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-muted">
        <h1 className="text-2xl font-semibold">Connect Now</h1>
        <div className="flex items-center space-x-4">
          <ModeToggle/>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={endSession}>
                  <PhoneOff className="h-5 w-5"/>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Çykmak (End Session)
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow p-4">
        {/* Left Panel (Video and Controls) */}
        <div className="w-3/4 flex flex-col">
          {/* Video Area */}
          <div className="relative">
            <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted/>
            {!(hasCameraPermission) && (
              <Alert variant="destructive">
                <AlertTitle>Kamera rugsat edilmedi</AlertTitle>
                <AlertDescription>
                  Please allow camera access to use this feature.
                </AlertDescription>
              </Alert>
            )}

          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleMicrophone}>
                    {isMicrophoneOn ? <Mic className="h-5 w-5"/> : <MicOff className="h-5 w-5"/>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Mikrofony öçür / goş (Toggle Microphone)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleCamera}>
                    {isCameraOn ? <Camera className="h-5 w-5"/> : <CameraOff className="h-5 w-5"/>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Kamerany öçür / goş (Toggle Camera)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={toggleShareScreen}>
                    {isSharingScreen ? <XCircle className="h-5 w-5"/> : <ScreenShare className="h-5 w-5"/>}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Ekrany paýlaş / bes et (Share/Stop Screen)
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Right Panel (Session Details and Participants) */}
        <div className="w-1/4 p-4 border-l border-muted">
          <h2 className="text-lg font-semibold mb-2">Sessiýa maglumatlary</h2>
          {!isSessionActive ? (
            <>
              <Input
                type="text"
                placeholder="Sessiýa ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                className="mb-2"
              />
              <Button onClick={joinSession} className="w-full mb-4">Sessiýa goşul</Button>
              <Button onClick={startSession} className="w-full">Täze sessiýa başla</Button>
            </>
          ) : (
            <>
              <p>Sessiýa ID: {sessionId}</p>
              <p>Garaşylýan gatnaşyjylar...</p>
            </>
          )}

          <h3 className="text-md font-semibold mt-4 mb-2">Gatnaşyjylar</h3>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/50/50" alt="Myrat"/>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <span>Myrat (Sen)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/51/51" alt="Gülşat"/>
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
            <span>Gülşat</span>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/52/52" alt="Maksat"/>
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <span>Maksat</span>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src="https://picsum.photos/53/53" alt="Leýla"/>
              <AvatarFallback>L</AvatarFallback>
            </Avatar>
            <span>Leýla</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
