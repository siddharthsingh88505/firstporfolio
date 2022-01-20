function fun1() {
    let iframe = document.getElementById("iframe").value; let borderS = document.getElementById("borderS").value;
    let borderC = document.getElementById("borderC").value; let borderT = document.getElementById("borderT").value;
    let name = document.getElementById("name").value;
    let scrolling = document.getElementById("scroll").value;
    let frameborder = document.getElementById("border").value;
    if (frameborder == "yes") {
        frameborder = 1;
    }
    else {
        frameborder = 0;
    }
    let marginheight = document.getElementById("marginheight").value;
    let marginwidth = document.getElementById("marginwidth").value;
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;
    let textarea = document.getElementById("code");
    textarea.value = `<iframe src="${iframe}" style="border:${borderS} ${borderC} ${borderT}" name="${name}" scrolling="${scrolling}" frameborder="${frameborder}" marginheight="${marginheight}" marginwidth="${marginwidth}"height="${height}px" width="${width}px" allowfullscreen></iframe>`;
    console.log(name);


}
function copyText() {
    let copy = document.getElementById("code");
    copy.select();
    document.execCommand("copy");
}