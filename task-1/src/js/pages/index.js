// INPUTS ======================================================================
const customInputFields = document.querySelectorAll('.custom-input__field');

customInputFields.forEach((customInputField) => {
  customInputField.addEventListener('input', ({ target }) => {
    if (!target.value) {
      removeClassFromInput(target);
    } else {
      target.classList.add('custom-input__field--has-content');
    }
  });
});

const inputClearingButtons = document.querySelectorAll(
  '.custom-input__button-close'
);

inputClearingButtons.forEach((inputClearingButton) => {
  inputClearingButton.addEventListener('click', ({ currentTarget }) => {
    const input = currentTarget.previousElementSibling;

    if (!input) return;

    input.value = '';
    removeClassFromInput(input);
  });
});

function removeClassFromInput(input) {
  input.classList.remove('custom-input__field--has-content');
}

// MODALS ======================================================================
document.querySelectorAll('[data-modal-target]').forEach(
  (buttonThatOpenModal) => {
    buttonThatOpenModal.addEventListener('click', ({ currentTarget }) => {
      const modal = document.querySelector(
        `[data-modal-id='${currentTarget.dataset.modalTarget}']`
      );

      changeModalState(modal);

      const buttonsThatCloseModals = modal.querySelectorAll(
        '[data-modal-hide]'
      );

      buttonsThatCloseModals.forEach((buttonThatCloseModal) => {
        buttonThatCloseModal.addEventListener('click',
          function handleProcessCloseOfModal({ currentTarget }) {
            currentTarget.blur();

            changeModalState(modal, 'remove', 'true');

            buttonsThatCloseModals.forEach((buttonThatCloseModal) => {
              buttonThatCloseModal.removeEventListener(
                'click', handleProcessCloseOfModal
              );
            });
          }
        );
      });
    });
  }
);

function changeModalState(modal, method = 'add', valueOfAriaHidden = 'false') {
  modal.classList[method]('modal--is-visible');
  modal.ariaHidden = valueOfAriaHidden;
  document.body.classList[method]('body--is-blocked');
}

// DROPDOWN ====================================================================
const options = {
  searchEnabled: false,
  shouldSort: false,
  itemSelectText: '',
};

const choices = new Choices('#dropdown-1', options);
const choices2 = new Choices('#dropdown-2', options);
