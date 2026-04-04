'use client';

import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface AudioForgeProps {
  onAudioCapture: (base64: string | null) => void;
}

export function AudioForge({ onAudioCapture }: AudioForgeProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          onAudioCapture(reader.result as string);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError('Microphone access denied. Please enable in settings.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const clearRecording = () => {
    setAudioUrl(null);
    onAudioCapture(null);
  };

  return (
    <div className="bg-brand-indigo/[0.02] border border-brand-indigo/5 rounded-3xl p-8 space-y-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-indigo/40">
           <Volume2 className="w-4 h-4" />
           The Echo (Oral Heritage)
        </div>
        {audioUrl && (
           <div className="flex items-center gap-1.5 text-emerald-500 animate-in fade-in zoom-in">
              <Sparkles className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Hi-Fi Record Captured</span>
           </div>
        )}
      </div>

      {error ? (
        <div className="flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-serif italic">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 space-y-8">
          {!audioUrl ? (
             <div className="relative">
                {isRecording && (
                   <div className="absolute inset-0 bg-brand-indigo/20 rounded-full animate-ping pointer-events-none" />
                )}
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                    isRecording 
                      ? 'bg-red-500 text-white shadow-red-500/20' 
                      : 'bg-brand-indigo text-white shadow-brand-indigo/20 hover:scale-105'
                  }`}
                >
                  {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
             </div>
          ) : (
            <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-2">
               <div className="h-12 bg-white rounded-full border border-brand-indigo/10 flex items-center px-4 gap-4">
                  <button type="button" onClick={() => (document.getElementById('forge-audio') as HTMLAudioElement).play()}>
                     <Play className="w-5 h-5 text-brand-indigo" />
                  </button>
                  <div className="flex-1 h-1.5 bg-brand-indigo/10 rounded-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-brand-indigo/30 animate-shimmer" />
                  </div>
                  <audio id="forge-audio" src={audioUrl} className="hidden" />
               </div>
               <button 
                  onClick={clearRecording}
                  className="mx-auto flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" /> Clear Recording
                </button>
            </div>
          )}

          {!isRecording && !audioUrl && (
             <p className="text-xs text-brand-earth/40 text-center max-w-[200px] font-serif italic">
                Record a native speaker saying this word with correct tonality.
             </p>
          )}
        </div>
      )}
    </div>
  );
}
