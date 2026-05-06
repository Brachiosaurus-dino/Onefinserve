// // import axios from 'axios';

// // export const checkKycStatus = async (req, res) => {
// //   try {
// //     const { pan_no } = req.body; // Data coming from your React frontend
// //     console.log(pan_no)
// //     // NSE requires a specific header setup
// //     const config = {
// //       headers: {
// //         'memberId': '1006941', // Use your actual NSE Member ID
// //         'Content-Type': 'application/json',
// //         // This is the Basic Auth string from your PHP file
// //         'Authorization': 'Basic TUZTMTAxNTgxOk5XRmpZMkk1TmpJMFlUazFNRE16WTJFeU16RmxPVEZqTXprMU16RXpPVEU2T2paaU1UVTFaRFUwT1RrMVpXTTVaamd6Tnpjek9UY3pabUkzWW1KaFpHVmpPanAzTUZOSVMyVnBTVzVhZFdGUlRqRm5ZbloyUzFWWEwyNTZRMDF2U0ZwQmJtdERRVkZFT1RobVJVeG9WbU5SUzFwSWRXcDFZVzFqWkhGblprSkZSbVEz',
// //       }
// //     };

// //     const payload = {
// //       pan_no: pan_no.toUpperCase()
// //     };
// //     console.log(payload);
// //     const agent = new https.Agent({  
// //   rejectUnauthorized: false // Only use this for UAT/Testing!
// // });
// //     // Make the request to NSE
// //     const response = await axios.post(
// //      'https://nseinvestuat.nseindia.com/nsemfdesk/api/v2/utility/KYC_CHECK',
// //       payload,
// //       config,
      
// //     {
// //         headers: { /* your headers */ },
// //         httpsAgent: agent, // Add the agent here
// //         timeout: 10000 // Force a timeout after 10 seconds so it doesn't hang for a minute
// //     }
// //     );
// //     console.log("res is");
// //     console.log(response);

// //     // Send the NSE data back to your React frontend
// //     res.status(200).json({
// //       success: true,
// //       data: response
// //     });

    
// //   } catch (error) {
// //     console.error("NSE API Error:", error.response ? error.response.data : error.message);
// //     res.status(500).json({
// //       success: false,
// //       message: "NSE API could not be reached",
// //       error: error.message
// //     });
// //   }
// // };


// import axios from 'axios';
// import https from 'https'; // 1. Added missing https import

// export const checkKycStatus = async (req, res) => {
//   try {
//     const { pan_no } = req.body; 
//     console.log("Received PAN:", pan_no);

//     const payload = {
//       pan_no: pan_no.toUpperCase()
//     };
//     console.log("Payload to NSE:", payload);

//     // 2. Merged headers, agent, and timeout into ONE single config object
//     const config = {
//       headers: {
//         'memberId': '1006941', 
//         'Content-Type': 'application/json',
//         'Authorization': 'Basic TUZTMTAxNTgxOk5XRmpZMkk1TmpJMFlUazFNRE16WTJFeU16RmxPVEZqTXprMU16RXpPVEU2T2paaU1UVTFaRFUwT1RrMVpXTTVaamd6Tnpjek9UY3pabUkzWW1KaFpHVmpPanAzTUZOSVMyVnBTVzVhZFdGUlRqRm5ZbloyUzFWWEwyNTZRMDF2U0ZwQmJtdERRVkZFT1RobVJVeG9WbU5SUzFwSWRXcDFZVzFqWkhGblprSkZSbVEz',
//       },
//       httpsAgent: new https.Agent({  
//         rejectUnauthorized: false // Only use this for UAT/Testing!
//       }),
//       timeout: 10000 // Force a timeout after 10 seconds
//     };

//     // Make the request to NSE using exactly 3 arguments (URL, Payload, Config)
//     const response = await axios.post(
//       'https://nseinvestuat.nseindia.com/nsemfdesk/api/v2/utility/KYC_CHECK',
//       payload,
//       config
//     );
    
//     console.log("Response from NSE:", response.data);

//     // 3. CRITICAL: Send response.data back, NOT the whole response object
//     res.status(200).json({
//       success: true,
//       data: response.data 
//     });

//   } catch (error) {
//     console.error("NSE API Error:", error.response ? error.response.data : error.message);
//     res.status(500).json({
//       success: false,
//       message: "NSE API could not be reached",
//       error: error.message
//     });
//   }
// };

import axios from 'axios';
import https from 'https';

export const checkKycStatus = async (req, res) => {
  try {
    const { pan_no } = req.body;
    
    if (!pan_no) {
      return res.status(400).json({ success: false, message: "PAN number is required" });
    }

    console.log("Received PAN:", pan_no);

    const payload = {
      pan_no: pan_no.toUpperCase()
    };

    // 1. Corrected Config: Single object containing headers, agent, and timeout
    const config = {
      headers: {
        'memberId': '1006941',
        'Content-Type': 'application/json',
        // WARNING: Ensure this static token is still valid for UAT
        'Authorization': 'Basic TUZTMTAxNTgxOk5XRmpZMkk1TmpJMFlUazFNRE16WTJFeU16RmxPVEZqTXprMU16RXpPVEU2T2paaU1UVTFaRFUwT1RrMVpXTTVaamd6Tnpjek9UY3pabUkzWW1KaFpHVmpPanAzTUZOSVMyVnBTVzVhZFdGUlRqRm5ZbloyUzFWWEwyNTZRMDF2U0ZwQmJtdERRVkZFT1RobVJVeG9WbU5SUzFwSWRXcDFZVzFqWkhGblprSkZSbVEz',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // Necessary for NSE UAT self-signed certs
      }),
      timeout: 15000 // Increased to 15s as NSE UAT can be slow
    };

    // 2. Fixed URL: Removed the line breaks and spaces from the string
    const url = 'https://nseinvestuat.nseindia.com/nsemfdesk/api/v2/utility/KYC_CHECK';

    console.log("Calling NSE URL:", url);

    const response = await axios.post(url, payload, config);

    console.log("Response from NSE:", response.data);

    // 3. Return response.data (the actual JSON from NSE)
    res.status(200).json({
      success: true,
      data: response.data
    });

  } catch (error) {
    // Enhanced error logging to see exactly why it failed (403, 401, etc.)
    const statusCode = error.response ? error.response.status : 500;
    const errorData = error.response ? error.response.data : error.message;

    console.error("NSE API Error Detail:", errorData);

    res.status(statusCode).json({
      success: false,
      message: "NSE API could not be reached",
      error: errorData
    });
  }
};