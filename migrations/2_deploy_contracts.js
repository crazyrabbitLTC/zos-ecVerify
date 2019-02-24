const ecVerify = artifacts.require("ecVerify");


module.exports = function(deployer) {
  deployer.deploy(ecVerify);
};
