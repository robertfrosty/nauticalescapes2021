document.addEventListener('scroll', inView);

var lastCount = 0;

function inView() {
        var elements = document.getElementsByClassName('pop_cont_imgs');
        var elements2 = document.getElementsByClassName('pop_cont_text');
        for(i=lastCount; i < elements.length; i++) {
                var element = elements[i].getElementsByTagName('img')[0];

                if (window.innerHeight - elements[i].getBoundingClientRect().top > 0) {
                        if (lastCount % 2 == 0) {
                                element.classList.add('slide');
                                elements2[i].classList.add('fade-in');
                        } else {
                                element.classList.add('slide-l');
                                elements2[i].classList.add('fade-in');
                        }
                        element.classList.remove('invisible');
                        lastCount++;
                        return;
                }

                return;
        }
}
