// src/components/Payment.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { courseId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const courses = {
    1: { title: "React Basics", price: 99 },
    2: { title: "Advanced CSS", price: 149 },
    3: { title: "JavaScript Deep Dive", price: 199 },
  };

  const course = courses[courseId];

  if (!course) {
    return <div className="payment-not-found">Course Not Found</div>;
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h1>Checkout</h1>
        <Link to="/courses" className="back-button">Back to Courses</Link>
      </header>

      {!paymentSuccess ? (
        <section className="payment-box">
          <h2>{course.title}</h2>
          <p className="course-price">Total Price: ${course.price}</p>

          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label>Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
            </div>

            {paymentMethod === "credit-card" && (
              <>
                <div className="form-group">
                  <label>Name on Card</label>
                  <input type="text" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" maxLength="16" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} required />
                </div>
                <div className="card-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" maxLength="3" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} required />
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="pay-button" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay $${course.price}`}
            </button>
          </form>
        </section>
      ) : (
        <section className="payment-success">
          <h2>Payment Successful! 🎉</h2>
          <p>You have successfully enrolled in {course.title}.</p>
          <Link to="/dashboard" className="dashboard-button">Go to Dashboard</Link>
        </section>
      )}
    </div>
  );
};

export default Payment;
