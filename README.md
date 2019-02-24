# zos-ecVerify
An EVM package for verifying signed messages on ethereum

## Usage

Contract can be used as an EVM package, or inherited as part of another contract. 

`validateSignature(bytes32 _message, bytes memory _sig, address _address)`

Given three arguments, the hash of a message (_message), the signed version of that message (_sig) and an address (address) it will return `true` if the given address has signed the message, `false` if not and revert if there is an error. 

`recoverSigner(bytes32 _message, bytes memory _sig)`

Given two arguments, the hash of a message (_message) and the signed version of that message (_sig) it will return the public address corresponding to the private key with which the message (_message) was signed. 

Based on https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/cryptography/ECDSA.sol

Based on https://github.com/pubkey/eth-crypto

Adapted by: Dennison Bertram, dennison@dennisonbertram.com, dennison@zeppelin.solutions
