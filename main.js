//: chỉ chạy code JS sau khi toàn bộ cây DOM (HTML) đã được tải xong
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const taskCount = document.getElementById("taskCount");
    const clearAllBtn = document.getElementById("clearAllBtn");
    const findTask = document.getElementById("findTask");
    const findBtn = document.getElementById("findBtn");
    const searchResult = document.getElementById("searchResult");

    function updateTaskCount() {
        const count = taskList.children.length;
        taskCount.textContent = `You have ${count} pending task${count !== 1 ? "s" : ""}.`;
    }

    // updateTaskCount();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        // --- Validate không cho task trùng ---
        const existingTasks = Array.from(taskList.querySelectorAll("span")).map(span => span.textContent);
        if (existingTasks.includes(taskText)) {
            alert("Task đã tồn tại!");
            return;
        }

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

        // Reset search khi thêm task mới
        searchResult.textContent = "";
        findTask.value = "";
        taskList.querySelectorAll("li").forEach(li => li.style.display = "");


        li.draggable = true;

        li.addEventListener("dragstart", (e) => {
            li.classList.add("dragging");
            e.dataTransfer.effectAllowed = "move";
        });

        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
        });

        taskList.addEventListener("dragover", (e) => {
            e.preventDefault(); // cần để drop được
            const draggingEl = taskList.querySelector(".dragging");
            const afterElement = getDragAfterElement(taskList, e.clientY);
            if (afterElement == null) {
                taskList.appendChild(draggingEl);
            } else {
                taskList.insertBefore(draggingEl, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function searchTask() {
        const keyword = findTask.value.trim().toLowerCase();
        const tasks = taskList.querySelectorAll("li");
        let count = 0;

        if (!keyword) {
            // nếu input rỗng -> hiện tất cả task
            tasks.forEach(li => li.style.display = "");
            searchResult.textContent = "";
            return;
        }

        tasks.forEach(li => {
            const text = li.querySelector("span").textContent.toLowerCase();
            if (text.includes(keyword)) {
                li.style.display = "";
                count++;
            } else {
                li.style.display = "none";
            }
        });

        // Hiển thị kết quả
        if (count === 0) {
            searchResult.textContent = "Không tìm thấy task nào.";
        } else {
            searchResult.textContent = `Tìm thấy ${count} task.`;
        }
    }

    findBtn.addEventListener("click", searchTask);
    findTask.addEventListener("keydown", (e) => {
        if (e.key === "Enter") searchTask();
    });


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
