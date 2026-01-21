# 🚀 ResumeRefinery (AI-Powered Career Optimization Engine)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![MERN](https://img.shields.io/badge/Stack-MERN-green)
![AI](https://img.shields.io/badge/AI-Gemini%20Pro-orange)

> **"Don't let an algorithm reject you."** > A Full-Stack MERN application that uses Generative AI to optimize resumes for Applicant Tracking Systems (ATS), providing semantic scoring and actionable feedback.

---

## 📖 Table of Contents
- [The Problem](#-the-problem)
- [Solution & Features](#-solution--features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)

---

## 💡 The Problem
In the modern hiring landscape, **75% of resumes are rejected by ATS bots** before a human ever sees them. Candidates often fail not because of a lack of skills, but because of poor formatting, missing keywords, or a lack of "semantic relevance" to the Job Description (JD).

## 🚀 Solution & Features
**ResumeRefinery** bridges this gap by acting as your personal AI Recruiter.

- **✅ Semantic Match Scoring:** Unlike simple keyword counters, our AI engine (powered by Google Gemini) understands the *context* of your experience and compares it to the JD requirements.
  
- **✅ Missing Keyword Detection:** Identifies critical hard skills (e.g., "Docker", "Redux") and soft skills missing from your profile.

- **✅ Actionable Feedback:** Provides specific, bullet-point recommendations on how to rewrite sections of your resume for higher impact.

- **✅ Multi-Format Parsing:** Robust text extraction from PDF and DOCX files using `pdf-parse` and `mammoth`.

- **✅ Job Discovery (Beta):** Matches your high-scoring resume profile against live job listings.

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React.js (v18) | Component-based UI with Hooks & Context API. |
| **Styling** | Tailwind CSS | Utility-first CSS for responsive, modern design. |
| **Backend** | Node.js & Express | RESTful API architecture. |
| **Database** | MongoDB Atlas | NoSQL database for flexible user & resume data storage. |
| **AI Engine** | Google Gemini Pro | Generative AI model for semantic analysis. |
| **File Storage** | Cloudinary | Secure cloud storage for user uploads. |
| **Auth** | JWT & Bcrypt | Secure authentication with HTTP-Only cookies. |

---

## 🏗 System Architecture

The application follows a decoupled **Client-Server** architecture:

1.  **Client:** The React frontend handles file selection and sends the file + JD text to the backend.
2.  **Server:** Express middleware (`Multer`) captures the file buffer.
3.  **Parsing:** The server extracts raw text from the binary file.
4.  **AI Layer:** A custom-engineered prompt is sent to the Gemini API containing the Resume Text + JD.
5.  **Response:** The AI returns a structured JSON (Score, Missing Keywords, Feedback) which is stored in MongoDB and sent back to the client.

---

## ⚡ Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- [Google Cloud Console](https://ai.google.dev/) (For Gemini API Key)
- [Cloudinary Account](https://cloudinary.com/)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yourusername/resumerefinery.git](https://github.com/yourusername/resumerefinery.git)
   cd resumerefinery
