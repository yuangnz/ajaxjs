var editingId = null;

document.getElementById('activity-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var activities = JSON.parse(localStorage.getItem('activities')) || [];

    if (editingId) {

        var activity = activities.find(activity => activity.id === editingId);
        activity.name = document.getElementById('name').value;
        activity.days = document.getElementById('days').value;
        activity.startDate = document.getElementById('start-date').value;
        activity.endDate = document.getElementById('end-date').value;
        activity.responsible = document.getElementById('responsible').value;
        editingId = null;
    } else {

        var newActivity = {
            id: activities.length > 0 ? activities[activities.length - 1].id + 1 : 1,
            name: document.getElementById('name').value,
            days: document.getElementById('days').value,
            startDate: document.getElementById('start-date').value,
            endDate: document.getElementById('end-date').value,
            responsible: document.getElementById('responsible').value,
        };
        activities.push(newActivity);
    }

    localStorage.setItem('activities', JSON.stringify(activities));

    loadActivities();
    document.getElementById('activity-form').reset();
});

document.getElementById('activity-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        var id = parseInt(e.target.getAttribute('data-id'));

        var activities = JSON.parse(localStorage.getItem('activities')) || [];
        activities = activities.filter(activity => activity.id !== id);
        localStorage.setItem('activities', JSON.stringify(activities));

        loadActivities();
    }

    if (e.target.classList.contains('edit')) {
        var id = parseInt(e.target.getAttribute('data-id'));
        var activity = JSON.parse(localStorage.getItem('activities')).find(activity => activity.id === id);

        document.getElementById('name').value = activity.name;
        document.getElementById('days').value = activity.days;
        document.getElementById('start-date').value = activity.startDate;
        document.getElementById('end-date').value = activity.endDate;
        document.getElementById('responsible').value = activity.responsible;

        editingId = id;
    }
});

function loadActivities() {
    var activities = JSON.parse(localStorage.getItem('activities')) || [];
    var activityList = document.getElementById('activity-list');


    activityList.innerHTML = '';


    activities.forEach(function(activity) {
        var row = document.createElement('tr');

        row.innerHTML = `
            <td>${activity.name}</td>
            <td>${activity.days}</td>
            <td>${activity.startDate}</td>
            <td>${activity.endDate}</td>
            <td>${activity.responsible}</td>
            <td>
                <button class="delete" data-id="${activity.id}">Eliminar</button>
                <button class="edit" data-id="${activity.id}">Editar</button>
            </td>
        `;

        activityList.appendChild(row);
    });
}