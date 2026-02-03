import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState(null);
  const [ma100, setMA100] = useState(null);
  const [ma200, setMA200] = useState(null);
  const [prediction, setPrediction] = useState(null);
  // const [portionPrediction, setPortionPrediction] = useState(null);
  const [mse, setMSE] = useState(null);
  const [rmse, setRMSE] = useState(null);
  const [r2, setR2] = useState(null);

  //Auth Check
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view");
      } catch (error) {
        console.error(error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // CLEAR PREVIOUS RESULTS
    setError(null);
    setPlot(null);
    setMA100(null);
    setMA200(null);
    setPrediction(null);
    // setPortionPrediction(null);
    setMSE(null);
    setRMSE(null);
    setR2(null);

    try {
      const response = await axiosInstance.post("/predict/", {
        ticker: ticker.trim().toUpperCase(),
      });
      // console.log(response.data);

      // Handle error
      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      //Set Plot
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot}${response.data.plot_img}`;
      const ma100 = `${backendRoot}${response.data.plot_100_dma}`;
      const ma200 = `${backendRoot}${response.data.plot_200_dma}`;
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`;
      // const portionPredictionUrl = `${backendRoot}${response.data.plot_aFixed_portion_prediction}`;

      setPlot(plotUrl);
      setMA100(ma100);
      setMA200(ma200);
      setPrediction(predictionUrl);
      // setPortionPrediction(portionPredictionUrl);
      setMSE(response.data.mse);
      setRMSE(response.data.rmse);
      setR2(response.data.r2);
    } catch (error) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const showResult =
    !error && prediction && mse !== null && rmse !== null && r2 !== null;
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Stock Ticker"
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            {error && (
              <div className="alert alert-danger mt-2 text-center">{error}</div>
            )}
            <button
              type="submit"
              className="btn btn-info mt-3 w-100"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
                </span>
              ) : (
                "See Prediction"
              )}
            </button>
          </form>

          {showResult && (
            <div className="card text-light mt-5 p-3">
              <h4 className="mb-3 text-center">
                Stock Predictions for {ticker}
              </h4>

              {[plot, ma100, ma200, prediction].map(
                (img, idx) =>
                  img && (
                    <div className="mb-3 text-center" key={idx}>
                      <img
                        src={img}
                        alt={`plot-${idx}`}
                        className="img-fluid rounded"
                      />
                    </div>
                  ),
              )}

              <div className="p-3 text-dark rounded mt-3">
                <h5>Model Evaluation</h5>
                <p>Mean Squared Error (MSE): {mse}</p>
                <p>Root Mean Squared Error (RMSE): {rmse}</p>
                <p>R-Squared: {r2}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
