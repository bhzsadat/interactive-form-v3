


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


// Helper functions
function testName(element, ev) {
    const nwElement = element.value;
    const tst = (/\w+/i).test(nwElement);
    if (!tst) {
        ev.preventDefault();
    }
}

function testEmail(element, ev) {
    const nwElement = element.value;
    const tst = (/^\S+@\S+\.\S+$/).test(nwElement);
    if (!tst) {
        ev.preventDefault();
    }
}

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
    }
}

function testNum(element, ev) {
    const nwElement = element.value;
    const tst = (/\d{13,16}/).test(nwElement);
    if (!tst) {
        ev.preventDefault();
    }
}

function testZip(element, ev) {
    const nwElement = element.value;
    const tst = (/\d{5}/).test(nwElement);
    if (!tst) {
        ev.preventDefault();
    }
}

function testCvv(element, ev) {
    const nwElement = element.value;
    const tst = (/\d{3}/).test(nwElement);
    if (!tst) {
        ev.preventDefault();
    }
}

