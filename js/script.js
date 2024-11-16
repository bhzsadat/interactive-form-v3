


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