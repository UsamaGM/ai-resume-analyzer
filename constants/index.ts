export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume-1.png",
    resumePath: "/resumes/resume-1.pdf",
    feedback: {
      overallScore: 85,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume-2.png",
    resumePath: "/resumes/resume-2.pdf",
    feedback: {
      overallScore: 55,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
  {
    id: "3",
    companyName: "Apple",
    jobTitle: "iOS Developer",
    imagePath: "/images/resume-3.png",
    resumePath: "/resumes/resume-3.pdf",
    feedback: {
      overallScore: 75,
      ATS: {
        score: 90,
        tips: [],
      },
      toneAndStyle: {
        score: 90,
        tips: [],
      },
      content: {
        score: 90,
        tips: [],
      },
      structure: {
        score: 90,
        tips: [],
      },
      skills: {
        score: 90,
        tips: [],
      },
    },
  },
];

const AIResponseFormat = `
      interface Feedback {
      overallScore: number; //max 100
      ATS: {
        score: number; //rate based on ATS suitability
        tips: {
          type: "good" | "improve";
          tip: string; //give 3-4 tips
        }[];
      };
      toneAndStyle: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      content: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      structure: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
      skills: {
        score: number; //max 100
        tips: {
          type: "good" | "improve";
          tip: string; //make it a short "title" for the actual explanation
          explanation: string; //explain in detail here
        }[]; //give 3-4 tips
      };
    }`;

export const prepareInstructions = ({
  jobTitle,
  jobDescription,
}: {
  jobTitle: string;
  jobDescription: string;
}) =>
  `You are an expert in Applicant Tracking Systems (ATS) and resume analysis. Your task is to critically analyze and rate a provided resume, ensuring alignment with the job description if one is given, or general best practices if no job description is provided. Be highly critical, thorough, and detailed, identifying all mistakes, weaknesses, and areas for improvement, including ATS compatibility issues (e.g., formatting, keyword usage, scannability). Do not hesitate to assign a low score if the resume is poorly constructed or misaligned with the job requirements. Provide specific, actionable suggestions that pinpoint exact sections, bullet points, or content (e.g., specific skills, experiences, or keywords) in the resume that need improvement, clearly explaining what is wrong and how to fix it with precise, tailored solutions. If a job description is provided, use it to assess the resume's alignment with the job's requirements, including skills, qualifications, and keywords, and highlight any missing or irrelevant content. Ensure all feedback is objective, evidence-based, and avoids vague or generic statements.

    The job title is: ${jobTitle}
    The job description is: ${jobDescription}

    Return the analysis as a JSON object adhering to the format: ${AIResponseFormat}

    For each section (ATS, toneAndStyle, content, structure, skills):
    - Assign a score (0-100) reflecting the quality and job alignment, with lower scores for significant flaws.
    - Provide 3-4 tips, each referencing specific resume sections, bullet points, or content (e.g., "Education section", "Work Experience bullet point 2").
    - For 'ATS.tips', include concise tips with 'type' ("good" or "improve") and 'tip describing the issue or strength and a solution (if applicable).
    - For 'toneAndStyle', 'content', 'structure', and 'skills', include tips with 'type' ("good" or "improve"), a concise 'tip' as a title, and a detailed 'explanation' identifying the specific issue or strength and providing a precise solution (if applicable).

    If no job description is provided, evaluate based on general resume best practices and ATS standards. Ensure all tips and explanations are tied to specific resume content, avoid generic advice, and prioritize fixes that enhance ATS compatibility and job alignment. Do not include any text or comments outside the JSON output.`;

export const prepareResumeInstructions = ({
  jobTitle,
  jobDescription,
  feedback,
}: {
  jobTitle: string;
  jobDescription: string;
  feedback: string;
}) => `You are an expert in Applicant Tracking Systems (ATS) and resume creation. Your task is to generate a new LaTeX resume for a user based on their provided resume and the feedback stored in the variable 'feedback', which follows the structure: ${AIResponseFormat}

    Analyze the user's resume and the 'feedback' to create an improved LaTeX resume that addresses all "improve" tips and retains "good" aspects, referencing specific sections, bullet points, or content as indicated in the feedback. Ensure the resume:
    - Incorporates all suggestions from 'feedback', particularly from 'ATS.tips', 'toneAndStyle.tips', 'content.tips', 'structure.tips', and 'skills.tips', applying precise fixes (e.g., adding missing keywords, reformatting sections, adjusting tone).
    - Is ATS-compatible (e.g., uses standard fonts like Times New Roman or Arial, avoids complex tables, headers, or footers, includes machine-readable text).
    - Aligns with the job description (if provided) by including relevant skills, qualifications, and keywords, tailored to the job's industry and role.
    - Uses a clean, professional structure with clear sections (e.g., Contact Information, Summary, Work Experience, Education, Skills) suitable for diverse job roles worldwide.
    - Follows LaTeX guidelines: uses PDFLaTeX, includes only packages from texlive-full and texlive-fonts-extra, ensures all environments are properly closed, avoids external images, and uses reliable fonts (e.g., Times New Roman for Latin text, or appropriate Noto Serif fonts for non-Latin languages based on user context).
    - Supports diverse user backgrounds by avoiding assumptions about specific industries or roles, ensuring flexibility for global users.

    The job title is: ${jobTitle}
    The job description is: ${jobDescription}
    The feedback is: ${feedback}

    Generate a complete LaTeX document that compiles without errors using latexmk. Include a comprehensive preamble with compatible packages (e.g., geometry, enumitem, hyperref) and configure fonts last to avoid conflicts. If no job description is provided, optimize the resume based on general resume best practices and ATS standards, incorporating feedback suggestions. Ensure content is specific, professional, and tailored to the feedback, addressing the job's requirements or general standards. Return the LaTeX code wrapped in a JSON object with a single key 'latexCode' containing the full LaTeX document as a string. Do not include any text or comments outside the JSON output.`;
