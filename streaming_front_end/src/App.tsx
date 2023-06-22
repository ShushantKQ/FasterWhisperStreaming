import React from 'react';
import { useWhisper } from './hook'

const App = () => {
  const {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
  } = useWhisper({
    streaming: true,
    timeSlice: 1_000, // 1 second
    whisperConfig: {
      language: 'en',
    },
    apiKey: "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", // YOUR_OPEN_AI_TOKEN
  })
console.log({recording,speaking })
  return (
    <div style={{ textAlign: 'center', margin:24 }}>
      <br />
      <button style={{ marginRight: 8, padding: 8, background: 'purple', border: 'unset', color: 'white', borderRadius: 4 }} onClick={() => startRecording()}>Start</button>
      <button style={{ marginRight: 8, padding: 8, background: 'red', border: 'unset', color: 'white', borderRadius: 4 }} onClick={() => stopRecording()}>Stop</button>
      <p><b>Transcribed Text:</b> </p>
      <div style={{ border: '1px solid #ddd', padding:8, height:'50vh', overflow:'scroll' }}>
        <p>{transcript.text}</p>
      </div>
    </div>
  )
}

export default App;