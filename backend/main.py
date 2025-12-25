from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from analyzer import analyze_media
import shutil
import os
import uuid

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
async def root():
    return {"message": "AI Detection Agent API is running"}

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    try:
        # Save the file temporarily
        file_extension = os.path.splitext(file.filename)[1]
        file_name = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, file_name)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Analyze the file
        result = analyze_media(file_path)
        
        # Clean up (optional, keeping for now for debugging if needed, or delete)
        # os.remove(file_path) 
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
