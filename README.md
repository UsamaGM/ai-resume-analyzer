# AI Resume Analyzer

AI Resume Analyzer is a smart, serverless resume-screening tool built on the **Puter** platform. It leverages **OpenAI's** language models to provide an in-depth "Applicant Tracking System" (ATS) analysis, helping job seekers optimize their resumes for specific roles.

Users can upload a PDF resume, paste a job description, and instantly receive a detailed report including an overall score, a concise summary, and a breakdown of strengths, weaknesses, and keyword alignment.



## How it Works

The application flow is a seamless, end-to-end process:

1.  **Authentication:** The user signs in using a secure and simple-to-use **Clerk**-powered authentication page.
2.  **Upload:** The user uploads their PDF resume and provides a job description. The system supports both drag-and-drop and a standard file picker.
3.  **File & Data Storage:** The uploaded PDF is stored directly in **Puter's built-in file system**. Simultaneously, a `pdfjs-dist` worker generates a PNG thumbnail of the resume's first page, which is also stored.
4.  **AI Analysis:** The extracted resume text and job description are sent to **OpenAI** via the `puter.ai.run` SDK. A sophisticated prompt instructs the AI to act as an "expert ATS" and return a structured JSON response containing:
    * An overall ATS score (0-100).
    * A concise two-sentence summary.
    * A list of identified keywords that *match* the job description.
    * A list of *missing* keywords.
    * Detailed feedback on the resume's strengths and weaknesses.
5.  **"Database-less" Persistence:** The AI's JSON analysis is saved as a new file (e.g., `resume-analysis-123.json`) in the Puter file system, linked to the user. This "database-less" approach keeps the architecture simple and powerful.
6.  **Visualization:** The user is redirected to a results page where this JSON data is fetched and rendered in a user-friendly format, using components like `<ScoreGuage />`, `<Summary />`, and `<ATS />`.

---

## Core Features

* **AI-Powered ATS Scoring:** Get an instant, objective score from 0-100 on how well a resume matches a job description, complete with a radial progress gauge for clear visualization.
* **Detailed AI Feedback:** Receive a concise summary and itemized, collapsible sections for "Strengths," "Weaknesses," and "ATS Keyword Analysis".
* **Secure File Management:** All resumes are securely uploaded, stored, and managed within the user's private Puter file system. The application provides a simple interface to list and delete analyses.
* **PDF-to-Image Thumbnailing:** Automatically generates and stores PNG thumbnails from uploaded PDFs for a rich UI experience on the dashboard.
* **User Authentication:** Built-in, secure authentication handled by **Clerk**, providing a seamless login/signup experience.
* **Responsive Dashboard:** A clean, responsive home page acts as a dashboard, displaying all previously analyzed resumes as interactive cards.

---

## Technical Showcase & Architecture

This project is a cutting-edge example of a modern, "serverless" web application that leverages a unified platform for frontend, backend, and storage.

* **Puter Architecture:** The entire application is built on **Puter**, a serverless platform that combines a React-like framework, file storage, and AI SDKs into one.
* **"Backend-in-the-Frontend" Logic:** The app follows a modern full-stack pattern (similar to Remix or Next.js) where "backend" logic is co-located with frontend components. This is achieved by exporting a `loader` (for data-fetching) and an `action` (for data-mutation) from the same route file as the UI component.
* **Abstracted Service Layer:** The `app/lib/puter.ts` module acts as a clean service layer, abstracting all Puter SDK calls (like `puter.fs.put`, `puter.fs.list`, `puter.ai.run`) into simple, reusable functions. This keeps the route components clean and focused on business logic.
* **Prompt Engineering:** The core AI logic is driven by carefully crafted system and user prompts, designed to force the LLM to return reliable, structured JSON output.
* **Database-less Design:** The project cleverly uses **Puter's file system as a NoSQL database**. Each analysis result is stored as a self-contained JSON file (e.g., `analysis-abc.json`), and the corresponding resume/image files are stored by path (e.g., `resume-abc.pdf`). This simplifies the architecture by removing the need for a separate database setup.

---

## Technology Stack

* **Platform:** [Puter](https://puter.com/)
* **Frontend:** React, Vite, React Router, TailwindCSS
* **Authentication:** Clerk
* **AI:** OpenAI (via `puter.ai` SDK)
* **PDF Processing:** `pdfjs-dist`
* **Deployment:** Deployed as a Puter application.

*(All dependencies are managed in `package.json`)*

---

## Project Structure
```
/
├── app/
│ ├── components/ # Reusable React components (ATS, Accordion, FileUploader, ScoreGuage)
│ ├── lib/ # Core logic and utilities
│ │ ├── puter.ts # Service layer for all Puter SDK interactions
│ │ ├── pdf-to-img.ts # Utility for PDF thumbnail generation
│ │ └── utils.ts # General helper functions
│ ├── routes/ # The core of the app: each file is a page/route
│ │ ├── home.tsx # Dashboard (loader for file list)
│ │ ├── upload.tsx # Upload page (action for file/AI processing)
│ │ ├── resume.tsx # Results page (loader for analysis JSON)
│ │ ├── auth.tsx # Clerk login/signup page
│ │ └── wipe.tsx # Utility route to clear data
│ ├── root.tsx # Main app layout (with Navbar)
│ └── routes.ts # Route definitions for React Router
│ ├── constants/
│ └── index.ts # Contains the AI system and user prompts
│ ├── public/ # Static assets (icons, images)
│ ├── types/ # TypeScript type definitions
│ ├── package.json # Project dependencies
├── vite.config.ts # Vite configuration with Puter plugin
└── Dockerfile # Docker configuration for deployment
```
---

## Getting Started

### Prerequisites

* **Bun** (as the package manager and runtime)
* A **Puter** account.
* A **Clerk** account for authentication.
* An **OpenAI** API key.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/ai-resume-analyzer.git](https://github.com/your-username/ai-resume-analyzer.git)
    cd ai-resume-analyzer
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your keys:
    ```
    # Get this from your Puter app settings
    VITE_PUTER_CLIENT_ID="your_puter_client_id"
    
    # Get this from your Clerk dashboard
    VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
    
    # Get this from OpenAI
    OPENAI_API_KEY="your_openai_api_key"
    ```

4.  **Run the application:**
    ```bash
    bun dev
    ```

The application will be running on `http://localhost:5173`.
