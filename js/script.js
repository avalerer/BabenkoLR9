$(document).ready(function () {
    $('.item-header').on('click', function () {
        const isOpen = $(this).next('.item-content').is(':visible');
        $('.item-content').slideUp();
        $('.arrow').removeClass('open');

        if (!isOpen) {
            $(this).next('.item-content').slideDown();
            $(this).find('.arrow').addClass('open');
        }
    });
});
