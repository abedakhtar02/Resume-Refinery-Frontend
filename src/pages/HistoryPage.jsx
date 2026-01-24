import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { History, FileText, Upload, Trash2 } from "lucide-react";
import { resumeAPI } from "../services/api";

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await resumeAPI.getHistory();
      setHistory(data);
    } catch (err) {
      setError("Failed to load history");
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAnalysis = async (id) => {
    try {
      const analysis = await resumeAPI.getAnalysisById(id);
      navigate("/results", { state: { analysis } });
    } catch (err) {
      alert("Failed to load analysis");
      console.error("Analysis fetch error:", err);
    }
  };

  const handleDeleteAnalysis = async (id) => {
    if (window.confirm("Are you sure you want to delete this analysis?")) {
      setDeleting(id);
      try {
        await resumeAPI.deleteAnalysis(id);
        // Remove the deleted item from the history list
        setHistory(history.filter((item) => item._id !== id));
        alert("Analysis deleted successfully");
      } catch (err) {
        setError("Failed to delete analysis");
        console.error("Delete error:", err);
      } finally {
        setDeleting(null);
      }
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analysis History
            </h1>
            <p className="text-gray-600 mt-2">
              View your previous resume analyses
            </p>
          </div>
          <button
            onClick={() => navigate("/upload")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>New Analysis</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {history.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No History Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your first resume to get started with AI-powered analysis
            </p>
            <button
              onClick={() => navigate("/upload")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-flex items-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Upload Resume</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              >
                <div
                  className="p-6"
                  title="View Details"
                  onClick={() => handleViewAnalysis(item._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FileText className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.resumeFileName || "Resume Analysis"}
                        </h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-500">
                            Analyzed on{" "}
                            {new Date(
                              item.date || item.createdAt,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          {item.targetRole || (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {item.targetRole}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div
                        className={`text-4xl font-bold ${getScoreColor(item.atsScore)}`}
                      >
                        {item.atsScore}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Match Score
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 rounded-b-lg flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewAnalysis(item._id);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details →
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnalysis(item._id);
                    }}
                    disabled={deleting === item._id}
                    className={`p-2 rounded-md ${
                      deleting === item._id
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-700"
                    }`}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {history.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-1">Total Analyses</div>
              <div className="text-3xl font-bold text-gray-900">
                {history.length}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-1">Average Score</div>
              <div
                className={`text-3xl font-bold ${getScoreColor(
                  Math.round(
                    history.reduce((acc, item) => acc + item.atsScore, 0) /
                      history.length,
                  ),
                )}`}
              >
                {Math.round(
                  history.reduce((acc, item) => acc + item.atsScore, 0) /
                    history.length,
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-1">Highest Score</div>
              <div
                className={`text-3xl font-bold ${getScoreColor(
                  Math.max(...history.map((item) => item.atsScore)),
                )}`}
              >
                {Math.max(...history.map((item) => item.atsScore))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
