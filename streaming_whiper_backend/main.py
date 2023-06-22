import shutil
import os
import gc
from fastapi import FastAPI, UploadFile, File,Form
from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi.middleware.cors import CORSMiddleware

from recognise_speech import WhisperRecognition


app = FastAPI()
sr = WhisperRecognition()
import os 
UPLOAD_DIR = os.getcwd()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)


class Text(BaseModel):
    text1: str
    text2: str
    text3: str


@app.get("/")
async def root():
    return {"message": "Speech Recognition API"}


@app.post("/recognisespeechfile")
async def recgnisefile(file: UploadFile = File(default=None)):
    if file or file.content_type.startswith('audio/') or file.content_type.startswith('video/'):
        upload_path = os.path.join(UPLOAD_DIR, file.filename)
        shutil.copyfileobj(file.file, open(upload_path, 'wb+'))

    lang,transcribed_text = sr.recognise_file(upload_path)
    # for file in os.scandir(UPLOAD_DIR):
    #     os.remove(file.path)
    # gc.collect()    
    return {"language":lang,"transcribed_text":transcribed_text}


