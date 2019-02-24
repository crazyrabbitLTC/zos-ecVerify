const ecVerify = artifacts.require("ecVerify");
const EthCrypto = require("eth-crypto");

contract("ecVerify", accounts => {
  xit("Should pass this test", async () => {
    console.log(ecVerify);
    assert.equal(1, 1, "simple test passed");
  });

  it("Should return the signing address", async () => {
    const signerIdentity = EthCrypto.createIdentity();
    const message = EthCrypto.hash.keccak256([
      { type: "uint256", value: "5" },
      { type: "string", value: "Banana" }
    ]);
    const signature = EthCrypto.sign(signerIdentity.privateKey, message);

    const exVerifyInstance = await ecVerify.deployed();
    const address = await exVerifyInstance.recoverSigner(message, signature);
    assert.equal(address, signerIdentity.address, "Address returned");
  });
});
