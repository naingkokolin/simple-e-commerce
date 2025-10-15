const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.get('/orders');