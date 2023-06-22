from faster_whisper import WhisperModel


class WhisperRecognition():
    def __init__(self) -> None:
        self.model = WhisperModel("base", device="cpu", compute_type="int8")

    def recognise_array(self,audio_array):
        recorded_text = ""
        segments, info = self.model.transcribe(audio_array, beam_size=5)
        # print("Detected language '%s' with probability %f" % (info.language, info.language_probability))
        for segment in segments:
            print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
            recorded_text += segment.text
        return recorded_text

    def recognise_file(self,filepath):

        recorded_text = ""
        segments, info = self.model.transcribe(filepath, beam_size=5)

        print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

        for segment in segments:
            print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
            recorded_text += segment.text
        return info.language,recorded_text

if __name__ == "__main__":
    sr = WhisperRecognition()
    text = sr.recognise_file(r"C:\Users\PC\Desktop\omniverse\file_example_WAV_1MG.wav")
    print(text)