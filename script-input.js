const text_area = $("#textbox-input")
let current_text = text_area.text()
document.onkeydown = function (e) {
    if (e.ctrlkey && e.key === "backspace") {// ctrl + backspace
        current_text = current_text.substring(0, current_text.lastindexof("&nbsp;"))
        text_area.html(current_text)
    }
    else if (e.ctrlkey && e.key === "s") {
        // to fix the extra s on save issue
    }
    else {
        switch (e.key) {
            case ("tab"): break;
            case ("shift"): break;
            case ("alt"): break;
            case ("capslock"): break;
            case ("control"): break;
            case ("escape"): break;
            case (" "): text_area.append("&nbsp;"); break;// a non breaking space
            case ("enter"): text_area.append("<br>"); break;

            case ("backspace"):
                current_text = text_area.html()
                // to handle the nbsp; case
                if (current_text.substring(current_text.length - 5) === "nbsp;") {
                    current_text = current_text.substring(0, current_text.length - 37 - 6)
                }
                else {
                    current_text = current_text.substring(0, current_text.length - 37)
                }
                text_area.html(current_text)
                break;
            default:
                text_area.append(`<span class="correct-letter">${e.key}</span>`)


        }
    }
    current_text = text_area.html()
    text_area.html(current_text)
}