pragma solidity ^0.5.0;

/**
 * @title Elliptic curve signature recovery EVM Package
 * @dev Based on https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/cryptography/ECDSA.sol
 * @dev Based on https://github.com/pubkey/eth-crypto
 * @dev Adapted by: Dennison Bertram, dennison@dennisonbertram.com, dennison@zeppelin.solutions
 * Easily verify a message was signed by a particlar key, or recover the signing address. 
 */

contract ecVerify {

    //Public Methods

    //Takes the hash of a message (_message), the signed message (_sig) and the address (_address) expected
    //to have signed the message. If the message expected to have signed the messsage matches
    //the supplied (_address), function returns true. Otherwise, returns false. 
    function validateSignature(bytes32 _message, bytes memory _sig, address _address) public pure returns(bool){
        return (_recoverSigner(_message, _sig) == _address);
    }
    
    //Takes the hash of a message (_message), the signed message (_sig) and returns the public key
    //of the signing address. 
     function recoverSigner(bytes32 _message, bytes memory _sig) public pure returns (address){
        return _recoverSigner(_message,_sig);
    }
    
    //Internal Methods
    function _recoverSigner(bytes32 _message, bytes memory _sig)
        internal
        pure
        returns (address)
    {
        uint8 v;
        bytes32 r;
        bytes32 s;

        (v, r, s) = _splitSignature(_sig);

        return ecrecover(_message, v, r, s);
    }
    
    function _splitSignature(bytes memory _sig)
        internal 
        pure
        returns (uint8, bytes32, bytes32)
    {
        require(_sig.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
            // first 32 bytes, after the length prefix
            r := mload(add(_sig, 32))
            // second 32 bytes
            s := mload(add(_sig, 64))
            // final byte (first byte of the next 32 bytes)
            v := byte(0, mload(add(_sig, 96)))
        }

        return (v, r, s);
    }
    
    
}