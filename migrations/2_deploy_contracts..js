var School = artifacts.require("./School.sol");
var ReportCard = artifacts.require("./ReportCard");
module.exports = function(deployer) {
  deployer.deploy(School, 'Bay Park');
  deployer.deploy(ReportCard);
};
