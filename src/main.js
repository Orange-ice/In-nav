const $siteList = $(".siteList");
const $lastLi = $siteList.find(".last");
const localData = localStorage.getItem("localData");
const dataObject = JSON.parse(localData);
const hashMap = dataObject || [
  { logo: "Bootstrap", url: "https://v3.bootcss.com" },
  { logo: "jQuery", url: "https://www.jquery123.com" },
  { logo: "Vue.js", url: "https://cn.vuejs.org" },
  { logo: "React.js", url: "https://zh-hans.reactjs.org" },
  { logo: "Angular.js", url: "https://www.angularjs.net.cn" },
  { logo: "webpack", url: "https://www.webpackjs.com" },
  { logo: "Github", url: "https://github.com" },
  { logo: "node.js", url: "http://nodejs.cn" },
  { logo: "npm", url: "https://www.npmjs.com" },
  { logo: "JS Bin", url: "http://jsbin.com" },
  { logo: "Figma", url: "https://figma.com" },
  { logo: "Google", url: "https://google.com" },
];

const handleUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(".com", "")
    .replace(".cn", "")
    .replace(".org", "")
    .replace(/\/.*/, "");
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  console.log(hashMap);
  hashMap.forEach((node, index) => {
    const $li = $(
      `<li class="site">
        <div class="link">${handleUrl(node.logo)}</div>
        <div class="deleteBox">
            <svg class="icon delete">
                <use xlink:href="#icon-delete"></use>
            </svg>
        </div>
        
      </li>`
    ).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".deleteBox", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: handleUrl(url),
    url: url,
  });
  render();
  console.log(hashMap);
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("localData", string);
};

// 键盘事件
$(document).on("keypress", (e) => {
  const { key } = e;
  console.log(key);
  for (let i = 0; i < hashMap.length; i++) {
    console.log(hashMap[i].logo.toLowerCase());
    if (hashMap[i].logo.toLowerCase()[0] === key) {
      console.log("执行了");
      window.open(hashMap[i].url);
    }
  }
});
