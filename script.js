main()
var time; var words; var timeafter; var timebefore;
$("#time-controls a").on('click', function (_evt) {
    $("#time-controls a").css('color','rgb(277,277,277)')
    $(this).css("color", "red")
    time = $(this).text();
})

$("#word-controls a").on('click', function (_evt) {
    $("#word-controls a").css('color','rgb(277,277,277)')
    $(this).css("color", "red")
    words = $(this).text();
})
function restart() {
    $("#timer").show()
    clearInterval(countdown)
    clearTimeout(typetimeid)
    $("#textbox-input").text("")
    $("#textbox-cursor").text("")
    $("#checkans").html("checkanswer &nbsp;")
    $("#textbox-cursor").focus()
    $("#scorecard").hide()
    main(time,words)
}
function main(time,numberofwords) {
    $("#timer").text(`0s`)
    $("#tail").show()
    $("#scorecard").hide()
    lettercount= 0
    i = 0 
    var sentence = getrandomtext(numberofwords)
    var i = 1;
    timer(time)
    $("#textbox-ghosttext").text(sentence)
    $("#textbox-input").text("")
    typetimeid = setTimeout(end, time*1000)
}
function timer(time) { 
    timebefore = (new Date()).getTime();
    var i = 1;
    countdown = setInterval(function () {
        $("#timer").text(`${i}s`)
        i += 1
        if (i === time + 1) {
            console.log("eeeeeeeeeeeeeeeeeeeeeeee")
            end()
        }
    }, 1000)
}
function end() {
    timeafter = (new Date()).getTime();
    $("#timer").text(`0s`)
    clearInterval(countdown)
    clearTimeout(typetimeid)
    checkans()
}


function checkans() {
    if (($("#textbox-input").has(".wrong-letter").length) || ($("#textbox-input span").length!=$("#textbox-ghosttext").text().length)){
        $("#checkans").text("no")
    }
    else {
        $("#checkans").text("yes")
    }
    displayscore()
}
function displayscore() {
    let percentscore =Math.round(($("#textbox-input .correct-letter").length / $("#textbox-input span").length) * 100)
    let wpm = Math.round((words/(timeafter-timebefore))*60000)
    $("#tail").show()
    $("#scorecard").append("<hr>")
    $("#scorecard").text(`${percentscore}%`)
    $("#scorecard").append(`|${wpm}wpm`)
    $("#scorecard").show()
}
function getrandomtext(number_of_words) {
    const commonWords = [
        'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
        'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
        'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
        'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
        'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
        'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
        'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
        'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
        'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way'
    ];
    var sentence = "";
    for (let i = 0; i < number_of_words; i++) {
        var word = commonWords[Math.floor(Math.random() * commonWords.length)]
        sentence += word
        if (i != number_of_words - 1) { sentence += " " }
    }
    return sentence
}


const text_area = $("#textbox-input")
let current_text = text_area.text()
document.onkeydown = function (e) {
    var requiredlen = $("#textbox-ghosttext").text().length
    if(e.ctrlKey && e.key === "Enter") {
        restart()
    }
    switch (e.key) {
        case ("Tab"): break;
        case ("Shift"): break;
        case ("Alt"): break;
        case ("CapsLock"): break;
        case ("Control"): break;
        case ("Escape"): break;
        case ("Enter"): /*text_area.append("<br>");*/ break;
        case ("Backspace"):
            lettercount -= 1
            $("#textbox-input").children().last().remove()
            break;
        default:
            if ($("#textbox-ghosttext").text()[(lettercount)] === e.key) {
                text_area.append(`<span class="correct-letter">${e.key}</span>`)
            }
            else {
                if ($("#textbox-ghosttext").text()[(lettercount)] === " ") {
                    text_area.append(`<span class="wrong-letter">_</span>`)
                }
                else {
                    if ($("#textbox-ghosttext").text()[(lettercount)]) {
                        text_area.append(`<span class="wrong-letter">${$("#textbox-ghosttext").text()[(lettercount)]}</span>`)
                    }
                }
            }
            lettercount += 1
            break;
    }
    current_text = text_area.html()
    text_area.html(current_text)
    if (requiredlen === lettercount) {
        end()
    }
}

$("#tail").hide()
$("#timer").hide()
$(".default").trigger("click")
$("#restart").trigger("click")