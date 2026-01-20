import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Upload,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  FileText,
} from "lucide-react";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const analysis = location.state?.analysis;

  if (!analysis) {
    navigate("/upload");
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall Score */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resume Analysis Complete
              </h1>
              <p className="text-gray-600">
                Here's your comprehensive resume evaluation
              </p>
            </div>
            <div
              className={`${getScoreBgColor(analysis.matchScore)} rounded-full p-8`}
            >
              <div className="text-center">
                <div
                  className={`text-6xl font-bold ${getScoreColor(analysis.matchScore)}`}
                >
                  {analysis.matchScore}
                </div>
                <div className="text-sm text-gray-600 mt-2 font-medium">
                  {getScoreLabel(analysis.matchScore)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strengths */}
          {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  What's Working
                </h2>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">
                    Resume format is ATS-friendly
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">Good keyword density</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span className="text-gray-700">
                    Professional structure maintained
                  </span>
                </li>
              </ul>
            </div>
          )}

          {/* Missing Keywords */}
          {analysis.missingKeywords && analysis.missingKeywords.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-900">
                  Missing Keywords
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.missingKeywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Missing Skills */}
        {analysis.missingSkills && analysis.missingSkills.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <XCircle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-900">
                Skills Gap Analysis
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Consider adding these skills to your resume if you have experience
              with them.
            </p>
          </div>
        )}

        {/* Suggested Improvements */}
        {analysis.suggestedImprovements && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Suggested Improvements
            </h2>
            <div className="space-y-6">
              {analysis.suggestedImprovements.summary && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Summary Section
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {analysis.suggestedImprovements.summary}
                  </p>
                </div>
              )}

              {analysis.suggestedImprovements.experience && (
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Experience Section
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    {analysis.suggestedImprovements.experience}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Tips to Improve
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Use action verbs at the start of bullet points
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Quantify your achievements with numbers
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Tailor your resume to the job description
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">
                Keep your resume to 1-2 pages maximum
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/upload")}
            className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Analyze Another Resume</span>
          </button>
          <button
            onClick={() =>
              alert(
                "AI Rewrite feature coming soon! This will help you automatically optimize your resume based on the feedback.",
              )
            }
            className="flex-1 bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            <span>Optimize with AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
