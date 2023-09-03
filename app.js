const addItemPopupBtn = document.querySelector("#addItemPopupBtn");
const AddItemPopupWindow = document.querySelector("#AddItemPopup");
const BlurBg = document.querySelector("#BlurBg");
const ClosePopupBtn = document.querySelectorAll(".ClosePopup");
const TaskListNameInput = document.querySelector("#TaskListNameInput");
const AddNewTaskBtn = document.querySelector("#AddNewTaskBtn");

const AddSubTaskPopupWindow = document.querySelector("#AddSubTaskPopup");
const subTaskNameInput = document.querySelector("#subTaskNameInput");
const AddNewSubTaskBtn = document.querySelector("#AddNewSubTaskBtn");

const TaskCardContainer = document.getElementById("TaskCardContainer");
const InformationMessageBox = document.querySelector(".InformationMessageBox");
const InformationMessage = document.querySelector("#InformationMessage");

const AppLogoBox = document.querySelector(".AppLogo");
const BackButton = document.querySelector("#BackButton");
const addPopupbtnText = document.querySelector(".addPopupbtnText");


let TaskCardCount = 0;
let currentSubCardContainer;
let CurrentTaskCard;
let isTaskCompleted = false;


//***********Function for adding local storage Facility***********/
function saveUserData(saveTaskName, saveSubTaskName) {
    if (localStorage.getItem(saveTaskName) === null) {

        localStorage.setItem(saveTaskName, saveSubTaskName)
    } else {
        localStorage.setItem(saveTaskName, saveSubTaskName)
    }
}


//***********Function for deleting current task from local storage***********/

function deleteUserData(CurrentTaskCard) {
    localStorage.removeItem(CurrentTaskCard);
}




// This block of code display the informatinMessageBox with some informatin text
function showInformationBox(Message) {
    InformationMessage.innerText = Message;
    InformationMessageBox.classList.add("ActiveInformationMessageBox");
}

// This block of code hide the informatinMessageBox 
function HideInformationBox() {
    InformationMessageBox.classList.remove("ActiveInformationMessageBox");
}

// This  block of code use to close the PopupWindow
ClosePopupBtn.forEach((CloseButton) => {
    CloseButton.addEventListener('click', (e) => {
        let ParentPopup = (e.target.parentNode).parentNode;
        ParentPopup.classList.remove("ActivePopup");
        ParentPopup.classList.add("UnactivePopup");
        BlurBg.style.display = "none";
        TaskListNameInput.classList.remove("ErrorNotice");
        TaskListNameInput.value = "";
        subTaskNameInput.value = "";
    })
})

// This block of code use to Open the Add Item Popup window
addItemPopupBtn.addEventListener('click', (e) => {
    AddItemPopupWindow.classList.remove("UnactivePopup");
    AddItemPopupWindow.classList.add("ActivePopup");
    BlurBg.style.display = "block";
    TaskListNameInput.focus();
})

//This Line of code show and hide the default message
function ShowHIdeDefaultMessage() {
    const DefaultText = document.getElementById("DefaultText");
    CardCount.innerText = TaskCardCount;
    if (TaskCardCount === 0) {
        DefaultText.style.display = "block"
    } else {
        DefaultText.style.display = "none"
    }
}

//*************************************** Task Card functinality Start *****************************************
// This block of code use to create the task card
function createTaskCardList(TaskName) {
    ShowHIdeDefaultMessage();

    //!Creating Element for task card
    let divTaskCard = document.createElement("div");
    let h2TaskHeading = document.createElement('h2');
    let spanPendingSUBTaskCounterLabel = document.createElement("span");
    let spanCompletedSUBTaskCounterLabel = document.createElement("span");
    let divSubTaskContainer = document.createElement("div");
    let divButtonContainer = document.createElement("div");
    let iDeleteTaskCardButton = document.createElement("i");
    let iAddSubTaskPopupBtn = document.createElement("i");

    //! Adding the predefined class for styling
    divTaskCard.classList.add("TaskCard");
    h2TaskHeading.classList.add("TaskHeading");
    spanCompletedSUBTaskCounterLabel.classList.add("CompletedSUBTaskCounterLabel", "CounterLabel");
    spanPendingSUBTaskCounterLabel.classList.add("PendingSUBTaskCounterLabel", "CounterLabel");
    divSubTaskContainer.classList.add("SubTaskContainer");
    divButtonContainer.classList.add("ButtonContainer");
    iDeleteTaskCardButton.classList.add("fa-solid", "fa-trash", "deleteTaskCardBtn", "cardCommonBtn");
    iAddSubTaskPopupBtn.classList.add("fa-solid", "fa-circle-plus", "AddSubTaskPopupBtn", "cardCommonBtn")

    //!Adding values to the element
    h2TaskHeading.innerText = TaskName;
    spanPendingSUBTaskCounterLabel.innerText = 0;
    spanCompletedSUBTaskCounterLabel.innerText = 0;



    //!Adding EventListener to element, this code delete the click card
    iDeleteTaskCardButton.addEventListener("click", (e) => {
        //*this line of code give the grand parent of the clickd button.
        let Parent = (e.target.parentNode).parentNode;
        Parent.classList.add("DeletedCard");
        setInterval(() => {
            Parent.remove();
        }, 1200);
        showInformationBox("Task Deleted Successfully.");
        setTimeout(HideInformationBox, 2000);
        deleteUserData(Parent.firstChild.innerText);
        // this line of code decrease the count of taskcard and then call the function for showing or hiding the default message
        TaskCardCount--;
        ShowHIdeDefaultMessage();

    })

    iAddSubTaskPopupBtn.addEventListener("click", (e) => {
        currentSubCardContainer = (e.target.parentNode).previousSibling;
        CurrentTaskCard = currentSubCardContainer.parentNode.firstChild;
        AddSubTaskPopupWindow.classList.remove("UnactivePopup");
        AddSubTaskPopupWindow.classList.add("ActivePopup");
        BlurBg.style.display = "block";
        subTaskNameInput.focus();
    })


    //! Appending Child to parent and Parent to grandparent
    divTaskCard.appendChild(h2TaskHeading);
    divTaskCard.appendChild(spanPendingSUBTaskCounterLabel);
    divTaskCard.appendChild(spanCompletedSUBTaskCounterLabel);
    divTaskCard.appendChild(divSubTaskContainer);
    divButtonContainer.appendChild(iDeleteTaskCardButton);
    divButtonContainer.appendChild(iAddSubTaskPopupBtn);
    divTaskCard.appendChild(divButtonContainer);

    TaskCardContainer.appendChild(divTaskCard);
}

// validate and then call the createTaskCardList function 
function addNewTaskValidation() {
    if (TaskListNameInput.value == "") {
        TaskListNameInput.classList.add("ErrorNotice");
        TaskListNameInput.focus();
    } else {
        TaskCardCount++;
        let TaskName = TaskListNameInput.value;
        TaskListNameInput.classList.remove("ErrorNotice");
        createTaskCardList(TaskName);
        showInformationBox("Task created Successfully.")
        setTimeout(HideInformationBox, 2000);
        AddItemPopupWindow.classList.remove("ActivePopup");
        AddItemPopupWindow.classList.add("UnactivePopup");
        BlurBg.style.display = "none";
        TaskListNameInput.value = "";
        TaskListNameInput.focus();
    }
}
AddNewTaskBtn.addEventListener('click', addNewTaskValidation);

TaskListNameInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addNewTaskValidation();
    }
})
//*************************************** Task Card functinality End *****************************************


//*************************************** sub task functinality start *****************************************
// This block of code use to create the sub task inside the task list card
function createSubTaskList(SubTaskName) {
    let psubTask = document.createElement("p");
    let sSubTaskMarkDoneBtn = document.createElement("span");

    //adding predefined class to element for styling
    psubTask.classList.add("subTask")
    sSubTaskMarkDoneBtn.classList.add("subTaskMarkDoneBtn")

    //Giving values to element
    sSubTaskMarkDoneBtn.innerText = "DONE";
    psubTask.innerText = SubTaskName;

    //Add event listeners
    sSubTaskMarkDoneBtn.addEventListener("click", (e) => {
        let parentSubTask = (e.target.parentNode);
        parentSubTask.classList.add("subTaskCompleted");
        let currentGrandParent = parentSubTask.parentNode.parentNode
        showInformationBox("Task Completed Successfully.")
        setTimeout(HideInformationBox, 2000);

        //! Saving task Name and subtask name on locak storage
        saveUserData(currentGrandParent.firstElementChild.innerText, currentGrandParent.innerHTML);

        //THis code increase the complete task Counter
        (parentSubTask.parentNode.previousSibling).innerText = Number((parentSubTask.parentNode.previousSibling).innerText) + 1;

        //THis code decrease the pending task Counter
        (parentSubTask.parentNode.previousSibling).previousSibling.innerText = Number(((parentSubTask.parentNode.previousSibling).previousSibling.innerText - 1));
    })

    //!appending child to parent and grand parent
    psubTask.appendChild(sSubTaskMarkDoneBtn);

    //This line of code add the sub task into current click task card
    currentSubCardContainer.appendChild(psubTask);
    (currentSubCardContainer.previousSibling).previousSibling.innerText = Number((currentSubCardContainer.previousSibling).previousSibling.innerText) + 1;

}
// validate and then call the createSubTaskList function 
function AddNewSubTaskValidation() {
    if (subTaskNameInput.value == "") {
        subTaskNameInput.classList.add("ErrorNotice");
        subTaskNameInput.focus();
    } else {
        let subTaskName = subTaskNameInput.value;
        subTaskNameInput.classList.remove("ErrorNotice");
        createSubTaskList(subTaskName);
        AddSubTaskPopupWindow.classList.remove("ActivePopup");
        AddSubTaskPopupWindow.classList.add("UnactivePopup");
        BlurBg.style.display = "none";
        showInformationBox("Task Added Successfully.");
        setTimeout(HideInformationBox, 2000);

        //! Saving task Name and subtask name on locak storage
        saveUserData(CurrentTaskCard.innerText, (CurrentTaskCard.parentNode).innerHTML);
        subTaskNameInput.value = "";
        subTaskNameInput.focus();
    }
}
AddNewSubTaskBtn.addEventListener('click', AddNewSubTaskValidation)

subTaskNameInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        AddNewSubTaskValidation();
    }
});
//*************************************** sub task functinality End *****************************************


//*************************************** Local Storage loading previous tasks *****************************************

let deleteTaskCardBtn = document.querySelectorAll(".deleteTaskCardBtn");
let AddSubTaskPopupBtn = document.querySelectorAll(".AddSubTaskPopupBtn");

// //! Load the Old task and it's sub task.
(function loadData() {
    for (let i = 0; i < localStorage.length; i++) {
        TaskCardCount++;
        ShowHIdeDefaultMessage();
        let divTaskCard = document.createElement("div");
        divTaskCard.classList.add("TaskCard");
        divTaskCard.innerHTML = localStorage.getItem(localStorage.key(i));


        // console.log(divTaskCard.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.children[0].firstElementChild);

        Array.from(divTaskCard.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.children).forEach((children) => {
            children.firstElementChild.addEventListener('click', (e) => {
                let parentSubTask = (e.target.parentNode);
                parentSubTask.classList.add("subTaskCompleted");
                let currentGrandParent = parentSubTask.parentNode.parentNode
                showInformationBox("Task Completed Successfully.")
                setTimeout(HideInformationBox, 2000);

                //! Saving task Name and subtask name on locak storage
                saveUserData(currentGrandParent.firstElementChild.innerText, currentGrandParent.innerHTML);

                //THis code increase the complete task Counter
                (parentSubTask.parentNode.previousSibling).innerText = Number((parentSubTask.parentNode.previousSibling).innerText) + 1;

                //THis code decrease the pending task Counter
                (parentSubTask.parentNode.previousSibling).previousSibling.innerText = Number(((parentSubTask.parentNode.previousSibling).previousSibling.innerText - 1));
            })
        })

        divTaskCard.lastElementChild.firstElementChild.addEventListener('click', (e) => {
            //*this line of code give the grand parent of the clickd button.
            let Parent = (e.target.parentNode).parentNode;
            Parent.classList.add("DeletedCard");
            setInterval(() => {
                Parent.remove();
            }, 1200);
            showInformationBox("Task Deleted Successfully.");
            setTimeout(HideInformationBox, 2000);
            deleteUserData(Parent.firstChild.innerText);
            // this line of code decrease the count of taskcard and then call the function for showing or hiding the default message
            TaskCardCount--;
            ShowHIdeDefaultMessage();
        })

        divTaskCard.lastElementChild.lastElementChild.addEventListener('click', (e) => {

            currentSubCardContainer = (e.target.parentNode).previousSibling;
            CurrentTaskCard = currentSubCardContainer.parentNode.firstChild;
            AddSubTaskPopupWindow.classList.remove("UnactivePopup");
            AddSubTaskPopupWindow.classList.add("ActivePopup");
            BlurBg.style.display = "block";
            subTaskNameInput.focus();
        })

        TaskCardContainer.appendChild(divTaskCard);
    }
}());

