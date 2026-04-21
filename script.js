function openPlanner(){
  document.querySelectorAll('.page-view').forEach(p=>p.classList.remove('is-active'));
  document.getElementById('planner-view').classList.add('is-active');
}
