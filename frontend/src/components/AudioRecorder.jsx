import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  StopCircle, 
  Download,
  Trash2,
  Volume2,
  FileAudio
} from 'lucide-react';

const AudioRecorder = ({ onRecordingComplete, maxDuration = 300 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [volume, setVolume] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      
      // Set up audio context for volume monitoring
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { 
          type: mediaRecorder.mimeType || 'audio/wav' 
        });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setAudioBlob(blob);
        
        if (onRecordingComplete) {
          const file = new File([blob], `recording-${Date.now()}.webm`, {
            type: blob.type
          });
          onRecordingComplete(file, recordingTime);
        }
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
        if (audioContextRef.current) {
          audioContextRef.current.close();
        }
      };

      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return newTime;
        });
      }, 1000);
      
      // Start volume monitoring
      monitorVolume();

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const monitorVolume = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const updateVolume = () => {
      if (!isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      setVolume(Math.min(100, (average / 255) * 100));
      
      animationRef.current = requestAnimationFrame(updateVolume);
    };
    
    updateVolume();
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
            return maxDuration;
          }
          return newTime;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (isRecording || isPaused)) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setVolume(0);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioURL) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL(null);
      setAudioBlob(null);
      setRecordingTime(0);
    }
  };

  const downloadRecording = () => {
    if (audioURL) {
      const a = document.createElement('a');
      a.href = audioURL;
      a.download = `recording-${new Date().toISOString().slice(0, 19)}.webm`;
      a.click();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          {/* Recording Controls */}
          <div className="flex justify-center items-center space-x-4">
            {!isRecording && !audioURL && (
              <Button
                onClick={startRecording}
                size="lg"
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                <Mic className="w-8 h-8" />
              </Button>
            )}
            
            {isRecording && (
              <>
                {!isPaused ? (
                  <Button
                    onClick={pauseRecording}
                    size="lg"
                    variant="outline"
                    className="rounded-full"
                  >
                    <Pause className="w-6 h-6" />
                  </Button>
                ) : (
                  <Button
                    onClick={resumeRecording}
                    size="lg"
                    className="rounded-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Mic className="w-6 h-6" />
                  </Button>
                )}
                
                <Button
                  onClick={stopRecording}
                  size="lg"
                  variant="destructive"
                  className="rounded-full"
                >
                  <StopCircle className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>

          {/* Recording Status */}
          <div className="space-y-2">
            {isRecording && (
              <>
                <div className="text-lg font-semibold text-red-600">
                  {isPaused ? '⏸️ Paused' : '🔴 Recording...'}
                </div>
                <div className="text-2xl font-mono">
                  {formatTime(recordingTime)}
                </div>
                <Progress value={(recordingTime / maxDuration) * 100} className="w-full" />
                <div className="flex items-center justify-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <Progress value={volume} className="w-24 h-2" />
                </div>
              </>
            )}
            
            {!isRecording && !audioURL && (
              <div className="text-gray-500">
                Click the microphone to start recording
              </div>
            )}
          </div>

          {/* Playback Controls */}
          {audioURL && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-center space-x-2">
                <FileAudio className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">
                  Recording ({formatTime(recordingTime)})
                </span>
              </div>
              
              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              <div className="flex justify-center space-x-2">
                <Button
                  onClick={isPlaying ? pausePlayback : playRecording}
                  variant="outline"
                  size="sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={downloadRecording}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={deleteRecording}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioRecorder;