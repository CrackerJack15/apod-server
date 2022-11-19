const express = require("express");
const { query, param } = require("express-validator");
const router = express.Router();

// Controllers
const archiveController = require("../controllers/archive.controller");
const dayController = require("../controllers/day.controller");
const recommendedController = require("../controllers/recommended.controller");
const calendarController = require("../controllers/calendar.controller");

router.get(
  "/archive",
  query("order")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[a-z]*$/)
    .isLength({ min: 8, max: 10 }),
  query("month")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[0-9]*$/)
    .isLength({ min: 2, max: 2 }),
  query("year")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[0-9]*$/)
    .isLength({ min: 4, max: 4 }),
  archiveController
);

router.get(
  "/calendar",
  query("month")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[0-9]*$/)
    .isLength({ min: 2, max: 2 }),
  query("year")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[0-9]*$/)
    .isLength({ min: 4, max: 4 }),
  calendarController
);

router.get(
  "/day/recommended",
  query("days.*")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[0-9-]*$/)
    .isLength({ min: 10, max: 10 }),
  recommendedController
);

router.get(
  "/day/:id",
  param("id")
    .not()
    .isEmpty()
    .isString()
    .trim()
    .matches(/^[0-9]*$/)
    .isLength({ min: 6, max: 6 }),
  dayController
);

module.exports = router;
