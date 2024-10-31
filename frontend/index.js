document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5050/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
});

const registerBtn = document.querySelector('#register-btn');
const signInBtn = document.querySelector('#signin-btn');
const searchSection = document.getElementById('search-functions');
const userTable = document.getElementById('user-table');

function showSearchSection() {
    searchSection.hidden = false;
}
function showUserTable() {
    userTable.hidden = false;
}

registerBtn.addEventListener('click', () => {
    const firstname = document.querySelector('#register-firstname').value;
    const lastname = document.querySelector('#register-lastname').value;
    const username = document.querySelector('#register-username').value;
    const password = document.querySelector('#register-password').value;
    const age = document.querySelector('#register-age').value;
    const salary = document.querySelector('#register-salary').value;

    fetch('http://localhost:5050/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, username, password, age, salary })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User Registered!');
                showSearchSection();
                showUserTable()
            }
        });
});

signInBtn.addEventListener('click', () => {
    const username = document.querySelector('#signin-username').value;
    const password = document.querySelector('#signin-password').value;

    fetch('http://localhost:5050/signin', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User Signed In Successfully!');
                showSearchSection();
                showUserTable()
            } else {
                alert('Sign-In Failed!');
            }
        });
});

const searchBtns = {
    name: document.querySelector('#search-name-btn'),
    userId: document.querySelector('#search-userid-btn'),
    salary: document.querySelector('#search-salary-btn'),
    age: document.querySelector('#search-age-btn'),
    afterUser: document.querySelector('#search-after-btn'),
    neverSignedIn: document.querySelector('#search-never-signedin-btn'),
    sameDay: document.querySelector('#search-same-day-btn'),
    today: document.querySelector('#search-today-btn')
};

searchBtns.name.addEventListener('click', () => search('name'));
searchBtns.userId.addEventListener('click', () => search('userId'));
searchBtns.salary.addEventListener('click', () => search('salary'));
searchBtns.age.addEventListener('click', () => search('age'));
searchBtns.afterUser.addEventListener('click', () => search('afterUser'));
searchBtns.neverSignedIn.addEventListener('click', () => search('neverSignedIn'));
searchBtns.sameDay.addEventListener('click', () => search('sameDay'));
searchBtns.today.addEventListener('click', () => search('today'));

function search(type) {
    let url = 'http://localhost:5050/search/';
    switch(type) {
        case 'name':
            const firstname = document.querySelector('#search-firstname').value;
            const lastname = document.querySelector('#search-lastname').value;
            url += `ByName/${firstname}/${lastname}`;
            break;

        case 'userId':
            const userId = document.querySelector('#search-userid').value;
            url += `ByUserId/${userId}`;
            break;

        case 'salary':
            const minSalary = document.querySelector('#search-min-salary').value;
            const maxSalary = document.querySelector('#search-max-salary').value;
            url += `BySalary/${minSalary}/${maxSalary}`;
            break;

        case 'age':
            const minAge = document.querySelector('#search-min-age').value;
            const maxAge = document.querySelector('#search-max-age').value;
            url += `ByAge/${minAge}/${maxAge}`;
            break;

        case 'afterUser':
            const afterUserId = document.querySelector('#search-after-user').value;
            url += `AfterUser?afterUserId=${afterUserId}`;
            break;

        case 'neverSignedIn':
            url += 'neverSignedIn';
            break;

        case 'sameDay':
            const sameDayUserId = document.querySelector('#search-same-day-user').value;
            url += `sameDay/${sameDayUserId}`;
            break;

        case 'today':
            url += 'today';
            break;
    }

    fetch(url)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function loadHTMLTable(data) {
    const table = document.querySelector('#user-table tbody');
    let tableHtml = '';

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    data.forEach(({ id, username, age, salary, registerday, last_signin }) => {
        tableHtml += `<tr>
            <td>${id}</td>
            <td>${username}</td>
            <td>${age}</td>
            <td>${salary}</td>
            <td>${new Date(registerday).toLocaleString()}</td>
            <td>${last_signin ? new Date(last_signin).toLocaleString() : 'Never'}</td>
        </tr>`;
    });

    table.innerHTML = tableHtml;
}
