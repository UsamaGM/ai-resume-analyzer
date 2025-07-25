import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/puter";
import { useEffect, useState } from "react";

export default function ResumeCard({
	resume: { id, feedback, imagePath, companyName, jobTitle },
}: {
	resume: Resume;
}) {
	const [resumeURL, setResumeURL] = useState("");
	const { fs } = usePuterStore();

	useEffect(() => {
		async function loadResume() {
			const blob = await fs.read(imagePath);
			if (!blob) return;

			const url = URL.createObjectURL(blob);
			setResumeURL(url);
		}

		loadResume();
	}, [imagePath]);

	return (
		<Link
			to={`/resume/${id}`}
			className="resume-card animate-in fade-in duration-1000"
		>
			<div className="resume-card-header">
				<div className="flex flex-col gap-2">
					{companyName && (
						<h2 className="!text-black font-bold break-words">{companyName}</h2>
					)}
					{jobTitle && (
						<h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
					)}
					{!companyName && !jobTitle && (
						<h2 className="!text-black font-bold">Resume</h2>
					)}
				</div>
				<div className="shrink-0">
					<ScoreCircle score={feedback.overallScore} />
				</div>
			</div>
			{resumeURL && (
				<div className="gradient-border animate-in fade-in duration-1000">
					<div className="w-full h-full">
						<img
							src={resumeURL}
							alt="resume"
							className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
						/>
					</div>
				</div>
			)}
		</Link>
	);
}
