"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  homeRoutes = require("./homeRoutes"),
  errorRoutes = require("./errorRoutes"),
  petRoutes = require("./petRoutes"),
  eventRoutes = require("./eventRoutes"),
  discussionRoutes = require("./discussionRoutes");

router.use("/users", userRoutes);
router.use("/pets", petRoutes);
router.use("/events", eventRoutes);
router.use("/discussions", discussionRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
