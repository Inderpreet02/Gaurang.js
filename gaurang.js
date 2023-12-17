"use strict";

const DUMMY =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
function tag(name, ...children) {
  const result = document.createElement(name);
  for (const child of children) {
    result.append(child);
  }

  result._att = function (name, value) {
    this.setAttribute(name, value);
    return this;
  };

  result._onclick = function (callback) {
    this.onclick = callback;
    return this;
  };
  return result;
}

function text(bars) {
  return document.createTextNode(bars);
}

function h1(...children) {
  return tag("h1", ...children);
}

function h2(...children) {
  return tag("h2", ...children);
}

function h3(...children) {
  return tag("h3", ...children);
}

function p(...children) {
  return tag("p", ...children);
}

function a(...children) {
  return tag("a", ...children);
}

function span(...children) {
  return tag("span", ...children);
}

function div(...children) {
  return tag("div", ...children);
}

function img(src) {
  return tag("img")._att("src", src);
}

function blogPost() {
  return div(
    h1(text("1. The Title")),
    p(text("idk what is this")),
    div(p(DUMMY)),
    h2(text("1.1 Sub Text")),
    p(DUMMY),
    h3(text("1.1 Sub Text")),
    p(DUMMY)
  );
}

function ohno() {
  return div(
    img(
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/x1nlzlyldasoj6pllfug/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookIndia.jpg"
    ),
    img(
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/x1nlzlyldasoj6pllfug/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookIndia.jpg"
    ),
    img(
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/x1nlzlyldasoj6pllfug/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookIndia.jpg"
    )
  );
}

function tabSwitcher(names, choose) {
  return div(
    ...names.map((name, index) => {
      return span(
        a(text(name))
          ._att("href", "#")
          ._onclick(() => choose(index))
      )._att("class", "tab");
    })
  )._att("class", "tab-switcher");
}

function tabs(tbs) {
  const names = Object.keys(tbs);
  const tags = names.map((name) => tbs[name]);
  console.assert(tabs.length > 0);
  let currentTab = 0;
  const tabSlot = div(tags[currentTab]);
  return div(tabSwitcher(Object.keys(tbs), (index) => {
    tabSlot.removeChild(tags[currentTab]);
    tabSlot.appendChild(tags[index]);
    currentTab = index;
  }), tabSlot);
}

function router(routes) {

    let result = div(text("Hash is not synced"));

    result._syncHash = function() {
        let hashLocation = document.location.hash.split("#")[1];

        if(!hashLocation){
            hashLocation = "/";
        }

        if(!(hashLocation in routes)) {
            const route404 = "/404"
            console.assert("/404" in routes);
            hashLocation = route404;
        }

        while(this.firstChild) {
            this.removeChild(this.lastChild)
        }
        this.appendChild(routes[hashLocation])
    }

    return result;

}

window.onload = () => {
  const app = router({
        "/": div(tabs({
            "blogPost": blogPost(),
            "ohno": ohno(),
            "foo": div(text("Foo Bar")),
            "LOREM": div(text(DUMMY))
        }),
        a(text("idk page"))._att("href", "#/idk")),
        "/idk" : tabs({
            "LOREM": div(text(DUMMY)),
            "blogPost": blogPost()
        }),
        "/404": div(text("Path not found"))
    })

    app._syncHash();

    window.addEventListener("hashchange", () => {
        app._syncHash();
    })

    entry.appendChild(app)
};
