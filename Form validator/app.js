console.log("loading...");

const name = document.getElementById('name'),
      email = document.getElementById('email'),
      password = document.getElementById('password'),
      repass = document.getElementById('repass');
      contact = document.getElementById('number');

      

name.addEventListener('blur', Fname);
email.addEventListener('blur', Femail);
password.addEventListener('blur', Fpass);
repass.addEventListener('blur', Frepass);
contact.addEventListener('blur', Fcontact);

function Fname(e){
    const re = /^[a-zA-Z_]/i;
    const val = name.value

    if(!re.test(val)){
        name.classList.add('is-invalid');
    }else {
        name.classList.remove('is-invalid');
    }
}

function Femail(e){
    const re = /^([a-zA-Z_]+)@([a-zA-Z]+){3,4}\.([a-zA-Z])/;
    const val = email.value

    if(!re.test(val)){
        email.classList.add('is-invalid');
    }else {
        email.classList.remove('is-invalid');
    }
}

function Fcontact(e){
    const re = /([0-9]+){10}/;
    const val = contact.value;

    if(!re.test(val)){
        contact.classList.add('is-invalid');
    }else {
        contact.classList.remove('is-invalid');
    }
}

function Fpass(e){
    const re = /^([a-zA-Z_]+){2,}([0-9]+)/;
    const val = password.value

    if(!re.test(val)){
        password.classList.add('is-invalid');
    }else {
        password.classList.remove('is-invalid');
    }
}

function Frepass(e){
    if(password.value == repass.value){
        repass.classList.remove('is-invalid');
    }else {
        repass.classList.add('is-invalid');
    }

}

