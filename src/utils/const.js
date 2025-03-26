// export const baseUrl = "http://localhost:8000/";
// export const baseUrl = "http://88.222.215.234:8000/";
// export const baseUrl = "https://iinsaf-backend.vercel.app/";
// export const baseUrl = "https://iinsaf-backend-9.onrender.com/";
export const baseUrl = "https://iinsaf-newb.onrender.com/";

export const loadRazorpay = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(window.Razorpay);
        script.onerror = (err) => reject(new Error("Razorpay script failed to load"));
        document.body.appendChild(script);
      }
    });
  };
 