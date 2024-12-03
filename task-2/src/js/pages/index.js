// FOR ADAPTIVE ================================================================
new TransferElements(
  {
    sourceElement: document.querySelector('.navigation-secondary'),
    breakpoints: {
      1350: {
        targetElement: document.querySelector(
          '.header__line-wrapper--bottom .header__container'
        )
      }
    }
  }
);

// MENU ========================================================================
const menu = document.getElementById('menu');
const menuContainer = document.getElementById('menu-container');

const animationOptions = {
  duration: 300,
  easing: 'ease-in-out'
};

const modifiers = {
  menu: 'menu--is-visible',
  menuControlButton: 'menu-control-button--is-active',
  menuContainer: 'menu__container--is-visible'
};

document.getElementById('menu-control-button').addEventListener('click',
  ({ currentTarget }) => {
    currentTarget.classList.toggle(modifiers.menuControlButton);

    if (currentTarget.classList.contains(modifiers.menuControlButton)) {
      currentTarget.ariaExpanded = true;
    } else {
      currentTarget.ariaExpanded = false;
    }

    if (menu.classList.contains(modifiers.menu)) {
      menuContainer.animate([
        { opacity: 1 },
        { opacity: 0 }
      ], animationOptions).addEventListener('finish', () => {
        menuContainer.classList.remove(modifiers.menuContainer);

        menu.animate([
          { transform: 'scaleY(100%)' },
          { transform: 'scaleY(0)' }
        ], animationOptions).addEventListener('finish', () => {
          menu.classList.remove(modifiers.menu);
        }, { once: true });
      }, { once: true });

      return;
    }

    menu.classList.add(modifiers.menu);

    menu.animate([
      { transform: 'scaleY(0)' },
      { transform: 'scaleY(100%)' }
    ], animationOptions).addEventListener('finish', () => {
      menuContainer.animate([
        { opacity: 0 },
        { opacity: 1 }
      ], animationOptions).addEventListener('finish', () => {
        menuContainer.classList.add(modifiers.menuContainer);
      }, { once: true });
    }, { once: true });
  }
);
