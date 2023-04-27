const dropDownMenu = () => {
    const body = document.querySelector('body'),
          menu = document.querySelectorAll('.filters__item-text'),
          subMenu = document.querySelectorAll('.submenu');

    body.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('filters__item-text')) {
            event.preventDefault();

            menu.forEach((menu, index) => {
                if (target === menu) {
                    if (subMenu[index].classList.contains('open')) {
                        hideSubMenu();
                    } else {
                        hideSubMenu();
                        subMenu[index].classList.add('open');
                        menu.style.color = '#6E18C0';
                    } 
                }
            });
        } else if (target && !(target.closest('.submenu'))){
            //Если кликнули вне менюшек, закрываем их все
            hideSubMenu();
        }
    });
     
    function hideSubMenu() {
        subMenu.forEach((submenu, index) => {
            submenu.classList.remove('open');
            menu[index].style.color = '';
        });
    }
};

export default dropDownMenu;