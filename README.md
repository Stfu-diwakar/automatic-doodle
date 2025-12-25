<h1 align="center">🧠 PIC CHECKER</h1>

<p align="center">
  <b>AI-Powered Media Analysis Web Application</b>
</p>

<p align="center">
  ⚛️ React (Vite) • ⚡ FastAPI • 🧪 AI Analysis • 📂 Media Upload
</p>

---

## 📌 Project Overview

**PIC CHECKER** is a full-stack web application that allows users to upload images or media files and receive **AI-based analysis results**.

The project is divided into two parts:
- 🎨 **Frontend** – A modern React UI built with Vite
- ⚙️ **Backend** – A FastAPI service that processes uploaded media using AI logic

---

## 🧩 Project Structure

```text
PIC_CHECKER/
│
├── backend/            # FastAPI backend
│   ├── main.py
│   ├── analyzer.py
│   ├── requirements.txt
│   ├── uploads/        # ignored (runtime files)
│   └── __pycache__/    # ignored
│
├── frontend/           # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── dist/           # ignored (build output)
│
└── README.md           # Project documentation
