import {secp256k1} from '@noble/curves/secp256k1';
import * as utils from '@noble/curves/abstract/utils';
import {sha256} from '@noble/hashes/sha256';

const buttonKeys = document.getElementById('btnKeys');

buttonKeys.addEventListener(
    "click",
    (event) => {
        event.preventDefault();
        generateKeys();
    },
    false
);

function generateKeys() {
    const key = secp256k1.utils.randomPrivateKey();
    const pub = secp256k1.getPublicKey(key);

    const privKey = document.createElement('p');
    privKey.innerHTML = `Clave Privada: ${utils.bytesToHex(key)}`;

    const pubKey = document.createElement('p');
    pubKey.setAttribute('class', 'mt-4');
    pubKey.innerHTML = `Clave Pública: ${utils.bytesToHex(pub)}`;

    const result = document.getElementById('keys');
    result.innerHTML = '';
    result.appendChild(privKey);
    result.appendChild(pubKey);
}

const form = document.forms.namedItem("verifyForm");

form.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const formProps = Object.fromEntries(formData);
        verify(formProps.signature, formProps.msg, formProps.pub);
    },
    false
);

function verify(signature, msg, pub) {
    const signRecovered = secp256k1.Signature.fromCompact(signature);
    const hash = sha256(msg);
    const verified = secp256k1.verify(signRecovered, hash, pub) === true;

    let text = 'El mensaje es autentico.';

    if (!verified) {
        text = 'El mensaje no es autentico.';
    }


    const newContent = document.createTextNode(text);
    const result = document.getElementById('result');
    result.innerHTML = '';
    result.appendChild(newContent);
}

const encryptForm = document.forms.namedItem("encryptForm");

encryptForm.addEventListener(
    "submit",
    (event) => {
        event.preventDefault();
        const formData = new FormData(encryptForm);
        const formProps = Object.fromEntries(formData);
        encrypt(formProps.priv, formProps.msg);
    },
    false
);

function encrypt(priv, msg) {
    const sha256Msg = sha256(msg);
    const key = utils.hexToBytes(priv);
    const sig = secp256k1.sign(sha256Msg, key);
    const sigHEX = sig.toCompactHex();

    const sign = document.createElement('p');
    sign.setAttribute('class', 'mt-4');
    sign.innerHTML = `Firma: ${sigHEX}`;

    const result = document.getElementById('data');
    result.innerHTML = '';
    result.appendChild(sign);
}
