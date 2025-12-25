<h1 align="center">🧠 PIC CHECKER – Backend API</h1>

<p align="center">
  <b>⚡ FastAPI • 🧪 AI Media Analysis • 📂 File Upload API</b>
</p>

<p align="center">
  🚀 Backend service for analyzing images/videos using AI-based detection logic
</p>

---

## 📌 Overview

**PIC CHECKER Backend** is a **FastAPI-powered REST API** that accepts image or media uploads, processes them using AI-based analysis logic, and returns structured results to the frontend.

This backend is designed to be:
- ⚡ Fast & lightweight
- 🔌 Easy to integrate with frontend (Vite / React)
- 🧪 Suitable for ML / AI workflows
- 🌐 CORS-enabled for web apps

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,fastapi,git,vscode" />
</p>

- **Backend Framework**: FastAPI  
- **Server**: Uvicorn  
- **Language**: Python  
- **File Handling**: UploadFile (FastAPI)  
- **CORS**: Enabled for frontend communication  

---

## 📂 Project Structure

```text
backend/
│── main.py            # FastAPI entry point
│── analyzer.py        # Media analysis logic
│── requirements.txt   # Python dependencies
│── uploads/           # Temporary uploaded files (ignored in Git)
│── __pycache__/       # Python cache (ignored)
