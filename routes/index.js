"use strict";

const router = require("express").Router(),
  userRoutes = require("./userRoutes"),
  homeRoutes = require("./homeRoutes"),
  errorRoutes = require("./errorRoutes"),
  petRoutes = require("./petRoutes"),
  newsRoutes = require("./newsRoutes"),
  discussionRoutes = require("./discussionRoutes"),
  eventRoutes = require("./eventRoutes");

router.use("/users", userRoutes);
router.use("/pets", petRoutes);
router.use("/events", eventRoutes);
router.use("/news", newsRoutes);
router.use("/discussions", discussionRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

module.exports = router;
