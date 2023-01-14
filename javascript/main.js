var $animation_element = $(".teams");
var $window = $(window);

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = window_height + window_top_position;

    $.each($animation_element, function () {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = element_height + element_top_position;

        if (
            element_bottom_position >= window_top_position &&
            element_top_position <= window_bottom_position
        ) {
            $element.addClass("in-view");
        } else {
            $element.removeClass("in-view");
        }
    });
}

$window.on("scroll resize", check_if_in_view);
$window.trigger("scroll");

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add("animated");
//         } else {
//             entry.target.classList.remove("animated");
//         }
//     });
// });

// const elements = document.querySelectorAll(".feedback__img");
// elements.forEach((element) => observer.observe(element));

// Tabs
var tabs = document.querySelectorAll(".block__tab");

function switchTab() {
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    this.classList.add("active");
}

for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", switchTab);
}

// Parallax effect
const parallaxBlock = document.querySelector(".graph");
const content = document.querySelector(".graph__img");

parallaxBlock.addEventListener("mousemove", function (e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    content.style.transform = `translate(-20%, -10%) translateX(${
        x * 30 - 15
    }%) translateY(${y * 15 - 15}%)`;
});

const title = document.getElementsByClassName("main__title")[0];
const description = document.getElementsByClassName("main__description")[0];

function charToSpan(
    object,
    dividerWidth,
    animation,
    animationDuration,
    animationDelay
) {
    let blocks = object.childNodes;

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        if (block.nodeType === 3) {
            continue;
        }

        let list = block.innerText.split("");

        let html = "";

        // add to every char span and dividers
        for (let j = 0; j < list.length; j++) {
            const element = list[j];
            let string = "";

            if (element !== " ") {
                string = "<span>" + element + "</span>";
            } else {
                string = '<div class="divider"></div>';
            }

            html = html + string.toString();
        }

        block.innerHTML = html;
        block.style.display = "flex";

        // add animation
        for (let j = 0; j < block.childNodes.length; j++) {
            const element = block.childNodes[j];

            if (element.className === "divider") {
                element.style.minWidth = dividerWidth;
                continue;
            }

            element.style.display = "block";
            element.style.opacity = 0;
            element.style.animation =
                animation +
                " " +
                animationDuration +
                "s" +
                " forwards " +
                (animationDelay + j * 0.02 + (i - 1) * 0.2) +
                "s";
        }
    }
}

charToSpan(title, "10px", "drop", 1, 0);
charToSpan(description, "5px", "dropDown", 1, 1);
