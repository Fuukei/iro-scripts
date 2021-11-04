import { getFileNameMain } from '../common/util';
const bgvideo = document.getElementById<HTMLVideoElement>("bgvideo");
const videoList: Array<string> = Poi.movies.name?.split(",") || []// 视频列表
let unplayedIndex = new Array(videoList.length).fill(0).map((_, index) => index)
//from Siren
declare global {
    interface Window {
        Hls: any
    }
    const Hls: any
}
//#region 背景视频
const _getNextRandomVideo = () => {
    if (unplayedIndex.length == 0) {
        unplayedIndex = new Array(videoList.length).fill(0).map((_, index) => index)
    }
    const nextIndex = Math.floor(Math.random() * unplayedIndex.length)
    return videoList[unplayedIndex.splice(nextIndex, 1)[0]]
}

function getVideo() {
    const video_stu = document.getElementsByClassName("video-stu")[0] as HTMLElement;
    const fileName = _getNextRandomVideo()// 随机抽取视频
    video_stu.innerHTML = "正在载入视频 ...";
    video_stu.style.bottom = "0px";
    //这里不需要检验Poi.movies是不是字符串，因为应该在前边检查
    bgvideo.setAttribute("src", new URL(fileName, Poi.movies.url || location.origin).toString());
    bgvideo.setAttribute("video-name", getFileNameMain(fileName));
}
/**
 * 播放
 */
function splay() {
    let video_btn = document.getElementById("video-btn");
    if (video_btn) {
        video_btn.classList.add("video-pause");
        video_btn.classList.remove("video-play");
        video_btn.style.display = "";
    }
    try {
        document.querySelector<HTMLElement>(".video-stu").style.bottom = "-100px";
        document.querySelector<HTMLElement>(".focusinfo").style.top = "-999px";
        if (mashiro_option.float_player_on) {
            import('./aplayer').then(({ destroyAllAplayer }) => {
                destroyAllAplayer()
                bgvideo.play();
            })
            return
        }
    } catch (e) {
        console.warn(e)
    }
    bgvideo.play();
}
/**
 * 暂停
 */
function spause() {
    let video_btn = document.getElementById("video-btn");
    if (video_btn) {
        video_btn.classList.add("video-play");
        video_btn.classList.remove("video-pause");
    }
    try {
        document.querySelector<HTMLElement>(".focusinfo").style.top = "49.3%";
    } catch { }
    bgvideo.pause();
}
/**
 * 自动续播 - 播放
 */
export function liveplay() {
    if (bgvideo && bgvideo.oncanplay != undefined && document.querySelector(".haslive")) {// 检查视频数据
        if (document.querySelector(".videolive")) {// 检查播放状态
            splay();
        }
    }
}
export function livepause() {
    if (bgvideo && bgvideo.oncanplay != undefined && document.querySelector(".haslive")) {// 检查视频数据
        spause();
        let video_stu = document.getElementsByClassName("video-stu")[0] as HTMLElement;
        video_stu.style.bottom = "0px";
        video_stu.innerHTML = "已暂停 ...";
    }
}
export function coverVideo() {
    let video_btn = document.getElementById("video-btn");
    if (video_btn) video_btn.addEventListener("click", function () {
        if (this.classList.contains("loadvideo")) {
            this.classList.add("video-pause");
            this.classList.remove("loadvideo");
            getVideo();
            bgvideo.oncanplay = function () {// 数据可用时
                splay();
                document.getElementById("video-add").style.display = "block";
                video_btn.classList.add("videolive", "haslive");// MDZZ
            }
        } else {
            if (this.classList.contains("video-pause")) {
                spause();
                video_btn.classList.remove("videolive");
                (document.getElementsByClassName("video-stu")[0] as HTMLElement).style.bottom = "0px";
                document.getElementsByClassName("video-stu")[0].innerHTML = "已暂停 ...";
            } else {
                splay();
                video_btn.classList.add("videolive");// 用于判断切换页面时的状态
            }
        }
        bgvideo.onended = function () {// 播放结束后 
            bgvideo.setAttribute("src", "");
            document.getElementById("video-add").style.display = "none";
            document.querySelector<HTMLElement>(".focusinfo").style.top = "49.3%";
            if (video_btn) {
                video_btn.classList.add("loadvideo");
                video_btn.classList.remove("video-pause", "videolive", "haslive");
                if (Poi.movies.loop) {
                    video_btn.click()
                }
            }
        }
    });
    const video_add = document.getElementById("video-add")
    if (video_add) video_add.addEventListener("click", getVideo);
}
//#endregion
/**
 * 假设video.hls存在至少一个
 */
function loadHls() {
    const videos = document.querySelectorAll<HTMLVideoElement>('video.hls')
    if (Hls.isSupported()) {
        for (const video of videos) {
            const hls = new Hls();
            hls.loadSource(video.dataset.src || video.src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        }
    } else if (videos[0].canPlayType('application/vnd.apple.mpegurl')) {
        for (const video of videos) {
            video.src = video.dataset.src || video.src;
            video.autoplay = true
        }
    }
}
export async function coverVideoIni() {
    const videos = document.querySelectorAll('video.hls');
    if (videos.length == 0) return
    if (window.Hls) {
        loadHls();
    } else {
        try {
            const { default: Hls } = await import('hls.js')
            window.Hls = Hls
            loadHls();
        } catch (reason) {
            console.warn('Hls load failed: ', reason)
        }
    }
}