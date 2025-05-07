import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ChevronDown, Shield } from "lucide-react";
import Header from "../Components/Header";

function Payment() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const requestId = searchParams.get("requestId");
  const serviceId = searchParams.get("serviceId");
  const conversationId = searchParams.get("conversationId");

  const [price, setPrice] = useState(parseFloat(amount) || 149.99);
  const [originalPrice, setOriginalPrice] = useState(
    parseFloat(amount) || 149.99
  );
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [fadeIn, setFadeIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      if (conversationId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/direct_chat/conversation/${conversationId}`,
            { withCredentials: false }
          );

          const request = response.data;
          if (!request || !request.budget) {
            throw new Error("Invalid request data");
          }

          setPrice(request.budget);
          setOriginalPrice(request.budget);
        } catch (error) {
          console.error("Error fetching request details:", error);
          alert("Failed to fetch request details. Please try again.");
        }
      }
    };

    fetchRequestDetails();
  }, [conversationId]);

  const handleDiscountClick = () => {
    setShowDiscount(!showDiscount);
  };

  const applyDiscount = async () => {
    try {
      if (!discountCode.trim()) {
        alert("Please enter a discount code");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/coupon/validate`,
        {
          code: discountCode,
          requestId,
        },
        { withCredentials: false }
      );

      if (response.data.valid) {
        const discountedPrice =
          originalPrice * (1 - response.data.discountPercentage / 100);
        setPrice(discountedPrice);
        setDiscountApplied(true);
        alert(
          `Discount of ${response.data.discountPercentage}% applied successfully!`
        );
      } else {
        setDiscountApplied(false);
        setPrice(originalPrice);
        alert(response.data.message || "Invalid discount code");
      }
    } catch (error) {
      console.error("Error validating coupon:", error);
      setDiscountApplied(false);
      setPrice(originalPrice);
      alert(
        error.response?.data?.message ||
          "Failed to validate coupon. Please try again."
      );
    }
  };

  const escrowButtonStyles = `
    @import url(https://fonts.googleapis.com/css?family=Open+Sans:600);
    .EscrowButtonSecondary.EscrowButtonSecondary {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG8AAAALCAMAAABGfiMeAAAAjVBMVEUAAAA8ul08ul48ul08ul08ul9CwGE/vGFHv2lT2Hs8ul08ul09ul09u188ul09ul09ul08ul09ul49ul49u149ul48ul4+u18+u2A9uV09ul49ul5Av2FCvWE8uV09ul49ul49u149u18+vGA/wGM8ul48ul48ul48ul49ul49u18/vWE8uV09ul88uV1RkItgAAAALnRSTlMA+/fz1m4RKwwF4cWUV+vbzLGBU0qlnj01rI16HRq6uGdNYDAV5tC/tYdEI5p0k6hGXAAAAi1JREFUOMuFktuSojAURXcCIheROypIt8hV2t7//3lzwjjVXc7Ysx5SVA45K8kO3ld2QFP6eog74BIp7Zdo34T7FoBbj1ZUnpEzBjBQfv6g5UHoksiPCwDhexSkLnAYSghuFOHfUO2FCQjkS7HDhbQ0bWxo0CKcSansG1cpB1tKDVfOgGgt+r6lgVRm94w9tFQ9TF298tlYaWi7QO9h5AI4W/HNbfbGQgxDBzfhDTFbsx32KPkJGM3VLAUs/wyvYIiQayUgvZ99Dsf1D0/tYRDfDuIakYkTOHBGxQoFY2bweYSQ0IHhzBLAkSmuZGSWkc4Lnx8KLjDSrs/Ga3/5xPWO7NHsbQ1w0CF350d8gcbDd4ex3HChxQMqGZsXvpUPyWIkRdF/+fxk1rx+8zlKHTnJjq6yjdVnPfs2rFh4ez/hx6vz5YILoast5t/OZ0jxzYeYicyMMta/ferZVzOM9YZ1we3P+T0cNbT15ztZbNO35QnAwgSoSB6wW0fD6ZFS/4g4Rcr2QqWaO4//8WWd5xa8IODV6bfLmt9WqyMa6hbnialRU3vIaOJbdg1q8xjdDhiso3nCGSoursUEOx5e5aeFAI5FRe576WawVx8ujFxUNCXfARxyMqcxd2szRbOn0lRASA6ak7d62s0WN+Zo6s/8L+tppYK7mfyoNCHnUxQFN+SnK4D0lEm3WSYcCFURAtiZ8RJ0wPkexHNl4i2DZOMBaWxaSDUW03LIn2/1F/O5RSAdFTG2AAAAAElFTkSuQmCC);
      -moz-osx-font-smoothing: grayscale!important;
      -webkit-font-smoothing: antialiased!important;
      background-color: #f0f2f5!important;
      background-repeat: no-repeat!important;
      background-position: right 13px!important;
      border-radius: 4px!important;
      border: 1px solid rgba(0,0,0,.05)!important;
      -webkit-box-shadow: 0 2px 4px 0 hsla(0,12%,54%,.1)!important;
      box-shadow: 0 2px 4px 0 hsla(0,12%,54%,.1)!important;
      -webkit-box-sizing: border-box!important;
      box-sizing: border-box!important;
      color: #555!important;
      cursor: pointer!important;
      display: inline-block!important;
      font-family: Open Sans,sans-serif!important;
      font-size: 14px!important;
      font-weight: 600!important;
      letter-spacing: .4px!important;
      line-height: 1.2!important;
      min-height: 40px!important;
      padding: 8px 118px 8px 21px!important;
      text-align: left!important;
      text-decoration: none!important;
      text-shadow: none!important;
      text-transform: none!important;
      -webkit-transition: all .1s linear!important;
      transition: all .1s linear!important;
      vertical-align: middle!important;
      width: 100%!important;
    }
    .EscrowButtonSecondary.EscrowButtonSecondary:focus,
    .EscrowButtonSecondary.EscrowButtonSecondary:hover {
      color: #555!important;
      font-size: 14px!important;
      font-weight: 600!important;
      outline: 0!important;
      text-decoration: none!important;
      -webkit-transform: none!important;
      transform: none!important;
    }
    .EscrowButtonSecondary.EscrowButtonSecondary:hover {
      background-color: #f4f5f8!important;
      border-color: rgba(0,0,0,.05)!important;
    }
    .EscrowButtonSecondary.EscrowButtonSecondary:focus {
      background-color: #e8e9ec!important;
    }
  `;

  const validateEscrowForm = () => {
    if (!price || price <= 0) {
      setError("Invalid payment amount");
      return false;
    }
    if (!requestId) {
      setError("Missing request ID");
      return false;
    }
    return true;
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div
          className={`w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-blue-300 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Secure Payment via Escrow
            </h2>
            <p className="text-gray-700">Premium Financial Services Package</p>
          </div>

          <div className="p-6">
            <div className="mb-6 border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-700">
                  Premium Financial Services
                </h3>
                <span className="font-bold text-blue-500 text-lg">
                  ${price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleDiscountClick}
                className="flex items-center text-blue-500 text-sm hover:text-blue-600"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  ></path>
                </svg>
                <span>Have a discount code?</span>
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform ${
                    showDiscount ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDiscount && (
                <div className="mt-4 flex animate-slideDown">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-300"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    onClick={applyDiscount}
                    className="px-4 py-2 bg-gray-700 text-white rounded-r hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Shield className="mr-2 text-green-600" size={20} />
                  Secure Escrow Payment
                </h4>
                <p className="text-sm text-gray-600">
                  Your payment will be held safely in escrow until you approve
                  the service delivery. This ensures both parties are protected
                  throughout the transaction.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
                <svg
                  className="w-5 h-5 text-red-500 mt-0.5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <style>{escrowButtonStyles}</style>
            <form
              action="https://www.escrow-sandbox.com/checkout"
              method="post"
              target="_blank"
              onSubmit={() => validateEscrowForm()}
            >
              <input type="hidden" name="type" value="domain_name" />
              <input
                type="hidden"
                name="non_initiator_email"
                value="ms115257@gmail.com"
              />
              <input type="hidden" name="non_initiator_id" value="1360724" />
              <input type="hidden" name="non_initiator_role" value="seller" />
              <input
                type="hidden"
                name="title"
                value={`Accounting Service - Request #${requestId}`}
              />
              <input type="hidden" name="currency" value="USD" />
              <input type="hidden" name="domain" value="www.example.com" />
              <input type="hidden" name="price" value={price} />
              <input type="hidden" name="concierge" value="false" />
              <input type="hidden" name="with_content" value="false" />
              <input type="hidden" name="inspection_period" value="1" />
              <input type="hidden" name="fee_payer" value="seller" />
              <input
                type="hidden"
                name="return_url"
                value={window.location.origin}
              />
              <input type="hidden" name="button_types" value="buy_now" />
              <input type="hidden" name="auto_accept" value="" />
              <input type="hidden" name="auto_reject" value="" />
              <input type="hidden" name="item_key" value={requestId} />

              <button
                className="EscrowButtonSecondary"
                type="submit"
                disabled={paymentStatus === "processing"}
              >
                {paymentStatus === "processing"
                  ? "Processing..."
                  : `Pay $${price.toFixed(2)} Securely`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
