//: chỉ chạy code JS sau khi toàn bộ cây DOM (HTML) đã được tải xong
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");
    const clearAllBtn = document.getElementById("clearAllBtn");

    function updateTaskCount() {
        const count = taskList.children.length;
        taskCount.textContent = `You have ${count} pending task${count !== 1 ? "s" : ""}.`;
    }

    // updateTaskCount();


    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        // Tạo một phần tử <li> (mỗi task là một <li> trong <ul>)
        const li = document.createElement("li");

        // Tạo một <span> để chứa nội dung task
        const span = document.createElement("span");
        span.textContent = taskText; // gán text người dùng nhập vào

        // nút xóa
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'; // icon thùng rác


        // deleteBtn.textContent = "Xóa";
        deleteBtn.style.marginLeft = "10px"; // cách nội dung 10px cho 
        deleteBtn.classList.add("delete-btn"); /// thêm class để style bằng CSS

        // Gắn sự kiện click cho nút xóa
        deleteBtn.addEventListener("click", () => {
            li.remove(); // khi click, xóa chính <li> này khỏi danh sách
            updateTaskCount();
        });

        // Đưa <span> (nội dung task) và nút Xóa vào bên trong <li>
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Đưa <li> này vào danh sách <ul id="taskList">
        taskList.appendChild(li);

        // Xóa nội dung trong ô input để chuẩn bị nhập task mới
        taskInput.value = "";
        updateTaskCount();
    }


    // Sự kiện
    addBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addTask();
    });

    clearAllBtn.addEventListener("click", () => {
        taskList.innerHTML = "";
        updateTaskCount();
    });

});
