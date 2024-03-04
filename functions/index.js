/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express")
const cors = require("cors");
const { responsiveFontSizes } = require('@mui/material');

const stripe = require("stripe")('sk_test_51Mu3hdDjKwlXRlnq3jEC0J32dARE3Vgx6gACDmSKJo68GfsjUHJnUP5FZ2Ko2DhVVhFxFSkMBZiZQcAdrbHBUqTs00FnTO139z')

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"))
app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log("Payment received BOOM!!! for this amound >>> ",total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})


// - Listen command
exports.api = functions.https.onRequest(app)

//Example endpoint
//http://127.0.0.1:5001/db-33fb1/us-central1/api