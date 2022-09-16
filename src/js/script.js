$(document).ready(function () {
    $('#phone').mask('+000 00 000 00 00');
});


// Modal main

const btns = document.querySelectorAll(".promises_block_btn"),
    modalWindow = document.querySelector(".modal_dialog"),
    modalWrapper = document.querySelector(".modal"),
    modalContent = document.querySelector(".modal_content"),
    firstModalPageBtn = document.querySelector('#main_modal_btn'),
    userName = document.querySelector('#name'),
    userPhone = document.querySelector('#phone'),
    form = document.querySelector('form'),
    pocketBtn = document.querySelector('.modal_pocket_btn'),
    planList = [
        'Безпечна квартира',
        'Безпечний будинок',
        'Безпечне місто'
    ];



pocketBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // closeModal();
    modalWindow.classList.add('hidden');
    modalWindow.classList.remove('show');
    // modalWrapper.classList.remove('hidden');

    // modalWrapper.childNodes.add

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
    // thanksModal.querySelectorAll('button')
    modalWrapper.append(thanksModal);
    const tempButton = modalWrapper.querySelectorAll('.modal_pocket_block_choose');
    tempButton.forEach((e) => {
        e.addEventListener('click', (el) => {
            localStorage.setItem('id', planList[+el.target.id.replace('choose_', '')]);
            thanksModal.remove();
            showModal();
        });
        // thanksModal.remove();
    });

    // thanksModal.remove();
});

firstModalPageBtn.addEventListener('click', (e) => {
    // e.preventDefault();

    if (form.submit) {
        // debugger;
        localStorage.setItem("phone", userPhone.value);
        localStorage.setItem("name", userName.value);

        e.preventDefault();
        modalWindow.classList.add('hidden');
        modalWindow.classList.remove('show');
        // modalWrapper.classList.remove('hidden');

        // modalWrapper.childNodes.add

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
        // thanksModal.querySelectorAll('button')
        modalWrapper.append(checkModal);
        const tempButtonAgree = checkModal.querySelector('#confirm_modal_btn'),
            tempButtonBack = checkModal.querySelector('#back_modal_btn');

        tempButtonAgree.addEventListener('click', (el) => {
            checkModal.remove();
            showModal();

            alert('Registered!');
            checkModal.remove();
            modalWrapper.classList.add('hidden');
            modalWrapper.classList.remove('show');
        });

        tempButtonBack.addEventListener('click', () => {

            checkModal.remove();
            modalWrapper.classList.add('show');
            modalWindow.classList.add('show');
        });
    }

});

btns.forEach((el) => {
    el.addEventListener('click', (e) => {
        localStorage.setItem("id", planList[+e.target.id.replace('choose_', '')]);
        showModal();
    });
});

modalWrapper.addEventListener('click', (e) => {
    if (e.target == modalWrapper || e.target.getAttribute('data-close') == '') {
        closeModal(); // '.modal_dialog'
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
    if (localStorage.getItem("phone")) {
        userName.textContent = localStorage.getItem("name");
    }

}

function closeModal() { // modalSelector
    // const modal = document.querySelector(selector);
    modalWrapper.classList.add('hidden');
    modalWindow.classList.add("hidden");
    modalWrapper.classList.remove("show");
    modalWindow.classList.remove("show");
}
//   function showThanksModal(message) {
//     const prevModalDialog = document.querySelector('.modal__dialog');

//     prevModalDialog.classList.add('hide');
//     (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerID);

//     const thanksModal = document.createElement('div');
//     thanksModal.classList.add('modal__dialog');
//     thanksModal.innerHTML = `
//      <div class="modal__content">
//          <div class "modal__close" data-close>&times;</div>
//          <div class="modal__title">${message}</div>
//      </div>
//  `;

//     document.querySelector('.modal').append(thanksModal);
//     setTimeout(() => {
//         thanksModal.remove();
//         prevModalDialog.classList.add('show');
//         prevModalDialog.classList.remove('hide');
//         (0, closeModal)('.modal');
//     }, 4000);
// }


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