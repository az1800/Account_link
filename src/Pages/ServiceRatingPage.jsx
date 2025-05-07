import { useState, useEffect } from "react";
import {
  Star,
  Clock,
  MessageSquare,
  Award,
  DollarSign,
  Send,
  Loader,
} from "lucide-react";
import Header from "../Components/Header";

export default function ServiceRatingPage() {
  // Get firmId from URL params in a real application
  const firmId =
    new URLSearchParams(window.location.search).get("firmId") || "mock-firm-id";
  const requestId =
    new URLSearchParams(window.location.search).get("requestId") || "REQ-78392";

  const [firmDetails, setFirmDetails] = useState({
    name: "Loading...",
    serviceType: "Loading...",
    issueDate: "Loading...",
    completionDate: "Loading...",
    requestId: requestId,
    cost: "Loading...",
  });

  const [ratings, setRatings] = useState({
    serviceQuality: 0,
    communication: 0,
    timeliness: 0,
    valueForMoney: 0,
  });

  const [comment, setComment] = useState("");
  const [averageRatings, setAverageRatings] = useState(null);
  const [firmRatings, setFirmRatings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch firm details and service request information
  useEffect(() => {
    const fetchServiceDetails = async () => {
      setIsLoading(true);
      try {
        // This would fetch the specific request details in a real app
        //     firmName: request.receiver.companyName,
        //   serviceName: request.service.name,
        //   issueDate: request.createdAt,
        //   budget: request.budget,
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/ratings/request/${requestId}/`
        );
        if (!response.ok) throw new Error("Failed to fetch service details");
        const data = await response.json();

        setFirmDetails({
          name: data.firmName.name || "KPMG Consultants", // Fallback for demo
          serviceType: data.serviceName || "Tax Consultation",
          issueDate:
            new Date(data.issueDate).toISOString().split("T")[0] ||
            "2025-04-15",
          completionDate: data.completedAt
            ? new Date(data.completedAt).toISOString().split("T")[0]
            : "2025-04-28",
          requestId: data._id || requestId,
          cost: `$${data.budget.toFixed(2) || "1000.00"}`,
        });
      } catch (error) {
        console.error("Error fetching service details:", error);
        setErrorMessage("Failed to load service details");
        // Use demo data as fallback
        setFirmDetails({
          name: "KPMG Consultants",
          serviceType: "Tax Consultation",
          issueDate: "2025-04-15",
          completionDate: "2025-04-28",
          requestId: requestId,
          cost: "$1000.00",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [requestId]);

  // Fetch ratings data
  useEffect(() => {
    const fetchRatings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/ratings/firms/${firmId}/ratings`
        );
        if (!response.ok) throw new Error("Failed to fetch ratings");

        const data = await response.json();
        setFirmRatings(data.ratings || []);
        setAverageRatings(data.averageRatings || null);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setErrorMessage("Failed to load existing ratings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatings();
  }, [firmId, ratingSubmitted]);

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/ratings/firms/${firmId}/rate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            serviceQuality: ratings.serviceQuality,
            communication: ratings.communication,
            timeliness: ratings.timeliness,
            valueForMoney: ratings.valueForMoney,
            comment: comment.trim(),
          }),
          credentials: "include", // Important for sending cookies/session
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit rating");
      }

      // Reset form and show success
      setRatingSubmitted(true);
      setComment("");
      setRatings({
        serviceQuality: 0,
        communication: 0,
        timeliness: 0,
        valueForMoney: 0,
      });
    } catch (error) {
      setErrorMessage(
        error.message || "Failed to submit rating. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const RatingStars = ({ value, onChange, readOnly = false }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange(star)}
          className={`${
            readOnly ? "cursor-default" : "cursor-pointer hover:text-yellow-500"
          } ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          } focus:outline-none`}
        >
          <Star className="w-6 h-6" />
        </button>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto text-blue-600" />
          <p className="mt-4 text-gray-600">Loading rating information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {firmDetails.name}
              </h1>
              {averageRatings && (
                <div className="flex items-center space-x-2">
                  <div className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span>{averageRatings.overall.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    ({averageRatings.count} ratings)
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Service Details
                </h2>
                <div className="mt-2 space-y-2">
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Service Type:</span>
                    <span className="font-medium">
                      {firmDetails.serviceType}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Request ID:</span>
                    <span className="font-medium">{firmDetails.requestId}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Cost:</span>
                    <span className="font-medium">{firmDetails.cost}</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Timeline
                </h2>
                <div className="mt-2 space-y-2">
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Issue Date:</span>
                    <span className="font-medium">{firmDetails.issueDate}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Completion:</span>
                    <span className="font-medium">
                      {firmDetails.completionDate}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 w-32">Status:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rate Your Experience
            </h2>

            {ratingSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 text-green-700">
                Thank you for your feedback! Your rating has been submitted
                successfully.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 text-gray-600 mr-2" />
                      <label className="font-medium text-gray-700">
                        Service Quality
                      </label>
                    </div>
                    <RatingStars
                      value={ratings.serviceQuality}
                      onChange={(value) =>
                        handleRatingChange("serviceQuality", value)
                      }
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <MessageSquare className="w-5 h-5 text-gray-600 mr-2" />
                      <label className="font-medium text-gray-700">
                        Communication
                      </label>
                    </div>
                    <RatingStars
                      value={ratings.communication}
                      onChange={(value) =>
                        handleRatingChange("communication", value)
                      }
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 text-gray-600 mr-2" />
                      <label className="font-medium text-gray-700">
                        Timeliness
                      </label>
                    </div>
                    <RatingStars
                      value={ratings.timeliness}
                      onChange={(value) =>
                        handleRatingChange("timeliness", value)
                      }
                    />
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-5 h-5 text-gray-600 mr-2" />
                      <label className="font-medium text-gray-700">
                        Value For Money
                      </label>
                    </div>
                    <RatingStars
                      value={ratings.valueForMoney}
                      onChange={(value) =>
                        handleRatingChange("valueForMoney", value)
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block font-medium text-gray-700 mb-2"
                  >
                    Comments
                  </label>
                  <textarea
                    id="comment"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with this service..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                {errorMessage && (
                  <div className="text-red-600 text-sm">{errorMessage}</div>
                )}

                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      Object.values(ratings).some((r) => r === 0)
                    }
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isSubmitting ||
                      Object.values(ratings).some((r) => r === 0)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Rating
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Previous Ratings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Previous Ratings
            </h2>

            {averageRatings ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="text-center">
                  <div className="text-gray-600 mb-1">Service Quality</div>
                  <div className="flex justify-center">
                    <RatingStars
                      value={Math.round(averageRatings.serviceQuality)}
                      readOnly={true}
                    />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {averageRatings.serviceQuality.toFixed(1)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-gray-600 mb-1">Communication</div>
                  <div className="flex justify-center">
                    <RatingStars
                      value={Math.round(averageRatings.communication)}
                      readOnly={true}
                    />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {averageRatings.communication.toFixed(1)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-gray-600 mb-1">Timeliness</div>
                  <div className="flex justify-center">
                    <RatingStars
                      value={Math.round(averageRatings.timeliness)}
                      readOnly={true}
                    />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {averageRatings.timeliness.toFixed(1)}
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-gray-600 mb-1">Value For Money</div>
                  <div className="flex justify-center">
                    <RatingStars
                      value={Math.round(averageRatings.valueForMoney)}
                      readOnly={true}
                    />
                  </div>
                  <div className="text-blue-600 font-semibold">
                    {averageRatings.valueForMoney.toFixed(1)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No rating statistics available yet.
              </div>
            )}

            <div className="divide-y divide-gray-200">
              {firmRatings.length > 0 ? (
                firmRatings.map((rating) => (
                  <div key={rating._id} className="py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-800">
                          {rating.user?.name || "Anonymous User"}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {new Date(rating.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 font-medium">
                          {(
                            (rating.serviceQuality +
                              rating.communication +
                              rating.timeliness +
                              rating.valueForMoney) /
                            4
                          ).toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-1">Service:</span>
                        <span className="font-medium">
                          {rating.serviceQuality}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-1">
                          Communication:
                        </span>
                        <span className="font-medium">
                          {rating.communication}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-1">Timeliness:</span>
                        <span className="font-medium">{rating.timeliness}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-1">Value:</span>
                        <span className="font-medium">
                          {rating.valueForMoney}
                        </span>
                      </div>
                    </div>

                    {rating.comment && (
                      <p className="text-gray-700 mt-2">{rating.comment}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500">
                  No ratings have been submitted yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
