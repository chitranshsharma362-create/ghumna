// ==========================================
// EMAILJS
// ==========================================

emailjs.init("GTIwHs6WntgcGAxyF");


// ==========================================
// FORM DATA
// ==========================================

let current = 1;

const total = 5;

const answers = {
    plan: "",
    time: "",
    transport: "",
    activity: "",
    final: ""
};


// ==========================================
// START FORM
// ==========================================

function start() {

    document
        .getElementById("intro")
        .classList.add("hidden");

    document
        .getElementById("form")
        .classList.remove("hidden");

    update();
}


// ==========================================
// SELECT OPTION
// ==========================================

function choose(button, type, value) {

    button
        .parentElement
        .querySelectorAll(".option")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    button.classList.add("selected");

    answers[type] = value;
}


// ==========================================
// VALIDATE
// ==========================================

function validate() {

    let key = "";

    if (current === 1) {
        key = "plan";
    }

    if (current === 3) {
        key = "time";
    }

    if (current === 4) {
        key = "transport";
    }

    if (current === 5) {
        key = "final";
    }

    if (key && !answers[key]) {

        alert("Pehle ek option select karo 👀");

        return false;
    }

    return true;
}


// ==========================================
// NEXT
// ==========================================

function next() {

    if (!validate()) {
        return;
    }


    // Agar first question me
    // mere saath select nahi kiya

    if (
        current === 1 &&
        answers.plan !== "me"
    ) {

        alternative();

        return;
    }


    if (current < total) {

        current++;

        update();

    } else {

        submit();
    }
}


// ==========================================
// BACK
// ==========================================

function previous() {

    if (current > 1) {

        current--;

        update();
    }
}


// ==========================================
// UPDATE FORM
// ==========================================

function update() {

    document
        .querySelectorAll(".question")
        .forEach(q => {
            q.classList.remove("active");
        });


    document
        .querySelector(
            `.question[data-q="${current}"]`
        )
        .classList.add("active");


    document
        .getElementById("counter")
        .innerText =
        `Question ${current} of ${total}`;


    const percentage =
        Math.round((current / total) * 100);


    document
        .getElementById("percent")
        .innerText =
        `${percentage}%`;


    document
        .getElementById("progress")
        .style.width =
        `${percentage}%`;


    document
        .getElementById("back")
        .style.visibility =
        current === 1
            ? "hidden"
            : "visible";


    document
        .getElementById("next")
        .innerText =
        current === total
            ? "Lock The Plan 🔒"
            : "Continue →";
}


// ==========================================
// ALTERNATIVE PLAN
// ==========================================

function alternative() {

    document
        .getElementById("form")
        .classList.add("hidden");

    document
        .getElementById("final")
        .classList.remove("hidden");


    document
        .getElementById("finalIcon")
        .innerText = "📋";


    document
        .getElementById("finalTitle")
        .innerText =
        "Decision Recorded.";


    document
        .getElementById("finalText")
        .innerHTML = `
            Fair enough. 😌
            <br>
            Existing plan it is.
        `;


    const selectedPlan =
        answers.plan === "yashveer"
            ? "Yashveer — Shopping"
            : "Classmates";


    document
        .getElementById("summaryPlan")
        .innerText =
        selectedPlan;


    document
        .getElementById("summaryTransport")
        .innerText =
        "Existing Plan";


    // Mail send
    sendEmail(
        selectedPlan,
        "Existing Plan",
        "No outing selected",
        "Existing plan selected"
    );
}


// ==========================================
// FINAL SUBMIT
// ==========================================

function submit() {

    document
        .getElementById("form")
        .classList.add("hidden");

    document
        .getElementById("final")
        .classList.remove("hidden");


    document
        .getElementById("finalIcon")
        .innerText = "🎉";


    document
        .getElementById("finalTitle")
        .innerText =
        "Plan Locked.";


    document
        .getElementById("finalText")
        .innerHTML = `
            Alright then. 😎
            <br>
            Kal ka plan officially on.
        `;


    // --------------------------------------
    // TRANSPORT
    // --------------------------------------

    const transport =
        answers.transport === "scooty"
            ? "Her Scooty"
            : "My Bike";


    document
        .getElementById("summaryPlan")
        .innerText =
        "Mere saath";


    document
        .getElementById("summaryTransport")
        .innerText =
        transport;


    // --------------------------------------
    // ACTIVITY
    // --------------------------------------

    let activity;


    if (answers.activity === "food") {

        activity =
            "Kuch accha khaana";

    }

    else if (answers.activity === "explore") {

        activity =
            "Ghoomna & Explore";

    }

    else if (answers.activity === "both") {

        activity =
            "Ghoomna + Khaana";

    }

    else {

        activity =
            "Ghoomna + Explore + Masti";
    }


    // --------------------------------------
    // SEND EMAIL
    // --------------------------------------

    sendEmail(
        "Mere saath",
        transport,
        activity,
        "YES — Confirmed"
    );
}


// ==========================================
// EMAILJS
// ==========================================

function sendEmail(
    selectedPlan,
    transport,
    activity,
    decision
) {


    // --------------------------------------
    // Email message
    // --------------------------------------

    const message = `

KAL KA PLAN — NEW RESPONSE 👀

━━━━━━━━━━━━━━━━━━━━

Selected Plan:
${selectedPlan}


Time:
8 AM - 2 PM


Transport:
${transport}


Destination:
Surprise / Undecided


Activity:
${activity}


Final Decision:
${decision}


━━━━━━━━━━━━━━━━━━━━

Plan:
Ghoomna + Explore + Masti

Departure:
8:00 AM

Return:
By 2:00 PM

Safety:
Safely dropped back.

━━━━━━━━━━━━━━━━━━━━

Destination abhi mujhe bhi nahi pata 😂

But trust me,
KMSM se bahut maza aayega. 👀

━━━━━━━━━━━━━━━━━━━━

Response submitted through
"Kal Ka Plan" form.
`;


    // --------------------------------------
    // EMAILJS PARAMETERS
    // --------------------------------------

    const params = {

        // Template ke {{name}} ke liye
        name: "Kal Ka Plan 👀",

        // Template ke {{email}} ke liye
        // Reply-To ke liye blank rakh sakte ho
        email: "",

        // Template ke {{title}} ke liye
        title: "Kal Ka Plan 👀 — New Response",

        // Template ke {{time}} ke liye
        time: "8 AM - 2 PM",

        // Template ke {{message}} ke liye
        message: message

    };


    console.log("Sending response...", params);


    // --------------------------------------
    // SEND
    // --------------------------------------

    emailjs.send(

        "service_sa1fh49",

        "template_ua8takg",

        params

    )

    .then(() => {

        console.log(
            "Email sent successfully ✅"
        );

    })

    .catch((error) => {

        console.error(
            "EmailJS Error:",
            error
        );

        alert(
            "Form submit ho gaya 👍\n" +
            "Lekin email send nahi ho paaya 😭"
        );

    });

}
