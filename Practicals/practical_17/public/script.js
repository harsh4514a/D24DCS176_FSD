const studentForm = document.getElementById('student-form');
const studentTableBody = document.querySelector('#student-table tbody');
const cancelEditBtn = document.getElementById('cancel-edit');

let editStudentId = null;

// Fetch and display students
async function fetchStudents() {
  const res = await fetch('/students');
  const students = await res.json();
  studentTableBody.innerHTML = '';
  students.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age || ''}</td>
      <td>${student.class || ''}</td>
      <td>${student.email || ''}</td>
      <td>
        <button class="action-btn edit-btn" data-id="${student._id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${student._id}">Delete</button>
      </td>
    `;
    studentTableBody.appendChild(tr);
  });
}

// Add or update student
studentForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(studentForm);
  const studentData = Object.fromEntries(formData.entries());

  if (editStudentId) {
    // Update student
    const res = await fetch(`/students/${editStudentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    if (res.ok) {
      resetForm();
      fetchStudents();
    } else {
      alert('Failed to update student');
    }
  } else {
    // Add student
    const res = await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    if (res.ok) {
      resetForm();
      fetchStudents();
    } else {
      alert('Failed to add student');
    }
  }
});

// Edit and Delete button handlers
studentTableBody.addEventListener('click', async (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const id = e.target.getAttribute('data-id');
    const res = await fetch(`/students/${id}`);
    if (res.ok) {
      const student = await res.json();
      editStudentId = id;
      studentForm.name.value = student.name;
      studentForm.age.value = student.age || '';
      studentForm.class.value = student.class || '';
      studentForm.email.value = student.email || '';
      cancelEditBtn.style.display = 'inline-block';
    } else {
      alert('Failed to fetch student data');
    }
  } else if (e.target.classList.contains('delete-btn')) {
    const id = e.target.getAttribute('data-id');
    if (confirm('Are you sure you want to delete this student?')) {
      const res = await fetch(`/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStudents();
      } else {
        alert('Failed to delete student');
      }
    }
  }
});

// Cancel edit
cancelEditBtn.addEventListener('click', () => {
  resetForm();
});

// Reset form
function resetForm() {
  editStudentId = null;
  studentForm.reset();
  cancelEditBtn.style.display = 'none';
}

// Initial fetch
fetchStudents();
