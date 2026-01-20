import React from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Brain, TrendingUp, CheckCircle } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Resume Review in{" "}
            <span className="text-blue-600">Seconds</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant feedback on your resume with our advanced AI analysis.
            Beat ATS systems and land your dream job.
          </p>
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2 mx-auto"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Resume</span>
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Upload Resume</h3>
            <p className="text-gray-600">
              Upload your resume in PDF or DOCX format
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. AI Analyzes</h3>
            <p className="text-gray-600">
              Our AI reviews your resume against industry standards
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Get Feedback</h3>
            <p className="text-gray-600">
              Receive actionable insights to improve your resume
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white rounded-2xl my-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose ResumeRefinery?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">
                ATS Compatibility Check
              </h3>
              <p className="text-gray-600">
                Ensure your resume passes Applicant Tracking Systems
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Keyword Optimization
              </h3>
              <p className="text-gray-600">
                Identify missing keywords for your target role
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Section-by-Section Feedback
              </h3>
              <p className="text-gray-600">
                Get detailed analysis of every resume section
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">
                Get your analysis in seconds, not days
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
