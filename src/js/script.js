$(function () {
    $('#phone').mask('+000 00 000 00 00');
});


// Hamburger

const hamburger = document.querySelector('.burger'),
    activeMenu= document.querySelector('.menu');

hamburger.addEventListener('click', (e) => {
    hamburger.classList.toggle('burger_active');
    activeMenu.classList.toggle('menu_active');
});


const btns = document.querySelectorAll(".promises_block_wrapper_btn"),
    modalWindow = document.querySelector(".modal_dialog"),
    modalWrapper = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal_content"),
    firstModalPageBtn = document.querySelector('#main_modal_btn'),
    userName = document.querySelector('#name'),
    userPhone = document.querySelector('#phone'),
    form = document.querySelector('form'),
    pocketBtn = document.querySelector('.modal_pocket_btn'),
    footerData = document.querySelector('footer'),
    planList = [
        'Безпечна квартира',
        'Безпечний будинок',
        'Безпечне місто'
    ];



pocketBtn.addEventListener('click', (e) => {
    e.preventDefault();

    hideModal(modalWindow);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal_dialog');
    thanksModal.innerHTML = `
        <div class="modal_content show">
            <div data-close class="modal_content_close"></div>
            <div class="modal_title">Оберіть свій пакет</div>
            <div class="modal_pocket_block">
                <div class="text_combo_block first">
                    <div class="text_combo_block_name">Безпечна квартира</div>
                    <div class="text_combo_block_price">1000 грн / місяць</div>
                </div>
                <button class="modal_pocket_block_choose" id="choose_0">Обрати</button>
            </div>
            <div class="modal_pocket_block">
                <div class="text_combo_block">
                    <div class="text_combo_block_name">Безпечний будинок</div>
                    <div class="text_combo_block_price">10000 грн / місяць</div>
                </div>
                <button class="modal_pocket_block_choose" id="choose_1">Обрати</button>
            </div>
            <div class="modal_pocket_block">
                <div class="text_combo_block">
                    <div class="text_combo_block_name">Безпечне місто</div>
                    <div class="text_combo_block_price">Ціна за домовленністю</div>
                </div>
                <button class="modal_pocket_block_choose" id="choose_2">Обрати</button>
            </div>
        </div>
 `;

    modalWrapper.append(thanksModal);
    const tempButton = modalWrapper.querySelectorAll('.modal_pocket_block_choose');

    tempButton.forEach((e) => {
        e.addEventListener('click', (el) => {
            localStorage.setItem('id', planList[+el.target.id.replace('choose_', '')]);
            thanksModal.remove();
            showModal();
        });
    });

    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper || e.target.getAttribute('data-close') == '') {
            thanksModal.remove();
        }
    });

});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    // debugger;
    localStorage.setItem("phone", userPhone.value);
    localStorage.setItem("name", userName.value);
    hideModal(modalWindow);

    const checkModal = document.createElement('div');
    checkModal.classList.add('modal_dialog');
    checkModal.innerHTML = `
    <div class="modal_content show">
        <div data-close class="modal_content_close"></div>
        <div class="modal_title">
            Перевірка
            <br>
            заповнених полів:
        </div>
        <div class="modal_results_wrapper">
            <div class="modal_results_block">
                <div class="modal_results_block_title">Обраний пакет</div>
                <div class="modal_results_block_chosen">${localStorage.getItem('id')}</div>
            </div>
    
            <div class="modal_results_block">
                <div class="modal_results_block_title">Ваше ім’я</div>
                <div class="modal_results_block_chosen">${localStorage.getItem('name')}</div>
            </div>
    
            <div class="modal_results_block">
                <div class="modal_results_block_title">Ваш номер телефону</div>
                <div class="modal_results_block_chosen">${localStorage.getItem('phone')}</div>
            </div>
        </div>

        <div class="agreement">Ви погодились з нашими умовами сервісу.</div>
        <button class="modal_btn modal_gray" id="back_modal_btn">Повернутись до форми реєстрації</button>
        <button class="modal_btn" id="confirm_modal_btn">Все вірно</button>
    </div>
`;

    modalWrapper.append(checkModal);
    const tempButtonAgree = checkModal.querySelector('#confirm_modal_btn'),
        tempButtonBack = checkModal.querySelector('#back_modal_btn');

    tempButtonAgree.addEventListener('click', (el) => {
        checkModal.remove();
        showFinalModal();
    });

    tempButtonBack.addEventListener('click', () => {
        checkModal.remove();
        showModal();
    });

    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper || e.target.getAttribute('data-close') == '') {
            checkModal.remove();
        }
    });
});


btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        localStorage.setItem("id", planList[+e.target.id.replace('choose_', '')]);
        showModal();
    });
});

modalWrapper.addEventListener('click', (e) => {
    if (e.target == modalWrapper || e.target.getAttribute('data-close') == '') {
        hideModal(modalWrapper);
        hideModal(modalWindow);
    }
});

function showModal() { // modalSelector
    modalWindow.classList.add('show');
    modalWrapper.classList.add('show');
    modalWrapper.classList.remove('hidden');
    modalWindow.classList.remove("hidden");

    document.querySelector('.modal_pocket_chosen').textContent = localStorage.getItem("id");

    if (localStorage.getItem("phone")) {
        userPhone.textContent = localStorage.getItem("phone");
    }
    if (localStorage.getItem("name")) {
        userName.textContent = localStorage.getItem("name");
    }

}

function hideModal(modalSelector) { // 
    modalSelector.classList.add('hidden');
    modalSelector.classList.remove("show");
}


function showFinalModal() {

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal_dialog');
    thanksModal.innerHTML = `
        <div class="modal_content show">
            <div data-close class="modal_content_close"></div>
            <div class="modal_logo"></div>
            <div class="modal_title">Чудово!</div>

            <div class="thanks_text">Ми надішлемо вам листа з подальшими <br>
            інструкціями стосовно реєстрації!</div>
            <button class="modal_btn" id="accept_update">Закрити вікно</button>
        </div>
`;
    modalWrapper.append(thanksModal);

    const tempButtonAgree = modalWrapper.querySelector('#accept_update');

    tempButtonAgree.addEventListener('click', (el) => {
        thanksModal.remove();
        hideModal(modalWrapper);
    });

    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper || e.target.getAttribute('data-close') == '') {
            thanksModal.remove();
            hideModal(modalWrapper);
        }
    });
}

// Smooth scroll

const btnInfo = document.querySelector(".btn_info"),
    promisesSection = document.querySelector('.promises');


function scrollTo(element) {
    window.scroll({
        left: 0,
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

btnInfo.addEventListener('click', () => {
    scrollTo(promisesSection);
});