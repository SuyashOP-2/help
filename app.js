const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const port = process.env.PORT || 5000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// order summary section
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/order-summary.html');
});  

// customer details section 
app.post('/customer-details', (req, res) => {
    res.sendFile(__dirname + '/public/customer-details.html');
    
}); 

// payment section
app.post('/payment', (req, res) => {
    // Dummy logic to simulate payment processing
    const error = false; // Set to true to simulate payment failure
    if (error) {
        req.flash('error', 'Payment Failed!');
        res.redirect('/payment');
    } else {
        req.flash('success', 'Payment Successful!');
        res.redirect('/payment');
    }
});

// Payment page with success/failure message popup
app.get('/payment', (req, res) => {
  const success = req.flash('success')[0];
  const error = req.flash('error')[0];
  const message = success || error;
  const messageType = success ? 'success' : 'error';
  res.sendFile(__dirname + '/public/payment.html', { message, messageType });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
