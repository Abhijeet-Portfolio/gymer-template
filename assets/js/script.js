/* Author: 

*/

//hamburger
var hamburger = document.querySelector('.head li:last-child span');
var head = document.querySelector('.head');

function hamburgerToggle(hamburger, head) {
    hamburger.addEventListener('click', function () {
        head.classList.toggle('show');
    });
}

hamburgerToggle(hamburger, head);

//counter
var counters = document.querySelectorAll('.counter span:first-child');
var speed = 250;

function count(counters, speed) {

    counters.forEach(counter => {
        var updateCount = () => {
            counter.innerText = 0;
            var target = +counter.getAttribute('data-target');
            var showCount = +counter.getAttribute('data-current');
            var inc = target / speed;

            if (showCount < target) {
                counter.setAttribute('data-current', (showCount + inc));
                counter.innerText = Math.ceil(showCount + inc);
                setTimeout(updateCount, 10);
            }
            else {
                counter.innerText = target;
            }
        }
        updateCount();
    });
}

window.addEventListener('scroll', function () {
    if (window.scrollY >= 250) {
        count(counters, speed);
    }
});

// image-slider
var sliderImage = document.querySelector('.classes .slider');
var left = document.querySelector('.classes .slider-control li:first-child');
left.addEventListener('click', leftSide);

function leftSide() {
    if (left.className != 'active') {
        document.querySelector('.slider-control .active').classList.remove('active');
        left.classList.add('active');
        sliderImage.classList.replace('right', 'left');
    }
}

var right = document.querySelector('.classes .slider-control li:last-child');
right.addEventListener('click', rightSide);

function rightSide() {
    if (right.className != 'active') {
        document.querySelector('.slider-control .active').classList.remove('active');
        right.classList.add('active');
        sliderImage.classList.replace('left', 'right');
    }
}
setInterval(rightSide,4000);
setInterval(leftSide,8000);
//days 

var days = document.querySelectorAll('.days li');
var table = document.querySelector('.table');

function selectDay(days, table) {
    days.forEach(function (day) {
        day.addEventListener('click', function (e) {
            document.querySelector('.days li.active').classList.remove('active');
            e.target.classList.add('active');
            var getDay = e.target.getAttribute('data-name');
            schedule(getDay, table);
        });
    });
}

selectDay(days, table);

//schedule table

function schedule(getDay, table) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gabhijeetaxioned.github.io/json/schedule.json', true);
    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        setTable(data[getDay]);
    }
    xhr.send();

    function setTable(info) {
        for (var i = 0; i < table.children.length; i++) {
            var row = table.children[i].children;
            for (var j = 0; j < row.length; j++) {
                var cell = row[j].children;
                cell[0].innerText = info[i].name;
                cell[1].innerText = info[i].time;
                cell[2].innerText = info[i].trainer;
            }
        }
    }

}

