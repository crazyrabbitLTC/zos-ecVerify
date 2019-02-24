const ecVerify = artifacts.require("ecVerify");
const EthCrypto = require("eth-crypto");

contract("ecVerify", accounts => {
  it("Should return the correct signing address", async () => {
    const signerIdentity = EthCrypto.createIdentity();
    const message = EthCrypto.hash.keccak256([
      { type: "uint256", value: "5" },
      { type: "string", value: "Banana" }
    ]);
    const signature = EthCrypto.sign(signerIdentity.privateKey, message);

    const ecVerifyInstance = await ecVerify.deployed();
    const address = await ecVerifyInstance.recoverSigner(message, signature);
    assert.equal(address, signerIdentity.address, "Address returned");
  });

  it("Should return true when the correct address is passed.", async () => {
    const signerIdentity = EthCrypto.createIdentity();
    const message = EthCrypto.hash.keccak256([
      { type: "uint256", value: "5" },
      { type: "string", value: "Banana" }
    ]);
    const signature = EthCrypto.sign(signerIdentity.privateKey, message);

    const ecVerifyInstance = await ecVerify.deployed();
    const returnValue = await ecVerifyInstance.validateSignature(
      message,
      signature,
      signerIdentity.address
    );
    assert.equal(true, returnValue);
  });

  it("Should return false when the incorrect address is passed.", async () => {
    const signerIdentity = EthCrypto.createIdentity();
    const secondIdentity = EthCrypto.createIdentity();
    const message = EthCrypto.hash.keccak256([
      { type: "uint256", value: "5" },
      { type: "string", value: "Banana" }
    ]);
    const signature = EthCrypto.sign(signerIdentity.privateKey, message);

    const ecVerifyInstance = await ecVerify.deployed();
    const returnValue = await ecVerifyInstance.validateSignature(
      message,
      signature,
      secondIdentity.address
    );
    assert.equal(false, returnValue);
  });
});
