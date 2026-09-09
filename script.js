/* =====================================================
   AYUSH CARE
   SIH26047 FRONTEND JAVASCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loginPage =
    document.getElementById("loginPage");

const appPage =
    document.getElementById("appPage");

const loginForm =
    document.getElementById("loginForm");

const logoutButton =
    document.getElementById("logoutButton");

const showPassword =
    document.getElementById("showPassword");

const passwordInput =
    document.getElementById("password");

const mobileMenu =
    document.getElementById("mobileMenu");

const sidebar =
    document.querySelector(".sidebar");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;


        if (
            email.trim() === "" ||
            password.trim() === ""
        ) {

            showToast(
                "Please enter email and password."
            );

            return;

        }


        /*
           DEMO LOGIN

           Later connect this with FastAPI:

           fetch("YOUR_FASTAPI_URL/login", {
               method: "POST",
               body: JSON.stringify(...)
           })
        */


        localStorage.setItem(
            "ayushLoggedIn",
            "true"
        );


        loginPage.classList.add(
            "hidden"
        );

        appPage.classList.remove(
            "hidden"
        );


        showToast(
            "Welcome to AYUSH CARE!"
        );

    }
);


/* =====================================================
   CHECK LOGIN
===================================================== */

window.addEventListener(
    "DOMContentLoaded",
    function() {

        const loggedIn =
            localStorage.getItem(
                "ayushLoggedIn"
            );


        if (loggedIn === "true") {

            loginPage.classList.add(
                "hidden"
            );

            appPage.classList.remove(
                "hidden"
            );

        }

    }
);


/* =====================================================
   LOGOUT
===================================================== */

logoutButton.addEventListener(
    "click",
    function() {

        localStorage.removeItem(
            "ayushLoggedIn"
        );


        appPage.classList.add(
            "hidden"
        );

        loginPage.classList.remove(
            "hidden"
        );


        document.getElementById(
            "password"
        ).value = "";


        showToast(
            "You have been logged out."
        );

    }
);


/* =====================================================
   SHOW / HIDE PASSWORD
===================================================== */

showPassword.addEventListener(
    "click",
    function() {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            showPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        }

        else {

            passwordInput.type =
                "password";

            showPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    }
);


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const navigationButtons =
    document.querySelectorAll(
        ".nav-item"
    );


navigationButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                const page =
                    button.dataset.page;


                showPage(page);


                sidebar.classList.remove(
                    "mobile-open"
                );

            }
        );

    }
);


/* =====================================================
   SHOW PAGE FUNCTION
===================================================== */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        function(page) {

            page.classList.remove(
                "active-page"
            );

        }
    );


    const selectedPage =
        document.getElementById(
            pageId
        );


    if (selectedPage) {

        selectedPage.classList.add(
            "active-page"
        );

    }


    navigationButtons.forEach(
        function(button) {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.page ===
                pageId
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

mobileMenu.addEventListener(
    "click",
    function() {

        sidebar.classList.toggle(
            "mobile-open"
        );

    }
);


/* =====================================================
   CASE TAKING
===================================================== */

let currentStep = 1;

const totalSteps = 4;


const nextButton =
    document.getElementById(
        "nextButton"
    );


const previousButton =
    document.getElementById(
        "previousButton"
    );


const caseSteps =
    document.querySelectorAll(
        ".case-step"
    );


const steps =
    document.querySelectorAll(
        ".step"
    );


/* =====================================================
   UPDATE CASE STEP
===================================================== */

function updateCaseStep() {

    /*
       Hide all form steps
    */

    caseSteps.forEach(
        function(step) {

            step.classList.remove(
                "active"
            );

        }
    );


    /*
       Show current step
    */

    const activeStep =
        document.querySelector(
            `.case-step[data-content="${currentStep}"]`
        );


    if (activeStep) {

        activeStep.classList.add(
            "active"
        );

    }


    /*
       Update step circles
    */

    steps.forEach(
        function(step) {

            const stepNumber =
                Number(
                    step.dataset.step
                );


            step.classList.remove(
                "active"
            );


            if (
                stepNumber <=
                currentStep
            ) {

                step.classList.add(
                    "active"
                );

            }

        }
    );


    /*
       Previous button
    */

    if (
        currentStep === 1
    ) {

        previousButton.style.opacity =
            "0.4";

        previousButton.disabled =
            true;

    }

    else {

        previousButton.style.opacity =
            "1";

        previousButton.disabled =
            false;

    }


    /*
       Next button text
    */

    if (
        currentStep === totalSteps
    ) {

        nextButton.innerHTML = `
            <i class="fa-solid fa-check"></i>
            Complete Case
        `;

    }

    else {

        nextButton.innerHTML = `
            Next
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }

}


/* =====================================================
   NEXT
===================================================== */

nextButton.addEventListener(
    "click",
    function() {

        /*
           Basic validation
        */

        if (
            currentStep === 1
        ) {

            const name =
                document.getElementById(
                    "patientName"
                ).value;

            const age =
                document.getElementById(
                    "patientAge"
                ).value;

            const gender =
                document.getElementById(
                    "patientGender"
                ).value;


            if (
                name === "" ||
                age === "" ||
                gender === ""
            ) {

                showToast(
                    "Please complete patient details."
                );

                return;

            }

        }


        if (
            currentStep === 2
        ) {

            const complaint =
                document.getElementById(
                    "complaint"
                ).value;


            if (
                complaint === ""
            ) {

                showToast(
                    "Please enter the chief complaint."
                );

                return;

            }

        }


        if (
            currentStep <
            totalSteps
        ) {

            currentStep++;

            updateCaseStep();

        }

        else {

            completeCase();

        }

    }
);


/* =====================================================
   PREVIOUS
===================================================== */

previousButton.addEventListener(
    "click",
    function() {

        if (
            currentStep > 1
        ) {

            currentStep--;

            updateCaseStep();

        }

    }
);


/* =====================================================
   COMPLETE CASE
===================================================== */

function completeCase() {

    const patientName =
        document.getElementById(
            "patientName"
        ).value;


    /*
       Save demo case locally

       Later replace with:

       fetch("YOUR_FASTAPI_URL/cases", ...)
    */

    const caseData = {

        patientName:
            patientName,

        age:
            document.getElementById(
                "patientAge"
            ).value,

        gender:
            document.getElementById(
                "patientGender"
            ).value,

        complaint:
            document.getElementById(
                "complaint"
            ).value,

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "latestCase",
        JSON.stringify(caseData)
    );


    showToast(
        "Patient case successfully saved!"
    );


    setTimeout(
        function() {

            currentStep = 1;

            updateCaseStep();

            showPage(
                "assessment"
            );

        },
        800
    );

}


/* =====================================================
   PATIENT SEARCH
===================================================== */

const patientSearch =
    document.getElementById(
        "patientSearch"
    );


if (patientSearch) {

    patientSearch.addEventListener(
        "input",
        function() {

            const search =
                this.value.toLowerCase();


            const rows =
                document.querySelectorAll(
                    "#patientTable tbody tr"
                );


            rows.forEach(
                function(row) {

                    const text =
                        row.textContent
                            .toLowerCase();


                    if (
                        text.includes(
                            search
                        )
                    ) {

                        row.style.display =
                            "";

                    }

                    else {

                        row.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =====================================================
   REPORT DOWNLOAD
===================================================== */

function downloadReport() {

    /*
       Demo report generation.

       Later you can call FastAPI
       and generate an actual PDF.
    */


    const latestCase =
        localStorage.getItem(
            "latestCase"
        );


    let reportText =
        "AYUSH CARE\n";

    reportText +=
        "Patient Case Report\n";

    reportText +=
        "============================\n\n";


    if (latestCase) {

        const data =
            JSON.parse(
                latestCase
            );


        reportText +=
            "Patient Name: " +
            data.patientName +
            "\n";

        reportText +=
            "Age: " +
            data.age +
            "\n";

        reportText +=
            "Gender: " +
            data.gender +
            "\n";

        reportText +=
            "Chief Complaint: " +
            data.complaint +
            "\n";

    }

    else {

        reportText +=
            "Patient: Arun Kumar\n";

        reportText +=
            "Patient ID: P1024\n";

        reportText +=
            "Complaint: Headache\n";

    }


    reportText +=
        "\nGenerated by AYUSH CARE\n";


    const blob =
        new Blob(
            [reportText],
            {
                type:
                    "text/plain"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download =
        "AYUSH-Patient-Report.txt";


    link.click();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Report generated successfully."
    );

}


/* =====================================================
   INITIALIZE
===================================================== */

updateCaseStep();