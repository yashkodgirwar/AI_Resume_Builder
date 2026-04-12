import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeftIcon } from "lucide-react";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";

const Preview = () => {
  const { resumeId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    const foundResume = dummyResumeData.find(
      (resume) => resume.id === resumeId
    );
    setResumeData(foundResume || null);
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <p className="text-lg font-medium text-gray-700">Resume not found</p>
          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600
                       text-white rounded-full px-6 h-9 m-1
                       ring-offset-1 ring-1 ring-green-400
                       flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            go to home page
          </a>
        </>
      )}
    </div>
  );
};

export default Preview;