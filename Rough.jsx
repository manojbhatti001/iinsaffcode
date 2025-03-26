const handleSubmit = (e) => {
  // Get the userToken from localStorage
  const token = localStorage.getItem("userToken");

  // Make API request to create lead and get the payment order
  axios
    .post(`${baseUrl}create-lead`, leadData, {
      headers: {
        Authorization: token, // Attach userToken in headers
      },
    })
    .then((response) => {
      console.log("response from create lead => ", response); // <-- Add this line to log the adCost
      // Assuming response contains adCost and razorpayOrderId
      const razorpayOrderId = response.data.razorpayOrderId;
      const adCost = response.data.lead.adCost; // Extract adCost from the response

      // Load Razorpay dynamically
      loadRazorpay()
        .then((Razorpay) => {
          console.log("RazorPay response in then => ", Razorpay);
          console.log("Ad Cost in paise:", adCost * 100); // <-- Add this line to verify the paise amount
          // Initialize Razorpay payment
          const options = {
            key: "rzp_test_MAiOifGgaIOqpq", // Razorpay API key (can be obtained from Razorpay dashboard)
            amount: adCost * 100, // Convert amount to paise (Razorpay uses paise as currency unit)
            currency: "INR",
            order_id: razorpayOrderId, // Order ID from the backend
            name: "Your Company Name",
            description: "Payment for Lead Creation",
            handler: function (response) {
              console.log("Received payment response:", response); // Log the entire response object
              // Payment success callback
              const paymentDetails = response;
              console.log("payment", paymentDetails);
              toast.success("Payment successful!");

              // Directly call your API to verify the payment
              axios
                .post(`${baseUrl}verify-payment`, {
                  paymentId: paymentDetails.razorpay_payment_id,
                  orderId: paymentDetails.razorpay_order_id,
                  signature: paymentDetails.razorpay_signature,
                })
                .then((verifyResponse) => {
                  // If the payment verification is successful
                  console.log("Payment verified successfully!");
                })
                .catch((err) => {
                  // If there was an error during payment verification
                  toast.error(err.message || "Error verifying payment.");
                });
            },
            prefill: {
              name: formData.name,
              email: formData.email,
              contact: formData.mobile,
            },
            theme: {
              color: "#F37254", // Customize Razorpay theme color
            },
          };

          // Open Razorpay payment modal
          const rzp1 = new Razorpay(options);
          rzp1.open();
        })
        .catch((err) => {
          console.log("Razorpay script failed to load: " + err.message);
        });
    })
    .catch((err) => {
      console.log(err.message || "Error creating lead.");
    })
};