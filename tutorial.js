const tutorial_container = document.getElementById('tutorial_container')
const bezaras = document.getElementById('bezaras')
const tovabb = document.getElementById('tovabb')

document.getElementById('bezaras').addEventListener('click', 
function() {
    document.getElementById('tutorial_container').remove();
});