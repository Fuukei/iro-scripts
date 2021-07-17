export function web_audio() {
    if (mashiro_option.audio) {
        window.AudioContext = window.AudioContext || window.webkitAudioContext
        if (window.AudioContext) {
            let ctx = new AudioContext,
                t = "880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 659 698 659 698 1046 659 1046 1046 1046 987 698 698 987 987 880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 698 1046 987 1046 1174 1174 1174 1046 1046 880 987 784 880 1046 1174 1318 1174 1318 1567 1046 987 1046 1318 1318 1174 784 784 880 1046 987 1174 1046 784 784 1396 1318 1174 659 1318 1046 1318 1760 1567 1567 1318 1174 1046 1046 1174 1046 1174 1567 1318 1318 1760 1567 1318 1174 1046 1046 1174 1046 1174 987 880 880 987 880".split(" "),//天空之城
                i = 0,
                o = 1,
                dom: HTMLElement,
                a = "♪ ♩ ♫ ♬ ♭ € § ¶ ♯".split(" "),
                selects = document.querySelectorAll(".site-title, #moblieGoTop, .site-branding, .searchbox, .changeSkin-gear, .menu-list li");
            selects.forEach((select) => {
                select.addEventListener("mouseenter", (e) => {
                    if (dom) return;
                    let r = t[i]
                    if (!r) {
                        (i = 0, r = t[i])
                    }
                    i += o
                    const c = ctx.createOscillator(),
                        l = ctx.createGain();
                    c.connect(l)
                    l.connect(ctx.destination)
                    c.type = "sine"
                    c.frequency.value = r
                    l.gain.setValueAtTime(0, ctx.currentTime)
                    l.gain.linearRampToValueAtTime(1, ctx.currentTime + .01)
                    c.start(ctx.currentTime)
                    l.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + 1)
                    c.stop(ctx.currentTime + 1)
                    const d = Math.round(7 * Math.random());
                    const h = e.pageX
                    const p = e.pageY - 5
                    dom = document.createElement("b");
                    dom.textContent = a[d]
                    dom.style.zIndex = "99999";
                    dom.style.top = p - 100 + "px";
                    dom.style.left = h + "px";
                    dom.style.position = "absolute";
                    dom.style.color = "#FF6EB4";
                    document.body.appendChild(dom);
                    dom.animate([
                        { top: p + "px" },
                        { opacity: 0 }
                    ], {
                        duration: 500
                    })
                    setTimeout(() => {
                        dom.remove();
                        dom = null;
                    }, 500)
                    e.stopPropagation();

                })
            })
        }
    }
}
                /*t = "329.628 329.628 349.228 391.995 391.995 349.228 329.628 293.665 261.626 261.626 293.665 329.628 329.628 293.665 293.665 329.628 329.628 349.228 391.995 391.995 349.228 329.628 293.665 261.626 261.626 293.665 329.628 293.665 261.626 261.626 293.665 293.665 329.628 261.626 293.665 329.628 349.228 329.628 261.626 293.665 329.628 349.228 329.628 293.665 261.626 293.665 195.998 329.628 329.628 349.228 391.995 391.995 349.228 329.628 293.665 261.626 261.626 293.665 329.628 293.665 261.626 261.626".split(" "),欢乐颂*/

const sheet = "880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 659 698 659 698 1046 659 1046 1046 1046 987 698 698 987 987 880 987 1046 987 1046 1318 987 659 659 880 784 880 1046 784 659 698 1046 987 1046 1174 1174 1174 1046 1046 880 987 784 880 1046 1174 1318 1174 1318 1567 1046 987 1046 1318 1318 1174 784 784 880 1046 987 1174 1046 784 784 1396 1318 1174 659 1318 1046 1318 1760 1567 1567 1318 1174 1046 1046 1174 1046 1174 1567 1318 1318 1760 1567 1318 1174 1046 1046 1174 1046 1174 987 880 880 987 880".split(" ")