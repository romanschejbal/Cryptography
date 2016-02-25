var Identity = function(){
  this.privateKey = null;
  this.publicKey = null;
  this.modulus = null;
};

/**
 * Calculates the modulus and private and public keys, and stores them on the
 * Identity.
 *
 * @param {number} p the first of two distinct primes
 * @param {number} q the second prime
 *
 * @sideeffect sets this.modulus, this.publicKey, and this.privateKey on the
 *     Identity instance
 */
Identity.prototype.generateKeyPair = function(p, q) {
  var n = p * q;
  this.modulus = n;
  var comprimeN = findCoprime(n);
  var totientN = (p - 1) * (q - 1);
  var e = findCoprime(totientN);
  this.publicKey = e >= 3 ? e : 3;
  this.privateKey = calculateModInverse(this.publicKey, totientN);
};

/**
 * Given a message, generates and returns the sender's signature. A signature
 * is a messsage encrypted using an Identity's private key to verify that they
 * sent the message.
 *
 * @param {string} text the message to sign
 * @return {string} the signature
 */
Identity.prototype.signMessage = function(text){
  return encryptMessage(text, this.privateKey, this.modulus);
};

/**
 * Given plaintext and a recipient Identity, generates ciphertext and signature.
 * Hint: in this case, the signature is simply the ciphertext encrypted with the
 * sender's private key.
 *
 * @param {string} plaintext the message to be encrypted and sent
 * @param {Object} recipient an Identity object
 * @return {Object} an object with signature, ciphertext, and sender properties
 */
Identity.prototype.sendMessage = function(plaintext, recipient){
  const signature = this.signMessage(plaintext);
  const ciphertext = encryptMessage(plaintext, recipient.publicKey, recipient.modulus);
  recipient.receiveMessage(
    ciphertext,
    signature,
    this
  );

  return {
    signature: signature,
    ciphertext: ciphertext,
    sender: this
  };
};

/**
 * Given the ciphertext, signature, and sender, receiveMessage should determine
 * the integrity of the message and selectively read and return the content.
 *
 * @param {string} ciphertext the encrypted message
 * @param {string} signature the signed message
 * @param {Object} sender an Identity object
 * @return {string} the plaintext
 */
Identity.prototype.receiveMessage = function(ciphertext, signature, sender){
  const decrypted = decryptMessage(ciphertext, this.privateKey, this.modulus);
  if (!confirmAuthenticity(decrypted, signature, sender.publicKey, sender.modulus)) {
    return 'Identity not authenticated';
  }
  return decrypted;
};

/**
 * Turns plaintext into ciphertext.
 *
 * @param {string} plaintext the message to encrypt
 * @param {number} key the key (public or private) with which to encrypt
 * @param {number} modulus the modulus for modular arithmetic calculations
 * @return {string} the ciphertext
 */
var encryptMessage = function(plaintext, key, modulus){
  const numbers = plaintext.split('').map(letterToNumber);
  const encrypted = numbers.map(number => {
    return Math.pow(number, key) % modulus;
  });
  return encrypted.map(numberToLetter).join('');
};

/**
 * Turns ciphertext into plaintext.
 *
 * @param {string} ciphertext the encrypted message to decrypt
 * @param {number} key the key (public or private) with which to decrypt
 * @param {number} modulus the modulus for modular arithmetic calculations
 * @return {string} the plaintext
 */
var decryptMessage = function(ciphertext, key, modulus){
  return encryptMessage(ciphertext, key, modulus);
};

/**
 * Checks that a signature is valid.
 *
 * @param {string} text the plaintext to check the decrypted signature against
 * @param {string} signature the claimed encryption of the plaintext with the
 *     key in question
 * @param {number} key the public key of the sender
 * @param {[type]} modulus the modulus for modular arithmetic calculations
 * @return {boolean} whether or not the decrypted text matches the signature
 */
var confirmAuthenticity = function(text, signature, key, modulus){
  return text === decryptMessage(signature, key, modulus);
};

/*******************************************/
// It's dangerous to go alone!  Take these!//
//           HELPER FUNCTIONS              //
//           (do not modify)               //
/*******************************************/
var letterToNumber = function(letter){
  return letters.indexOf(letter);
};

var numberToLetter = function(number){
  if(number >= letters.length){
    number = number % letters.length; // TODO
  } else {
  }
  return letters[number];
};
var findCoprime = function(number){
  for(var i = 2; i < number; i++){
    if( determineIfCoprime(i, number) ){
      return i;
    }
  }
};

/*******************************************/
//        HELPER HELPER FUNCTIONS          //
//        (you won't use these)            //
//           (do not modify)               //
/*******************************************/
var determineIfCoprime = function(a, b){
  var factorsa = factor(a);
  var factorsb = factor(b);
  delete factorsa[1];
  delete factorsb[1];
  var smaller = Object.keys(factorsa) < Object.keys(factorsb) ? factorsa : factorsb;
  var larger = Object.keys(factorsa) < Object.keys(factorsb) ? factorsb : factorsa;
  for(var value in smaller){
    if(value in larger) return false;
  }
  return true;
};

var factor = function(number){
  var primes = {};
  for(var i = 0; i <= Math.sqrt(number); i++){
    if(number % i === 0){
      primes[i] = true;
      primes[number / i] = true;
    }
  }
  primes[number] = true;
  return primes;
};

calculateModInverse = function(number, mod){
  for(var i = 1; i < mod; i++){
    if(number * i % mod === 1) return i
  }
};

var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
var extendedLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']'];
var letters = validLetters.concat(extendedLetters)
