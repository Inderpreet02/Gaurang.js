"use strict"

const DUMMY = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
function tag(name, ...children){
    const result = document.createElement(name)
    for(const child of children) {
        result.append(child);
    }

    result.att = function(name, value) {
        this.setAttribute(name, value);
        return this;
    }
    return result;
}

function text(bars){
    return document.createTextNode(bars)
}

function h1(...children){
    return tag("h1", ...children)
}

function h2(...children){
    return tag("h2", ...children)
}

function h3(...children){
    return tag("h3", ...children)
}

function p(...children){
    return tag("p", ...children)
}

function div(...children) {
    return tag("div", ...children);
}

function img(src) {
    return tag("img").att("src", src);
}

function blogPost() {   
    return div(
        h1(text("1. The Title")),
        p(text("idk what is this")),
        div(p(DUMMY)),
        h2(text("1.1 Sub Text")),
        p(DUMMY)
    )
}

function ohno() {
    return div(
        img("https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/x1nlzlyldasoj6pllfug/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookIndia.jpg"),
        img("https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/x1nlzlyldasoj6pllfug/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookIndia.jpg"),
        img("https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_3000,h_2250,f_auto/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/x1nlzlyldasoj6pllfug/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookIndia.jpg")
    )
}

window.onload = () => {
    entry.appendChild(
        blogPost()
    )
}