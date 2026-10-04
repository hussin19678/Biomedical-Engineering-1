/* =====================================================
   BIOMEDICAL ENGINEERING WEBSITE
   Main JavaScript
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* =====================================================
   CLOSE MENU AFTER CLICK
===================================================== */

document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("show");
        }

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* =====================================================
   COUNTERS
===================================================== */

const counters = document.querySelectorAll(".counter");

let countersStarted = false;

function startCounters() {

    if (countersStarted || counters.length === 0) {
        return;
    }

    const stats = document.querySelector(".stats");

    if (!stats) {
        return;
    }

    const position = stats.getBoundingClientRect();

    if (position.top < window.innerHeight) {

        countersStarted = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let current = 0;

            const increment = Math.max(
                1,
                Math.ceil(target / 60)
            );

            function updateCounter() {

                current += increment;

                if (current >= target) {

                    counter.textContent = target + "+";

                    return;
                }

                counter.textContent = current;

                requestAnimationFrame(updateCounter);
            }

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);

startCounters();


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const message =
            document.getElementById("formMessage");

        if (message) {

            message.textContent =
                "تم استلام رسالتك بنجاح. شكراً لتواصلك معنا.";

        }

        contactForm.reset();

    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });


    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================================
   LOGIN SYSTEM
===================================================== */

const loginForm =
    document.getElementById("loginForm");

let selectedAccount = "student";


/* ACCOUNT TYPE */

document.querySelectorAll(".account-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".account-btn")
            .forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedAccount =
            button.dataset.type;

        const demoText =
            document.getElementById("demoText");

        if (demoText) {

            if (selectedAccount === "student") {

                demoText.textContent =
                    "الطالب: student / 1234";

            } else {

                demoText.textContent =
                    "Admin: admin / admin123";

            }

        }

    });

});


/* SHOW PASSWORD */

const showPassword =
    document.getElementById("showPassword");

if (showPassword) {

    showPassword.addEventListener("click", () => {

        const password =
            document.getElementById("password");

        const icon =
            showPassword.querySelector("i");

        if (password.type === "password") {

            password.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            password.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

}


/* LOGIN */

if (loginForm) {

    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        const username =
            document.getElementById("username")
                .value.trim();

        const password =
            document.getElementById("password")
                .value.trim();

        const message =
            document.getElementById("loginMessage");


        /* STUDENT LOGIN */

        if (
            selectedAccount === "student" &&
            username === "student" &&
            password === "1234"
        ) {

            localStorage.setItem(
                "loggedUser",
                "student"
            );

            localStorage.setItem(
                "studentName",
                "طالب هندسة الطب الحياتي"
            );

            window.location.href =
                "student.html";

            return;
        }


        /* ADMIN LOGIN */

        if (
            selectedAccount === "admin" &&
            username === "admin" &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "loggedUser",
                "admin"
            );

            window.location.href =
                "admin.html";

            return;
        }


        /* WRONG LOGIN */

        if (message) {

            message.textContent =
                "اسم المستخدم أو كلمة المرور غير صحيحة.";

        }

    });

}


/* =====================================================
   STUDENT PAGE
===================================================== */

if (window.location.pathname.endsWith("student.html")) {

    const user =
        localStorage.getItem("loggedUser");

    if (user !== "student") {

        window.location.href =
            "login.html";

    }


    const studentName =
        localStorage.getItem("studentName");

    const studentNameElement =
        document.getElementById("studentName");

    if (studentNameElement && studentName) {

        studentNameElement.textContent =
            studentName;

    }


    const currentDate =
        document.getElementById("currentDate");

    if (currentDate) {

        const today =
            new Date();

        currentDate.textContent =
            today.toLocaleDateString(
                "ar-IQ",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    }

}


/* STUDENT LOGOUT */

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("loggedUser");
        localStorage.removeItem("studentName");

        window.location.href =
            "login.html";

    });

}


/* =====================================================
   ADMIN PAGE
===================================================== */

if (window.location.pathname.endsWith("admin.html")) {

    const user =
        localStorage.getItem("loggedUser");

    if (user !== "admin") {

        window.location.href =
            "login.html";

    }

}


/* ADMIN LOGOUT */

const adminLogout =
    document.getElementById("adminLogout");

if (adminLogout) {

    adminLogout.addEventListener("click", () => {

        localStorage.removeItem("loggedUser");

        window.location.href =
            "login.html";

    });

}


/* =====================================================
   NEWS DATABASE - LOCAL STORAGE
===================================================== */

const defaultNews = [

    {
        id: 1,
        title: "بدء العام الدراسي الجديد",
        description:
            "نتمنى لجميع طلبتنا عاماً دراسياً مليئاً بالنجاح والتفوق.",
        date: "04 أكتوبر 2026"
    },

    {
        id: 2,
        title: "تطوير مختبرات القسم",
        description:
            "العمل على تطوير البيئة المختبرية وإضافة أجهزة وتقنيات حديثة.",
        date: "01 أكتوبر 2026"
    },

    {
        id: 3,
        title: "مشاريع طلبة القسم",
        description:
            "عرض مجموعة من المشاريع الهندسية الطبية المتميزة للطلبة.",
        date: "28 سبتمبر 2026"
    }

];


function getNews() {

    const saved =
        localStorage.getItem("bmeNews");

    if (saved) {

        try {

            return JSON.parse(saved);

        } catch (error) {

            localStorage.removeItem("bmeNews");

        }

    }

    localStorage.setItem(
        "bmeNews",
        JSON.stringify(defaultNews)
    );

    return defaultNews;

}


function saveNews(news) {

    localStorage.setItem(
        "bmeNews",
        JSON.stringify(news)
    );

}


/* =====================================================
   HOME NEWS
===================================================== */

function renderHomeNews() {

    const container =
        document.getElementById("homeNews");

    if (!container) {
        return;
    }

    const news =
        getNews();

    container.innerHTML = "";

    news.slice(0, 6).forEach(item => {

        const article =
            document.createElement("article");

        article.className =
            "news-card";

        article.innerHTML = `

            <div class="news-image">
                <i class="fa-solid fa-newspaper"></i>
            </div>

            <div class="news-content">

                <span class="news-date">
                    <i class="fa-regular fa-calendar"></i>
                    ${item.date}
                </span>

                <h3>${escapeHTML(item.title)}</h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

            </div>
        `;

        container.appendChild(article);

    });

}

renderHomeNews();


/* =====================================================
   STUDENT NEWS
===================================================== */

function renderStudentNews() {

    const container =
        document.getElementById("studentNews");

    if (!container) {
        return;
    }

    const news =
        getNews();

    container.innerHTML = "";

    news.forEach(item => {

        const card =
            document.createElement("article");

        card.className =
            "student-news-card";

        card.innerHTML = `

            <span>
                ${item.date}
            </span>

            <h3>
                ${escapeHTML(item.title)}
            </h3>

            <p>
                ${escapeHTML(item.description)}
            </p>

        `;

        container.appendChild(card);

    });

}

renderStudentNews();


/* =====================================================
   ADMIN NEWS
===================================================== */

function renderAdminNews() {

    const container =
        document.getElementById("adminNewsList");

    if (!container) {
        return;
    }

    const news =
        getNews();

    const count =
        document.getElementById("newsCount");

    if (count) {

        count.textContent =
            news.length;

    }

    container.innerHTML = "";


    if (news.length === 0) {

        container.innerHTML = `

            <div style="
                text-align:center;
                padding:30px;
                color:#718091;
                font-size:12px;
            ">

                لا توجد أخبار حالياً.

            </div>

        `;

        return;

    }


    news.forEach(item => {

        const row =
            document.createElement("div");

        row.className =
            "admin-news-item";

        row.innerHTML = `

            <div>

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <small style="
                    color:#0aa196;
                    font-size:9px;
                ">
                    ${item.date}
                </small>

            </div>

            <button
                class="delete-news"
                onclick="deleteNews(${item.id})">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;

        container.appendChild(row);

    });

}

renderAdminNews();


/* =====================================================
   OPEN NEWS MODAL
===================================================== */

function openNewsModal() {

    const modal =
        document.getElementById("newsModal");

    if (modal) {

        modal.classList.add("show");

        const title =
            document.getElementById("newsTitle");

        if (title) {
            title.focus();
        }

    }

}


/* =====================================================
   CLOSE NEWS MODAL
===================================================== */

function closeNewsModal() {

    const modal =
        document.getElementById("newsModal");

    if (modal) {

        modal.classList.remove("show");

    }

}


/* =====================================================
   ADD NEWS
===================================================== */

const newsForm =
    document.getElementById("newsForm");

if (newsForm) {

    newsForm.addEventListener("submit", event => {

        event.preventDefault();


        const title =
            document.getElementById("newsTitle")
                .value.trim();

        const description =
            document.getElementById("newsDescription")
                .value.trim();


        if (!title || !description) {
            return;
        }


        const news =
            getNews();


        const newArticle = {

            id: Date.now(),

            title: title,

            description: description,

            date: new Date().toLocaleDateString(
                "ar-IQ",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            )

        };


        news.unshift(newArticle);


        saveNews(news);


        newsForm.reset();

        closeNewsModal();

        renderAdminNews();

        showAdminMessage(
            "تمت إضافة الخبر بنجاح."
        );

    });

}


/* =====================================================
   DELETE NEWS
===================================================== */

function deleteNews(id) {

    const confirmDelete =
        confirm("هل أنت متأكد من حذف هذا الخبر؟");

    if (!confirmDelete) {
        return;
    }


    let news =
        getNews();


    news =
        news.filter(item => item.id !== id);


    saveNews(news);


    renderAdminNews();

    renderHomeNews();

    renderStudentNews();


    showAdminMessage(
        "تم حذف الخبر بنجاح."
    );

}


/* =====================================================
   ADMIN MESSAGE
===================================================== */

function showAdminMessage(message) {

    const toast =
        document.getElementById("adminToast");

    if (!toast) {

        alert(message);

        return;

    }


    toast.textContent =
        message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =====================================================
   SCROLL TO SECTION
===================================================== */

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (element) {

        element.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =====================================================
   MODAL CLICK OUTSIDE
===================================================== */

const newsModal =
    document.getElementById("newsModal");

if (newsModal) {

    newsModal.addEventListener("click", event => {

        if (event.target === newsModal) {

            closeNewsModal();

        }

    });

}


/* =====================================================
   PAGE RELOAD NEWS
===================================================== */

window.addEventListener("storage", () => {

    renderHomeNews();

    renderStudentNews();

    renderAdminNews();

});