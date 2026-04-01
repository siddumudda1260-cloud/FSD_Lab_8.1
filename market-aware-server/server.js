const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(cors());
 
// Mock Database of Products
const products = {
  "laptop": { name: "High-End Workstation", price: 2500, region: "Conflict Zone" },
  "shirt": { name: "Cotton T-Shirt", price: 30, region: "Stable Zone" }
};
 
app.get('/api/analyze/:item', async (req, res) => {
  const item = req.params.item;
  const product = products[item];
 
  // SIMULATED NEWS FEED based on the war situation
  const newsHeadline = item === "laptop" 
    ? "War escalates in chip manufacturing hub, factories closing down." 
    : "Local textile markets see record harvest and peace.";
 
  try {
    const sentimentScore = item === "laptop" ? -0.7 : 0.6;
 
    // Decision Logic: If sentiment is very negative and it's a critical item -> URGENT
    const isUrgent = sentimentScore < -0.3 && product.region === "Conflict Zone";
 
    res.json({
      ...product,
      newsHeadline,
      sentimentScore,
      isUrgent,
      recommendation: isUrgent ? "BUY NOW: Prices likely to spike" : "PRICE STABLE: Buy at leisure"
    });
  } catch (error) {
  console.error("FULL ERROR:", error.response?.data || error.message);
  res.status(500).json({ error: "API connection failed" });
}
});
 
app.listen(5000, () => console.log("Logic Server on Port 5000"));