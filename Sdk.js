import CryptoJS from "crypto-js";
// import {StellarHDWallet} from "stellar-hd-wallet";
import {Base64, encode, decode } from 'js-base64';
import {Buffer} from 'buffer';
global.Buffer = Buffer;
const Web3 = require("web3");
const crypto=require("crypto-browserify");
const StellarHDWallet=require("stellar-hd-wallet");
const ethers=require("ethers");
const hdWallet = require('tron-wallet-hd');
const bip39=require("bip39");
const bs58 = require('bs58');
const nacl=require("tweetnacl");
const solanaWeb3 = require('@solana/web3.js');
const {Keypair} = require("@solana/web3.js");
const { verify } = require("tweetnacl");
const { fromMnemonic, fromZPrv, fromZPub } = require('litecoin-bip84')

export function encrypt_phrase(base64_phrase,pin){
    var ciphertext = CryptoJS.AES.encrypt(atob(base64_phrase), pin).toString();
    return ciphertext;
}
export function save_phrase(ephrase){
    localStorage.setItem("phrase",ephrase)
    return "Done!";
}
export function get_phrase(pin){
    var m=localStorage.getItem("phrase");
    var bytes  = CryptoJS.AES.decrypt(m, pin);
    var phrase=bytes.toString(CryptoJS.enc.Utf8);
    return phrase;
}
export function generate_erc20(pin){
    var phrase=localStorage.getItem("phrase")
    var bytes  = CryptoJS.AES.decrypt(phrase, pin);
    var phrase=bytes.toString(CryptoJS.enc.Utf8);
    const wallet = ethers.Wallet.fromMnemonic(phrase);
    const erc20=wallet.address;
    return erc20
}
export function generate_sol(pin){
    var phrase=localStorage.getItem("phrase")
    var bytes  = CryptoJS.AES.decrypt(phrase, pin);
    var prase=bytes.toString(CryptoJS.enc.Utf8);
    // const wallet = ethers.Wallet.fromMnemonic(phrase);
    const seed = bip39.mnemonicToSeedSync(prase); 
    // const seed: Buffer bip39.mnemonicToSeedSync(prase); 
    const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    const solanaaddress=bs58.encode(keyPair.publicKey);
    return solanaaddress;
}
 export async function generate_tron(pin){
     var utils=hdWallet.utils;
     var phrase=localStorage.getItem("phrase")
    var bytes  = CryptoJS.AES.decrypt(phrase, pin);
     var prase=bytes.toString(CryptoJS.enc.Utf8);
  var sd=hdWallet.generateMnemonic();
 const tronaddress=tronaccount.address;
   
     return tronaddress;
 }
export function generate_lightcoin(pin){
    var phrase=localStorage.getItem("phrase")
    var bytes  = CryptoJS.AES.decrypt(phrase, pin);
    var prase=bytes.toString(CryptoJS.enc.Utf8);
    var root = new fromMnemonic(prase, '')
    var child0 = root.deriveAccount(0) 
    var account0 = new fromZPrv(child0)
    return account0.getAccountPublicKey();
}
export function generate_stellar(pin){
    var phrase=localStorage.getItem("phrase")
    var bytes  = CryptoJS.AES.decrypt(phrase, pin);
    var prase=bytes.toString(CryptoJS.enc.Utf8);
    const wlt = StellarHDWallet.fromMnemonic(prase)
    return wlt.getPublicKey(0);
}
