const router = require("express").Router();

const serviceController = require("../controllers/serviceController");

router.route("/services")
  .post((req, res) => serviceController.create(req, res))
  .get((req, res) => serviceController.getAll(req, res));

router.route("/services/:numCartao")
  .get((req, res) => serviceController.get(req, res));

router.route("/services/:numCartao/activate")
  .put((req, res) => serviceController.activate(req, res));

router.route("/services/:numCartao/deliver")
  .put((req, res) => serviceController.deliver(req, res));

  router.route("/services/:numCartao/cancel")
  .put((req, res) => serviceController.cancel(req, res));


module.exports = router;
