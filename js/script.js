


// Name Section
const formName = document.getElementById('name');
formName.focus();

// Job Role Section
const jobRole = document.getElementById('title');
const other = document.getElementById('other-job-role');
other.style.display = 'none';
jobRole.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        other.style.display = '';
    }
    else {
        other.style.display = 'none';
    }
});

// Tshirt Info Section
const design = document.getElementById('design');
const colors = document.getElementById('color');
const clrOption = colors.children;
colors.disabled = true;
design.addEventListener('change', (e) => {
    colors.disabled = false;
    for (option of clrOption) {
        const val = e.target.value;
        const dta = option.getAttribute('data-theme');
        if (val === dta) {
            option.hidden = false;
            option.selected = true;
        } else {
            option.hidden = true;
            option.selected = false;
        }
    }
});


// Register for Activities Section
const actv = document.getElementById('activities');
const cost = document.getElementById('activities-cost');
let total = 0;
actv.addEventListener('change', (e) => {
    const dtaCost = +(e.target.getAttribute('data-cost'));
    if (e.target.checked == true) {
        total +=dtaCost;
    } else {
        total -=dtaCost;
    }
    cost.innerHTML = `Total: \$${total}`;
});


// Payment Info Section
const method = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.style.display = 'none';
bitcoin.style.display = 'none';
method.children[1].setAttribute('selected', 'true');
method.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'paypal') {
        paypal.style.display = '';
        bitcoin.style.display = 'none';
        credit.style.display = 'none';
    } else if (val === 'bitcoin') {
        paypal.style.display = 'none';
        bitcoin.style.display = '';
        credit.style.display = 'none';
    } else {
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
        credit.style.display = '';
    }
});


// Form validation
const email = document.getElementById('email');
const ccNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    testName(formName, e);
    testEmail(email, e);
    testActivity(actv, e);
    if (method.value === 'credit-card') {
        testNum(ccNum, e);
        testZip(zip, e);
        testCvv(cvv, e);
    }
});


// Accessibility
const checks = actv.querySelectorAll('input[type="checkbox"]');
checks.forEach(check => {
    const parent = check.parentElement;
    check.addEventListener('focus', (e) => {
        parent.classList.add('focus');
    });
    check.addEventListener('blur', (e) => {
        parent.classList.remove('focus');
    });
});






// Helper functions

// Helper function 'IF' invalid input
function testIf(element, ev) {
    const parent = element.parentElement;
    ev.preventDefault();
    parent.classList.add('not-valid');
    parent.classList.remove('valid');
    parent.lastElementChild.style.display = 'block';
}

// Helper function for valid input
function testElse(element, ev) {
    const parent = element.parentElement;
    parent.classList.add('valid');
    parent.classList.remove('not-valid');
    parent.lastElementChild.style.display = 'none';
}

// Vlidate name field
function testName(element, ev) {
    const nwElement = element.value;
    if (nwElement.trim() === '') {
        testIf(element, ev);
    } else {
        testElse(element, ev);
    }
}

// Vlidate email field
function testEmail(element, ev) {
    const nwElement = element.value;
    const tst = (/^\S+@\S+\.\S+$/).test(nwElement);
    if (!tst) {
        testIf(element, ev);
    } else {
        testElse(element, ev);
    }
}

// Vlidate activity field
function testActivity(element, ev) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let count = 0;
    for (box of checkboxes) {
        if (box.checked) {
            count++;
        }
    }
    if (!count) {
        ev.preventDefault();
        element.classList.add('not-valid');
        element.classList.remove('valid');
        element.lastElementChild.style.display = 'block';
    } else {
        element.classList.add('valid');
        element.classList.remove('not-valid');
        element.lastElementChild.style.display = 'none';
    }
}

// Vlidate card number field
function testNum(element, ev) {
    const nwElement = element.value;
    const tst = (/\d{13,16}/).test(nwElement);
    if (!tst) {
        testIf(element, ev);
    } else {
        testElse(element, ev);
    }
}

// Vlidate zipcode field
function testZip(element, ev) {
    const nwElement = element.value;
    const tst = (/\d{5}/).test(nwElement);
    if (!tst) {
        testIf(element, ev);
    } else {
        testElse(element, ev);
    }
}

// Vlidate cvv field
function testCvv(element, ev) {
    const nwElement = element.value;
    const tst = (/\d{3}/).test(nwElement);
    if (!tst) {
        testIf(element, ev);
    } else {
        testElse(element, ev);
    }
}

