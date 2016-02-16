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
Identity.prototype.generateKeyPair = function(p, q){

};

/**
 * Given a message, generates and returns the sender's signature.
 *
 * @param {string} text
 * @return {}
 */
Identity.prototype.signMessage = function(text){

};

/**
 * Given plaintext and a recipient, sendMessage should follow all the necessary protocols for it to be securely sent, and then send the message */
  /* (Hint: look at receiveMessage)
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
Identity.prototype.sendMessage = function(plaintext, recipient){

};

/**
 * Given the ciphertext, signature, and sender, receiveMessage should determine
 * the integrity of the message and selectively read and return the content.
 * @param  {[type]} ciphertext [description]
 * @param  {[type]} signature  [description]
 * @param  {[type]} sender     [description]
 * @return {[type]}            [description]
 */
Identity.prototype.receiveMessage = function(ciphertext, signature, sender){

};

/**
 * Should turn plaintext into ciphertext according to the RSA protocol and
 * return it
 * @param  {[type]} plaintext [description]
 * @param  {[type]} key       [description]
 * @param  {[type]} modulus   [description]
 * @return {[type]}           [description]
 */
var encryptMessage = function(plaintext, key, modulus){

};

/**
 * Should turn ciphertext into plaintext according to the RSA protocol and
 * return it
 * @param  {[type]} ciphertext [description]
 * @param  {[type]} key        [description]
 * @param  {[type]} modulus    [description]
 * @return {[type]}            [description]
 */
var decryptMessage = function(ciphertext, key, modulus){

};

/**
 * Should confirm that the sender is who they claim to be
 * @param  {[type]} text      [description]
 * @param  {[type]} signature [description]
 * @param  {[type]} key       [description]
 * @param  {[type]} modulus   [description]
 * @return {boolean}           [description]
 */
var confirmAuthenticity = function(text, signature, key, modulus){

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
      return i
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
    if(value in larger) return false
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
  primes[number] = true
  return primes
};

calculateModInverse = function(number, mod){
  for(var i = 1; i < mod; i++){
    if(number * i % mod === 1) return i
  }
};

var validLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
var extendedLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']'];
var letters = validLetters.concat(extendedLetters)
